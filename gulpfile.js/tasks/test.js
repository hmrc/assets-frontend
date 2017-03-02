'use strict'

var fs = require('fs')
var gulp = require('gulp')
var karma = require('karma').server
var tape = require('gulp-tape')
var tapSpec = require('tap-spec')
var config = require('../config').test

var karmaTask = function (done) {
  karma.start({
    configFile: fs.realpathSync(config.karmaConfig),
    singleRun: true
  },
  function (exitCode) {
    done(exitCode)
  })
}

gulp.task('test:gulpTasks', function () {
  return gulp.src(config.gulpTasks)
    .pipe(tape({
      bail: true,
      reporter: tapSpec()
    }))
})

gulp.task('test', [
  'sass',
  'lint:tests',
  'lint:scripts',
  'test:gulpTasks'
], karmaTask)
