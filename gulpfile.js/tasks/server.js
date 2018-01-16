'use strict'

const gulp = require('gulp')
const browserSync = require('browser-sync')
const config = require('../config').browserSync

gulp.task('server', () => {
  config.forEach((conf, i) => {
    browserSync.create(`${i}`).init(conf)
  })
})
