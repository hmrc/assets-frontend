require('jquery');
var sticky = require('./sticky-header.js');


module.exports = function(el) {

        sticky({
            el: '.sticky-header',
            className: 'fixed'
        });

};

