'use strict'

const gulp = require('gulp')
const gutil = require('gulp-util')
const browserSync = require('browser-sync')
const config = require('../config').browserSync

gulp.task('server', () => {
  if (gutil.env.version === 'v3') {
    browserSync.create().init(config.v3)
    browserSync.create().init(config.v4)
    browserSync.create().init(config.assets)
  } else {
    browserSync.create().init(config[gutil.env.version])
    browserSync.create().init(config.assets)
  }
})
