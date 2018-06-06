window._gaq = window._gaq || []

require('jquery')
require('govuk-template')
require('javascripts')
require('./components')
require('./utils/conditionalReveal')
var GOVUK = require('stageprompt')

// initialise stageprompt for Analytics
GOVUK.performance.stageprompt.setupForGoogleAnalytics()
