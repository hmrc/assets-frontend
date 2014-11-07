define(['jquery'], function ($) {
  return function() {
    var $surveyForm = $('#form-end-journey-questionnaire');
    if ($surveyForm) {
      $surveyForm.validate({
        rules: {
          'saEmailRemindersWhyNot': {
            maxlength: 2500
          },
          'signUpImprovementSuggestions': {
            maxlength: 2500
          },
          'visitReasonOther': {
            maxlength: 2500
          },
          'commentForImprovements': {
            maxlength: 2500
          }
        },
        messages: {
          'saEmailRemindersWhyNot': {
            maxlength: '2500 characters maximum'
          },
          'signUpImprovementSuggestions': {
            maxlength: '2500 characters maximum'
          },
          'visitReasonOther': {
            maxlength: '2500 characters maximum'
          },
          'commentForImprovements': {
            maxlength: '2500 characters maximum'
          }
        },
        onfocusout: false,
        onkeyup: false,
        errorClass: 'error-notification',
        errorPlacement: function(error, $element) {
          $element.parents('fieldset').prepend(error);
        },
        //Highlight invalid input
        highlight: function(element, errorClass) {
          if ($(element).attr('type') !== "radio") {
            $(element).parents('fieldset').addClass('form-field--error');
          }
        },
        //When invalid submission, re-enable the submit button
        invalidHandler: function() {
          $surveyForm.find('input[type=submit]').prop("disabled", false);
        },
        submitHandler: function(form) {
          form.submit();
        }
      });
    }
  };
});
