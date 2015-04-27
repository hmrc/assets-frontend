'use strict';
var gulp =  require('gulp'),
	config = require('../config').scripts,
	jscs = require('gulp-jscs');

gulp.task('jscs', function() {
  return gulp.src([
		config.entryPoint,
		config.src,
		config.gulpTasks,
		config.jshintExclude
	])
	.pipe(jscs({configPath: config.jscsSrc}));
});
