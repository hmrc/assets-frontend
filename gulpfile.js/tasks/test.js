'use strict'

const path = require('path')
const gulp = require('gulp')
const karmaConfig = require('karma').config
const Server = require('karma').Server
const tape = require('gulp-tape')
const tapSpec = require('tap-spec')
const config = require('../config').test

gulp.task('test:gulpTasks', gulp.series('lint:gulpTasks', () => gulp.src(config.gulpTasks)
  .pipe(tape({
    bail: true,
    reporter: tapSpec()
  }))))

gulp.task('test:v3', (done) => {
  const v3KarmaConfig = karmaConfig.parseConfig(
    path.resolve(config.karmaConfig),
    { files: config.files.v3 }
  )

  const server = new Server(
    v3KarmaConfig,
    (exitCode) => {
      done(exitCode)
    }
  )

  server.start()
})

gulp.task('test:v4', (done) => {
  const v4KarmaConfig = karmaConfig.parseConfig(
    path.resolve(config.karmaConfig),
    { files: config.files.v4 }
  )

  const server = new Server(
    v4KarmaConfig,
    (exitCode) => {
      done(exitCode)
    }
  )

  server.start()
})

gulp.task('test', gulp.series(gulp.parallel('style', 'images', 'svg'), gulp.parallel('test:v3', 'test:v4')))
