'use strict'

const gulp = require('gulp')
const gutil = require('gulp-util')
const runSequence = require('run-sequence')

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
    // ['lint', 'test:gulpTasks'],
    ['sass', 'images', 'svg', 'error-pages', 'concatEncryption', 'browserify'],
    cb
  )
})

gulp.task('build:v4', ['v4'], (cb) => {
  runSequence(
    'clean',
    // ['lint', 'test:gulpTasks'],
    ['sass:v4', 'images', 'svg', 'error-pages', 'concatEncryption', 'browserify:v4'],
    cb
  )
})

gulp.task('v3', () => {
  gutil.env.version = 'v3'
})

gulp.task('v4', () => {
  gutil.env.version = 'v4'
})
