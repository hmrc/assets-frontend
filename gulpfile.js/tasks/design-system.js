'use strict'

const gulp = require('gulp')
const config = require('../config')
const designSystem = require('../util/design-system')

gulp.task('design-system:generate', () => {
  return designSystem(config.designSystem)
})
