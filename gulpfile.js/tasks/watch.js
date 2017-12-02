'use strict'

const gulp = require('gulp')
const config = require('../config')

// @FIXME: do I need to watch component library file changes? it is not included in the default task
gulp.task('watch', ['server'], () => {
  gulp.watch(config.scripts.gulpTasks, ['test:gulpTasks'])

  gulp.watch([
    config.scripts.src,
    config.scripts.entryPoint,
    config.sass.src
  ], ['component-library'])

  gulp.watch(
    config.patternLibrary.src.map((dir) => `${dir}/**/*`),
    ['pattern-library']
  )

  gulp.watch(config.test.src, ['test'])
})
