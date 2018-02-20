'use strict'

const gulp = require('gulp')
const config = require('../config')
const designSystem = require('../util/design-system')

gulp.task('design-system', ['build:v4'], () => {
  return designSystem(config.designSystem)
    .then(gulp.start('copy:design-system'))
})
