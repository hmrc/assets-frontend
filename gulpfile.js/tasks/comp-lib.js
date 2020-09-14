'use strict'

const exec = require('child_process').exec
const gulp = require('gulp')

gulp.task('kss', (done) => {
  const genCompLib = './node_modules/.bin/kss --c component-lib.json'
  exec(genCompLib, (err) => {
    done(err)
  })
})
