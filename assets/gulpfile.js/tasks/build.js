'use strict';

var gulp        = require('gulp'),
	runSequence = require('run-sequence');

gulp.task('build', ['clean'], function() {
  ruSequence('sass', 'images');
});
