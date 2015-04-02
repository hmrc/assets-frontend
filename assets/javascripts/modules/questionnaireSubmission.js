require('jquery');

module.exports = function() {
  var $form = $('.questionnaire form');

  $form.submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: $form.serialize()
    });
    $form.parents('.questionnaire').toggleClass('js-hidden');
  });
};
