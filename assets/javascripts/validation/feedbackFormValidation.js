require('jquery');

module.exports = function() {

  var reportAProblem = require('../modules/reportAProblem.js'),
    $errorReportForm = $('.report-error__content form'),
    setup = function() {

      //Initialise validation for the feedback form
      $errorReportForm.validate({
        errorClass: 'error-notification',
        errorPlacement: function(error, element) {
          error.insertBefore(element);
        },

        //Highlight invalid input
        highlight: function(element, errorClass) {
          $(element).parent().addClass('form-field--error');

          //TODO: temp fix for form submission bug. Report a problem needs a rewrite
          $errorReportForm.find('.button').prop('disabled', false);
        },

        //Unhighlight valid input
        unhighlight: function(element, errorClass) {
          $(element).parent().removeClass('form-field--error');
        },

        //When all fields are valid perform AJAX call
        submitHandler: function(form) {
          reportAProblem().submitForm(form, $errorReportForm.attr('action'));
        }
      });

    };

  return {
    setup: setup
  };

};
