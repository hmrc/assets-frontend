require(['mdtpdf'], function() {

  // TODO: obscure all references to fingerprint
  var fingerprint = new window.Mdtpdf({
      screen_resolution: true
    }),
    encodedFingerPrint = window.btoa(fingerprint.get()),
    mdtpdfCookie = window.GOVUK.getCookie("mdtpdf");

  // IE7: Do not set the cookie when the encoded fingerprint is empty in IE7
  // to prevent the session being cleared by the server
  if (!mdtpdfCookie && encodedFingerPrint) {
    window.GOVUK.setCookie("mdtpdf", encodedFingerPrint, 7300);
  }

});
