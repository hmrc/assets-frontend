'use strict'

const gulp = require('gulp')
const gutil = require('gulp-util')
const runSequence = require('run-sequence').use(gulp)

const sharedTasks = ['error-pages', 'concat:encryption', 'modernizr']

gulp.task('build', ['clean', 'lint', 'stylelint', 'test:gulpTasks'], (done) => {
  // TODO: get to this
  // runSequence(
  //   ['style:v3', 'style:v4'],
  //   ['images', 'svg'],
  //   ['test:v3', 'test:v4'],
  //   ['error-pages', 'concat:encryption', 'modernizr', 'browserify:v3', 'browserify:v4'],
  //   done
  // )

  runSequence(
    'v3',
    ['style:v3', 'images', 'svg'],
    'test',
    sharedTasks.concat(['browserify:v3']),
    'v4',
    ['style:v4', 'images', 'svg'],
    'test',
    sharedTasks.concat(['browserify:v4']),
    done
  )
})

gulp.task('build:v3', ['v3', 'clean:v3', 'lint', 'stylelint', 'test:gulpTasks'], (done) => {
  runSequence(
    ['style:v3', 'images', 'svg'],
    'test',
    sharedTasks.concat(['browserify:v3']),
    done
  )
})

gulp.task('build:v4', ['v4', 'clean:v4', 'lint', 'stylelint', 'test:gulpTasks'], (done) => {
  runSequence(
    ['style:v4', 'images', 'svg'],
    'test',
    sharedTasks.concat(['browserify:v4']),
    done
  )
})

gulp.task('v3', () => {
  gutil.env.version = 'v3'
})

gulp.task('v4', () => {
  gutil.env.version = 'v4'
})
