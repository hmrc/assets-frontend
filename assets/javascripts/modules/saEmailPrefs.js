define(['jquery'], function($) {
  return function() {
    var $form = $('#form-submit-email-address'),
      setup = function() {
        if ($('.email-prefs__toggle[value="true"]').attr('checked') === 'checked') {
          $form.find('.connected').removeClass('js-hidden');
        }
        $('.email-prefs__toggle').click(function() {
          if ($(this).val() === "true") {
            $(this).parent().next('fieldset').removeClass('js-hidden');
          } else {
            $(this).parent().prev('fieldset').addClass('js-hidden');
          }
        });

        $form.validate({
          rules: {
            'email.main': {
              email: true,
              required: true,
              maxlength: 320
            },
            'email.confirm': {
              equalTo: '#email\\.main' //the dot needs escaping for it to work in jQuery
            },
            'opt-in': {
              required: true
            },
            'accept-tc': {
              required: true
            }
          },
          messages: {
            'email.main': {
              email: "Enter a valid email address.",
              required: "Enter a valid email address.",
              maxlength: 'The email cannot be longer than 320 characters'
            },
            'email.confirm': {
              equalTo: "Check your email addresses - they don’t match."
            },
            'opt-in': {
              required: "Confirm if you want Self Assessment email reminders"
            }
          },
          onfocusout: false,
          onkeyup: false,

          errorClass: 'error-notification',
          errorPlacement: function(error, $element) {
            if ($element.attr('type') === "radio") {
              $element.parent().nextAll('.email-form-errors').append(error);
            } else {
              $element.parents('fieldset').prepend(error);
            }
          },
          //Highlight invalid input
          highlight: function(element, errorClass) {
            if ($(element).attr('type') !== "radio") {
              $(element).parents('fieldset').addClass('form-field--error');
            }
          },
          //When invalid submission, re-enable the submit button
          invalidHandler: function() {
            $form.find('button').prop("disabled", false);
          },
          submitHandler: function(form) {

            // do other things for a valid form
            $form.find('button').prop("disabled", "disabled");
            $(form).find('.form-field--error').removeClass('form-field--error');
            form.submit();
          }
        });
      };
    return {
      setup: setup
    };
  };
});
