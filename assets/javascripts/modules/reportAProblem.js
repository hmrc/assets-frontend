require('jquery');

module.exports = function() {
    var $reportErrorContainer = $('.report-error__content'),
        $submitButton = $reportErrorContainer.find('.button'),
        showErrorMessage = function() {
          var response = "<h2>Sorry, we're unable to receive your message right now.</h2> " +
                          "<p>We have other ways for you to provide feedback on the " +
                          "<a href='/beta-feedback'>support page</a>.</p>";
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
