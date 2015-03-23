'use strict';

var gulp 		= require('gulp'),
	sass 		= require('gulp-sass'),
	sourceMaps 	= require('gulp-sourcemaps'),
	gulpif 		= require('gulp-if'),
	config 		= require('../config').sass;

gulp.task('sass', function () {
	var env 	= global.runmode,
		isDev 	= env  === 'dev' ? true : false;	
	return gulp.src(config.src)
		   .pipe(gulpif(isDev, sourceMaps.init()))
		   .pipe(sass(config[env].settings))
		   .pipe(gulpif(isDev, sourceMaps.write(config[env].sourceMapsDir)))
		   .pipe(gulp.dest(config[env].dest));
});
