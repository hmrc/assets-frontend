require('jquery');

module.exports = function() {

  jQuery.validator.addMethod('nino', function(value, element) {
    return /^[A-Z]{2}\d{6}[A-Z]$/.test(value);
  });

  var $riskTriageForm = $('.form--risk-triage'),
      $userDetailsForm = $('.ca-user-details-form');

  if ($riskTriageForm) {
    $riskTriageForm.validate({
      onkeyup: false,
      onclick: false,
      onfocusout: false,
      rules: {
        risk_triage_question: {
          minlength: 4,
          maxlength: 4,
          number: true,
          required: true
        }
      },

      errorPlacement: function(error, element) {
        // error messages shown by revealing hidden content in markup
      },

      highlight: function(element) {
        $(element).parent().addClass('form-field--error');
        $(element).closest('.client-error-notification').parent().addClass('error');
      },

      //When invalid submission, re-enable the submit button
      invalidHandler: function() {
        $riskTriageForm.find('.button[type=submit]').prop('disabled', false);
      },

      submitHandler: function(form) {
        form.submit();
      }

    });
  }

  if ($userDetailsForm) {
    $userDetailsForm.validate({
      onkeyup: false,
      onclick: false,
      onfocusout: false,
      groups: {
        dateOfBirth: 'dob.day dob.month dob.year'
      },
      rules: {
        fname: {
          required: true
        },
        lname: {
          required: true
        },
        'nino.nino': {
          nino: true,
          required: true
        },
        'dob.day': {
          required: true,
          number: true,
          minlength: 1,
          maxlength: 2,
          range: [1, 31]
        },
        'dob.month': {
          required: true,
          number: true,
          minlength: 1,
          maxlength: 2,
          range: [1, 12]
        },
        'dob.year': {
          required: true,
          number: true,
          minlength: 4,
          maxlength: 4,
          min: 1900
        }
      },

      errorPlacement: function(error, element) {
        // error messages shown by revealing hidden content in markup
      },

      highlight: function(element) {
        if (/^dob\./.test($(element).attr('name'))) {
          $('#dob').addClass('form-field--error');
          $(element).addClass('risk-date-error');
        } else {
          $(element).parent().addClass('form-field--error');
        }

        $(element).closest('.client-error-notification').parent().addClass('error');
      },

      unhighlight: function(element) {
        if (/^dob\./.test($(element).attr('name'))) {
          $(element).removeClass('risk-date-error');
          if ($('.risk-date-error').length === 0) {
            // only remove error marker from DOB group if no other date field errors
            $('#dob').removeClass('form-field--error');
          }
        } else {
          $(element).parent().removeClass('form-field--error');
        }

        $(element).closest('.client-error-notification').parent().removeClass('error');
      },

      //When invalid submission, re-enable the submit button
      invalidHandler: function() {
        $userDetailsForm.find('.button[type=submit]').prop('disabled', false);
      },

      submitHandler: function(form) {
        form.submit();
      }

    });
  }
};
