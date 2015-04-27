require('jquery');

module.exports = function() {

  jQuery.validator.addMethod('nino', function(value, element) {
    return /^[A-Z]{2}\d{6}[A-Z]$/.test(value);
  });

};
