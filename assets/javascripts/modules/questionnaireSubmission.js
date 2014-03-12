GOVUK.questionnaireSubmission = function () {
    var $questionnaire = $('.questionnaire');
    $questionnaire.find('input[type=submit]').on("click", function (e) {
        $(this).parents('.questionnaire').toggleClass('js-hidden');
        e.preventDefault();
        // TODO: make ajax call
    });
};