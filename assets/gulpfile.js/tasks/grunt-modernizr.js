'use strict';

var gulp         = require('gulp'),
    modernizr   = require('gulp-modernizr'),
		config       = require('../config').scripts,
    fS           = require('fs'),
    path         = require('path');

require('gulp-grunt')(gulp, { base: path.join(__dirname, '../../'), prefix: ''});

//modernizrConfig = require('./node_modules/modernizr/lib/config-all.json'),

gulp.task('modernizr', [
  'grunt-test'
]);

// gulp.task('modernizr:build', function(cb) {
//   var env = global.runmode;
//   modernizr.build({} , function(result) {
//     fs.writeFile(config.vendorDest[env]);
//   });
// });

// ammend this code so that we can build modernizr from np using gulp.

// gulp.task('generate', 'Create a version of Modernizr from Grunt', function() {
//   var config = require('./lib/config-all'),
//       modernizr = require('./lib/cli'),
//       dest = this.data;

//   modernizr.build(config, function(output) {
//     grunt.file.write(dest, output);
//   });
// });
