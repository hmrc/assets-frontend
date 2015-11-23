'use strict';

var fs        = require('fs'),
    gulp      = require('gulp'),
  	karma     = require('karma').server,
  	config    = require('../config').test,
    karmaTask = function(done) {
      karma.start({
        configFile: fs.realpathSync(config.karmaConfig),
        singleRun: true
      },
      function() {
        done ();
      });
    };

gulp.task('test', ['sass', 'jshint'],  karmaTask);
