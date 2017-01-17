'use strict'

var gulp = require('gulp')
var gulpif = require('gulp-if')
var sass = require('gulp-sass')
var config = require('../config').sass
var sourceMaps = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')
var plumber = require('gulp-plumber')
var gutil = require('gulp-util')
var rename = require('gulp-rename')

gulp.task('sass', ['stylelint'], function () {
  var env = global.runmode
  var isDev = (env === 'dev')

  return gulp.src(config.src)
     .pipe(gulpif(isDev, sourceMaps.init()))
     .pipe(plumber(function (error) {
       gutil.log(gutil.colors.red(error.message))
       this.emit('end')
     }))
     .pipe(sass(config[env].settings))
     .pipe(autoprefixer({browsers: ['last 2 versions', 'IE >= 8']}))
     .pipe(rename({suffix: '.min'}))
     .pipe(gulpif(isDev, sourceMaps.write(config[env].sourceMapsDir)))
     .pipe(gulp.dest(config[env].dest))
})
