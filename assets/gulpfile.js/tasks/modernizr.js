'use strict';

var gulp         = require('gulp'),
    glpModernizr = require('gulp-modernizr'),
    config       = require('../config'),
    fs           = require('fs');

gulp.task('modernizr', function() {
  var env = global.runmode;
  gulp.src([config.sass[env].dest]+ '*.css')
    .pipe(glpModernizr(config.scripts.modernizr))
    .pipe(gulp.dest(config.scripts.vendorDest[env]))
});
