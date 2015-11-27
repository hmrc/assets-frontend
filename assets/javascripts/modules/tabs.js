require('jquery');

/**
 * Tabs Module
 *
 * Usage:

 <div data-tabs>

   <ul class="tabs-nav">
     <li class="tabs-nav__tab">
      <a href="#" data-tab-link="1">Tab Link 1</a>
     </li>
     <li class="tabs-nav__tab--active">
      <span data-tab-link="2">Tab Link 2</span>
     </li>
     <li class="tabs-nav__tab">
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

 * add class to initial div if tabs should open based on URL hash, or 1st tab if not found
 *
 <div data-tabs class="js-hash-selected-tab">

 */

var activeTabClass,
    inactiveTabClass,
    $tabElems,
    $firstTab,
    selectActiveTabWithJs;

// for each set of tabs in the page
var initialiseTabs = function() {
  $tabElems.each(function() {

    var $tabs = $(this),
        activeTab;

    // initial setting of tab content to be visible/hidden
    if (selectActiveTabWithJs) {
      activeTab = findActiveTabFromHash();
      updateTabLinks.call(activeTab, $tabs);
      updateTabContents($tabs, activeTab);
    } else {
      updateTabContents($tabs);
    }

    // for each tab link
    $tabs.on('click', '[data-tab-link]', function(e) {

      // add tab hash to URL if enabled
      if (!selectActiveTabWithJs) {
        e.preventDefault();
      }

      // set correct tab content to be visible
      updateTabContents($tabs, $(this));

      // update state of tab links
      updateTabLinks.call(this, $tabs);
    });

  });
};

/**
 * Determine which tab to open at the start.
 * The open tab will be that matching the URL hash,
 * or the first tab if no hash present.
 * @returns {string} jQuery object for the tab to open
 */
var findActiveTabFromHash = function() {
  var activeTabLink = '',
      tab;

  if (selectActiveTabWithJs) {
    tab = findTabByLinkAttr(window.location.hash);
    activeTabLink = tab || $firstTab;
  }
  return activeTabLink;
};

/**
 * Try to find a present tab matching the URL hash
 * @param hash the URL hash
 * @returns the jQuery object for the tab
 */
var findTabByLinkAttr = function(hash) {
  var $tab;

  if (hash.length > 1) {
    $tab = $('a[data-tab-link=' + hash.substring(1) + ']');
    if ($tab.length) {
      return $tab;
    }
  }
};

/**
 * Update visibility of tab contents
 *
 * @param  {Object} $tabs     jQuery object for tabs container
 * @param  {Object} $tabLink  tab link that was just clicked
 */
var updateTabContents = function($tabs, $tabLink) {

  var $tabContent;

  // tab link is either tab just clicked or the active tab (on page load)
  $tabLink = $tabLink || $tabs.find('span[data-tab-link]');

  // find tab content that corresponds to tab link
  $tabContent = $tabs.find('[data-tab-content="' + $tabLink.data('tab-link') + '"]');

  // hide all tabs
  $tabs.find('[data-tab-content]').addClass('hidden');

  // reveal selected tab's content
  $tabContent.removeClass('hidden');

};

/**
 * Update tab link states
 *
 * @param  {Object} $tabs     jQuery object for tabs container
 */
var updateTabLinks = function($tabs) {

  var $clickedTab = $(this),
    $tabLinks = $tabs.find('[data-tab-link]');

  $tabLinks.each(function() {

    var $tabLink = $(this),

    // item will be clickable if it's not what was just clicked
      clickable = $tabLink.data('tab-link') !== $clickedTab.data('tab-link');

    $tabLink = setActiveClass($tabLink, clickable);

    // switch markup of tab link as needed
    $tabLink = updateLinkMarkup($tabLink, clickable);
  });
};

/**
 * add and remove classes for styling active and non active tabs
 * @param $tabLink tab jQuery object
 * @param clickable whether tab is clickable
 * @returns {*} tab jQuery object
 */
var setActiveClass = function($tabLink, clickable) {

  if (clickable) {
    $tabLink.removeClass(activeTabClass);
    $tabLink.addClass(inactiveTabClass);
  } else {
    $tabLink.removeClass(inactiveTabClass);
    $tabLink.addClass(activeTabClass);
  }
  return $tabLink;
};

/**
 * Updates a tab link's markup based on whether it should be clickable or not
 *
 * @param  {Object} $tabLink    tab link that will be updated
 * @param  {Object} clickable   whether tab link will be clickable
 * @return {Object} $tabLink    updated tab link
 */
var updateLinkMarkup = function($tabLink, clickable) {

  var attrs = {};

  // save all attributes
  $.each($tabLink[0].attributes, function(i, attr) {
    attrs[attr.nodeName] = attr.nodeValue;
  });

  // if tabLink should be clickable and is not already an anchor
  if (clickable) {

    // convert to anchor
    $tabLink.replaceWith(function() {

      // restore url of anchor from data attribute
      var hrefAttr = {'href': '#' + attrs['data-tab-link']};

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
};

/**
 * if tabs present on page, initialise behaviour
 */
var init = function() {

  activeTabClass = 'tabs-nav__tab--active';
  inactiveTabClass = 'tabs-nav__tab';
  $tabElems = $('[data-tabs]');
  $firstTab = $('a[data-tab-link]:first');
  selectActiveTabWithJs = $('.js-hash-selected-tab').length > 0;

  if ($tabElems.length) {
    initialiseTabs();
  }
};

module.exports = function() {
  return {
    init: init
  };
};

