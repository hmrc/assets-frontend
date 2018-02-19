'use strict'

const gulp = require('gulp')
const portfinder = require('portfinder')
const gutil = require('gulp-util')
const browserSync = require('browser-sync')
const colors = require('colors')
const config = require('../config')
const assetsPathV3 = `http://localhost:9032/public/v3-SNAPSHOT/`
const assetsPathV4 = `http://localhost:9032/public/v4-SNAPSHOT/`

gulp.task('server', () => {
  if (gutil.env.version === 'v3') {
    browserSync.create().init(config.browserSync.assets, afStarted)
    startServer('designSystem')
      .then(() => {
        startServer('componentLibrary')
      })
  } else {
    browserSync.create().init(config.browserSync.assets, afStarted)
    startServer('designSystem')
  }
})

const startServer = (serverName) => {
  const serverPath = config[serverName].dest
  portfinder.basePort = config[serverName].basePort
  let serverConfig
  return new Promise((resolve, reject) => {
    const hasStarted = () => {
      message(`${config[serverName].friendlyName} started on http://localhost:${serverConfig.port}/`)
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

const afStartupMessage = (version) => {
  let output = 'Assets frontend started on http://localhost:9032/\n'
  switch (version) {
    case 'v3':
      output +=
        `\tVersion 3 assets are available at: ${assetsPathV3}\n` +
        `\tVersion 4 assets are available at: ${assetsPathV4}`
      break
    case 'v4':
      output +=
        `\tVersion 4 assets are available at: ${assetsPathV4}`
  }
  return output
}

const afStarted = () => {
  message(afStartupMessage(gutil.env.version))
}

const message = (message) => {
  return console.log(colors.green(`\n${message}`))
}
