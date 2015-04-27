'use strict';

var gulp = require('gulp'),
	runSequence = require('run-sequence');

gulp.task('production', ['test'], function() {
  runSequence('sass', 'images', 'uglifyJs', 'version', 'zip');
});
