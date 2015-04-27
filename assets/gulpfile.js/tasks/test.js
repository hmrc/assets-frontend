'use strict';

var gulp    = require('gulp'),
	karma     = require('karma').server,
	config    = require('../config').test,
  karmaTask = function(done) {
    karma.start({
      configFile: process.cwd() + '/test/config/karma.conf.js',
      singleRun: true
    },
    function() {
      done ();
    });
  };

gulp.task('test', ['jshint'],  karmaTask);
