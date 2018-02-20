'use strict'

const path = require('path')
const gulp = require('gulp')
const config = require('../config')

const images = (v) => {
  const dest = path.join(config.snapshotDir[v], config.images.destDirName)

  return gulp.src(config.images.src)
    .pipe(gulp.dest(dest))
}

gulp.task('images:v3', () => {
  return images('v3')
})

gulp.task('images:v4', () => {
  return images('v4')
})
