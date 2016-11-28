require('jquery');
var autoComplete = require('./autoComplete.js');

var createAutoCompleteCountries = function () {

  var $chooseCountryAutoCompleteElem = $('.js-choose-country-auto-complete');
    var $countryCodeInput = $('#countryCode');
    var suggestionDisplayTemplate = function (title, value) {
      return title + ' (+' + value + ')';
    };

    if ($chooseCountryAutoCompleteElem.length && countries) {
      autoComplete($chooseCountryAutoCompleteElem.first(), countries, $countryCodeInput, suggestionDisplayTemplate);
    }

};

var createAutoComplete = function () {
  // additional work required to extract the template to a configurable option
  var suggestionDisplayTemplate = function (title, value) {
    return title + ' (+' + value + ')';
  };
  autoComplete($('.js-hmrc-auto-complete').first(), null, null, suggestionDisplayTemplate);
};

module.exports = function () {
  createAutoCompleteCountries();
  createAutoComplete();
};
