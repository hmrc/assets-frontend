'use strict'

const path = require('path')
const gulp = require('gulp')
const gutil = require('gulp-util')
const config = require('../config')
const modernizr = require('gulp-modernizr')
const uglify = require('gulp-uglify')

gulp.task('modernizr', () => {
  const dest = path.join(config.dest[gutil.env.version], config.scripts.vendorDestDirName)

  return gulp.src(config.scripts.modernizr.files.src)
      .pipe(modernizr(Object.assign({}, config.scripts.modernizr)))
      .pipe(uglify())
      .pipe(gulp.dest(dest))
})
