require('jquery');

module.exports = function() {

  jQuery.validator.addMethod('nino', function(value, element) {
    return /^[A-Za-z]{2}\d{6}[A-Za-z]$/.test(value);
  });

};
