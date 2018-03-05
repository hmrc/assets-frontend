'use strict'

const fs = require('fs')
const gulp = require('gulp')
const zip = require('gulp-zip')
const config = require('../config')

gulp.task('zip', () => {
  const versions = fs.readdirSync(config.dest)

  return Promise.all(versions.map((version) => {
    return Promise.resolve(
      gulp.src([
        `${config.dest}${version}/**/*`,
        `!${config.dest}**/*.map`
      ])
        .pipe(zip(`assets-frontend-${version.split('-')[0]}.zip`))
        .pipe(gulp.dest(config.distDir))
    )
  }))
})
