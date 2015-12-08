  module.exports = function() {
    var bannerId = $('.attorneyBanner').attr('id'),
      topOffset = 0;

    if (bannerId) {
      topOffset = $('#' + bannerId).parent().height();
    }

    $('.error-summary a').on('click', function(e) {
      e.preventDefault();
      var focusId = $(this).attr('data-focuses'),
        inputToFocus = $('[id=\'' + focusId + '\']'),
        inputTagName = inputToFocus.prop("tagName").toLowerCase(),
        nodeToScrollTo = inputToFocus;

      if (["input", "select", "button"].indexOf(inputTagName) !== -1) {
        nodeToScrollTo = inputToFocus.parent();
      }

      $('html, body').animate({
        scrollTop: nodeToScrollTo.offset().top - topOffset
      }, 500);

      nodeToScrollTo.find(':input').first().focus();
    });
  };

