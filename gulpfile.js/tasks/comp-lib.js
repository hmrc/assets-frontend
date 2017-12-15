'use strict'

var del = require('del')
var path = require('path')
var gulp = require('gulp')
var exec = require('child_process').exec
var config = require('../config')
var compLibConfig = require('../../component-lib.json')
var os = require('os')

gulp.task('clean-comp-lib', function (cb) {
  del(compLibConfig.destination, cb)
})

gulp.task('component-library', ['clean-comp-lib', 'sass', 'images', 'browserify'], function (cb) {
  var env = global.runmode
  var genCompLib

  if (os.platform() === 'win32') {
    genCompLib = '.\\node_modules\\.bin\\kss-node --config .\\component-lib.json'
  } else {
    genCompLib = './node_modules/.bin/kss-node --config component-lib.json'
  }

  exec(genCompLib, function (err, stout, sterr) {
    var files = [
      config.images[env].dest + '/**/*',
      config.sass[env].dest + '**/*',
      config.scripts[env].dest + '/**/*'
    ]

    gulp.src(files, { base: config[env].dest })
        .pipe(gulp.dest(path.join(compLibConfig.destination, 'public')))

    cb(err)
  })
})
