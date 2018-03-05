'use strict'

const del = require('del')
const gulp = require('gulp')
const config = require('../config')

gulp.task('clean', ['clean:v3', 'clean:v4'])

gulp.task('clean:v4', () => {
  return del([config.designSystem.dest, config.snapshotDir.v4])
})

gulp.task('clean:v3', () => {
  return del([config.componentLibrary.dest, config.snapshotDir.v3])
})

gulp.task('clean:dist', () => {
  return del([config.distDir])
})
