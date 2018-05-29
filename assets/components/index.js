'use strict'

var accountMenu = require('./account-menu/account-menu')
var charCounter = require('./character-counter/character-counter')
var timeoutDialog = require('../patterns/help-users-when-we-time-them-out-of-a-service/timeoutDialog')

;(function ($, window, document) {
  accountMenu()
  charCounter()
  window.GOVUK = window.GOVUK || {}
  window.GOVUK.timeoutDialog = timeoutDialog

  $.timeoutDialog = function (config) {
    console.warn('$.timeout is now deprecated, please use window.GOVUK.timeoutDialog')
    var updatedConfig = $.extend({}, config)

    if (updatedConfig.hasOwnProperty('keep_alive_url')) {
      updatedConfig.keepAliveUrl = updatedConfig.keep_alive_url
      delete updatedConfig.keep_alive_url
    }
    if (updatedConfig.hasOwnProperty('keep_alive_button_text')) {
      updatedConfig.keepAliveButtonText = updatedConfig.keep_alive_button_text
      delete updatedConfig.keep_alive_button_text
    }
    if (updatedConfig.hasOwnProperty('logout_url')) {
      updatedConfig.signOutUrl = updatedConfig.logout_url
      delete updatedConfig.logout_url
    }
    if (updatedConfig.hasOwnProperty('sign_out_button_text')) {
      updatedConfig.signOutButtonText = updatedConfig.sign_out_button_text
      delete updatedConfig.sign_out_button_text
    }

    window.GOVUK.timeoutDialog($.extend({
      timeout: 900,
      countdown: 120,
      keepAliveUrl: '/keep-alive',
      signOutUrl: '/sign-out',
      language: 'en'
    }, updatedConfig))
  }
})(window.jQuery, window, document)
