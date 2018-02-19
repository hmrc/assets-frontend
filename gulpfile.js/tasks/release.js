'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('release', ['changelog', 'clean', 'clean:dist'], (done) => {
  runSequence(
    'build',
    'zip',
    done
  )
})

gulp.task('release:v3', ['changelog', 'clean', 'clean:dist'], (done) => {
  runSequence(
    'build:v3',
    'zip',
    done
  )
})

gulp.task('release:v4', ['changelog', 'clean', 'clean:dist'], (done) => {
  runSequence(
    'build:v4',
    'zip',
    done
  )
})
