'use strict'

var fs = require('fs')
var gulp = require('gulp')
var Server = require('karma').Server
var tape = require('gulp-tape')
var tapSpec = require('tap-spec')
var config = require('../config').test

var karmaTask = function (done) {
  var server = new Server({
    configFile: fs.realpathSync(config.karmaConfig),
    singleRun: true
  },
  function (exitCode) {
    done(exitCode)
  })

  server.start()
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
  'lint',
  'test:gulpTasks'
], karmaTask)
