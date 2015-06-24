  module.exports = function(el) {

    var bannerId = $('.attorneyBanner').attr('id'),
    topOffset;
    if (!bannerId) {
      topOffset = 0;
    } else {
      idOfBanner = $('#' + bannerId);
      topOffset = idOfBanner.parent().height();
    }

    $('.error-summary a').on('click', function(e) {
      e.preventDefault();
      var focusId = $(this).attr('data-focuses'),
      inputToFocus = $('#' + focusId);
      $('html, body').animate({
        scrollTop: inputToFocus.parent().offset().top - topOffset
      }, 500);
      inputToFocus.parent().find(':input').first().focus();
    });
  };

