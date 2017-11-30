'use strict'

const gulp = require('gulp')
const gutil = require('gulp-util')
const config = require('../config').sass
const plumber = require('gulp-plumber')
const stylelint = require('gulp-stylelint')

gulp.task('stylelint', () => {
  return gulp
    .src(config.src)
    .pipe(plumber((error) => {
      gutil.log(gutil.colors.red(error.message))
      this.emit('end')
    }))
    .pipe(stylelint({
      syntax: 'scss',
      failAfterError: true,
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }))
})
