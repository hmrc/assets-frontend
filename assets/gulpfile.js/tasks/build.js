'use strict';

var gulp           = require('gulp'),
	  runSequence    = require('run-sequence'),
    browserifyTask = require('./browserify');

gulp.task('build', ['clean', 'test'], function() {
  global.runmode = 'prod';
  runSequence(['sass', 'images'], 'browserify', 'version', 'zip');
});
