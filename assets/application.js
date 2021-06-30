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

window.GOVUK = window.GOVUK || {}

require('govuk-template')
require('javascripts')
require('./components')
require('./components/show-hide-content/show-hide-content-init')

var stubGenerator = function(name) {function() {console.log(name + 'has been removed alongside other analytics features' +
  ', please use Tracking Consent instead.')}};
window.GOVUK.Analytics = stubGenerator('window.GOVUK.Analytics')
window.GOVUK.GoogleAnalyticsUniversalTracker = stubGenerator('window.GOVUK.GoogleAnalyticsUniversalTracker')
window.GOVUK.GOVUKTracker = stubGenerator('window.GOVUK.GOVUKTracker')
window.GOVUK.analyticsPlugins = {
  downloadLinkTracker: stubGenerator('window.GOVUK.analyticsPlugins.downloadLinkTracker'),
  error: stubGenerator('window.GOVUK.analyticsPlugins.error'),
  externalLinkTracker: stubGenerator('window.GOVUK.analyticsPlugins.externalLinkTracker'),
  printIntent: stubGenerator('window.GOVUK.analyticsPlugins.printIntent')
}
