require('jquery');

module.exports = function() {
    var $reportErrorContainer = $('.report-error__content'),
        $submitButton = $reportErrorContainer.find('.button'),
        showErrorMessage = function() {
          var response = "<p>There was a problem sending your query.</p>" +
                         "<p>Please try again later or email " +
                         "<a href='mailto:hmrcsupport@tax.service.gov.uk'>hmrcsupport@tax.service.gov.uk</a> " +
                         "if you need technical help with this website.</p>";
          $reportErrorContainer.html(response);
          enableSubmitButton();
        },
        //TODO: should refactor to use Javascript debounce
        disableSubmitButton = function() {
          $submitButton.prop("disabled", true);
        },
        enableSubmitButton = function() {
          $submitButton.prop("disabled", false);
        },
        showConfirmation = function(data) {
          $reportErrorContainer.html(data.message);
        },
        submit = function(form, url) {
          $.ajax({
            type: "POST",
            url: url,
            datattype: 'json',
            data: $(form).serialize(),
            beforeSend: function() {
              //disable submit button
              disableSubmitButton();
            },
            success: function(data) {
              showConfirmation(data);
            },
            error: function(jqXHR, status) {
              if (status === 'error' || !jqXHR.responseText) {
                showErrorMessage();
              }
            }
          });
        };
    return {
      submitForm: submit
    };
};
