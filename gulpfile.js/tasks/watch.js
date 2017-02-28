/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
*/

'use strict'

var gulp = require('gulp')
var config = require('../config')

gulp.task('watch', ['watchify', 'server'], function (callback) {
  gulp.watch(config.scripts.gulpTasks, ['lint:gulpTasks', 'test:gulpTasks'])
  gulp.watch([
    config.scripts.src,
    config.scripts.entryPoint
  ], ['component-library'])
  gulp.watch(config.test.src, ['test'])
  gulp.watch(config.sass.src, ['sass', 'component-library'])

  // Watchify will watch and recompile our JS, so no need to gulp.watch it
})
