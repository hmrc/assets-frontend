'use strict'

var accountMenu = require('./account-menu/account-menu')
var charCounter = require('./character-counter/character-counter')
var timeoutDialog = require('../patterns/timeout-dialog/timeoutDialog')

;(function ($, window, document) {
  accountMenu()
  charCounter()
  window.govuk = window.govuk || {}
  window.govuk.timeoutDialog = timeoutDialog
  $.timeoutDialog = function (config) {
    console.warn('$.timeout is now deprecated, please use window.govuk.timeoutDialog')
    window.govuk.timeoutDialog($.extend({
      timeout: 900,
      count: 120,
      keep_alive_url: '/keep-alive',
      logout_url: '/sign-out'
    }, config))
  }
})(window.jQuery, window, document)
