require('jquery');

/**
 * Tabs Module
 *
 * Usage:

    <div data-tabs>

      <ul role="tablist">
        <li id="tab1" data-tab-link="1" role="tab" aria-selected="true" aria-controls="tabContent1" tabindex="0">
          <span class="tabs-nav__tab tabs-nav__tab--active">Tab Link 1</span>
        </li>
        <li id="tab2" data-tab-link="2" role="tab" aria-selected="false" aria-controls="tabContent2" tabindex="0">
          <a href="#" class="tabs-nav__tab">Tab Link 2</a>
        </li>
        <li id="tab3" data-tab-link="3" role="tab" aria-selected="false" aria-controls="tabContent3" tabindex="0">
          <a href="#" class="tabs-nav__tab">Tab Link 3</a>
        </li>
      </ul>

      <ul>
        <li id="tabContent1" data-tab-content="1" class="tab-content" role="tabpanel" aria-labelledby="tab1">
          <p>Tab Content 1</p>
        </li>
        <li id="tabContent2" data-tab-content="2" class="tab-content" role="tabpanel" aria-labelledby="tab2">
          <p>Tab Content 2</p>
        </li>
        <li id="tabContent3" data-tab-content="3" class="tab-content" role="tabpanel" aria-labelledby="tab3">
          <p>Tab Content 3</p>
        </li>
      </ul>

    </div>

 * add class to initial div if tabs should open based on URL hash, or 1st tab if not found
 *
 <div data-tabs class="js-hash-selected-tab">

 */

var activeTabClass = 'tabs-nav__tab--active',
    ariaSelected   = 'aria-selected',
    $tabElems,
    selectActiveTabWithJs;


// for each set of tabs in the page
module.exports = function() {

  $tabElems = $('[data-tabs]');

  if($tabElems.length === 0) return;

  $tabElems.each(function() {

    var $tabs = $(this),
      $activeTabLI;

    selectActiveTabWithJs = $tabs.hasClass('js-hash-selected-tab');

    // active tab is either first or based on url hash
    $activeTabLI = findActiveTab($tabs);

    // remove spans and anchors within tab LIs
    removeElements($activeTabLI, $tabs);

    // initial setting of tab links state
    updateTabLinks($activeTabLI, $tabs);

    // initial setting of tab content to be visible/hidden
    updateTabContents($activeTabLI, $tabs);

    bindTabClick($tabs);

  });

};

/**
 * Determine which tab to open at the start.
 * The open tab will be that matching the URL hash,
 * or the first tab if no hash present.
 *
 * @returns {string} jQuery object for the tab to open
 */
var findActiveTab = function($tabs) {

  var $firstTab  = $tabs.find('[data-tab-link]:first'),
    $activeTab = $tabs.find('[data-tab-link] .tabs-nav__tab--active').parent(),
    $tabFromHash;

  // only check hash if tabs instance specifies to do so
  if(selectActiveTabWithJs) {
    $tabFromHash = findTabByLinkAttr($tabs, window.location.hash);
  }

  if($activeTab.length === 0) {
    $activeTab = null;
  }

  return $tabFromHash || $activeTab || $firstTab;
};

/**
 * Try to find a present tab matching the URL hash
 *
 * @param $tabs
 * @param hash the URL hash
 * @returns the jQuery object for the tab
 */
var findTabByLinkAttr = function($tabs, hash) {
  var $tab;

  if(hash.length > 1) {
    $tab = $tabs.find('[data-tab-link=' + hash.substring(1) + ']');
    if($tab.length) {
      return $tab;
    }
  }

};

/**
 * Removes span or anchor from within LI, making LI the clickable tab
 *
 * @param $activeTab
 * @param $tabs
 */
var removeElements = function($activeTab, $tabs) {

  $tabs.find('[data-tab-link]').each(function() {

    var $tabLI   = $(this),
        $element = $tabLI.find('.tabs-nav__tab'),
        attrs    = getAttributes($element),
        tabText  = $element.text(),
        listItemClasses = $tabLI.attr('class');  // save classes on LI that will be overwritten

    // set attributes on LI from child element
    $tabLI.attr(attrs);

    // restore LI classes from before
    $tabLI.addClass(listItemClasses);

    // text of LI is just tab link text
    $tabLI.html(tabText);

  });

};

/**
 *
 * @param $tabs
 */
var bindTabClick = function($tabs) {

  // on click of a tab LI or link
  $tabs.on('click', '[data-tab-link]', function(e) {
    onSelectTab(e, $tabs);
  });

  // on press enter on tab LI or link
  $tabs.on('keydown', '[data-tab-link]', function(e) {
    if(e.which === 13) {
      onSelectTab(e, $tabs);
    }
  });

};

/**
 *
 * @param e
 * @param $tabs
 */
var onSelectTab = function(e, $tabs) {

  var $tabLI = $(e.currentTarget),
      hashVal;

  // add tab hash to URL if enabled
  if(selectActiveTabWithJs) {

    hashVal = $tabLI.data('tab-link');

    if(history.replaceState) {
      history.replaceState(null, null, '#' + hashVal);
    }
    else {
      // warning: for older browsers, this causes the tab content to be scrolled to
      location.hash = hashVal;
    }

  }

  // set correct tab content to be visible
  updateTabContents($tabLI, $tabs);

  // update state of tab links
  updateTabLinks($tabLI, $tabs);

};

/**
 * Update visibility of tab contents
 *
 * @param  {Object} $tabLI    tab link that was just clicked
 * @param  {Object} $tabs     jQuery object for tabs container
 */
var updateTabContents = function($tabLI, $tabs) {

  var $tabContent,
    $tabList = $tabs.find('[data-tab-content]');

  // find tab content that corresponds to tab link
  $tabContent = $tabs.find('[data-tab-content="' + $tabLI.data('tab-link') + '"]');

  $tabList.addClass('hidden')               // hide all tabs
    .attr('aria-hidden', true);       // set tabs as hidden to screen readers

  $tabContent.removeClass('hidden')         // reveal selected tab's content
    .attr('aria-hidden', false);   // set selected tab as visible to screen readers

};

/**
 * Update tab link states
 *
 * @param $clickedTab
 * @param  {Object} $tabs     jQuery object for tabs container
 */
var updateTabLinks = function($clickedTab, $tabs) {

  var $tabLIs = $tabs.find('[data-tab-link]');

  $tabLIs.each(function() {
    var $tabLI = $(this);

    // item will be clickable if it's not what was just clicked
    var clickable = $tabLI.data('tab-link') !== $clickedTab.data('tab-link');

    $tabLI = setActiveClass($tabLI, clickable);

    // toggle aria-selected on tab link
    $tabLI.attr(ariaSelected, !clickable);

  });

};

/**
 * Add and remove classes for styling active and non active tabs
 *
 * @param $tabLI
 * @param clickable whether tab is clickable
 * @returns {*} tab jQuery object
 */
var setActiveClass = function($tabLI, clickable) {

  if(clickable) {
    $tabLI.removeClass(activeTabClass);
  } else {
    $tabLI.addClass(activeTabClass);
  }

  return $tabLI;
};

/**
 * Return an elements attributes as an object
 *
 * @param $element
 * @returns {{}}
 */
var getAttributes = function($element) {

  var attrs = {};

  if($element.length > 0) {

    // save all attributes of tabLink
    $.each($element[0].attributes, function(i, attr) {
      attrs[attr.nodeName] = attr.nodeValue;
    });

  }

  return attrs;

};
