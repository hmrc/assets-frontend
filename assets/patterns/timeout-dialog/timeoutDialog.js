/* eslint-env jquery */

require('jquery')

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
    sign_out_button_text: 'Sign out',
    redirector: function (url) {
      // TODO: Look for a sensible way to test redirects
      window.location.href = url
    }
  }

  $.extend(settings, options)

  var TimeoutDialog = {
    init: function () {
      this.setupDialogTimer()
    },

    setupDialogTimer: function () {
      var self = this
      settings.signout_time = Date.now() + settings.timeout * 1000
      self.timeout = window.setTimeout(function () {
        self.setupDialog()
      }, ((settings.timeout) - (settings.countdown)) * 1000)
    },

    setupDialog: function () {
      var self = this
      $('html').addClass('noScroll')
      $('<div id="timeout-dialog" class="timeout-dialog" role="dialog" aria-labelledby="timeout-message" tabindex=-1 aria-live="polite">' +
        '<h1 class="heading-medium push--top">' + settings.title + '</h1>' +
        '<p id="timeout-message" role="text">' + settings.message + ' <span id="timeout-countdown" class="countdown"></span>' + '.</p>' +
        '<button id="timeout-keep-signin-btn" class="button">' + settings.keep_alive_button_text + '</button>' +
        '<a id="timeout-sign-out-btn" class="link">' + settings.sign_out_button_text + '</a>' +
        '</div>' +
        '<div id="timeout-overlay" class="timeout-overlay"></div>')
        .appendTo('body')


      self.startCountdown(settings.countdown)
      self.escPress = function (event) {
        if (event.keyCode === 27) {
          self.keepAliveAndClose()
        }
      }

      self.closeDialog = function () {
        self.keepAliveAndClose()
      }

      $(document).on('keydown', self.escPress)
      $('#timeout-keep-signin-btn').on('click', self.closeDialog)
      $('#timeout-sign-out-btn').on('click', self.signOut)
    },

    destroyDialog: function () {
      $('#timeout-dialog').remove()
      $('html').removeClass('noScroll')
    },

    updateUI: function (counter) {
      if (counter < 60) {
        $('#timeout-countdown').html(counter + ' second' + (counter !== 1 ? 's' : ''))
      } else {
        var newCounter = Math.ceil(counter / 60)
        var minutesMessage = ' minutes'
        if (newCounter === 1) {
          minutesMessage = ' minute'
        }
        $('#timeout-countdown').html(newCounter + minutesMessage)
      }
    },

    startCountdown: function () {
      function recalculateCount() {
        return Math.floor((settings.signout_time - Date.now()) / 1000)
      }

      var self = this
      self.updateUI(recalculateCount())
      self.countdown = window.setInterval(function () {
        var counter = recalculateCount()
        self.updateUI(counter)
        if (counter <= 0) {
          self.signOut()
        }
      }, 1000)
    },

    keepAliveAndClose: function () {
      this.cleanup()
      this.setupDialogTimer()
      $.get(settings.keep_alive_url, function () {
      })
    },

    signOut: function () {
      settings.redirector(settings.logout_url)
    },
    cleanup: function () {
      if (TimeoutDialog.timeout) {
        window.clearTimeout(TimeoutDialog.timeout)
      }
      $(document).off('keydown', self.escPress)
      if (TimeoutDialog.countdown) {
        window.clearInterval(TimeoutDialog.countdown)
      }
      TimeoutDialog.destroyDialog()
    }
  }

  TimeoutDialog.init()
  return {cleanup: TimeoutDialog.cleanup}
}
