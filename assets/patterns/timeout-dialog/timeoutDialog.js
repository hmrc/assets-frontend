/* eslint-env jquery */

require('jquery')
var dialog = require('./dialog.js')
var redirectHelper = require('./redirectHelper.js')

Date.now = Date.now || function () {
  return +new Date()
}

module.exports = function (options) {
  var settings = {
    timeout: 900,
    countdown: 120,
    title: 'You’re about to be signed out',
    message: 'For security reasons, you will be signed out of this service in',
    keep_alive_url: '/keep-alive',
    logout_url: '/sign-out',
    keep_alive_button_text: 'Stay signed in',
    sign_out_button_text: 'Sign out'
  }

  $.extend(settings, options)

  var dialogControl
  var timeout
  var countdown

  function setupDialogTimer() {
    settings.signout_time = Date.now() + settings.timeout * 1000
    timeout = window.setTimeout(function () {
      setupDialog()
    }, ((settings.timeout) - (settings.countdown)) * 1000)
  }

  function setupDialog() {
    var $element = $('<div>')
      .append($('<h1 class="heading-medium push--top">').text(settings.title))
      .append($('<p id="timeout-message" role="text">').text(settings.message)
        .append($('<span id="timeout-countdown" class="countdown"></span>'))
        .append('.'))
      .append($('<button id="timeout-keep-signin-btn" class="button">').text(settings.keep_alive_button_text))
      .append($('<a id="timeout-sign-out-btn" class="link">').text(settings.sign_out_button_text))

    $element.find('#timeout-keep-signin-btn').on('click', keepAliveAndClose)
    $element.find('#timeout-sign-out-btn').on('click', signOut)

    dialogControl = dialog.displayDialog($element, keepAliveAndClose)

    startCountdown($element.find('#timeout-countdown'))
  }

  function startCountdown($countdownElement) {
    function updateCountdown(counter, $countdownElement) {
      var message
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
      $countdownElement.text(' ' + message)
    }

    function recalculateCount() {
      return Math.floor((settings.signout_time - Date.now()) / 1000)
    }

    function runUpdate() {
      var counter = recalculateCount()
      updateCountdown(counter, $countdownElement)
      if (counter <= 0) {
        signOut()
      }
    }

    countdown = window.setInterval(runUpdate, 1000)
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
    if (timeout) {
      window.clearTimeout(timeout)
    }
    if (countdown) {
      window.clearInterval(countdown)
    }
    if (dialogControl) {
      dialogControl.closeDialog()
    }
  }

  setupDialogTimer()

  return {cleanup: cleanup}
}
