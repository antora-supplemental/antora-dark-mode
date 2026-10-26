'use strict'
const { test } = require('node:test')
const assert = require('node:assert')
const { register, WARNING, MIGRATION_URL } = require('../lib/index.js')

function fakeContext () {
  const warnings = []
  const loggers = []
  const listeners = {}
  return {
    warnings,
    loggers,
    listeners,
    getLogger (name) { loggers.push(name); return { warn: (m) => warnings.push(m), info () {}, debug () {} } },
    on (ev, fn) { (listeners[ev] = listeners[ev] || []).push(fn); return this },
  }
}

function fakeDeps (calls) {
  return {
    lightDarkMode: { register ({ config }) { calls.push(['ldm', config]) } },
    defaultPaint: { register ({ config }) { calls.push(['paint', config]) } },
  }
}

test('warns once per build through the antora-dark-mode logger, with the migration link', () => {
  const ctx = fakeContext()
  register.call(ctx, { config: {} }, fakeDeps([]))
  assert.deepStrictEqual(ctx.loggers, ['antora-dark-mode'])
  assert.strictEqual(ctx.warnings.length, 1)
  assert.strictEqual(ctx.warnings[0], WARNING)
  assert.ok(WARNING.includes(MIGRATION_URL))
  assert.ok(WARNING.includes('npm i -D antora-dark-mode@2'))
  // Firing build events does not repeat the warning.
  for (const fn of ctx.listeners.uiLoaded || []) fn({ playbook: { site: {} } })
  assert.strictEqual(ctx.warnings.length, 1)
})

test('delegates to light-dark-mode and default-paint and maps 1.x options', () => {
  const ctx = fakeContext()
  const calls = []
  register.call(ctx, { config: { togglePlacement: 'footer' } }, fakeDeps(calls))
  assert.deepStrictEqual(calls.map((c) => c[0]), ['ldm', 'paint'])
  for (const fn of ctx.listeners.uiLoaded) fn({ playbook: { site: { keys: { dark_mode_navbar: 'light' } } } })
  assert.deepStrictEqual(calls[0][1], { togglePlacement: 'footer', navbar: 'light' })
})

test('paint: false skips default-paint', () => {
  const calls = []
  register.call(fakeContext(), { config: { paint: false } }, fakeDeps(calls))
  assert.deepStrictEqual(calls.map((c) => c[0]), ['ldm'])
})
