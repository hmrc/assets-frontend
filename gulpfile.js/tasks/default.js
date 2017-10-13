'use strict'

var gulp = require('gulp')
var runSequence = require('run-sequence')

gulp.task('default', ['clean'], function () {
  runSequence(
    ['lint:gulpTasks', 'sass', 'images', 'svg', 'concatEncryption', 'error-pages'],
    'test',
    'modernizr',
    'pattern-library',
    'watch'
  )
})
