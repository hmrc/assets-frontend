/**
 * Expand/Collapse module
 *
 * The same behaviour as Details/Summary tags but allows for more markup flexibility
 * (Initially required for YTA-628, used by lastLogin module)
 *
 * Usage:
 *
 *  var expandCollapse = require('./modules/expandCollapse.js);
 *
 *  expandCollapse.init({
 *    expanderSection:  <selector - container that has expand link>, (mandatory)
 *    targetSection:    <selector - section to be expanded-collapsed>, (mandatory)
 *    hideExpander:     <boolean - whether or not to hide expander section when target is visible>,
 *                      (optional, default = false)
 *  });
 *
 * Assumes:
 *  - expanderSection is either a link or a container that has one link for expansion/collapse of target
 *  - existence of '.minimise' link inside the target section (optional)
 *
 **/

module.exports = function() {

  var $expander,
      $target,
      hideExpander;

  function init(options) {

    if(!options || !options.expanderSection || !options.targetSection) {
      return;
    }

    $expander = $(options.expanderSection);
    $target   = $(options.targetSection);

    // hide expander if specified, but only if there's a minimise link in the target
    hideExpander = options.hideExpander && $target.find('.minimise').length || false;

    $target.addClass('visuallyhidden');

    bindEvents();

  }

  function bindEvents() {

    // expand link is either $expander itself or a link contained within it
    var $link = $expander.is('a') ? $expander : $expander.find('a');

    $link.on('click', toggleTarget);

    // bind minimise link if present
    $target.find('.minimise').show().on('click', toggleTarget);

  }

  /**
   * Toggle expand/collapse state of target section
   *
   * @param e    event object
   */
  function toggleTarget(e) {

    e.preventDefault();

    $target.toggleClass('visuallyhidden');

    if(hideExpander) {
      $expander.toggleClass('visuallyhidden');
    }

  }

  return {
    init:init
  };

};
