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

  // Validate separate day - month - year fields as valid date within an optional min / max date range
  jQuery.validator.addMethod('dateGroupValid', function(value, element, options) {
    var dateRange = getDateRange(options.length ? options.split(',') : []),
      idPrefix = '#' + $(element).data('group') + '-',
      $fields = { year: $(idPrefix + 'year'), month: $(idPrefix + 'month'), day: $(idPrefix + 'day') },
      values = { year: parseInt($fields.year.val()), month: parseInt($fields.month.val()) - 1, day: parseInt($fields.day.val()) },
      isValid = getInvalidFields($fields, this, 'dateGroupValid').length === 0,
      date;

    // All other rules are valid on this element (because this method was called), so empty the element's error message(s)
    $('#' + element.id + '-error-message').empty();

    // If the other group elements are valid, create and compare a parse-able date
    if (isValid) {
      values.month = getMonthValue($fields.month.val(), values.month, $fields.month.data('monthStrings'));
      values.year = getYearValue(values.year, dateRange.max, dateRange.min);

      // Check date is parse-able, i.e. a real calendar date (e.g. not 30 Feb 2016 or 31 11 2016)
      if (!(isNaN(values.year) || isNaN(values.month) || isNaN(values.day))) {
        date = new Date(values.year, values.month, values.day);

        isValid = isValidDate(date, values) && inDateRange(date, dateRange);

        // Show/Hide parse error message
        $(idPrefix + 'parse-error-message').toggleClass('hidden', isValid);
      }
    }

    return isValid;
  });

  var getInvalidFields = function ($elements, validator, exceptions) {
    // run each grouped field's rules, ignoring the rules in 'exceptions' string or array
    return $.map($elements, function ($element) {
      return $element;
    }).filter(function ($e) {
      var $validator = validator,
        validRules = $.map($e.rules(), function (v, k) {
          // run all other rules on the group fields, but ignore this rule
          return (exceptions.indexOf(k) > -1) ? '' : $.validator.methods[k].call($validator, $e[0].value, $e[0], v);
        });

      return validRules.indexOf(false) > -1;
    });
  };

  // Compare parsed date values to date field values
  var isValidDate = function (date, dateFields) {
    return date.getFullYear() === dateFields.year && date.getMonth() === dateFields.month && date.getDate() === dateFields.day;
  };

  // Compare date against the min/max range
  var inDateRange = function(date, dateRange) {
    return date < dateRange.max && date > dateRange.min;
  };

  // Get month value from mapping array of string abbreviations or return the value as passed
  var getMonthValue = function($fieldValue, monthValue, monthStrings) {
    var monthMapping = $.inArray($fieldValue.toUpperCase(), monthStrings ? monthStrings.split(',') : []);

    return isNaN(monthValue) && monthMapping > -1 ? monthMapping : monthValue;
  };

  // Get year value if two digits, by comparison to min / max date range, or return the value as passed
  var getYearValue = function(yearValue, maxDate, minDate) {
    var thisMillennium = Math.floor(new Date().getFullYear() / 100) * 100;

    // If two-digit year entered create a four digit year by assuming century intended from min / max range
    if (yearValue < 100) {
      // A 2 digit year will be interpreted as 19th century by JavaScript date
      if (thisMillennium + yearValue <= maxDate.getFullYear()) {
        // ...so assume should be this millennium if year in this millennium LESS THAN OR EQUAL TO the max date year
        return thisMillennium + yearValue;
      }
      else if (thisMillennium - 100 + yearValue >= minDate.getFullYear()) {
        // ...or assume should be last millennium if year in last millennium GREATER THAN OR EQUAL TO the min date year
        return thisMillennium - 100 + yearValue;
      }
    }

    return yearValue;
  };

  // Get date range object {min: '...', max: '...'}, with default "min" value of 'epoch' start and "max" value of tomorrow
  var getDateRange = function(dates) {
    var minValue = dates[0],
      maxValue = dates[1];

    return {
      min: minValue ? new Date(minValue) : new Date(0), // start of epoch
      max: maxValue ? new Date(maxValue) : new Date(new Date().getTime() + 24 * 60 * 60 * 1000) // tomorrow
    };
  };
};

