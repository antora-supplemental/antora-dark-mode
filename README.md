# antora-dark-mode

> [!WARNING]
> **Deprecated.** Merged into [`@antora-supplemental/color-scheme`](https://github.com/antora-supplemental/antora-ui-chassis/tree/main/packages/color-scheme) (antora-ui-chassis). No further releases. Add `"@antora-supplemental/color-scheme": "github:antora-supplemental/antora-ui-chassis#color-scheme-v0.1.2&path:packages/color-scheme"` and `- require: "@antora-supplemental/color-scheme"` under `antora.extensions`; colors come from your theme (e.g. [valentus-theme](https://github.com/antora-supplemental/valentus-theme)). `localStorage` keys are unchanged.

Dark mode supplemental UI for Antora — overlay install or slot-based ui-module.

**Does not occupy `ui.bundle`** when mixed with another theme. See [Installation](https://antora-supplemental.github.io/antora-dark-mode/antora-dark-mode/guide/installation.html).

Want mast/header/layout chrome *plus* dark mode? Use **[valentus-theme](https://github.com/antora-supplemental/valentus-theme)** (release `ui-bundle.zip` already includes dark mode) — do not stack this overlay on Valentus.

Migrating from the retired **`antora-dark-theme`** package? See [Legacy names & migration](https://antora-supplemental.github.io/antora-dark-mode/antora-dark-mode/guide/legacy-names.html).

---

## Install (overlay — recommended)

```bash
pnpm add -D antora-dark-mode
```

```yaml
ui:
  bundle:
    url: https://gitlab.com/antora/antora-ui-default/-/jobs/artifacts/HEAD/raw/build/ui-bundle.zip?job=bundle-stable
    snapshot: true
  supplemental_files: ./site/supplemental-ui   # merge node_modules/antora-dark-mode/supplemental-ui
```

For slot-based installs (no partial collisions), see [UI Modules](https://antora-supplemental.github.io/antora-dark-mode/antora-dark-mode/guide/ui-modules.html).

## Convenience bundle (Default UI only)

Pre-merged `ui-bundle.zip` — quick start when you do not use another theme in `ui.bundle`:

```yaml
ui:
  bundle:
    url: https://github.com/antora-supplemental/antora-dark-mode/releases/download/v1.2.0/ui-bundle.zip
    snapshot: true
```

## npm registry

Republishing to npm as **overlay transport** (not `ui.bundle` replacement). Same package name `antora-dark-mode` — npm does not support renaming packages. See [npm distribution](https://antora-supplemental.github.io/antora-dark-mode/antora-dark-mode/guide/npm-distribution.html).

## Links

| Resource | URL |
|----------|-----|
| Install guide | [installation.adoc](docs/modules/guide/pages/installation.adoc) |
| Legacy names | [legacy-names.adoc](docs/modules/guide/pages/legacy-names.adoc) |
| UI modules | [ui-modules.adoc](docs/modules/guide/pages/ui-modules.adoc) |
| Live demo | [antora-supplemental.github.io/antora-dark-mode](https://antora-supplemental.github.io/antora-dark-mode) |
| Source | [github.com/antora-supplemental/antora-dark-mode](https://github.com/antora-supplemental/antora-dark-mode) |

## License

[MIT](LICENSE)
