/* eslint-env jquery */

require('jquery')

module.exports = function (options) {
  var config = $.extend({
    timeout: 900,
    count: 120
  }, options)
  var $modal = $('<div>');

  function clearModal() {
    $modal.remove()
    // $(document).off('keydown', escapeKeyListener)
  }

  function escapeKeyListener(e) {
    if (e.keyCode === 27) {
      clearModal()
    }
  }

  function createModal() {
    $modal = $('<div id="timeout-dialog"></div>')
      .append($('<h1>').text('You’re about to be signed out'))
      .append($('<p id="timeout-message" role="text">').text('For security reasons, you will be signed out of this service in 2 minutes'))
      .append($('<button id="timeout-keep-signin-btn" class="button">').text('Stay signed in'))
      .append($('<button id="timeout-sign-out-btn" class="button">').text('Sign out'))
      .appendTo($('main#content'))

    $(document).on('keydown', escapeKeyListener)
  }

  setTimeout(function () {
    createModal();
  }, (config.timeout - config.count) * 10)
}
