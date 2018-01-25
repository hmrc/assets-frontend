'use strict'

const gulp = require('gulp')
const gutil = require('gulp-util')
const browserSync = require('browser-sync')
const colors = require('colors')
const config = require('../config').browserSync
const serverMessage = require('../config').serverMessage
const assetsPathV3 = `http://localhost:9032/public/v3-SNAPSHOT/`
const assetsPathV4 = `http://localhost:9032/public/v4-SNAPSHOT/`

gulp.task('server', () => {
  if (gutil.env.version === 'v3') {
    browserSync.create().init(config.v4, afVersionMessage(serverMessage.all))
    browserSync.create().init(config.v3, afVersionMessage(serverMessage.v3))
    browserSync.create().init(config.assets, assetsMessage(gutil.env.version))
  } else {
    browserSync.create().init(config.v4, afVersionMessage(serverMessage.v4))
    browserSync.create().init(config.assets, assetsMessage(gutil.env.version))
  }
})

const afVersionMessage = (message) => {
  return console.log(colors.green(`
  #######################################################
  
  ${message}
  
  #######################################################
  `))
}

const assetsMessage = (version) => {
  if (version === 'v3') {
    return console.log(colors.yellow(`
  #######################################################
  
  Assets running on:
  ${assetsPathV4} \n  ${assetsPathV3}
  
  #######################################################
  `))
  } else {
    return console.log(colors.yellow(`
  #######################################################
  
  Assets running on:
  ${assetsPathV4}
  
  #######################################################
  `))
  }
}
