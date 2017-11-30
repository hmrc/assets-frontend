'use strict'

// @DEPRECATED

var gulp = require('gulp')
var rename = require('gulp-rename')
var jeditor = require('gulp-json-editor')
var packageFile = './package-build.json'
var util = require('gulp-util')
var config = require('../config').production
var version = util.env.release

gulp.task('version', function () {
  if (version && version !== '999-SNAPSHOT') {
    gulp.src(packageFile)
      .pipe(jeditor({
        version: version
      }))
      .pipe(rename('package.json'))
      .pipe(gulp.dest(config.dest))

    util.log(util.colors.green('Version bumped to ' + version))
    util.log(util.colors.green('Wrote file to ' + config.dest + 'package.json'))
  } else {
    util.log(util.colors.cyan('No package.json needs to be written'))
  }
})
