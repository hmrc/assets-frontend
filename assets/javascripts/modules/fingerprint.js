var Mdtpdf = require('mdtpdf'),
  govuk = require('./GOVUK_helpers.js'),
  base64 = require('base64').Base64;

module.exports = function () {
  // TODO: obscure all references to fingerprint
  var fingerprint = new Mdtpdf({
      screen_resolution: true,
      ie_activex: true
    }),
    mdtpdfCookie = govuk.getCookie("mdtpdf"),
    encodedFingerPrint = base64.btoa(fingerprint.get());

  // IE7: Do not set the cookie when the encoded fingerprint is empty in IE7
  // to prevent the session being cleared by the server
  if (!mdtpdfCookie && encodedFingerPrint) {
    govuk.setCookie("mdtpdf", encodedFingerPrint, 7300);
  }
};
