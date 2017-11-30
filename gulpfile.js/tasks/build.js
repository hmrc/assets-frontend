'use strict'

const gulp = require('gulp')
const gutil = require('gulp-util')
const runSequence = require('run-sequence')

// ['lint', 'test:gulpTasks'],
gulp.task('build', (cb) => {
  runSequence(
    'build:v3',
    'build:v4',
    cb
  )
})

gulp.task('build:v3', ['v3'], (cb) => {
  runSequence(
    'clean',
    ['images'], //, 'svg', 'error-pages', 'concatEncryption', 'sass',
    cb
  )
})

gulp.task('build:v4', ['v4'], (cb) => {
  runSequence(
    'clean',
    ['images'], //, 'svg', 'error-pages', 'concatEncryption', 'sass:v4',
    cb
  )
})

gulp.task('v3', () => {
  gutil.env.version = 'v3'
})

gulp.task('v4', () => {
  gutil.env.version = 'v4'
})
