'use strict'

const gulp = require('gulp')
const gutil = require('gulp-util')
const browserSync = require('browser-sync')
const colors = require('colors')
const config = require('../config').browserSync
const serverMessage = require('../config').serverMessage

gulp.task('server', () => {
  if (gutil.env.version === 'v3') {
    browserSync.create().init(config.v4, message(serverMessage.all))
    browserSync.create().init(config.v3, message(serverMessage.v3))
    browserSync.create().init(config.assets, message(serverMessage.assets))
  } else {
    browserSync.create().init(config.v4, message(serverMessage.v4))
    browserSync.create().init(config.assets, message(serverMessage.assets))
  }
})


const message = (message)=>{
  return console.log(colors.green(`
  #######################################################
  
  ${message}
  
  #######################################################
  `))
}


