require('jquery');
var autoComplete = require('./autoComplete.js');

var createAutoCompleteCountries = function () {
  var $chooseCountryAutoCompleteElem = $('.js-choose-country-auto-complete');
  var $countryCodeInput = $('#countryCode');
  var $targets = $chooseCountryAutoCompleteElem.first().data('targets') ? $chooseCountryAutoCompleteElem.first().data('targets') : $countryCodeInput;
  var suggestionDisplayTemplate = function (title, value) {
    return title + ' (+' + value + ')';
  };

  if ($chooseCountryAutoCompleteElem.length && countries) {
    autoComplete($chooseCountryAutoCompleteElem.first(), countries, $targets, suggestionDisplayTemplate);
  }
};

module.exports = function () {
  createAutoCompleteCountries();
  // add other auto completes here
};
