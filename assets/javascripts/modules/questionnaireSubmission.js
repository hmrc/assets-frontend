GOVUK.questionnaireSubmission = function () {
	var $form = $('.questionnaire form');

	$form.submit( function() {
		$.ajax({
		  type: "POST",
		  url: $form.attr("action"),
		  data: $form.serialize()
		});
		$form.parents('.questionnaire').toggleClass('js-hidden');	
	}); 
};
