'use strict'

const gulp = require('gulp')
const config = require('../config')

gulp.task('watch', ['server'], () => {
  gulp.watch(config.scripts.gulpTasks, ['test:gulpTasks'])

  gulp.watch(
    config.patternLibrary.src.map((dir) => `${dir}/**/*`),
    ['pattern-library']
  )

  gulp.watch(config.test.src, ['test'])
})
