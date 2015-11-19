/**
 * Toggle Details Module
 *
 * The same behaviour as Details/Summary tags but allows for more markup flexibility
 * (Initially required for YTA-628, used in last login section of YTA)
 *
 * Usage:
 *
 *  Place attribute 'data-toggle-details' on toggle link or a link's container
 *  The value of this attribute must be the class of the target container to show/hide
 *  n.b. put the js-hidden class on the container element to avoid it being shown briefly before
 *   the Javascript hides it on page load. Also add class js-visible to the toggle link element if you
 *   want non-js behaviour where the container is open with no toggle link shown.
 *
 *  <div data-toggle-details="my-target-container" class="js-visible">
 *      <a href="#">Toggle Link</a>
 *  </div>
 *
 *  <div class="my-target-container js-hidden">
 *      <a href="#" class="minimise">Minimise</a>
 *      <p>Content</p>
 *  </div>
 *
 **/

module.exports = function() {

  var hidden = 'js-hidden';

  // for each toggle link in the pge
  $('[data-toggle-details]').each(function() {

    var $link,
        $container,
        $linkContainer = $(this);

    // link is either this element or the anchor inside it
    $link = $linkContainer.is('a') ? $linkContainer : $linkContainer.find('a');

    // target container is the class specified in link's data attribute
    $container = $('.' + $linkContainer.data('toggle-details'));

    // container should be hidden on page load
    $container.addClass(hidden);

    // bind toggle link click
    $link.bind('click', function(e) {
      toggleClick(e);
    });

    //// show minimise link (hidden for non-JS) and bind  click
    $container.find('.minimise').bind('click', function(e) {
      toggleClick(e);
    });

    function toggleClick(e) {

      e.preventDefault();

      $container.toggleClass(hidden);

      $linkContainer.toggleClass(hidden);

    }

  });

};

