'use strict'

const gulp = require('gulp')
const gutil = require('gulp-util')
const runSequence = require('run-sequence')

gulp.task('build', (done) => {
  runSequence(
    'build:v3',
    'build:v4',
    done
  )
})

gulp.task('build:v3', ['v3'], (done) => {
  runSequence(
    'clean',
    ['lint', 'test:gulpTasks'],
    ['style:v3', 'images', 'svg', 'error-pages', 'concat:encryption', 'browserify:v3'],
    'modernizr',
    'test',
    done
  )
})

gulp.task('build:v4', ['v4'], (done) => {
  runSequence(
    'clean',
    ['lint', 'test:gulpTasks'],
    ['style:v4', 'images', 'svg', 'error-pages', 'concat:encryption', 'browserify:v4'],
    'modernizr',
    // run jasmine tests
    done
  )
})

gulp.task('v3', () => {
  gutil.env.version = 'v3'
})

gulp.task('v4', () => {
  gutil.env.version = 'v4'
})
