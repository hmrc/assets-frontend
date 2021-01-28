'use strict'

const path = require('path')
const gulp = require('gulp')
const replace = require('gulp-replace')
const config = require('../config')
const NodeGitVersion = require('./node-git-versioning')
let version = ''

const errorPages = (v) => {
  const nextMinorVersion = parseInt(NodeGitVersion().split('.')[1]) + 1

  if (/https?:\/\/.*\.tax\.service\.gov\.uk\//.test(process.env.JENKINS_URL)) {
    version = [v.slice(1), nextMinorVersion, '0'].join('.')
  } else {
    version = path.parse(config.snapshotDir[v]).name
  }
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
