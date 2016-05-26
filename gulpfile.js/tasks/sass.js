'use strict';

var gulp         = require('gulp'),
    gulpif       = require('gulp-if'),
    sass         = require('gulp-sass'),
    config       = require('../config').sass,
    sourceMaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber      = require('gulp-plumber'),
    gutil        = require('gulp-util'),
    rename       = require('gulp-rename');

gulp.task('sass', ['stylelint'], function() {
  var env   = global.runmode,
      isDev = (env === 'dev');

  return gulp.src(config.src)
       .pipe(gulpif(isDev, sourceMaps.init()))
       .pipe(plumber(function(error) {
         gutil.log(gutil.colors.red(error.message));
         this.emit('end');
       }))
       .pipe(sass(config[env].settings))
       .pipe(autoprefixer({browsers: ['last 2 versions', 'IE >= 8']}))
       .pipe(rename({suffix: '.min'}))
       .pipe(gulpif(isDev, sourceMaps.write(config[env].sourceMapsDir)))
       .pipe(gulp.dest(config[env].dest));
});
