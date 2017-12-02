'use strict'

const path = require('path')
const gulp = require('gulp')
const gutil = require('gulp-util')
const config = require('../config')
const patternLibrary = require('../util/pattern-library')

gulp.task('pattern-library', ['clean:pattern-library', 'build:v4'], () => {
  return patternLibrary(config.patternLibrary)
    .then(() => {
      return gulp
        .src([config.dest[gutil.env.version] + '/**/*'])
        .pipe(gulp.dest(path.join(config.patternLibrary.dest, 'public')))
    })
})
