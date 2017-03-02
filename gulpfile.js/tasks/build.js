'use strict'

var gulp = require('gulp')
var runSequence = require('run-sequence')

gulp.task('build', ['clean', 'test'], function () {
  global.runmode = 'prod'
  global.location = undefined

  runSequence(
    'changelog',
    ['sass', 'images', 'svg', 'error-pages'],
    ['browserify', 'concatEncryption'],
    'modernizr',
    'version',
    'zip'
  )
})
