'use strict';

var gulp =  require('gulp'),
    gulpIf =  require('gulp-if'),
  	config = require('../config'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
  	rename = require('gulp-rename');

gulp.task('concatEncryption', function() {
  var env   = global.runmode,
      isDev = (env === 'dev');

  return gulp.src(config.scripts.encryptionSrc)
		.pipe(concat('encryption.js'))
    .pipe(gulpIf(!isDev, uglify()))
    .pipe(rename(function (path) {
      path.extname = ".min.js"
    }))
		.pipe(gulp.dest(config.scripts.encryptionDest[env]));
});
