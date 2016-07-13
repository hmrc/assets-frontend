/**
  ListCollapse

  Expand/collapse list content on smaller breakpoints, remain inline non interactive list at larger breakpoints.

  Mandatory JS hooks:
   * `data-list--collapse-toggle` - list toggle element hook to init ListCollapse click listener

  Mandatory classes:
   * `list--collapse` - placed on the outer container
   * `list__item` - placed on the list items (eg li) in the list.

  Optional Classes:
   * `hide-inline-list--collapse-targets` - placed on the outer container to hide collapse the list by default. This class gets toggled when the toggle click listener fires

  Basic Usage:

  <ul class="list--collapse hide-inline-list--collapse-targets">
      <li class="list__item" data-list--collapse-toggle>
          <span>list toggle</span>
      </li>
      <li class="list__item">
          <a href="#">list item</a>
      </li>
      <li class="list__item">
          <a href="#">another list item</a>
      </li>
  </ul>

  More details on usage can be found in the component library.

 */
module.exports = function() {

  $('.list--collapse').each(function(index, elemnt) {

    var $listHolder = $(this);
    var $listToggle = $listHolder.find('[data-list--collapse-toggle]');

    $listToggle.on('click', listToggleClick);

    function listToggleClick(e) {
      e.preventDefault();

      /*
       * Check to see if the display property of the list toggle element is set to block.
       * If it is then we know that we are on a mobile breakpoint and can continue toggling the 'hide-inline-list--collapse-targets' class on the outer container
       * If the display property is not set to block then we can assume that we are in a larger breakpoint and return out of the funciton without toggling the 'hide-inline-list--collapse-targets' class
      */
      var isListToggleDisplayBlock = $listToggle.css('display') === 'block';

      if (!isListToggleDisplayBlock) {
        return;
      }

      $listHolder.toggleClass('hide-inline-list--collapse-targets');
    }

  });

};
