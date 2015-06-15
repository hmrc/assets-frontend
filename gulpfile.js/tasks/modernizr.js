'use strict';

var gulp         = require('gulp'),
    config       = require('../config'),
    gutil        = require('gulp-util'),
    modernizr    = require('gulp-modernizr'),
    uglify       = require('gulp-uglify'),
    gulpIf       = require('gulp-if');

gulp.task('modernizr', function(callback) {
  var env   = global.runmode,
      isDev = (env === 'dev');

  if (!isDev) {
    config.scripts.modernizr.cache = false;
  }

  return gulp.src(config.scripts.modernizr.files.src)
      .pipe(modernizr(config.scripts.modernizr))

      //uglify on build
      .pipe(gulpIf(!isDev, uglify()))
      .pipe(gulp.dest(config.scripts.vendorDest[env]));
});
