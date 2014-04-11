// TODO: find a way to remove duplication in validation
GOVUK.questionnaireSubmission = function () {
  var $form = $('.questionnaire form');

  $form.validate({
    rules: {
        'otherEnrolledTaxes': {
          maxlength: 2500
        },
        'saEmailRemindersWhyNot': {
          maxlength: 2500
        },
        'signUpImprovementSuggestions': {
          maxlength: 2500
        },
        'notEasyExplanation': {
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
        'otherEnrolledTaxes': {
          maxlength: '2500 characters maximum'
        },
        'saEmailRemindersWhyNot': {
          maxlength: '2500 characters maximum'
        },
        'notEasyExplanation': {
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
        highlight: function (element, errorClass) {
          if($(element).attr('type') != "radio") {
            $(element).parents('fieldset').addClass('form-field--error');
          }
        },
        //When invalid submission, re-enable the submit button
        invalidHandler: function(){
            $form.find('button').prop("disabled", false);
        },
        submitHandler: function(form) {
            // do other things for a valid form
            $(form).find('.form-field--error').removeClass('form-field--error');
            $(form).parents('.questionnaire').toggleClass('js-hidden');

            $.ajax({
              type: "POST",
              url: $(form).attr("action"),
              data: $(form).serialize()
            });

          }
      });
};