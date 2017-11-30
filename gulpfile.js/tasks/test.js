'use strict'

const fs = require('fs')
const gulp = require('gulp')
const Server = require('karma').Server
const tape = require('gulp-tape')
const tapSpec = require('tap-spec')
const config = require('../config').test

const karmaTask = (done) => {
  const server = new Server({
    configFile: fs.realpathSync(config.karmaConfig),
    singleRun: true
  },
  function (exitCode) {
    done(exitCode)
  })

  server.start()
}

gulp.task('test:gulpTasks', () => {
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
