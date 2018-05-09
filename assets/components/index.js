'use strict'

var accountMenu = require('./account-menu/account-menu')
var charCounter = require('./character-counter/character-counter')
var timeoutDialog = require('../patterns/timeout-dialog/timeoutDialog')

;(function ($, window, document) {
  accountMenu()
  charCounter()
  window.govuk = window.govuk || {}
  window.govuk.timeoutDialog = timeoutDialog
  $.timeoutDialog = function () {
    // TODO: Add deprecation log message?
    window.govuk.timeoutDialog.apply(window.govuk, arguments)
  }
})(window.jQuery, window, document)
