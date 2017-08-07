'use strict'

var gulp = require('gulp')
var backstop = require('backstopjs')
var runSequence = require('run-sequence')
var st = require('st')
var http = require('http')
var config = require('../config')
var backstopConfigGenerator = require('./../util/backstop/configGenerator')
var argv = require('yargs').argv
var compLibServer

gulp.task('build-vrt-config', function () {
  return backstopConfigGenerator(config)
})

gulp.task('vrt-baseline', function () {
  var quiet = !!argv.quiet

  runSequence(
    'component-library',
    'vrt-server',
    'build-vrt-config',
    function () {
      backstop('reference', {}, quiet).then(function () {
        compLibServer.close()
      })
      .catch(function (err) {
        console.log(err)
        compLibServer.close()
      })
    }
  )
})

gulp.task('vrt-compare', function () {
  var quiet = !!argv.quiet

  runSequence(
    'component-library',
    'vrt-server',
    'build-vrt-config',
    function () {
      backstop('test', {}, quiet)
        .then(function () {
          compLibServer.close()
        })
        .catch(function (err) {
          console.log(err)
          compLibServer.close()
        })
    }
  )
})

gulp.task('vrt-server', function () {
  compLibServer = http.createServer(
    st(config.compLib.baseDir)
  ).listen(config.compLib.port)
})
