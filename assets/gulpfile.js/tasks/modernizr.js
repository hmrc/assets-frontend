'use strict';

var gulp         = require('gulp'),
    config       = require('../config'),
    gutil        = require('gulp-util'),
    modernizr = require('modernizr');

gulp.task('modernizr', function() {
  var env = global.runmode,
            customModernizr ;

  modernizr.build(config.scripts.modernizr, function(result) {
    customModernizr = result;
    return stringSrc('modernizr.js', result)
    .pipe(gulp.dest(config.scripts.vendorDest[env]));
  });
});

//function that allows us to stream the contents of the modernizr build

function stringSrc(filename, string) {
  var src = require('stream').Readable({ objectMode: true })
  src._read = function() {
    this.push(new gutil.File({ cwd: '', base: '', path: filename, contents: new Buffer(string) }));
    this.push(null);
  }

  return src;
}
