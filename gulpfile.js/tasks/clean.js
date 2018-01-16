'use strict'

const del = require('del')
const gulp = require('gulp')
const gutil = require('gulp-util')
const config = require('../config')
const compLibConfig = require('../../component-lib.json')

gulp.task('clean', () => {
  return del.sync(config.dest[gutil.env.version])
})

gulp.task('clean:pattern-library', () => {
  return del.sync(config.patternLibrary.dest)
})

gulp.task('clean:component-library', () => {
  return del.sync(compLibConfig.destination)
})
