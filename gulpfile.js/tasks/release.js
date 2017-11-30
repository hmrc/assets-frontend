'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('release', ['build'], (cb) => {
  runSequence(
    'changelog',
    'zip',
    cb
  )
})
