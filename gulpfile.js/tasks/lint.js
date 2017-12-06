'use strict'

const gulp = require('gulp')
const standard = require('gulp-standard')
const config = require('../config')

gulp.task('lint', [
  'lint:gulpTasks',
  'lint:scripts',
  'lint:tests'
])

gulp.task('lint:gulpTasks', () => {
  return gulp.src(config.scripts.gulpTasks)
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('lint:scripts', () => {
  return gulp.src(config.scripts.src)
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('lint:tests', () => {
  return gulp.src(config.test.src)
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})
