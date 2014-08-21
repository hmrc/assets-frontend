define(['base64', 'mdtpdf', 'stageprompt'], function(B64, Mdtpdf, GOVUK) {

  // TODO: obscure all references to fingerprint
  var fingerprint = new Mdtpdf({
      screen_resolution: true
    }),
    encodedFingerPrint = B64.encode(fingerprint.get()),
    mdtpdfCookie = GOVUK.getCookie("mdtpdf");

  // IE7: Do not set the cookie when the encoded fingerprint is empty in IE7
  // to prevent the session being cleared by the server
  if (!mdtpdfCookie && encodedFingerPrint) {
    GOVUK.setCookie("mdtpdf", encodedFingerPrint, 7300);
  }

});
