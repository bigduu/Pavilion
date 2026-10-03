# README source audit — 2026-10-03

- Zenith pin before documentation edits: `b1a06f4e53633d6769a970d1d5b90c11c0f56d18`.
- `git ls-remote origin HEAD` returned that same SHA. No newer default-branch source was observed; no Zenith gitlink was changed.
- Release evidence: https://github.com/bigduu/Pavilion/releases . Public release page explicitly says “There aren’t any releases here”; no release version is claimed. Manifest placeholder versions are not published versions.
- GitHub API requests were blocked by this environment's proxy (403); the public release HTML was retrieved successfully instead.
- Source evidence: `src/App.tsx`, `src/utils/locale.ts`, `src/constants.ts`, `package.json`; Zenith `.gitmodules` and `.github/release-train.config.json` select eight modules and the Lotus Next frontend (legacy Lotus is rollback-only).
- Scope: README files, the architecture article's historical-context note, and this audit only. No product code, releases, credentials, or deployment settings changed.
- Website-copy boundary: `src/constants.ts` and `src/i18n/en.ts` / `zh.ts` retain legacy Lotus setup and the older parallel-track description of Lotus Next. The bilingual READMEs explicitly disclose this gap; the current Zenith architecture diagram does not claim that Pavilion's website copy was migrated.
- Validation: local Markdown targets and `git diff --check`; command names and requirements compared with checked-in source. No real IM credentials, PostgreSQL service, provider calls, or native macOS/Windows behavior were exercised by this review.
