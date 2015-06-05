'use strict';

var gulp           = require('gulp'),
		runSequence    = require('run-sequence'),
		browserifyTask = require('./browserify');

gulp.task('build', ['clean'], function(callback) {
  global.runmode = 'prod';
  runSequence(['sass', 'images', 'modernizr'], 'browserify', 'version', 'zip');

});
