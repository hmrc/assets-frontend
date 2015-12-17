require('jquery');
var autoComplete = require('./autoComplete.js');

var createAutoCompleteCountries = function () {
  var $chooseCountryAutoCompleteElem = $('.js-choose-country-auto-complete');
  var $countryCodeInput = $('#countryCode');

  autoComplete($chooseCountryAutoCompleteElem.first(), $countryCodeInput);
};

// A factory for creating auto complete suggestions
module.exports = function () {
  createAutoCompleteCountries();
  // add other auto completes here
};
