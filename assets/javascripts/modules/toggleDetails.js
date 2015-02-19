/**
 * Toggle Details Module
 *
 * The same behaviour as Details/Summary tags but allows for more markup flexibility
 * (Initially required for YTA-628, used in last login section of YTA)
 *
 * Usage:
 *
 *  Place attribute "data-toggle-details" on toggle link or a link's container
 *  The value of this attribute must be the class of the target container to show/hide
 *
 *  <div data-toggle-details="my-target-container">
 *      <a href="#">Toggle Link</a>
 *  </div>
 *
 *  <div class="my-target-container">
 *      <a href="#" class="minimise">Minimise</a>
 *      <p>Content</p>
 *  </div>
 *
 **/

module.exports = function() {

  var visuallyHidden = 'visuallyhidden';

  // for each toggle link in the pge
  $('[data-toggle-details]').each(function() {

    var $linkContainer = $(this),
        $link,
        $container;

    // link is either this element or the anchor inside it
    $link = $linkContainer.is('a') ? $linkContainer : $linkContainer.find('a');

    // target container is the class specified in link's data attribute
    $container = $('.' + $linkContainer.data('toggle-details'));

    // container should be hidden on page load
    $container.addClass(visuallyHidden);

    // bind toggle link click
    $link.bind("click", function(e) {
      toggleClick(e);
    });

    //// show minimise link (hidden for non-JS) and bind  click
    $container.find('.minimise').removeClass('js-hidden').bind("click", function(e) {
      toggleClick(e);
    });

    function toggleClick(e) {

     // console.log("toggleClick, this = " + this);

      e.preventDefault();

      $container.toggleClass(visuallyHidden);

      $linkContainer.toggleClass(visuallyHidden);

    }

  });

};

