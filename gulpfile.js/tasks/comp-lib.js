'use strict'

var del = require('del')
var path = require('path')
var gulp = require('gulp')
var exec = require('child_process').exec
var config = require('../config')
var compLibConfig = require('../../component-lib.json')
var componentParser = require('../util/component-library/componentParser')
var componentRenderer = require('../util/component-library/componentRenderer')
var updateLibraryNav = require('../util/component-library/updateLibraryNav')

gulp.task('clean-comp-lib', function (cb) {
  del(compLibConfig.destination, cb)
})

gulp.task('kss-node', ['clean-comp-lib', 'sass', 'images', 'browserify'], function (cb) {
  var env = global.runmode
  var genCompLib = './node_modules/.bin/kss-node --config component-lib.json'

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

gulp.task('component-library', ['kss-node'], function (cb) {
  gulp.src(config.compLib.src)
      .pipe(componentParser())
      .pipe(componentRenderer({
        template: path.join(compLibConfig.template, 'new-structure.html')
      }))
      .pipe(updateLibraryNav({
        library: path.join(compLibConfig.destination)
      }))
      .pipe(gulp.dest(compLibConfig.destination))
})
