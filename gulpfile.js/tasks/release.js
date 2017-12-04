'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('release', ['build'], (done) => {
  runSequence(
    'changelog',
    'v3',
    'zip',
    'v4',
    'zip',
    done
  )
})
