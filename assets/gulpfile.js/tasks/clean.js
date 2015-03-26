var del     = require('del'),
    gulp    = require('gulp'),
    config  = require('../config');

gulp.task('clean', function (cb) {
  del([
    config.dest,
    config.distDir
  ], cb);
});
