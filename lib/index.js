'use strict'

/**
 * antora-dark-mode 1.x compatibility path.
 *
 * Dark mode moved to antora-ui-chassis (antora-dark-mode 2.x on npm). This
 * extension keeps 1.x playbooks building: it logs one migration warning per
 * build, then registers the chassis packages exactly as antora-dark-mode 2.x
 * does (light-dark-mode for the toggle and head hook, default-paint for the
 * Default UI palette).
 *
 *   antora:
 *     extensions:
 *       - require: antora-dark-mode   # this repo, 1.x
 *
 * Options are the 2.x options (navbar, toggle, toggle_placement,
 * follow_system, paint, color_scheme). site.keys.dark_mode_navbar still works.
 */

const MIGRATION_URL = 'https://github.com/antora-supplemental/antora-ui-chassis/blob/main/docs/modules/ROOT/pages/migrate-dark-mode.adoc'

const WARNING =
  'antora-dark-mode 1.x is a compatibility path; dark mode moved to antora-ui-chassis. ' +
  'Migrate: npm i -D antora-dark-mode@2 and add "- require: antora-dark-mode" under antora.extensions in your playbook ' +
  '(remove the old UI bundle or supplemental files). See ' + MIGRATION_URL

const PASS = ['toggle', 'togglePlacement', 'followSystem', 'colorScheme', 'enabled']

function mapOptions (config = {}, siteKeys = {}) {
  const out = {}
  for (const k of PASS) if (config[k] !== undefined) out[k] = config[k]
  const navbar = config.navbar !== undefined ? config.navbar : (siteKeys.dark_mode_navbar ?? siteKeys.darkModeNavbar)
  out.navbar = navbar === undefined ? 'dark' : navbar
  return out
}

function register ({ config } = {}, deps) {
  config = config || {}
  const { lightDarkMode, defaultPaint } = deps || {
    lightDarkMode: require('@antora-supplemental/light-dark-mode'),
    defaultPaint: require('@antora-supplemental/default-paint'),
  }
  const logger = this.getLogger('antora-dark-mode')
  // register runs once per build, so this warns once per build.
  logger.warn(WARNING)
  const ldm = {}
  this.on('uiLoaded', ({ playbook }) => {
    Object.assign(ldm, mapOptions(config, (playbook.site && playbook.site.keys) || {}))
  })
  lightDarkMode.register.call(this, { config: ldm })
  if (config.paint !== false) defaultPaint.register.call(this, { config: { enabled: config.enabled } })
}

module.exports = { register, mapOptions, WARNING, MIGRATION_URL }
