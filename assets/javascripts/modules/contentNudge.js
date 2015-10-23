require('jquery');

module.exports = function(hash) {
  var targetElement;
  try {
    targetElement = $(hash);
  }
  catch (ex) {
    /* This can only happen if selector from 'hash' is not valid. */
    return;
  }

  if (targetElement.length === 1) {
    if (targetElement.css('top') === 'auto' || '0') {
      $(window).scrollTop(targetElement.offset().top - $('#global-header').height());
    }
  }
};
