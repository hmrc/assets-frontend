/* eslint-env jquery */

require('jquery')
var dialog = require('./dialog.js')
var redirectHelper = require('./redirectHelper.js')

Date.now = Date.now || function () {
  return +new Date()
}

/* TODO:
    - Support welsh by using cookie.  This may be appropriate detection code
      `var playLangCookieMatch = document.cookie.match(/PLAY_LANG=([^;]+)/); lang = playLangCookieMatch && playLangCookieMatch[1] || 'en'`
 */

var self = module.exports = {
  timeoutDialog: function (options) {

    validateInput(options)
    var localisedDefaults = readCookie('PLAY_LANG') && readCookie('PLAY_LANG') === 'cy' && {
      title: undefined,
      message: 'Er eich diogelwch, byddwn yn eich allgofnodi cyn pen',
      keepAliveButtonText: 'Parhau i fod wedi’ch mewngofnodi',
      signOutButtonText: 'Allgofnodi',
      properties: {
        minutes: 'funud',
        minute: 'funud',
        seconds: 'eiliad',
        second: 'eiliad'
      }
    } || {
      title: undefined,
      message: 'For your security, we will sign you out in',
      keepAliveButtonText: 'Stay signed in',
      signOutButtonText: 'Sign out',
      properties: {
        minutes: 'minutes',
        minute: 'minute',
        seconds: 'seconds',
        second: 'second'
      }
    }
    var settings = mergeOptionsWithDefaults(options, localisedDefaults)

    var cleanupFunctions = []

    setupDialogTimer()

    function validateInput(config) {
      var requiredConfig = ['timeout', 'countdown', 'keepAliveUrl', 'signOutUrl']
      var missingRequiredConfig = []

      $.each(requiredConfig, function () {
        if (!config.hasOwnProperty(this)) {
          missingRequiredConfig.push(this)
        }
      })

      if (missingRequiredConfig.length > 0) {
        throw new Error('Missing config item(s): [' + missingRequiredConfig.join(', ') + ']')
      }
    }

    function mergeOptionsWithDefaults(options, localisedDefaults) {
      return $.extend({}, localisedDefaults, options)
    }

    function setupDialogTimer() {
      settings.signout_time = Date.now() + settings.timeout * 1000

      var timeout = window.setTimeout(function () {
        setupDialog()
      }, ((settings.timeout) - (settings.countdown)) * 1000)

      cleanupFunctions.push(function () {
        window.clearTimeout(timeout)
      })
    }

    function setupDialog() {
      var $countdownElement = $('<span id="timeout-countdown" class="countdown">');
      var $element = $('<div>')
        .append(settings.title ? $('<h1 class="heading-medium push--top">').text(settings.title) : '')
        .append($('<p id="timeout-message" role="text">').text(settings.message + ' ')
          .append($countdownElement)
          .append('.'))
        .append($('<button id="timeout-keep-signin-btn" class="button">').text(settings.keepAliveButtonText))
        .append($('<button id="timeout-sign-out-btn" class="button button--link">').text(settings.signOutButtonText))

      $element.find('#timeout-keep-signin-btn').on('click', keepAliveAndClose)
      $element.find('#timeout-sign-out-btn').on('click', signOut)

      var dialogControl = dialog.displayDialog($element)

      cleanupFunctions.push(function () {
        dialogControl.closeDialog()
      })

      dialogControl.addCloseHandler(keepAliveAndClose)

      dialogControl.setAriaLabelledBy('timeout-message')
      if (getSecondsRemaining() > 60) {
        dialogControl.setAriaLive('polite')
      }

      startCountdown($countdownElement, dialogControl)
    }

    function getSecondsRemaining() {
      return Math.floor((settings.signout_time - Date.now()) / 1000)
    }

    function startCountdown($countdownElement, dialogControl) {
      function updateCountdown(counter, $countdownElement) {
        var message
        if (counter === 60) {
          dialogControl.setAriaLive()
        }
        if (counter < 60) {
          message = counter + ' ' + settings.properties[counter !== 1 ? 'seconds' : 'second']
        } else {
          var newCounter = Math.ceil(counter / 60)
          var minutesMessage = ' ' + settings.properties.minutes
          if (newCounter === 1) {
            minutesMessage = ' ' + settings.properties.minute
          }
          message = newCounter + minutesMessage
        }
        $countdownElement.text(message)
      }

      function runUpdate() {
        var counter = getSecondsRemaining()
        updateCountdown(counter, $countdownElement)
        if (counter <= 0) {
          signOut()
        }
      }

      var countdown = window.setInterval(runUpdate, 1000)
      cleanupFunctions.push(function () {
        window.clearInterval(countdown)
      })
      runUpdate()
    }

    function keepAliveAndClose() {
      cleanup()
      setupDialogTimer()
      $.get(settings.keepAliveUrl, function () {
      })
    }

    function signOut() {
      redirectHelper.redirectToUrl(settings.signOutUrl)
    }

    function cleanup() {
      while (cleanupFunctions.length > 0) {
        var fn = cleanupFunctions.shift()
        fn()
      }
    }

    function readCookie(cookieName) { // From http://www.javascripter.net/faq/readingacookie.htm
      var re = new RegExp('[; ]'+cookieName+'=([^\\s;]*)');
      var sMatch = (' '+document.cookie).match(re);
      if (cookieName && sMatch) return unescape(sMatch[1]);
      return '';
    }

    return {cleanup: cleanup}
  },
  legacyWrapper: function (config) {
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

    self.timeoutDialog($.extend({
      timeout: 900,
      countdown: 120,
      keepAliveUrl: '/keep-alive',
      signOutUrl: '/sign-out'
    }, updatedConfig))
  }
}
