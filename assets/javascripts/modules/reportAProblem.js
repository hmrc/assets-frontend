// allow the user to report page errors
GOVUK.ReportAProblem = function () {
    var $reportErrorContainer = $('.report-error__content'),
        $submitButton = $reportErrorContainer.find('.button'),
        showErrorMessage = function () {
            var response = "<h2>Sorry, we're unable to receive your message right now.</h2> " +
                "<p>We have other ways for you to provide feedback on the " +
                "<a href='/beta-feedback'>support page</a>.</p>";

            $reportErrorContainer.html(response);
        },
        disableSubmitButton = function () {
            $submitButton.attr("disabled", true);
        },
        enableSubmitButton = function () {
            $submitButton.attr("disabled", false);
        },
        showConfirmation = function (data) {
            $reportErrorContainer.html(data.message);
        },
        submit = function (form, url) {
            $.ajax({
                type: "POST",
                url: url,
                datattype: 'json',
                data: $(form).serialize(),
                success: function (data) {
                    showConfirmation(data);
                },
                error: function (jqXHR, status) {
                    if (status === 'error' || !jqXHR.responseText) {
                        showErrorMessage();
                    }
                }
            });
        };
    return {
        submitForm: submit
    };
}();