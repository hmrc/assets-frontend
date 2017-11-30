'use strict'

const path = require('path')
const gulp = require('gulp')
const gutil = require('gulp-util')
const svgmin = require('gulp-svgmin')
const config = require('../config')

gulp.task('svg', () => {
  return gulp.src(config.svg.src)
    .pipe(svgmin())
    .pipe(gulp.dest(path.join(config.dest[gutil.env.version], config.images.destDirName)))
})
