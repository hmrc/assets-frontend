'use strict'

var gulp = require('gulp')
var standard = require('gulp-standard')
var config = require('../config')

gulp.task('lint:gulpTasks', function () {
  return gulp.src(config.scripts.gulpTasks)
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('lint:scripts', function () {
  var scripts = [
    config.scripts.src
  ].concat([
    config.scripts.entryPoint,
    '!**/*.polyfill.js'
  ])

  return gulp.src(scripts)
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('lint:tests', function () {
  return gulp.src(config.test.src)
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})
