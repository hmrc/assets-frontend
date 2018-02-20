'use strict'

const gulp = require('gulp')
const config = require('../config')
const runSequence = require('run-sequence')

runSequence.options.showErrorStackTrace = false

const tasksComplete = () => {
  console.log('\nWatch tasks finished. Waiting for changes...\n'.green)
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

  gulp.watch(
    config.test.files.v4.map((glob) => `${config.src}${glob}`),
    () => {
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
