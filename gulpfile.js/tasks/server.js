'use strict'

const gulp = require('gulp')
const portfinder = require('portfinder')
const gutil = require('gulp-util')
const browserSync = require('browser-sync')
const colors = require('colors')
const config = require('../config').browserSync
portfinder.basePort = 9033
const assetsPathV3 = `http://localhost:9032/public/v3-SNAPSHOT/`
const assetsPathV4 = `http://localhost:9032/public/v4-SNAPSHOT/`
// const servers = {}
// const serverMessage = {
//   v4: `Design system running on: http://localhost:${portsInUse[0]}`,
//   v3: `Component library running on: http://localhost:${portsInUse[1]}`,
//   all: `Design system running on: http://localhost:\n  you are running both version 3 and 4 of Assets Frontend`
// }

gulp.task('server', () => {
  if (gutil.env.version === 'v3') {
    startServer('component-library')
      .then(() => {
        startServer('design-pattern-library')
      })
    browserSync.create().init(config.assets, afStarted)
    // afVersionMessage(serverMessage.all)
    // assetsMessage(gutil.env.version)
  } else {
    startServer('design-pattern-library')
    browserSync.create().init(config.assets, afStarted)
    // afVersionMessage(serverMessage.v4)
    // assetsMessage(gutil.env.version)
  }
})

const startServer = (serverPath) => {
  let serverConfig
  return new Promise((resolve, reject) => {
    const hasStarted = () => {

      message(`Started ${serverPath} on port ${serverConfig.port}`)
      // servers[serverPath] = {}
      // servers[serverPath]['config'] = serverConfig
      // console.log(servers)
      // console.log(serverConfig.port)
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
  message('assets-frontend started on port 9032')

}

const message = (message) => {
  return console.log(colors.yellow(`
  ${message}
  `))
}
