'use strict'

const path = require('path')
const gulp = require('gulp')
const gutil = require('gulp-util')
const config = require('../config')

gulp.task('images', () => {
  return gulp.src(config.images.src)
    .pipe(gulp.dest(path.join(config.dest[gutil.env.version], config.images.destDirName)))
})
