'use strict';

var gulp =  require('gulp'),
	config = require('../config'),
	concat = require('gulp-concat');

gulp.task('concatEncryption', function() {
  return gulp.src(config.scripts.encryptionSrc)
		.pipe(concat('encryption.js'))
		.pipe(gulp.dest(config.production.jsDest));
});
