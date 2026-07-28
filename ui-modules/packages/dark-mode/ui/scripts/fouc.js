(function () {
  var dmNavbar = document.querySelector('meta[name="dm-navbar"]')
  if (dmNavbar && dmNavbar.content) {
    document.documentElement.dataset.dmNavbar = dmNavbar.content
  }
  var html = document.documentElement
  var MODE = 'antora-theme-mode'
  var LEGACY = 'antora-theme'
  function mode() {
    var m = localStorage.getItem(MODE)
    if (m === 'system' || m === 'dark' || m === 'light') return m
    var o = localStorage.getItem(LEGACY)
    if (o === 'dark' || o === 'light') return o
    return 'system'
  }
  var m = mode()
  if (m === 'dark') {
    html.style.colorScheme = 'dark'
    html.dataset.dm = 'dark'
  } else if (m === 'light') {
    html.style.colorScheme = 'light'
    html.dataset.dm = 'light'
  } else {
    /* system — let the CSS default (color-scheme: light dark) handle it */
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.dataset.dm = 'dark'
    }
  }
})()
