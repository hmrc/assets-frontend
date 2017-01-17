var Mdtpdf = require('mdtpdf')
var base64 = require('base64').Base64
var govuk = require('./GOVUK_helpers.js')

module.exports = function () {
  var mdtpdfCookie = govuk.getCookie('mdtpdf')
  var fingerprint = new Mdtpdf({ screen_resolution: true, ie_activex: true })
  var generatedFingerPrint = fingerprint.get()
  var encodedFingerPrint = null
  var hasSessionFingerPrint

  var curDomain = window.location.hostname.split('.')
  curDomain.shift()

  var cookieDomain = (curDomain.length > 1) ? '.' + curDomain.join('.') : false

  if (generatedFingerPrint) {
    encodedFingerPrint = base64.btoa(generatedFingerPrint)
  }

  hasSessionFingerPrint = mdtpdfCookie && base64.atob(mdtpdfCookie).version

  // IE7: Do not set the cookie when the encoded fingerprint is empty in IE7
  // to prevent the session being cleared by the server
  if (!hasSessionFingerPrint && encodedFingerPrint) {
    govuk.setCookie('mdtpdf', encodedFingerPrint, null, cookieDomain)
  }

  window.GOVUK.aidCallback = function (json) {
    // only part of the fingerprint is included to keep the cookie small
    var prop
    var values = {}
    var valuesText = ''
    var properties = [
      'browserAcceptHeaders',
      'browserHasIncognitoEnabled',
      'touch',
      'userAgent',
      'hardwareConcurrency',
      'javaEnabled',
      'language',
      'maxTouchPoints',
      'mimeTypes',
      'resolution',
      'batteryLevel',
      'localAddress'
    ]
    var webTraffic = [
      'isBot',
      'isIncognito',
      'isProxied',
      'isTor'
    ]

    for (var i = 0; i < properties.length; i++) {
      prop = properties[i]

      if (json.device.fingerprint[prop]) {
        values[prop] = json.device.fingerprint[prop]
      }
    }

    for (i = 0; i < webTraffic.length; i++) {
      prop = webTraffic[i]

      if (json.webTraffic[prop]) {
        values[prop] = json.webTraffic[prop]
      }
    }

    values.version = 2
    values.type = json.device.type

    valuesText = JSON.stringify(values)
    valuesText = '{"aID":"' + json.device.ID + '",' + valuesText.substring(1) // ensures aID is written first
    govuk.setCookie('mdtpdf', base64.btoa(valuesText), null, cookieDomain)
  }
}
