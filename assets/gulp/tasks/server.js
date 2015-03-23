'use strict';

var gulp 		= require('gulp'),
	browserSync = require('browser-sync'),
	config 		= require('../config').browserSync;
gulp.task('server', function () {
	browserSync(config);
});