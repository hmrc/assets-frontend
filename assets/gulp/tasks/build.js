'use strict';
var gulp 		= require('gulp'),
	runSequence = require('run-sequence');

gulp.task('build', function () {
	global.runmode = 'prod';
	runSequence('sass', 'images', 'uglifyJs', 'version', 'zip');
});