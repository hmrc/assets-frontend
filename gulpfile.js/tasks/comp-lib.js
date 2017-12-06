'use strict'

const exec = require('child_process').exec
const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('kss', (done) => {
  const genCompLib = './node_modules/.bin/kss-node --config component-lib.json'

  exec(genCompLib, (err) => {
    done(err)
  })
})

gulp.task('component-library', ['clean:component-library'], () => {
  runSequence(
    'kss',
    'build:v3',
    'copy:component-library'
  )
})
