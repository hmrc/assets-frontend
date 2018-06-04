'use strict'

var accountMenu = require('./account-menu/account-menu')
var charCounter = require('./character-counter/character-counter')
var timeoutDialog = require('../patterns/help-users-when-we-time-them-out-of-a-service/timeoutDialog')

;(function ($, window, document) {
  accountMenu()
  charCounter()
  window.GOVUK = window.GOVUK || {}
  window.GOVUK.timeoutDialog = timeoutDialog.timeoutDialog
  $.timeoutDialog = timeoutDialog.legacyWrapper
})(window.jQuery, window, document)
