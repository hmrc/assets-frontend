'use strict'

var gulp = require('gulp')
var zip = require('gulp-zip')
var config = require('../config').production

gulp.task('zip', function () {
  return gulp.src(config.dest + '**/*')
    .pipe(zip('assets-frontend-999-SNAPSHOT.zip'))
    .pipe(gulp.dest(config.dest))
})
