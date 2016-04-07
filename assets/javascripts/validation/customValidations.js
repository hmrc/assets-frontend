require('jquery');

module.exports = function () {

  //TODO this nino validator can removed and placed in the html input as attribute pattern="^[A-Za-z]{2}\d{6}[A-Za-z]$"
  jQuery.validator.addMethod('nino', function (value, element) {
    return /^[A-Za-z]{2}\d{6}[A-Za-z]$/.test(value);
  });

  // Check if value of input is correctly contained in suggestion data
  jQuery.validator.addMethod('suggestion', function (value, element) {
    var suggestions = window[element.getAttribute('data-suggestions')];
    var validSuggestion = false;

    $(suggestions).each(function (index, suggestion) {
        if (value.toLowerCase() === suggestion.title.toLowerCase() || value === suggestion.value) {
          validSuggestion = true;
          return false;
        }
    });

    return validSuggestion;
  });

  // Use the pattern attribute on your input with a valid regex
  jQuery.validator.addMethod('pattern', function (value, element, pattern) {
    var dataAttributeFlag = element.getAttribute('data-pattern-flags');
    var flag = dataAttributeFlag || '';
    var regex = new RegExp(pattern, flag);

    return regex.test(value);
  });
  
};
