'use strict';

var del = require('del'),
    gulp = require('gulp'),
    config = require('../config'),
    compLibConfig = require('../../component-lib.json'),
    exec = require('child_process').exec;

gulp.task('clean-comp-lib', function(cb) {
  del(compLibConfig.destination, cb);
});

gulp.task('component-library', ['clean-comp-lib'], function (cb) {
  exec('npm run comp-lib', function (err, stout, sterr) {
    cb(err);
  });
});
