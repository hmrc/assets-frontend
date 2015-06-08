'use strict';

var gulp         = require('gulp'),
    config       = require('../config'),
    gutil        = require('gulp-util'),
    modernizr = require('customizr'),
    configJSON = require('../../node_modules/modernizr/lib/config-all.json');

gulp.task('modernizr', function() {
  var env = global.runmode,
            customModernizr ;

var myresult = modernizr(config.scripts.modernizr, function() {

   // return stringSrc('modernizr.js', result)
    //.pipe(gulp.dest(config.scripts.vendorDest[env]));
  });
});
console.log(modernizr(config.scripts.modernizr, function() {}))

//function that allows us to stream the contents of the modernizr build

function stringSrc(filename, string) {
  console.log(lodash)
  var src = require('stream').Readable({ objectMode: true })
  src._read = function() {
    this.push(new gutil.File({ cwd: '', base: '', path: filename, contents: new Buffer(string) }));
    this.push(null);
  }

  return src;
}
