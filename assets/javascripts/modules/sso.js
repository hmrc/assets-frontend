/* eslint-env jquery */

require('jquery')

/**
 * SSO encryption
 * @returns {{init: Function}}
 */
module.exports = function () {
  'use strict'

  var setSSOLinks = require('./SSO_links.js')

  var ssoPageRedirect = function () {
    var redirectSSoPage = $('.js-sso-page-redirect').get(0)

    if (redirectSSoPage) {
      setSSOLinks(redirectSSoPage, window.ssoUrl, window.ssoMethod)
    }
  }

  var addListeners = function () {
    // TODO-rory: fix error thrown when clicking a [data-sso] links
    $(document).on('click', '[data-sso]', function (event) {
      return setSSOLinks(event.target, window.ssoUrl, window.ssoMethod)
    })
  }

  var init = function () {
    addListeners()
    ssoPageRedirect()
  }

  return {
    init: init
  }
}
