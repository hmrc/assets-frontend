/* eslint-env jquery */

require('jquery')
var dialog = require('./dialog.js')
var redirectHelper = require('./redirectHelper.js')

Date.now = Date.now || function () {
  return +new Date()
}

module.exports = function (options) {

  validateInput(options)
  var settings = mergeOptionsWithDefaults(options)

  var cleanupFunctions = []

  setupDialogTimer()

  return {cleanup: cleanup}

  function validateInput(config) {
    var requiredConfig = ['timeout', 'countdown', 'keep_alive_url', 'logout_url', 'language']
    var missingRequiredConfig = []
    var validLanguages = ['en', 'cy']

    $.each(requiredConfig, function () {
      if (!config.hasOwnProperty(this)) {
        missingRequiredConfig.push(this)
      }
    })

    if (missingRequiredConfig.length > 0) {
      throw new Error('Missing config item(s): [' + missingRequiredConfig.join(', ') + ']')
    }

    if (validLanguages.indexOf(config.language) === -1) {
      throw new Error('Invalid language provided [' + config.language + ']')
    }
  }

  function mergeOptionsWithDefaults(options) {
    return $.extend({
      title: 'You’re about to be signed out',
      message: 'For security reasons, you will be signed out of this service in',
      keep_alive_button_text: 'Stay signed in',
      sign_out_button_text: 'Sign out'
    }, options)
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
      .append($('<h1 class="heading-medium push--top">').text(settings.title))
      .append($('<p id="timeout-message" role="text">').text(settings.message + ' ')
        .append($countdownElement)
        .append('.'))
      .append($('<button id="timeout-keep-signin-btn" class="button">').text(settings.keep_alive_button_text))
      .append($('<button id="timeout-sign-out-btn" class="button button--link">').text(settings.sign_out_button_text))

    $element.find('#timeout-keep-signin-btn').on('click', keepAliveAndClose)
    $element.find('#timeout-sign-out-btn').on('click', signOut)

    var dialogControl = dialog.displayDialog($element, keepAliveAndClose)

    cleanupFunctions.push(function () {
      dialogControl.closeDialog()
    })

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
        message = counter + ' second' + (counter !== 1 ? 's' : '')
      } else {
        var newCounter = Math.ceil(counter / 60)
        var minutesMessage = ' minutes'
        if (newCounter === 1) {
          minutesMessage = ' minute'
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
    $.get(settings.keep_alive_url, function () {
    })
  }

  function signOut() {
    redirectHelper.redirectToUrl(settings.logout_url)
  }

  function cleanup() {
    while (cleanupFunctions.length > 0) {
      var fn = cleanupFunctions.shift()
      fn()
    }
  }
}
