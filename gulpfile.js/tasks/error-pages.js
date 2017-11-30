'use strict'

const path = require('path')
const gulp = require('gulp')
const gutil = require('gulp-util')
const replace = require('gulp-replace')
const config = require('../config')

gulp.task('error-pages', function () {
  const version = process.env.TAG ? process.env.TAG : path.parse(config.dest[gutil.env.version]).name
  const assetsPath = '/assets/' + version + '/'

  return gulp.src(config.errorPages.src)
      .pipe(replace('{{ assetsPath }}', assetsPath))
      .pipe(gulp.dest(config.dest[gutil.env.version]))
})
