'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    config = require('../config').sass,
    stylelint = require('gulp-stylelint');

gulp.task('stylelint', function() {
  return gulp
    .src(config.src)
    .on('error', gutil.log)
    .pipe(stylelint({
      failAfterError: false,
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }));
});
