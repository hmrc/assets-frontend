'use strict';

var gulp   = require('gulp'),
    config = require('../config').scripts,
    jshint = require('gulp-jshint-cached');

gulp.task('jshint', function() {
  return gulp.src([config.src, config.jshintExclude])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});
