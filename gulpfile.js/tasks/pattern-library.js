'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('pattern-library', ['clean:pattern-library'], () => {
  runSequence(
    'build:v4',
    'copy:pattern-library'
  )
})
