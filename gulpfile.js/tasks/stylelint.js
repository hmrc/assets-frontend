'use strict';

var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    config = require('../config').sass,
    plumber = require('gulp-plumber'),
    stylelint = require('gulp-stylelint');

gulp.task('stylelint', function() {
  var env   = global.runmode,
      isDev = (env === 'dev');

  return gulp
    .src(config.src)
    .pipe(gulpif(isDev, plumber(function(error) {
      gutil.log(gutil.colors.red(error.message));
      this.emit('end');
    })))
    .pipe(stylelint({
      failAfterError: !isDev,
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }));
});
