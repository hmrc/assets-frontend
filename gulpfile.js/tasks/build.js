'use strict'

var gulp = require('gulp')
var runSequence = require('run-sequence')

gulp.task('build', ['changelog', 'clean', 'test'], function () {
  global.runmode = 'prod'
  global.location = undefined

  runSequence(
    ['images', 'svg', 'error-pages'],
    ['browserify', 'concatEncryption'],
    'modernizr',
    'version',
    'zip'
  )
})
