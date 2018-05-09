/* eslint-env jquery */

require('jquery')

module.exports = function (options) {
  var config = $.extend({
    timeout: 900,
    count: 120,
    title: 'You’re about to be signed out',
    message: 'For security reasons, you will be signed out of this service in 2 minutes',
    keep_alive_button_text: 'Stay signed in',
    sign_out_button_text: 'Sign out'
  }, options)
  var $modal = $('<div>')
  var waitForStartOfCountdown

  function clearModal() {
    $modal.remove()
    if (waitForStartOfCountdown) {
      window.clearTimeout(waitForStartOfCountdown)
    }
    // $(document).off('keydown', escapeKeyListener)
  }

  function escapeKeyListener(e) {
    if (e.keyCode === 27) {
      clearModal()
    }
  }

  function createModal() {
    $modal = $('<div id="timeout-dialog"></div>')
      .append($('<h1>').text(config.title))
      .append($('<p id="timeout-message" role="text">').text(config.message))
      .append($('<button id="timeout-keep-signin-btn" class="button">').text(config.keep_alive_button_text))
      .append($('<button id="timeout-sign-out-btn" class="button">').text(config.sign_out_button_text))
      .appendTo($('body'))

    $(document).on('keydown', escapeKeyListener)
  }

  waitForStartOfCountdown = setTimeout(function () {
    createModal();
  }, (config.timeout - config.count) * 10)

  return {
    cleanup: clearModal
  }
}
