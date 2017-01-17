'use strict'

var gulp = require('gulp')
var replace = require('gulp-replace')
var config = require('../config').errorPages

gulp.task('error-pages', function () {
  var env = global.runmode

  gulp.src(config.src)
      .pipe(replace('{{ assetsPath }}', config[env].assetsPath))
      .pipe(gulp.dest(config[env].dest))
})
