'use strict';

var gulp =  require('gulp'),
  	config = require('../config'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
  	rename = require('gulp-rename');

gulp.task('concatEncryption', function() {
  return gulp.src(config.scripts.encryptionSrc)
		.pipe(concat('encryption.js'))
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.extname = ".min.js"
    }))
		.pipe(gulp.dest(config.production.jsDest));
});
