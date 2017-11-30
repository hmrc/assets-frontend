'use strict'

const del = require('del')
const gulp = require('gulp')
const gutil = require('gulp-util')
const config = require('../config')

gulp.task('clean', () => {
  return del(config.dest[gutil.env.version])
})
