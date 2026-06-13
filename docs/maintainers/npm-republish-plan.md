# npm re-publish plan — antora-dark-mode

## Goal

Publish `antora-dark-mode` to npm as **overlay transport** (`supplemental-ui/` + `ui-modules/`).

**Note:** As of 2026-06-13, `antora-dark-mode` is **not yet on npm** (404). Legacy installs used `antora-dark-theme@1.0.9` (deprecated). This is a **first publish** under the new name, not a registry rename.

## npm rename — not possible

| Action | Supported? |
|--------|------------|
| Publish new versions to existing `antora-dark-mode` | Yes — same package name, same maintainer access |
| Rename `antora-dark-mode` → new name on npm | **No** — npm has no rename API |
| Redirect `antora-dark-theme` → `antora-dark-mode` | Deprecate old package only; names stay separate |

**Recommendation:** Reuse `antora-dark-mode` on npm. Do not attempt a registry rename.

## Tarball contents

```
supplemental-ui/     # overlay install (Default UI or theme bundle + supplemental_files)
ui-modules/          # slot-based dark-mode module + registry.json5
```

Not included: pre-merged `ui-bundle.zip` (GitHub Releases only).

## Pre-publish checklist

1. `pnpm ui-modules:sync` — CSS/JS synced from `supplemental-ui/`
2. `pnpm ui-modules:validate` — manifests + `registry-index.json`
3. `README.md` — overlay-first install (not bundle-only retirement)
4. `package.json` — `"files": ["supplemental-ui/**/*", "ui-modules/**/*"]`
5. Version bump aligned with git tag (e.g. `1.3.0`)

## Publish sequence

**Local (requires `npm login`):**

```powershell
cd Z:\code\github.com\antora-supplemental\antora-dark-mode
pnpm publish:npm
```

**CI:** `.github/workflows/release.yml` publishes on semver tags using [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) (OIDC). No `NPM_TOKEN` — configure the trusted publisher on npmjs.com instead (see below).

### npm trusted publisher (one-time, on npmjs.com)

Package **antora-dark-mode** → **Settings** → **Trusted publishing** → **GitHub Actions**:

| Field | Value |
|-------|-------|
| Organization or user | `antora-supplemental` |
| Repository | `antora-dark-mode` |
| Workflow filename | `release.yml` |
| Environment | _(leave blank — workflow does not use a deployment environment)_ |
| Allowed actions | `npm publish` |

Requires npm CLI ≥ 11.5.1 (Node 24 on GitHub-hosted runners). Provenance is generated automatically.

`workflow_dispatch` re-runs use the same `release.yml` filename — no separate npm entry needed.

After trusted publishing works, consider **Settings → Publishing access → Require 2FA and disallow tokens** for maximum security.

```powershell
# After publish — deprecate legacy package name (if you own antora-dark-theme)
npm deprecate antora-dark-theme@* "Renamed — use antora-dark-mode. See https://github.com/antora-supplemental/antora-dark-mode"
```

`prepack` script runs sync + validate automatically.

## Post-publish

- Update Antora Supplemental extensions catalog: npm = optional transport
- GitHub Release still ships `ui-bundle.zip` as **convenience** (Default UI only)
- Clear npm retirement banner (`npm deprecate … ""`)
- Announce migration for sites using `antora-dark-mode` as `ui.bundle` + valentus `supplemental_files`

## CI

`.github/workflows/release.yml` — npm publish via **trusted publishing** (OIDC, `id-token: write`). Configure the trusted publisher on npmjs.com for workflow `release.yml`; no `NPM_TOKEN` secret. See `docs/maintainers/npm-republish-plan.md`.

## Related docs

- `docs/modules/guide/pages/npm-distribution.adoc` — consumer-facing
- `docs/modules/guide/pages/installation.adoc` — overlay-first install
- `docs/modules/guide/pages/ui-modules.adoc` — orchestrator path
