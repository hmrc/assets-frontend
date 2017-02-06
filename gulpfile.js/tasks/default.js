'use strict'

var gulp = require('gulp')
var runSequence = require('run-sequence')

gulp.task('default', ['clean'], function () {
  runSequence(
    ['lint:config', 'sass', 'images', 'svg', 'concatEncryption', 'error-pages'],
    'modernizr',
    'component-library',
    'watch'
  )
})
