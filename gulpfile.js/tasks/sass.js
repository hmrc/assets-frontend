'use strict';

var gulp         = require('gulp'),
    gulpif       = require('gulp-if'),
    sass         = require('gulp-sass'),
    config       = require('../config').sass,
    sourceMaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    rename      = require('gulp-rename');

gulp.task('sass', function() {
  var env   = global.runmode,
      isDev = (env === 'dev');

  return gulp.src(config.src)
       .pipe(gulpif(isDev, sourceMaps.init()))
       .pipe(sass(config[env].settings))
       .pipe(autoprefixer())
       .pipe(rename({suffix: '.min'}))
       .pipe(gulpif(isDev, sourceMaps.write(config[env].sourceMapsDir)))
       .pipe(gulp.dest(config[env].dest));
});
