#!/usr/bin/env node
'use strict'

/**
 * Publish antora-dark-mode to npm and deprecate legacy antora-dark-theme.
 * Requires: npm login (npm whoami succeeds).
 *
 * Usage: node scripts/npm-publish.mjs
 */

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PKG_PATH = path.join(ROOT, 'package.json')

function sh (cmd, opts = {}) {
  console.log(`> ${cmd}`)
  return execSync(cmd, { stdio: 'inherit', cwd: ROOT, ...opts })
}

function readPkg () {
  return JSON.parse(fs.readFileSync(PKG_PATH, 'utf8'))
}

function writePkg (pkg) {
  fs.writeFileSync(PKG_PATH, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8')
}

try {
  sh('npm whoami')
} catch {
  console.error('\nNot logged in to npm. Run: npm login')
  process.exit(1)
}

const pkg = readPkg()
const hadPrivate = pkg.private === true
if (hadPrivate) {
  delete pkg.private
  writePkg(pkg)
}

try {
  sh('pnpm ui-modules:sync')
  sh('pnpm ui-modules:validate')
  sh('npm publish --access public')
  try {
    sh('npm deprecate antora-dark-theme@* "Renamed — use valentus-theme (bundled dark mode). See https://github.com/antora-supplemental/valentus-theme"')
  } catch (e) {
    console.warn('Could not deprecate antora-dark-theme (may lack publish rights on that package).')
  }
  console.log('\nPublished antora-dark-mode@%s', pkg.version)
} finally {
  if (hadPrivate) {
    pkg.private = true
    writePkg(pkg)
  }
}
