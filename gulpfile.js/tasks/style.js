'use strict'

const path = require('path')
const gulp = require('gulp')
const sass = require('gulp-sass')
const config = require('../config')
const sourceMaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const replace = require('gulp-replace')
const gutil = require('gulp-util')
const rename = require('gulp-rename')
const runSequence = require('run-sequence')

function sassToCss (stream) {
  return stream
    .pipe(sourceMaps.init())
    .pipe(plumber((error) => {
      gutil.log(gutil.colors.red(error.message))
      this.emit('end')
    }))
    .pipe(sass(config.sass.settings))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'IE >= 8']}))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourceMaps.write(config.sass.sourceMapsDir))
    .pipe(gulp.dest(path.join(config.snapshotDir[gutil.env.version], config.sass.destDirName)))
}

gulp.task('style', (done) => {
  runSequence(
    'style:v3',
    'style:v4',
    done
  )
})

gulp.task('style:v3', () => {
  return sassToCss(gulp.src(config.sass.src))
})

gulp.task('style:v4', () => {
  return sassToCss(
    gulp.src(config.sass.src).pipe(replace(/^@import.*scss\/.*$/gmi, ''))
  )
})
