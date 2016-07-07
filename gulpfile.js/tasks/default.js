'use strict';

var gulp        = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', ['clean'], function () {
  runSequence(
    ['sass', 'images', 'svg', 'concatEncryption'],
    'modernizr',
    'component-library',
    'watch'
  );
});
