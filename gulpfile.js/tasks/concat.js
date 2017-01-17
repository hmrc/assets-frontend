'use strict'

var gulp = require('gulp')
var gulpIf = require('gulp-if')
var config = require('../config')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')

gulp.task('concatEncryption', function () {
  var env = global.runmode
  var isDev = (env === 'dev')

  return gulp.src(config.scripts.encryptionSrc)
    .pipe(concat('encryption.js'))
    .pipe(gulpIf(!isDev, uglify()))
    .pipe(rename(function (path) {
      path.extname = '.min.js'
    }))
    .pipe(gulp.dest(config.scripts.encryptionDest[env]))
})
