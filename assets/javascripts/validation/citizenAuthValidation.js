require('jquery');

module.exports = function() {

  var $identityVerificationForm = $('.form-identity-verification-options'), 
    $userDetailsForm = $('.ca-user-details-form'),
    setup = function() {

      if ($identityVerificationForm) {
        $identityVerificationForm.validate({
          errorPlacement: function(error, element) { },

          highlight: function(element) { },

          invalidHandler: function(evt, validator) {
            //When invalid submission, re-enable the submit button
            $identityVerificationForm.find('.button[type=submit]').prop('disabled', false);
          },

          submitHandler: function(form) { /* for ajax: form.submit(); */ }
        });
        
        $.validator.addMethod("require_from_group", function(value, element, params) {
          var options = params.replace(/\s*,\s*/g, ',').split(','), 
            $fields = $(options[1], element.form),
            $fieldsFirst = $fields.eq(0),
            validator = $fieldsFirst.data("validator_require_group") ? $fieldsFirst.data("validator_require_group") : $.extend({}, this),
            isValid = $fields.filter(function() {return $(this).is(':checked')}).length >= options[0];
              
          // Store cloned validator for future validation
          $fieldsFirst.data("validator_require_group", validator);

          return isValid;
        }, $identityVerificationForm.find('input[data-msg-required]').data('msg-required'));
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

            $(element).closest('.client-validated').addClass('error');
          },

          unhighlight: function(element) {
            if (/^dob\./.test($(element).attr('name'))) {
              $(element).removeClass('risk-date-error');
              if ($('.risk-date-error').length === 0) {
                // only remove error marker from DOB group if no other date field errors
                $('#dob').removeClass('form-field--error');
                $(element).closest('.client-validated').removeClass('error');
              }
            } else {
              $(element).parent().removeClass('form-field--error');
              $(element).closest('.client-validated').removeClass('error');
            }

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

  return {
    setup: setup
  };

};
