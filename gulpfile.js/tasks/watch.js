'use strict'

const gulp = require('gulp')
const config = require('../config')
const runSequence = require('run-sequence')
// const designSystemStyles = config.designSystem.src.map((dir) => `${dir}/**/*.scss`)

gulp.task('watch', () => {
  gulp.watch(config.scripts.gulpTasks, ['lint:gulpTasks', 'test:gulpTasks'])

  gulp.watch(
    config.designSystem.src.map((dir) => `${dir}/**/*.scss`),
    () => {
      runSequence(
        'style:v4',
        'copy:design-system'
      )
    }
  )

  gulp.watch(
    config.designSystem.src.map((dir) => `${dir}/**/*.js`),
    () => {
      runSequence(
        'lint:scripts',
        'browserify:v4',
        'copy:design-system'
      )
    }
  )

  gulp.watch(
    config.designSystem.src.map((dir) => `${dir}/**/*.{html,md}`),
    ['design-system:generate']
  )

  gulp.watch(config.test.src, ['test'])
})
