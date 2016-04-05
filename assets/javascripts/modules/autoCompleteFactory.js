require('jquery');
var autoComplete = require('./autoComplete.js');

var createAutoCompleteCountries = function () {
  var $chooseCountryAutoCompleteElem = $('.js-choose-country-auto-complete');
  var $countryCodeInput = $('#countryCode');
  var suggestionDisplayTemplate = function (title, value) {
    return title + ' (+' + value + ')';
  };

  autoComplete($chooseCountryAutoCompleteElem.first(), countries, $countryCodeInput, suggestionDisplayTemplate);
};

module.exports = function () {
  createAutoCompleteCountries();
  // add other auto completes here
};
