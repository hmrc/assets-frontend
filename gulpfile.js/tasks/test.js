'use strict'

var fs = require('fs')
var gulp = require('gulp')
var karma = require('karma').server
var config = require('../config').test

var karmaTask = function (done) {
  karma.start({
    configFile: fs.realpathSync(config.karmaConfig),
    singleRun: true
  },
  function () {
    done()
  })
}

gulp.task('test', ['sass', 'lint:tests', 'lint:scripts'], karmaTask)
