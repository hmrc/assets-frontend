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

  function init() {
    setupDialogTimer()
  }

  function setupDialogTimer() {
    settings.signout_time = Date.now() + settings.timeout * 1000
    timeout = window.setTimeout(function () {
      setupDialog()
    }, ((settings.timeout) - (settings.countdown)) * 1000)
  }

  function setupDialog() {
    var $element = $('<div id="timeout-dialog" class="timeout-dialog" role="dialog" aria-labelledby="timeout-message" tabindex=-1 aria-live="polite">' +
      '<h1 class="heading-medium push--top">' + settings.title + '</h1>' +
      '<p id="timeout-message" role="text">' + settings.message + ' <span id="timeout-countdown" class="countdown"></span>' + '.</p>' +
      '<button id="timeout-keep-signin-btn" class="button">' + settings.keep_alive_button_text + '</button>' +
      '<a id="timeout-sign-out-btn" class="link">' + settings.sign_out_button_text + '</a>' +
      '</div>' +
      '<div id="timeout-overlay" class="timeout-overlay"></div>')

    $element.find('#timeout-keep-signin-btn').on('click', keepAliveAndClose)
    $element.find('#timeout-sign-out-btn').on('click', signOut)

    dialogControl = dialog.displayDialog($element, keepAliveAndClose)

    startCountdown($element.find('#timeout-countdown'))
    escPress = function (event) {
      if (event.keyCode === 27) {
        keepAliveAndClose()
      }
    }

  }

  function destroyDialog() {
    if (dialogControl) {
      dialogControl.closeDialog()
    }
  }

  function updateCountdown(counter, $countdownElement) {
    if (counter < 60) {
      $countdownElement.html(counter + ' second' + (counter !== 1 ? 's' : ''))
    } else {
      var newCounter = Math.ceil(counter / 60)
      var minutesMessage = ' minutes'
      if (newCounter === 1) {
        minutesMessage = ' minute'
      }
      $countdownElement.html(newCounter + minutesMessage)
    }
  }

  function startCountdown($countdownElement) {
    function recalculateCount() {
      return Math.floor((settings.signout_time - Date.now()) / 1000)
    }

    updateCountdown(recalculateCount(), $countdownElement)
    countdown = window.setInterval(function () {
      var counter = recalculateCount()
      updateCountdown(counter, $countdownElement)
      if (counter <= 0) {
        signOut()
      }
    }, 1000)
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
    destroyDialog()
  }


  init()
  return {cleanup: cleanup}
}
