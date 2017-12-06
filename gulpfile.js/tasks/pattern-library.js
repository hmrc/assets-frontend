'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')
const config = require('../config')
const patternLibrary = require('../util/pattern-library')

gulp.task('pattern-library', ['clean:pattern-library'], () => {
  return Promise.all([
    runSequence(
      'build:v4',
      'copy:pattern-library'
    ),
    patternLibrary(config.patternLibrary)
  ])
})
