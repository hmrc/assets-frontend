'use strict'

const gulp = require('gulp')
const config = require('../config')

gulp.task('images', () => {
  var env = global.runmode

  return gulp.src(config.images.src)
    .pipe(gulp.dest(config.images[env].dest))
})
