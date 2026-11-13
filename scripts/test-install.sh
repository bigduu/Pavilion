#!/bin/sh
set -eu

root=$(CDPATH='' cd -- "$(dirname "$0")/.." && pwd)
fixture=$(mktemp -d)
trap 'rm -rf "$fixture"' 0
mkdir "$fixture/bin" "$fixture/tmp"
export FIXTURE="$fixture" PATH="$fixture/bin:$PATH" TMPDIR="$fixture/tmp" HOME="$fixture"

cat > "$fixture/bin/uname" <<'EOF'
#!/bin/sh
case "$1" in
  -s) echo Linux ;;
  -m) echo "${TEST_ARCH:-x86_64}" ;;
esac
EOF
cat > "$fixture/bin/id" <<'EOF'
#!/bin/sh
echo 1000
EOF
cat > "$fixture/bin/curl" <<'EOF'
#!/bin/sh
set -eu
while [ "$1" != --output ]; do shift; done
case "$3" in
  https://api.github.com/repos/bigduu/Bodhi-AI/releases/latest)
    cp "$FIXTURE/release.json" "$2"
    ;;
  "$ASSET_URL")
    touch "$FIXTURE/downloaded"
    cp "$FIXTURE/package" "$2"
    ;;
  *) exit 1 ;;
esac
EOF
cat > "$fixture/bin/dpkg-deb" <<'EOF'
#!/bin/sh
case "$3" in
  Package) echo bodhi-ai ;;
  Architecture) echo "${TEST_PACKAGE_ARCH:-amd64}" ;;
  Version) echo "$TEST_VERSION" ;;
  *) exit 1 ;;
esac
EOF
cat > "$fixture/bin/sudo" <<'EOF'
#!/bin/sh
set -eu
test "$#" -eq 4
test "$1" = --
test "$2" = apt-get
test "$3" = install
cmp "$4" "$FIXTURE/package"
touch "$FIXTURE/apt-called"
EOF
printf '#!/bin/sh\nexit 1\n' > "$fixture/bin/apt-get"
chmod +x "$fixture/bin/"*
printf 'Bodhi test installer bytes\n' > "$fixture/package"
checksum=$(sha256sum < "$fixture/package")
export TEST_VERSION=2026.11.16
asset="Bodhi.AI_${TEST_VERSION}_amd64.deb"
url=https://github.com/bigduu/Bodhi-AI/releases/download/app-v$TEST_VERSION/$asset
export ASSET="$asset" ASSET_URL="$url" CHECKSUM="${checksum%% *}"

metadata() {
  python3 - "$1" > "$fixture/release.json" <<'PY'
import json
import os
import sys

case = sys.argv[1]
asset = {
    "name": os.environ["ASSET"],
    "state": "uploaded",
    "browser_download_url": os.environ["ASSET_URL"],
    "digest": "sha256:" + os.environ["CHECKSUM"],
}
release = {
    "tag_name": "app-v" + os.environ["TEST_VERSION"],
    "draft": False,
    "prerelease": case == "prerelease",
    "assets": [asset],
}
if case == "missing":
    release["assets"] = []
elif case == "duplicate":
    release["assets"].append(asset)
elif case == "wrong_url":
    asset["browser_download_url"] += ".other"
elif case == "missing_digest":
    del asset["digest"]
elif case == "checksum":
    asset["digest"] = "sha256:" + "0" * 64
print(json.dumps(release))
PY
}

# Attach a terminal for the sudo prompt while keeping the installer on stdin.
export INSTALL_SOURCE="$root/public/install.sh"
run_installer() {
  # The PTY child expands INSTALL_SOURCE after it inherits the environment.
  # shellcheck disable=SC2016
  script -q -e -c '/bin/sh < "$INSTALL_SOURCE"' /dev/null </dev/null
}

assert_clean() {
  test -z "$(find "$TMPDIR" -mindepth 1 -print -quit)"
}

metadata valid
run_installer > "$fixture/out"
grep -q "Installed Bodhi $TEST_VERSION" "$fixture/out"
test -e "$fixture/apt-called"
assert_clean
rm "$fixture/apt-called"

metadata checksum
if run_installer > "$fixture/out" 2>&1; then
  printf 'Installer accepted a checksum mismatch\n' >&2
  exit 1
fi
grep -q 'SHA-256 mismatch' "$fixture/out"
test ! -e "$fixture/apt-called"
assert_clean

metadata valid
if TEST_PACKAGE_ARCH=arm64 run_installer > "$fixture/out" 2>&1; then
  printf 'Installer accepted the wrong DEB architecture\n' >&2
  exit 1
fi
grep -q 'architecture or version' "$fixture/out"
test ! -e "$fixture/apt-called"
assert_clean

for invalid in prerelease missing duplicate wrong_url missing_digest; do
  metadata "$invalid"
  rm -f "$fixture/downloaded"
  if run_installer > "$fixture/out" 2>&1; then
    printf 'Installer accepted the %s release fixture\n' "$invalid" >&2
    exit 1
  fi
  test ! -e "$fixture/downloaded"
  test ! -e "$fixture/apt-called"
  assert_clean
done

metadata valid
if TEST_ARCH=aarch64 run_installer > "$fixture/out" 2>&1; then
  printf 'Installer accepted an unsupported architecture\n' >&2
  exit 1
fi
grep -q 'requires Linux x64' "$fixture/out"
test ! -e "$fixture/downloaded"

if sed '/^  main /q' "$INSTALL_SOURCE" | /bin/sh > "$fixture/out" 2>&1; then
  printf 'Installer accepted a truncated script\n' >&2
  exit 1
fi
test ! -e "$fixture/downloaded"
printf 'Bodhi installer release selection, installation and failure checks passed.\n'
