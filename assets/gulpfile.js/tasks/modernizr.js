'use strict';

var gulp         = require('gulp'),
    config       = require('../config'),
    gutil        = require('gulp-util'),
    modernizr    = require('customizr');

gulp.task('modernizr', function() {
  var env = global.runmode;
  return modernizr(config.scripts.modernizr);
});
