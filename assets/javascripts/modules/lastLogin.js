/**
 * YTA Dashboard - Last Login Section
 *
 */

var ExpandCollapse = require('./expandCollapse.js');

module.exports = function() {

  var ec = new ExpandCollapse();

  ec.init({
    expanderSection: '.last-login-summary .more-details',
    targetSection:   '.last-login-details',
    hideExpander:    true
  });

};

