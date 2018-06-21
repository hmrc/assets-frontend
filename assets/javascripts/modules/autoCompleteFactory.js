/* eslint-env jquery */
/* global countries */

require('jquery')

var autoComplete = require('./autoComplete.js')

var createAutoCompleteCountries = function () {
  var $chooseCountryAutoCompleteElem = $('.js-choose-country-auto-complete')
  var $countryCodeInput = $('#countryCode')
  var suggestionDisplayTemplate = function (title, value) {
    return title + ' (+' + value + ')'
  }

  if ($chooseCountryAutoCompleteElem.length && countries) {
    autoComplete($chooseCountryAutoCompleteElem.first(), countries, $countryCodeInput, suggestionDisplayTemplate)
  }
}

var createAutoComplete = function () {
  // we do not use a suggestionDisplayTemplate in this default
  // implementation until work can be done to make it configurable

  autoComplete($('.js-hmrc-auto-complete').first(), null, null, null)
}

module.exports = function () {
  createAutoCompleteCountries()
  createAutoComplete()
}
