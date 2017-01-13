'use strict';

var gulp = require('gulp'),
    config = require('../config').errorPages;

gulp.task('error-pages', function() {
  var env = global.runmode;

  gulp.src(config.src)
      .pipe(gulp.dest(config[env].dest));
});
