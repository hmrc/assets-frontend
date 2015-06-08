'use strict';

var gulp         = require('gulp'),
    config       = require('../config'),
    gutil        = require('gulp-util'),
    modernizr    = require('customizr');

gulp.task('modernizr', function() {
  var env = global.runmode;

  config.scripts.modernizr.dest = config.scripts.vendorDest[env] + config.scripts.modernizr.dest;

  if(env === 'prod') {
    config.scripts.modernizr.cache = false;
    config.scripts.modernizr.uglify = true;
  }

  return modernizr(config.scripts.modernizr);
});
