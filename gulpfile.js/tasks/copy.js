'use strict'

const path = require('path')
const gulp = require('gulp')
const config = require('../config')
const compLibConfig = require('../../component-lib.json')

gulp.task('copy:component-library', () => {
  return gulp
    .src([`${config.dest.v3}/**/*`])
    .pipe(gulp.dest(path.join(compLibConfig.destination, 'public')))
})

gulp.task('copy:pattern-library', () => {
  return gulp
    .src([`${config.dest.v4}/**/*`])
    .pipe(gulp.dest(path.join(config.patternLibrary.dest, 'public')))
})
