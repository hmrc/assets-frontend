'use strict'

const gulp = require('gulp')
const config = require('../config')
const gutil = require('gulp-util')

const tasksComplete = () => {
  console.log(gutil.colors.green('\nWatch tasks finished. Waiting for changes...\n'))
}

gulp.task('watch', () => {
  gulp.watch(config.scripts.gulpTasks, ['lint:gulpTasks', 'test:gulpTasks', tasksComplete])

  gulp.watch(
    config.designSystem.src.map((dir) => `${dir}/**/*.scss`),
    () => gulp.series(
        'style:v4',
        'copy:design-system',
        tasksComplete
      )
  )

  var testsToWatch = config.test.files.v4.map((glob) => `${config.src}${glob}`)

  gulp.watch(testsToWatch,
    () => gulp.series(
        'lint:scripts',
        'test:v4',
        tasksComplete
      )
  )

  gulp.watch(
    config.designSystem.src
      .map((dir) => `${dir}/**/*.js`)
      .concat(config.designSystem.src.map((dir) => `!${dir}/**/*.test.js`)),
    () => gulp.series(
        'lint:scripts',
        'test:v4',
        'browserify:v4',
        'copy:design-system',
        tasksComplete
      )
  )

  gulp.watch(
    config.designSystem.src.map((dir) => `${dir}/**/*.{html,md}`),
    () => gulp.series(
        'design-system',
        tasksComplete
      )
  )
})
