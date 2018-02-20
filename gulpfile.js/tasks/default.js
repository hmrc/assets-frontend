'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')

runSequence.options.showErrorStackTrace = false

gulp.task('default', () => {
  runSequence(
    'design-system',
    'server',
    'watch',
  )
})
