var Mdtpdf = require('mdtpdf'),
    base64 = require('base64').Base64,
    govuk  = require('./GOVUK_helpers.js');

module.exports = function() {
  // TODO: obscure all references to fingerprint
  var curDomain,
      cookieDomain,
      fingerprint = new Mdtpdf({
        screen_resolution: true,
        ie_activex: true
      }),
      mdtpdfCookie = govuk.getCookie('mdtpdf'),
      encodedFingerPrint = base64.btoa(fingerprint.get());

  // IE7: Do not set the cookie when the encoded fingerprint is empty in IE7
  // to prevent the session being cleared by the server
  if (!mdtpdfCookie && encodedFingerPrint) {
    curDomain = window.location.hostname.split('.').slice(-3);
    cookieDomain = (curDomain.length > 1) ? '.' + curDomain.join('.') : window.location.hostname;

    govuk.setCookie('mdtpdf', encodedFingerPrint, 7300, cookieDomain);
  }
};
