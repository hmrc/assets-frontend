'use strict'

const gulp = require('gulp')
const gutil = require('gulp-util')
const browserSync = require('browser-sync')
const config = require('../config').browserSync

gulp.task('server', () => {
  browserSync.create().init(config[gutil.env.version])
  browserSync.create().init(config.assets)
})
