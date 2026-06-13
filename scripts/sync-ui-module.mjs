#!/usr/bin/env node
'use strict'

/**
 * Copies supplemental-ui CSS/JS into the dark-mode ui-module tree.
 * FOUC script (ui/scripts/fouc.js) is maintained separately — keep in sync with
 * supplemental-ui/partials/head-meta.hbs inline script.
 *
 * Usage: node scripts/sync-ui-module.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const SUPPLEMENTAL = path.join(REPO_ROOT, 'supplemental-ui')
const MODULE_UI = path.join(REPO_ROOT, 'ui-modules', 'packages', 'dark-mode', 'ui')

const copies = [
  ['css/site-extra.css', 'css/site-extra.css'],
  ['js/site-dark-mode.js', 'js/site-dark-mode.js'],
]

for (const [from, to] of copies) {
  const src = path.join(SUPPLEMENTAL, from)
  const dest = path.join(MODULE_UI, to)
  if (!fs.existsSync(src)) {
    console.error(`Missing source: ${src}`)
    process.exit(1)
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(src, dest)
  console.log(`Synced ${from} -> ui-modules/packages/dark-mode/ui/${to}`)
}

console.log('Done. Verify ui/scripts/fouc.js matches supplemental-ui/partials/head-meta.hbs if head-meta changed.')
