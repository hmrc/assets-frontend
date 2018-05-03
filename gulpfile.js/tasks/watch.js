'use strict'

const gulp = require('gulp')
const config = require('../config')
const runSequence = require('run-sequence')
const gutil = require('gulp-util')

runSequence.options.showErrorStackTrace = false

const tasksComplete = () => {
  console.log(gutil.colors.green('\nWatch tasks finished. Waiting for changes...\n'))
}

gulp.task('watch', () => {
  gulp.watch(config.scripts.gulpTasks, ['lint:gulpTasks', 'test:gulpTasks', tasksComplete])

  gulp.watch(
    config.designSystem.src.map((dir) => `${dir}/**/*.scss`),
    () => {
      runSequence(
        'style:v4',
        'copy:design-system',
        tasksComplete
      )
    }
  )

  var testsToWatch = config.test.files.v4.map((glob) => `${config.src}${glob}`)

  console.log('testsToWatch', testsToWatch)
  gulp.watch(testsToWatch,
    () => {
      console.log('testsToWatch', testsToWatch)
      runSequence(
        'lint:scripts',
        'test:v4',
        tasksComplete
      )
    }
  )

  gulp.watch(
    config.designSystem.src
      .map((dir) => `${dir}/**/*.js`)
      .concat(config.designSystem.src.map((dir) => `!${dir}/**/*.test.js`)),
    () => {
      runSequence(
        'lint:scripts',
        'test:v4',
        'browserify:v4',
        'copy:design-system',
        tasksComplete
      )
    }
  )

  gulp.watch(
    config.designSystem.src.map((dir) => `${dir}/**/*.{html,md}`),
    () => {
      runSequence(
        'design-system',
        tasksComplete
      )
    }
  )
})
