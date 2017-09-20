'use strict'

var del = require('del')
var gulp = require('gulp')
var config = require('../config')

gulp.task('clean-pattern-lib', function (cb) {
  del(config.patternLibrary.dest, cb)
})

gulp.task('pattern-library', ['clean-pattern-lib'], function (cb) {
  cb()
})
