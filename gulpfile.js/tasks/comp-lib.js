'use strict';

var del = require('del'),
    gulp = require('gulp'),
    config = require('../config'),
    compLibConfig = require('../../component-lib.json'),
    exec = require('child_process').exec;

gulp.task('clean-comp-lib', function(cb) {
  del(compLibConfig.destination, cb);
});

gulp.task('component-library', ['clean-comp-lib', 'sass', 'images'], function (cb) {
  var env = global.runmode,
      genCompLib = './node_modules/.bin/kss-node --config component-lib.json';

  exec(genCompLib, function (err, stout, sterr) {
    gulp.src([config.images[env].dest + '/**/*', config.sass[env].dest + '**/*'], {base: config[env].dest})
      .pipe(gulp.dest(compLibConfig.destination + '/public'));
    cb(err);
  });
});
