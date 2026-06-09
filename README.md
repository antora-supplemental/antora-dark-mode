# DEPRECATED — do not install

**This npm package is retired.** It will not receive updates. New documentation sites must not add `antora-dark-mode` as a dependency.

If the yellow deprecation banner above this README is hard to read (npm dark theme), **use this README instead** — it is the authoritative migration notice.

---

## Why you should not use npm for this theme

Antora Dark Theme is a **static UI bundle** (CSS, Handlebars, JavaScript), not a Node library. Installing it from npm:

- Adds a useless entry to your `package.json` and lockfile
- Encourages invalid setups (multiple `supplemental_files` directories, copy/sync scripts from `node_modules`)
- Duplicates what the official release artifact already ships

The **correct habit** is a single pinned URL in your Antora playbook—no `npm install`.

---

## What to do instead (correct instructions)

### 1. Use the GitHub release UI bundle

In `antora-playbook.yml`:

```yaml
ui:
  bundle:
    url: https://github.com/antora-supplemental/antora-dark-mode/releases/download/v1.2.0/ui-bundle.zip
    snapshot: true
```

Pin an exact semver tag for production. See [Version Pinning](https://antora-supplemental.github.io/antora-dark-mode/antora-dark-mode/guide/version-pinning.html) for `releases/latest`, rolling line tags (`v1.0`, `v1`), and Renovate.

### 2. Optional branding (one directory only)

```yaml
  supplemental_files: ./supplemental-ui-overrides   # e.g. img/logo.svg
```

### 3. Remove this package if it is already installed

```bash
pnpm remove -D antora-dark-mode
# or: npm uninstall antora-dark-mode
```

Delete any `prebuild` / `sync:ui` scripts that copied `node_modules/antora-dark-mode/supplemental-ui`.

---

## Where to find full documentation

| Resource | URL |
|----------|-----|
| **Install guide & lessons learned** | [npm deprecation (Antora site)](https://antora-supplemental.github.io/antora-dark-mode/antora-dark-mode/guide/npm-deprecation.html) |
| **Live demo** | [antora-supplemental.github.io/antora-dark-mode](https://antora-supplemental.github.io/antora-dark-mode) |
| **Extensions catalog (org hub)** | [antora-supplemental.github.io/docs](https://antora-supplemental.github.io/docs/) |
| **Source repository** | [github.com/antora-supplemental/antora-dark-mode](https://github.com/antora-supplemental/antora-dark-mode) |
| **Example playbook** | [examples/antora-playbook.yml](https://github.com/antora-supplemental/antora-dark-mode/blob/main/examples/antora-playbook.yml) |

---

## License

[MIT](https://github.com/antora-supplemental/antora-dark-mode/blob/main/LICENSE)
