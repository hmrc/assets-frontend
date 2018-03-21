'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')

runSequence.options.showErrorStackTrace = false

gulp.task('release', ['release:v3', 'release:v4'])

gulp.task('release:v3', ['changelog', 'clean:dist'], (done) => {
  runSequence(
    'build:v3',
    'version:v3',
    done
  )
})

gulp.task('release:v4', ['changelog', 'clean:dist'], (done) => {
  runSequence(
    'build:v4',
    'version:v4',
    done
  )
})
