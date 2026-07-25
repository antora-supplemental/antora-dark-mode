# Antora Zulip — correction messages (antora-dark-theme → valentus-theme)

Post these in [Antora Zulip](https://antora.zulipchat.com/) where older threads still reference `antora-dark-theme`.

---

## Short correction (reply to outdated install advice)

The monolithic **`antora-dark-theme`** package was split and renamed:

| Former | Use instead |
|---|---|
| `antora-dark-theme` (npm / GitHub) | **`valentus-theme`** — release `ui-bundle.zip` (chrome + **bundled dark mode**) |
| Dark mode only on another theme | **`antora-dark-mode`** — slipstream overlay (does not use `ui.bundle`) |

```yaml
ui:
  bundle:
    url: https://github.com/antora-supplemental/valentus-theme/releases/download/v2/ui-bundle.zip
    snapshot: true
  supplemental_files: ./supplemental-ui-overrides   # optional branding
```

Docs: https://antora-supplemental.github.io/valentus-theme/

---

## Thread: npm install

```bash
# Former (retired)
pnpm add -D antora-dark-theme

# Full theme + dark mode (most former antora-dark-theme sites)
# Use release bundle URL in playbook — no npm required.
# Or: pnpm add -D valentus-theme for supplemental vendoring.

# Dark mode only on a custom theme bundle
pnpm add -D antora-dark-mode
```

---

## Thread: doc-site chrome + dark mode

Both ship in **valentus-theme** `ui-bundle.zip` since v1.1.0. You do not need to pin `antora-dark-mode` as `ui.bundle` and layer valentus on top.

---

## GitLab Default UI issue #216

Community extension: https://github.com/antora-supplemental/valentus-theme (full stack) or https://github.com/antora-supplemental/antora-dark-mode (overlay only).

Please update bookmarks and playbook URLs from `antora-dark-theme` to `valentus-theme`.
