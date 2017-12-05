'use strict'

const gulp = require('gulp')
const gutil = require('gulp-util')
const runSequence = require('run-sequence')

gulp.task('build', ['lint', 'test:gulpTasks'], (done) => {
  runSequence(
    'build:v3',
    'build:v4',
    done
  )
})

gulp.task('build:v3', ['v3'], (done) => {
  runSequence(
    'clean',
    ['style', 'images', 'svg', 'error-pages', 'concat:encryption', 'browserify'],
    'modernizr',
    done
  )
})

gulp.task('build:v4', ['v4'], (done) => {
  runSequence(
    'clean',
    ['style:v4', 'images', 'svg', 'error-pages', 'concat:encryption', 'browserify:v4'],
    'modernizr',
    done
  )
})

gulp.task('v3', () => {
  gutil.env.version = 'v3'
})

gulp.task('v4', () => {
  gutil.env.version = 'v4'
})
