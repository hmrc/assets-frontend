'use strict'

var gulp = require('gulp')
var gulpif = require('gulp-if')
var gutil = require('gulp-util')
var config = require('../config').sass
var plumber = require('gulp-plumber')
var stylelint = require('gulp-stylelint')

gulp.task('stylelint', function () {
  var env = global.runmode
  var isDev = (env === 'dev')

  return gulp
    .src(config.src)
    .pipe(gulpif(isDev, plumber(function (error) {
      gutil.log(gutil.colors.red(error.message))
      this.emit('end')
    })))
    .pipe(stylelint({
      syntax: 'scss',
      failAfterError: !isDev,
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }))
})
