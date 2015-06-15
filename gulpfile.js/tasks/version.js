'use strict';

var gulp        = require('gulp'),
    rename      = require('gulp-rename'),
    jeditor     = require('gulp-json-editor'),
    packageFile = './package-build.json',
    util        = require('gulp-util'),
    config      = require('../config').production,
    version     = util.env.release;

gulp.task('version', function() {
  if (version && version !== '999-SNAPSHOT') {
    gulp.src(packageFile)
      .pipe(jeditor({
        version: version
      }))
      .pipe(rename('package.json'))
      .pipe(gulp.dest(config.dest));

    util.log(util.colors.green('Version bumped to ' + version));
    util.log(util.colors.green('Wrote file to ' + config.dest + 'package.json'));
  } else {
    util.log(util.colors.cyan('No package.json needs to be written'));
  }
});
