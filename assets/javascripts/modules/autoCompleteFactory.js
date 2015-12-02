require('jquery');
var autoComplete = require('./autoComplete.js');

// A factory for creating auto complete suggestions
var init = function () {
  var $chooseCountryAutoCompleteElem = $('.js-choose-country-auto-complete');
  var $countryCodeInput = $('#countryCode');

  autoComplete($chooseCountryAutoCompleteElem.first(), $countryCodeInput);
};

module.exports = function () {
  return {
    init: init
  };
};
