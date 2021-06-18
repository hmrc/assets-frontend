window._gaq = window._gaq || []

require('jquery')

// patch jQuery for http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-9251
window.jQuery.ajaxPrefilter(function (s) {
  if (s.crossDomain) {
    s.contents.script = false
  }
})

// patch jQuery for http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-11022
jQuery.htmlPrefilter = function (html) {
  return html
}

require('govuk-template')
require('javascripts')
require('./components')
require('./components/show-hide-content/show-hide-content-init')

