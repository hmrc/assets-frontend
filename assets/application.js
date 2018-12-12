window._gaq = window._gaq || []

require('jquery')

// patch jQuery for http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-9251
window.jQuery.ajaxPrefilter(function (s) {
  if (s.crossDomain) {
    s.contents.script = false
  }
})

require('govuk-template')
require('javascripts')
require('./components')
require('./components/show-hide-content/show-hide-content-init')
var GOVUK = require('stageprompt')

// initialise stageprompt for Analytics
GOVUK.performance.stageprompt.setupForGoogleAnalytics()
