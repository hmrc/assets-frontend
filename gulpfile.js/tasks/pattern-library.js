'use strict'

const del = require('del')
const path = require('path')
const gulp = require('gulp')
const gutil = require('gulp-util')
const config = require('../config')
const patternLibrary = require('../util/pattern-library')

gulp.task('clean-pattern-library', (done) => {
  del(config.patternLibrary.dest, done)
})

gulp.task('pattern-library', ['build', 'clean-pattern-library', 'v4'], () => {
  return patternLibrary(config.patternLibrary)
    .then(() => {
      return gulp
        .src([config.dest[gutil.env.version] + '/**/*'])
        .pipe(gulp.dest(path.join(config.patternLibrary.dest, 'public')))
    })
})
