require('jquery');

module.exports = function () {

  //TODO this nino validator can removed and placed in the html input as attribute pattern="^[A-Za-z]{2}\d{6}[A-Za-z]$"
  jQuery.validator.addMethod('nino', function (value, element) {
    return /^[A-Za-z]{2}\d{6}[A-Za-z]$/.test(value);
  });

  // Check if value of input is correctly contained in suggestion data
  jQuery.validator.addMethod('suggestion', function (value, element) {
    var suggestions;
    var validSuggestion = false;

    try {
      suggestions = JSON.parse($('#suggestions').html())
    } catch (e) {
      //TODO add reporting?
    }

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

  // Test required number of check-able elements is correct  
  jQuery.validator.addMethod("require_from_group", function(value, element, params) {
    var options = params.replace(/\s*,\s*/g, ',').split(','),
      $fields = $(options[1], element.form),
      $fieldsFirst = $fields.eq(0),
      validator = $fieldsFirst.data("validator_require_group") ? $fieldsFirst.data("validator_require_group") : $.extend({}, this);

    var isValid = $fields.filter(function() {
        return $(this).is(':checked');
      }).length === Number(options[0]);

    // Store cloned validator for future validation
    $fieldsFirst.data("validator_require_group", validator);

    return isValid;
  });
};
