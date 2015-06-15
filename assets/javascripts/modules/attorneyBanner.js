require('jquery');

var sticky = require('./sticky-header.js');

module.exports = function(el) {

  if ($('.attorneyBanner').length == 0) {
    return;
  }

  sticky({
    el: '.attorneyBanner',
    className: 'stickyBanner'
  });

};

