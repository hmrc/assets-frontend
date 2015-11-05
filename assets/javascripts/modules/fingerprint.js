var Mdtpdf = require('mdtpdf'),
    base64 = require('base64').Base64,
    govuk  = require('./GOVUK_helpers.js');

module.exports = function() {
  // TODO: obscure all references to fingerprint
  var curDomain = window.location.hostname.split('.');
  curDomain.shift();
  var cookieDomain = (curDomain.length > 1) ? '.' + curDomain.join('.') : false;
  var fingerprint = new Mdtpdf({
        screen_resolution: true,
        ie_activex: true
      });
  var mdtpdfCookie = govuk.getCookie('mdtpdf');
  var generatedFingerPrint = fingerprint.get();
  var encodedFingerPrint = null;
  if (generatedFingerPrint) {
      encodedFingerPrint = base64.btoa(generatedFingerPrint);
  }
  var hasSessionFingerPrint = mdtpdfCookie && base64.atob(mdtpdfCookie).version;

  // IE7: Do not set the cookie when the encoded fingerprint is empty in IE7
  // to prevent the session being cleared by the server
  if (!hasSessionFingerPrint && encodedFingerPrint) {
    govuk.setCookie('mdtpdf', encodedFingerPrint, null, cookieDomain);
  }

  window.GOVUK.aidCallback = function(json) {
    //only part of the fingerprint is included to keep the cookie small
    var properties = [ "browserAcceptHeaders", "browserHasIncognitoEnabled", "touch", "userAgent",
      "hardwareConcurrency", "javaEnabled", "language", "maxTouchPoints", "mimeTypes", "resolution",
      "batteryLevel", "localAddress" ];

    var values = {};
    for (var i = 0; i < properties.length; i++) {
      values[properties[i]] = json.device.fingerprint[properties[i]];
    }
    values.version = 2;
    values.type = json.device.type;
    values.isBot = json.webTraffic.isBot;
    values.isIncognito = json.webTraffic.isIncognito;
    values.isProxied = json.webTraffic.isProxied;
    values.isTor = json.webTraffic.isTor;

    var valuesText = JSON.stringify(values);
    valuesText = '{"aID":"' + json.device.ID + '",' + valuesText.substring(1); //ensures aID is written first
    govuk.setCookie('mdtpdf', base64.btoa(valuesText), null, cookieDomain);
  };

};
