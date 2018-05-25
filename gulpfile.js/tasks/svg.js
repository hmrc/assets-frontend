'use strict'

const path = require('path')
const gulp = require('gulp')
const svgmin = require('gulp-svgmin')
const config = require('../config')

const svg = (v) => {
  const dest = path.join(
    config.snapshotDir[v],
    config.images.destDirName
  )

  return gulp.src(config.svg.src)
    .pipe(svgmin())
    .pipe(gulp.dest(dest))
}

gulp.task('svg', ['svg:v3', 'svg:v4'])

gulp.task('svg:v3', () => {
  return svg('v3')
})

gulp.task('svg:v4', () => {
  return svg('v4')
})
