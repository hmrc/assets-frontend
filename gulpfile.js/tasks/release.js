'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('release', ['changelog'], (done) => {
  runSequence(
    'release:v3',
    'release:v4',
    done
  )
})

gulp.task('release:v3', (done) => {
  runSequence(
    'build:v3',
    'zip',
    done
  )
})

gulp.task('release:v4', (done) => {
  runSequence(
    'build:v4',
    'zip',
    done
  )
})
