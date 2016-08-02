  module.exports = function() {
    var bannerId = $('.attorneyBanner').attr('id'),
      topOffset = 0;

    if (bannerId) {
      topOffset = $('#' + bannerId).parent().height();
    }

    $('.error-summary a').on('click', function(e) {
      var $this = $(this);
      var focusId = $this.attr('data-focuses');
      if (!focusId) {
        focusId = $this.attr("href") || "";
        if (focusId.indexOf("#") !== 0)
          return;
      }
      else {
        focusId = "#" + focusId;
      }

      var inputToFocus = $(focusId);
      if (!inputToFocus.length)
        return;

      e.preventDefault();

      var inputTagName = inputToFocus.prop("tagName").toLowerCase(),
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

