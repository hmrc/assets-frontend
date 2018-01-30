'use strict'

const gulp = require('gulp')
const portfinder = require('portfinder')
const gutil = require('gulp-util')
const browserSync = require('browser-sync')
const colors = require('colors')
const config = require('../config').browserSync
const assetsPathV3 = `http://localhost:9032/public/v3-SNAPSHOT/`
const assetsPathV4 = `http://localhost:9032/public/v4-SNAPSHOT/`
portfinder.basePort = 9033

gulp.task('server', () => {
  if (gutil.env.version === 'v3') {
    startServer('component-library')
      .then(() => {
        startServer('design-pattern-library').then(() => {
          afStarted()
        })
      })
    browserSync.create().init(config.assets)
  } else {
    startServer('design-pattern-library').then(() => {
      afStarted()
    })
    browserSync.create().init(config.assets)
  }
})

const startServer = (serverPath) => {
  let serverConfig
  return new Promise((resolve, reject) => {
    const hasStarted = () => {
      message(`Started ${serverPath} on http://localhost:${serverConfig.port}`)
      resolve()
    }
    try {
      getServerConfig(serverPath).then((config) => {
        serverConfig = config
        browserSync.create(serverPath).init(config, hasStarted)
      })
    } catch (err) {
      reject(err)
    }
  })
}

const getServerConfig = (serverPath) => {
  return new Promise((resolve, reject) => {
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        resolve({
          ui: false,
          logLevel: 'silent',
          port: port,
          open: false,
          server: serverPath
        })
      }
    })
  })
}

const afStarted = () => {
  message('assets-frontend started on http://localhost:9032')
}

const message = (message) => {
  return console.log(colors.yellow(`
  ${message}
  `))
}
