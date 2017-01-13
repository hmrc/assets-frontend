/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
*/

'use strict';

var config   = require('../config'),
	gulp     = require('gulp');

gulp.task('watch', ['watchify', 'server'], function(callback) {
  gulp.watch(config.scripts.src, ['component-library']);
  gulp.watch(config.test.src,  ['test']);
  gulp.watch(config.sass.src,  ['sass', 'component-library']);

  // Watchify will watch and recompile our JS, so no need to gulp.watch it
});
