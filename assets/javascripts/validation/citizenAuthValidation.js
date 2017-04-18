require('jquery');

module.exports = function() {

  var $identityVerificationForm = $('.form-identity-verification-options'), 
    $userDetailsForm = $('.ca-user-details-form'),
    setup = function() {
      if ($identityVerificationForm) {
        // enable elements not to be submitted on form post (i.e., the grouping checkbox which opens group of radio buttons)
        $identityVerificationForm.find('[data-no-submit="true"]')
          .prop('disabled', false)
          .prop('checked', false)
          .closest('label').removeClass('selected');
        
        var toggleTarget = $identityVerificationForm.find('.js-toggle').data('target');
        $('#' + toggleTarget).addClass('hidden').removeClass('js-hidden');
        
        $identityVerificationForm.validate({
          onkeyup: false,
          onclick: false,
          onfocusout: false,
          onsubmit: true,

          errorPlacement: function ($error, $element) {
            // show summary &  ignore error text (message is not passed in jQuery.validator.addMethod("require_from_group", fn)
            $('.error-summary', $identityVerificationForm)
              .addClass('error-summary--show')
              .removeClass('visuallyhidden')
              .find('.js-error-summary-messages')
              .append('<li>' + $element.data('msg-required') + '</li>');
          },

          highlight: function (element) {
            // show inline error
            $(element).closest('.form-field-group').addClass('form-field-group--error');
          },
          
          invalidHandler: function(evt, validator) {
            // remove summary errors and hide summary
            $('.error-summary', $identityVerificationForm)
              .addClass('visuallyhidden')
              .removeClass('error-summary--show')
              .find('.js-error-summary-messages').empty();

            // hide inline error
            $identityVerificationForm.find('.form-field-group').removeClass('form-field-group--error')
            
            // When invalid submission, re-enable the submit button
            $identityVerificationForm.find('.button[type=submit]').prop('disabled', false);
            
            // and any elements set to disabled in validator method (i.e., the grouping checkbox which opens a group of radio buttons)
            $identityVerificationForm.find('[data-no-submit="true"]').prop('disabled', false);
          },

          submitHandler: function(form) {
            // disable element so value isn't passed in form (i.e., the grouping checkbox which opens a group of radio buttons)
            $identityVerificationForm.find('[data-no-submit="true"]').prop('disabled', true);
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
