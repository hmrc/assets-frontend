/**
 * YTA Dashboard - Last Login Section
 *
 */

var expandCollapse = require('./expandCollapse.js');

module.exports = function() {

  var ec = new expandCollapse();

  ec.init({
    expanderSection:  '.last-login-summary .more-details',
    targetSection:    '.last-login-details',
    hideExpander:     true
  });

};

