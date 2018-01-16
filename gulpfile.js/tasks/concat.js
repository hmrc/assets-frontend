'use strict'

const path = require('path')
const gulp = require('gulp')
const gutil = require('gulp-util')
const config = require('../config')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')

gulp.task('concat:encryption', () => {
  const dest = path.join(config.dest[gutil.env.version], config.scripts.destDirName)

  return gulp.src(config.scripts.encryptionSrc)
    .pipe(concat('encryption.js'))
    .pipe(uglify())
    .pipe(rename((path) => {
      path.extname = '.min.js'
    }))
    .pipe(gulp.dest(dest))
})
