'use strict'

var gulp = require('gulp')
var svgmin = require('gulp-svgmin')
var config = require('../config')

gulp.task('svg', function () {
  var env = global.runmode

  return gulp.src(config.svg.dev.src)
    .pipe(svgmin())
    .pipe(gulp.dest(config.svg[env].dest))
})
