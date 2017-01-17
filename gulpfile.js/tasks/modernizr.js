'use strict'

var gulp = require('gulp')
var config = require('../config')
var modernizr = require('gulp-modernizr')
var uglify = require('gulp-uglify')
var gulpIf = require('gulp-if')

gulp.task('modernizr', function (callback) {
  var env = global.runmode
  var isDev = (env === 'dev')

  if (!isDev) {
    config.scripts.modernizr.cache = false
  }

  return gulp.src(config.scripts.modernizr.files.src)
      .pipe(modernizr(config.scripts.modernizr))
      .pipe(gulpIf(!isDev, uglify()))
      .pipe(gulp.dest(config.scripts.vendorDest[env]))
})
