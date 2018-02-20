'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')

runSequence.options.showErrorStackTrace = false

const globalTasks = ['lint', 'stylelint', 'test:gulpTasks']

gulp.task('build', ['build:v3', 'build:v4'])

gulp.task('build:v3', ['clean:v3'].concat(globalTasks), () => {
  runSequence(
    ['style:v3', 'images:v3', 'svg:v3'],
    'test:v3',
    ['error-pages:v3', 'concat:encryption:v3', 'modernizr:v3', 'browserify:v3']
  )
})

gulp.task('build:v4', ['clean:v4'].concat(globalTasks), (done) => {
  runSequence(
    ['style:v4', 'images:v4', 'svg:v4'],
    'test:v4',
    ['error-pages:v4', 'concat:encryption:v4', 'modernizr:v4', 'browserify:v4'],
    done
  )
})
