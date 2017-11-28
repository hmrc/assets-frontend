'use strict'

const gulp = require('gulp')
const svgmin = require('gulp-svgmin')
const config = require('../config')

gulp.task('svg', () => {
  var env = global.runmode

  return gulp.src(config.svg.src)
    .pipe(svgmin())
    .pipe(gulp.dest(config.svg[env].dest))
})
