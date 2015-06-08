'use strict';

var gulp           = require('gulp'),
	  runSequence    = require('run-sequence'),
    browserifyTask = require('./browserify');

gulp.task('build', ['clean', 'test'], function() {
  global.runmode = 'prod';
  global.location = undefined;
  runSequence(
    ['sass', 'images'],
    'browserify',
    'modernizr',
    'version',
    'zip'
  );
});
