'use strict'

const path = require('path')
const gulp = require('gulp')
const replace = require('gulp-replace')
const config = require('../config')

const errorPages = (v) => {
  const version = process.env.TAG ? process.env.TAG : path.parse(config.snapshotDir[v]).name

  return gulp.src(config.errorPages.src)
    .pipe(replace('{{ assetsPath }}', `${config.errorPages.assetsBaseUri}${version}/`))
    .pipe(gulp.dest(config.snapshotDir[v]))
}

gulp.task('error-pages:v3', () => {
  return errorPages('v3')
})

gulp.task('error-pages:v4', () => {
  return errorPages('v4')
})
