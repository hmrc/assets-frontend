require('jquery');

module.exports = function() {
  console.log('initialising triage validation');

  var $riskTriageForm = $('.form--risk-triage');

  if ($riskTriageForm) {
    $riskTriageForm.validate({
      onkeyup: false,
      onclick: false,
      onfocusout: false,
      errorClass: 'error-notification',
      rules: {
        risk_triage_question: {
          minlength: 4,
          maxlength: 4,
          number: true,
          required: true
        }
      },
      messages: {
        risk_triage_question: 'We need the last four numbers of your bank or building society account. This should be without any spaces, letters or special characters'
      },

      errorPlacement: function(error, element) {
        error.insertBefore(element);
      },

      highlight: function(element) {
        $(element).parent().addClass('form-field--error');
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
};
