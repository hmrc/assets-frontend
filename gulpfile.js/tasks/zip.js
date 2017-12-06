'use strict'

const gulp = require('gulp')
const gutil = require('gulp-util')
const zip = require('gulp-zip')
const config = require('../config')

gulp.task('zip', () => {
  return gulp.src(`${config.dest[gutil.env.version]}**/*`)
    .pipe(zip(`assets-frontend-${gutil.env.version}.zip`))
    .pipe(gulp.dest(config.distDir))
})
