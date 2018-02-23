'use strict'

const net = require('net')
const gulp = require('gulp')
const gutil = require('gulp-util')
const browserSync = require('browser-sync')
const config = require('../config')

const titleCase = (string) => {
  return string.split('-').map(_ => _.charAt(0).toUpperCase() + _.substring(1)).join(' ')
}

const isPortAvailable = (port, host) => {
  return new Promise((resolve, reject) => {
    const client = new net.Socket()
    client.once('connect', () => resolve(port))
    client.once('error', (err) => {
      if (err.code !== 'ECONNREFUSED') {
        reject(err)
      } else {
        resolve(false)
      }
    })

    client.connect({port, host})
  })
}

const getConfigsExcluding = (configs, exclude) => {
  return configs.filter(config => config.server !== exclude)
}

const startBrowserSync = (name, config) => {
  browserSync.create(name).init(config, () => {
    console.log(gutil.colors.green(`\n${titleCase(name)} server started on port ${config.port}`))
    console.log(gutil.colors.green(`-> http://localhost:${config.port}`))
  })
}

const startServers = (configs, done) => {
  configs.forEach(config => {
    const name = typeof config.server === 'string' ? config.server : 'assets-frontend'

    if (name === 'assets-frontend') {
      isPortAvailable(config.port, config.host)
        .then((port) => {
          if (port) {
            console.log(gutil.colors.red(`\nPort ${port} is not available. Kill any processes listening on this port and try again.`))
            done(process.exit(1))
          } else {
            startBrowserSync(name, config)
          }
        })
        .catch((err) => {
          console.error('Error checking for port:', err.message)
        })
    } else {
      startBrowserSync(name, config)
    }
  })
}

gulp.task('server:v4', (done) => {
  const configs = getConfigsExcluding(config.browserSync, 'component-library')
  return startServers(configs, done)
})

gulp.task('server:all', (done) => {
  const configs = getConfigsExcluding(config.browserSync, null)
  return startServers(configs, done)
})
