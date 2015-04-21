  module.exports = function(el) {
    $('.error-summary a').on('click', function(e) {
      e.preventDefault();
      var focusId = $(this).attr('data-focuses'),
      inputToFocus = $('#' + focusId);
      $('html, body').animate({
        scrollTop: inputToFocus.parent().offset().top
      }, 500);
      inputToFocus.parent().find(':input').first().focus();
    });
  };

