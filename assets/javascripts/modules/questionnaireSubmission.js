// TODO: find a way to remove duplication in validation
GOVUK.questionnaireSubmission = function () {
  GOVUK.questionnaireSubmission = function () {
    var $form = $('.questionnaire form');
    $form.parents('.questionnaire').toggleClass('js-hidden');

    $.ajax({
      type: "POST",
      url: $form.attr("action"),
      data: $form.serialize()
    });
  };
};