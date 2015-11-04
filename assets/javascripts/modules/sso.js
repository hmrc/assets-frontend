require('jquery');

/**
 * SSO encryption
 * @returns {{init: Function}}
 */
module.exports = function () {
  'use strict';

  var setSSOLinks = require('./SSO_links.js');

  var ssoPageRedirect = function () {
    var performLinkDefaultBehaviour;
    var redirectSSoPage = $('.js-sso-page-redirect').get(0);

    if (redirectSSoPage) {
      performLinkDefaultBehaviour = setSSOLinks(redirectSSoPage, window.ssoUrl, window.ssoMethod);

      if (performLinkDefaultBehaviour) {
        window.location.replace(redirectSSoPage.href);
      }
    }
  };

  var addListeners = function () {
    // TODO-rory: fix error thrown when clicking a [data-sso] links
    $(document).on('click', 'a[data-sso]', function (event) {
      return setSSOLinks(event.target, window.ssoUrl, window.ssoMethod);
    });
  };

  var init = function () {
    addListeners();
    ssoPageRedirect();
  };

  return {
    init: init
  };
};
