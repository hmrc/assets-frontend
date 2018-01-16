'use strict'

const gulp = require('gulp')
const config = require('../config')
const patternLibrary = require('../util/pattern-library')

gulp.task('pattern-library', ['clean:pattern-library', 'build:v4'], () => {
  return patternLibrary(config.patternLibrary)
    .then(gulp.start('copy:pattern-library'))
})
