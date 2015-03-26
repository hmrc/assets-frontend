'use strict';

var gulp        = require('gulp'),
    gulpif      = require('gulp-if'),
    sass        = require('gulp-sass'),
    config      = require('../config').sass,
    sourceMaps  = require('gulp-sourcemaps');

gulp.task('sass', function () {
  var env   = global.runmode,
      isDev = (env === 'dev');

  return gulp.src(config.src)
       .pipe(gulpif(isDev, sourceMaps.init()))
       .pipe(sass(config[env].settings))
       .pipe(gulpif(isDev, sourceMaps.write(config[env].sourceMapsDir)))
       .pipe(gulp.dest(config[env].dest));
});
