'use strict'

const path = require('path')
const exec = require('child_process').exec
const gulp = require('gulp')
const gutil = require('gulp-util')
const config = require('../config')
const compLibConfig = require('../../component-lib.json')

gulp.task('kss', (done) => {
  const genCompLib = './node_modules/.bin/kss-node --config component-lib.json'

  exec(genCompLib, (err) => {
    done(err)
  })
})

gulp.task('component-library', ['clean:component-library', 'kss', 'build:v3'], () => {
  return gulp.src([config.dest[gutil.env.version] + '/**/*'])
    .pipe(gulp.dest(path.join(compLibConfig.destination, 'public')))
})
