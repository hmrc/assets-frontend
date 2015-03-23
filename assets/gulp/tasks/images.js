'use strict';

var gulp 	= require('gulp'),
	config 	= require('../config');
	
gulp.task('images', function () {
	var env = global.runmode;
	return gulp.src([config.images.govuk, config.images.dev.src ])
				.pipe(gulp.dest(config.images[env].dest))

})