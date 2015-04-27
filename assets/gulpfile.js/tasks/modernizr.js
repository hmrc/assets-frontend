// 'use strict';

// var gulp         = require('gulp'),
//     glpModernizr = require('gulp-modernizr'),
//     modernizer   = require('modernizr'),
// 		config       = require('../config').scripts,
// 	//modernizrConfig = require('./node_modules/modernizr/lib/config-all.json'),
// 	fs				= require('fs');

// gulp.task('modernizr', function() {
// 	var env = global.runmode;
// 	// return gulp.src(config.src)
// 	// 	.pipe(glpModernizr(config.modernizr))
// 	// 	.pipe(gulp.dest(config.vendorDest[env]))
// });

// // gulp.task('modernizr:build', function () {
// // 	var env = global.runmode,
// // 		modernizrConfig = require('./node_modules/lib/config-all');
// // 	modernizr.build(config.modernizr, function (result) {
// // 		fs.writeFile(config.vendorDest[env])
// // 	});
// // });

// // // ammend this code so that we can build modernizr from np using gulp.

// //   gulp.task('generate', 'Create a version of Modernizr from Grunt', function() {
// //     var config = require('./lib/config-all');
// //     var modernizr = require('./lib/cli');
// //     var dest = this.data;

// //     modernizr.build(config, function(output) {
// //       grunt.file.write(dest, output);
// //     });
// //   });
