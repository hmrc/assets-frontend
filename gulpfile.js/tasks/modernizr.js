'use strict'

const path = require('path')
const gulp = require('gulp')
const config = require('../config')
const modernizr = require('gulp-modernizr')
const uglify = require('gulp-uglify')

const runModernizr = (v) => {
  const dest = path.join(config.snapshotDir[v], config.scripts.vendorDestDirName)

  return gulp.src(config.scripts.modernizr.files.src)
      .pipe(modernizr(Object.assign({}, config.scripts.modernizr)))
      .pipe(uglify({ie8: true}))
      .pipe(gulp.dest(dest))
}

gulp.task('modernizr:v3', () => {
  return runModernizr('v3')
})

gulp.task('modernizr:v4', () => {
  return runModernizr('v4')
})
