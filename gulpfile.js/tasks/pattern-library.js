'use strict'

var del = require('del')
var path = require('path')
var gulp = require('gulp')
var config = require('../config')
var patternLibrary = require('../util/pattern-library')

gulp.task('clean-pattern-library', function (done) {
  del(config.patternLibrary.dest, done)
})

gulp.task('pattern-library', ['clean-pattern-library', 'sass', 'images', 'browserify'], function () {
  var env = global.runmode

  return patternLibrary(config.patternLibrary)
    .then(() => {
      var files = [
        config.images[env].dest + '/**/*',
        config.sass[env].dest + '**/*',
        config.scripts[env].dest + '/**/*'
      ]

      return gulp
        .src(files, { base: config[env].dest })
        .pipe(gulp.dest(path.join(config.patternLibrary.dest, 'public')))
    })
})
