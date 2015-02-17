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

  var self = this;

  this.init = function(options) {

    if(!options || !options.expanderSection || !options.targetSection) {
      return;
    }

    this.$expander = $(options.expanderSection);
    this.$target   = $(options.targetSection);

    // hide expander if specified, but only if there's a minimise link in the target
    this.hideExpander = (options.hideExpander && this.$target.find('.minimise').length === 1);

    this.$target.addClass('visuallyhidden');

    this.bindEvents();

  };

  this.bindEvents = function() {

    // expand link is either $expander itself or a link contained within it
    var $link = this.$expander.is('a') ? this.$expander : this.$expander.find('a');

    $link.on('click', function(e) {
      self.toggleTarget.call(self, e);
    });

    // bind minimise link if present
    this.$target.find('.minimise').show().on('click', function(e) {
      self.toggleTarget.call(self, e);
    });

  };

  /**
   * Toggle expand/collapse state of target section
   *
   * @param e    event object
   */
  this.toggleTarget = function(e) {

    e.preventDefault();

    this.$target.toggleClass('visuallyhidden');

    if(this.hideExpander) {
      this.$expander.toggleClass('visuallyhidden');
    }

  };

};
