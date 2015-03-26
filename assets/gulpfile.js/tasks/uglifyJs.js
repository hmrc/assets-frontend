'use strict';

var gulp 	  = require('gulp'),
	  config 	= require('../config').production,
	  uglify 	= require('gulp-uglify');

gulp.task('uglifyJs', ['browserify'], function () {

	 return gulp.src(config.jsSrc)
	 	   .pipe(uglify({mangle: false}))
	 	   .pipe(gulp.dest(config.jsDest));

});
