#!/bin/sh
# SPDX-License-Identifier: MIT
set -eu

repository=https://github.com/bigduu/Bodhi-AI
releases_url=$repository/releases/latest
release_api=https://api.github.com/repos/bigduu/Bodhi-AI/releases/latest
work_dir=
stage_dir=
mount_point=

fail() {
  printf 'Bodhi installer: %s\n' "$*" >&2
  exit 1
}

need() {
  command -v "$1" >/dev/null 2>&1 || fail "Required command '$1' is missing. See $releases_url for manual installation."
}

cleanup() {
  [ -z "$stage_dir" ] || rm -rf "$stage_dir"
  if [ -n "$mount_point" ] && ! hdiutil detach "$mount_point" >/dev/null 2>&1; then
    printf 'Bodhi installer: could not detach %s. Unmount it before removing the temporary files.\n' "$mount_point" >&2
    return
  fi
  [ -z "$work_dir" ] || rm -rf "$work_dir"
}

fetch() {
  curl -q --proto '=https' --proto-redir '=https' --tlsv1.2 \
    --fail --show-error --silent --location --connect-timeout 15 --retry 2 "$@"
}

json_value() {
  plutil -extract "$1" raw -expect "$2" "$metadata"
}

release_metadata_macos() {
  [ "$(json_value draft bool)" = false ] &&
    [ "$(json_value prerelease bool)" = false ] &&
    json_value tag_name string
}

select_asset_macos() {
  asset_count=$(json_value assets array) || return 1
  asset_index=0
  matched_key=
  while [ "$asset_index" -lt "$asset_count" ]; do
    asset_key="assets.$asset_index"
    name=$(json_value "$asset_key.name" string) || return 1
    if [ "$name" = "$asset" ]; then
      [ -z "$matched_key" ] || return 1
      matched_key=$asset_key
    fi
    asset_index=$((asset_index + 1))
  done
  [ -n "$matched_key" ] || return 1
  [ "$(json_value "$matched_key.state" string)" = uploaded ] &&
    [ "$(json_value "$matched_key.browser_download_url" string)" = "$expected_url" ] &&
    json_value "$matched_key.digest" string
}

linux_metadata() {
  if command -v jq >/dev/null 2>&1; then
    jq -er --arg name "$1" --arg url "$2" '
      if .draft != false or .prerelease != false or (.assets | type) != "array" then
        error("Expected a stable release")
      elif $name == "" then
        .tag_name | strings
      else
        [.assets[] | select(.name == $name)] |
        if length == 1 and .[0].state == "uploaded" and .[0].browser_download_url == $url
        then .[0].digest | strings
        else error("Expected one published installer")
        end
      end' "$metadata"
  else
    python3 - "$metadata" "$1" "$2" <<'PY'
import json
import sys

file, name, url = sys.argv[1:]
with open(file, encoding="utf-8") as stream:
    release = json.load(stream)
assets = release.get("assets")
if release.get("draft") is not False or release.get("prerelease") is not False or not isinstance(assets, list):
    sys.exit("Expected a stable release")
if name:
    matches = [asset for asset in assets if asset.get("name") == name]
    if len(matches) != 1 or matches[0].get("state") != "uploaded" or matches[0].get("browser_download_url") != url:
        sys.exit("Expected one published installer")
    value = matches[0].get("digest")
else:
    value = release.get("tag_name")
if not isinstance(value, str):
    sys.exit("Missing release metadata")
print(value)
PY
  fi
}

install_macos() {
  mounted_dir=$work_dir/volume
  mkdir "$mounted_dir"
  hdiutil attach -readonly -nobrowse -mountpoint "$mounted_dir" "$package" >/dev/null ||
    fail 'Could not mount the verified Bodhi disk image.'
  mount_point=$mounted_dir
  source_app="$mount_point/Bodhi AI.app"
  [ -d "$source_app" ] && [ ! -L "$source_app" ] || fail 'The disk image does not contain Bodhi AI.app.'
  info_plist=$source_app/Contents/Info.plist
  bundle_id=$(plutil -extract CFBundleIdentifier raw -expect string "$info_plist")
  bundle_version=$(plutil -extract CFBundleShortVersionString raw -expect string "$info_plist")
  [ "$bundle_id" = com.bodhi.app ] && [ "$bundle_version" = "$version" ] ||
    fail 'The app identity does not match the selected release.'

  mkdir -p "$install_dir"
  stage_dir=$(mktemp -d "$install_dir/.bodhi-install.XXXXXXXX")
  staged_app="$stage_dir/Bodhi AI.app"
  ditto "$source_app" "$staged_app"
  codesign --verify --deep --strict "$staged_app" || fail 'The macOS app signature did not verify.'
  hdiutil detach "$mount_point" >/dev/null || fail 'Could not detach the Bodhi disk image.'
  mount_point=

  # Stage on the destination filesystem. The source and final basenames are
  # identical, so mv -n preserves a bundle already installed by a parallel run.
  if [ -e "$destination" ] || [ -L "$destination" ]; then
    fail "The path $destination is already in use."
  fi
  mv -hn "$staged_app" "$install_dir/"
  [ ! -e "$staged_app" ] || fail "Bodhi already exists at $destination."
  printf 'Installed Bodhi %s at %s\nOpen Bodhi AI in Finder to get started.\n' "$version" "$destination"
}

install_linux() {
  if [ "$(dpkg-deb -f "$package" Package)" != bodhi-ai ] ||
    [ "$(dpkg-deb -f "$package" Architecture)" != amd64 ] ||
    [ "$(dpkg-deb -f "$package" Version)" != "$version" ]; then
    fail 'The DEB package name, architecture or version does not match the selected release.'
  fi
  printf 'Installing Bodhi %s with APT. Review the package changes in your terminal.\n' "$version"
  # Open the terminal as the desktop user because stdin carries the script.
  # shellcheck disable=SC2024
  sudo -- apt-get install "$package" </dev/tty ||
    fail "APT could not install Bodhi. See $releases_url for manual installation."
  printf 'Installed Bodhi %s. Open Bodhi AI from your application menu.\n' "$version"
}

main() {
  export LC_ALL=C
  case "$#" in
    0) ;;
    1) [ "$1" = --help ] || fail 'Usage: install.sh [--help]'
       printf 'Install the latest stable Bodhi AI on Apple Silicon macOS or APT-based Linux x64.\nUsage: install.sh [--help]\n'
       return ;;
    *) fail 'Usage: install.sh [--help]' ;;
  esac

  system=$(uname -s)
  arch=$(uname -m)
  case "$system" in
    Darwin)
      [ "$(sysctl -n hw.optional.arm64 2>/dev/null || true)" = 1 ] ||
        fail "Bodhi requires an Apple Silicon Mac. See $releases_url."
      macos_version=$(sw_vers -productVersion)
      major=${macos_version%%.*}
      rest=${macos_version#*.}
      minor=${rest%%.*}
      if [ "$major" -lt 13 ] || { [ "$major" -eq 13 ] && [ "$minor" -lt 5 ]; }; then
        fail "Bodhi requires macOS 13.5 or later. This Mac runs $macos_version."
      fi
      ;;
    Linux)
      case "$arch" in x86_64|amd64) ;; *) fail "This installer requires Linux x64. See $releases_url." ;; esac
      if ! command -v apt-get >/dev/null 2>&1 || ! command -v dpkg-deb >/dev/null 2>&1; then
        fail "The Linux installer requires an APT-based distribution. See $releases_url for other packages."
      fi
      ;;
    *) fail "Unsupported platform ($system $arch). See $releases_url for available installers." ;;
  esac

  case "${HOME:-}" in /*) ;; *) fail 'HOME must be an absolute path.' ;; esac
  if [ "$system" = Darwin ]; then
    install_dir=$HOME/Applications
    destination="$install_dir/Bodhi AI.app"
    for existing_app in "/Applications/Bodhi AI.app" "$destination"; do
      if [ -d "$existing_app" ] && [ -f "$existing_app/Contents/Info.plist" ]; then
        printf 'Bodhi is already installed at %s\n' "$existing_app"
        return
      fi
    done
    [ ! -e "$destination" ] && [ ! -L "$destination" ] ||
      fail "The path $destination is already in use."
    for utility in plutil shasum hdiutil ditto codesign; do need "$utility"; done
  else
    command -v jq >/dev/null 2>&1 || need python3
    need sha256sum
    need sudo
    ( : </dev/tty ) 2>/dev/null || fail 'Run this command in a terminal so sudo can prompt for your password.'
  fi
  [ "$(id -u)" != 0 ] || fail 'Run the command as your desktop user.'
  need curl

  temp_base=/tmp
  case "${TMPDIR:-}" in /*) temp_base=$TMPDIR ;; esac
  work_dir=$(mktemp -d "$temp_base/bodhi-install.XXXXXXXX")
  trap cleanup 0
  trap 'exit 129' HUP
  trap 'exit 130' INT
  trap 'exit 143' TERM

  metadata=$work_dir/release.json
  fetch --header 'Accept: application/vnd.github+json' --max-time 60 --output "$metadata" "$release_api" ||
    fail "Could not read the latest Bodhi release from GitHub. See $releases_url."

  if [ "$system" = Darwin ]; then
    tag=$(release_metadata_macos) || fail 'GitHub did not return valid stable release metadata.'
    asset_suffix=aarch64.dmg
  else
    tag=$(linux_metadata '' '') || fail 'GitHub did not return valid stable release metadata.'
    asset_suffix=amd64.deb
  fi
  version=${tag#app-v}
  case "$version" in *[!0-9.]*|'') fail 'GitHub did not return a valid Bodhi release version.' ;; esac
  if [ "$tag" != "app-v$version" ] || ! printf '%s\n' "$version" | grep -Eq '^[0-9]+\.[0-9]+\.[0-9]+$'; then
    fail 'GitHub did not return a valid Bodhi release version.'
  fi

  asset="Bodhi.AI_${version}_$asset_suffix"
  expected_url=$repository/releases/download/$tag/$asset
  if [ "$system" = Darwin ]; then
    asset_digest=$(select_asset_macos) || fail "Could not find a unique checksummed $asset release asset."
  else
    asset_digest=$(linux_metadata "$asset" "$expected_url") || fail "Could not find a unique checksummed $asset release asset."
  fi
  case "$asset_digest" in sha256:*) ;; *) fail "GitHub did not provide SHA-256 for $asset." ;; esac
  expected_hash=${asset_digest#sha256:}
  case "$expected_hash" in *[!0-9a-f]*) fail "GitHub returned an invalid SHA-256 for $asset." ;; esac
  [ "${#expected_hash}" -eq 64 ] || fail "GitHub returned an invalid SHA-256 for $asset."

  printf 'Downloading Bodhi %s (%s)...\n' "$version" "$asset"
  package=$work_dir/$asset
  fetch --output "$package" "$expected_url" || fail "Could not download $asset."
  if [ "$system" = Darwin ]; then
    checksum=$(shasum -a 256 < "$package")
  else
    checksum=$(sha256sum < "$package")
  fi
  [ "${checksum%% *}" = "$expected_hash" ] || fail "SHA-256 mismatch for $asset. Download discarded."

  if [ "$system" = Darwin ]; then
    install_macos
  else
    install_linux
  fi
}

# The closing parenthesis makes the shell parse the complete entry point
# before running it, even when curl pipes a partial response to sh.
(
  main "$@"
)
