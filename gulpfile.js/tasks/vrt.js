'use strict'

var gulp = require('gulp')
var backstop = require('backstopjs')
var runSequence = require('run-sequence')
var st = require('st')
var http = require('http')
var config = require('../config')
var backstopConfigGenerator = require('./../util/backstop/configGenerator')
var compLibServer

gulp.task('build-vrt-config', function () {
  return backstopConfigGenerator()
})

gulp.task('vrt-baseline', function () {
  runSequence(
    'component-library',
    'vrt-server',
    'build-vrt-config',
    function () {
      backstop('reference')
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

gulp.task('vrt-compare', function (done) {
  runSequence(
    'component-library',
    'vrt-server',
    'build-vrt-config',
    function () {
      backstop('test')
        .then(function () {
          compLibServer.close()
        })
        .catch(function (err) {
          compLibServer.close()
          done('[FAIL] gulp VRT task failed')
        })
    }
  )
})

gulp.task('vrt-server', function () {
  compLibServer = http.createServer(
    st(config.compLib.baseDir)
  ).listen(config.compLib.port)
})
