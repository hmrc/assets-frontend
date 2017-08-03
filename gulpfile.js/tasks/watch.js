'use strict'

var gulp = require('gulp')
var config = require('../config')

gulp.task('watch', ['server'], function (callback) {
  gulp.watch(config.scripts.gulpTasks, ['lint:gulpTasks', 'test:gulpTasks'])

  gulp.watch([
    config.scripts.src,
    config.scripts.entryPoint
  ], ['component-library'])

  gulp.watch(config.test.src, ['test'])

  gulp.watch(config.sass.src, ['component-library'])
})
