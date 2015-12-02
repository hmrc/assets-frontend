require('jquery');

module.exports = function () {

  //TODO this nino validator can removed and placed in the html input as attribute pattern="^[A-Za-z]{2}\d{6}[A-Za-z]$"
  jQuery.validator.addMethod('nino', function (value, element) {
    return /^[A-Za-z]{2}\d{6}[A-Za-z]$/.test(value);
  });

  // Use the pattern attribute on your input with a valid regex
  jQuery.validator.addMethod('pattern', function (value, element, pattern) {
    var regex = new RegExp(pattern);
    return regex.test(value);
  });

};
