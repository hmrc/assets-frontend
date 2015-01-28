var Mdtpdf = require('mdtpdf'),
    govuk = require('./GOVUK_helpers.js');

(function() {
  // TODO: obscure all references to fingerprint
  var fingerprint = new Mdtpdf({
      screen_resolution: true
    }),
    encodedFingerPrint = window.btoa(fingerprint.get()),
    mdtpdfCookie = govuk.getCookie("mdtpdf");

  // IE7: Do not set the cookie when the encoded fingerprint is empty in IE7
  // to prevent the session being cleared by the server
  if (!mdtpdfCookie && encodedFingerPrint) {
    govuk.setCookie("mdtpdf", encodedFingerPrint, 7300);
  }
})();
