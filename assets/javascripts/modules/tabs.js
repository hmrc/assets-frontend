/**
 * Tabs Module
 * 
 * Usage:

    <div data-tabs>

      <ul>
        <li>
          <a href="#" data-tab-link="1">Tab Link 1</a>
        </li>
        <li>
          <span data-tab-link="2">Tab Link 2</span>
        </li>
        <li>
          <a href="#" data-tab-link="3">Tab Link 3</a>
        </li>
      </ul>

      <ul>
        <li data-tab-content="1">
          <p>Tab Content 1</p>
        </li>
        <li data-tab-content="2">
          <p>Tab Content 2</p>
        </li>
        <li data-tab-content="3">
          <p>Tab Content 3</p>
        </li>
      </ul>

    </div>

 */


module.exports = function() {

  // for each set of tabs in the page
  $('[data-tabs]').each(function() {

    var $tabs = $(this);

    // initial setting of tab content to be visible/hidden
    updateTabContents($tabs);

    // for each tab link
    $tabs.on('click', '[data-tab-link]', function(e) {
      e.preventDefault();
      
      // set correct tab content to be visible
      updateTabContents($tabs, $(this));

      // update state of tab links
      updateTabLinks.call(this, $tabs);

    });

  });

  /**
   * Update visibility of tab contents
   * 
   * @param  {Object} $tabs     jQuery object for tabs container
   * @param  {Object} $tabLink  tab link that was just clicked
   */
  function updateTabContents($tabs, $tabLink) {

    var $tabContent;

    // tab link is either tab just clicked or the active tab (on page load)
    $tabLink = $tabLink || $tabs.find('span[data-tab-link]');

    // find tab content that corresponds to tab link
    $tabContent = $tabs.find('[data-tab-content="' + $tabLink.data('tab-link') + '"]');

    // hide all tabs
    $tabs.find('[data-tab-content]').addClass('hidden');

    // reveal selected tab's content
    $tabContent.removeClass('hidden');

  }

  /**
   * Update tab link states
   * 
   * @param  {Object} $tabs     jQuery object for tabs container
   */
  function updateTabLinks($tabs) {

    var $clickedTab = $(this),
        $tabLinks   = $tabs.find('[data-tab-link]');

    $tabLinks.each(function() {

      var $tabLink  = $(this),

          // item will be clickable if it's not what was just clicked
          clickable = $tabLink.data('tab-link') !== $clickedTab.data('tab-link');

      // switch markup of tab link as needed
      $tabLink = updateLinkMarkup($tabLink, clickable);

    });

  }

  /**
   * Updates a tab link's markup based on whether it should be clickable or not
   * 
   * @param  {Object} $tabLink    tab link that will be updated
   * @param  {Object} clickable   whether tab link will be clickable
   * @return {Object} $tabLink    updated tab link     
   */
  function updateLinkMarkup($tabLink, clickable) {

    var attrs = {};

    // save all attributes
    $.each($tabLink[0].attributes, function(i, attr) {       
      attrs[attr.nodeName] = attr.nodeValue;
    });

    // if tabLink should be clickable and is not already an anchor
    if(clickable) {
      
      // convert to anchor
      $tabLink.replaceWith(function() {

        // restore url of anchor from data attribute
        var hrefAttr = {'href': attrs['data-tab-url']};

        return $("<a/>", $.extend(attrs, hrefAttr)).append($(this).contents());
      });

    }
    // if tabLink is not clickable
    else {

      // span does not need href attribute
      delete attrs.href;

      // convert link to span
      $tabLink.replaceWith(function() {
        return $("<span/>", attrs).append($(this).contents());
      });

    }

    return $tabLink;

  }

};
