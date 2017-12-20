'use strict'

var fs = require('fs')
var BuildScenarios = require('./BuildScenarios')

var getCompLibPaths = function (config) {
  var files = fs.readdirSync(config.compLib.baseDir)

  return files.filter(function (file) {
    return file !== 'index.html' && file.includes('.html')
  })
}

module.exports = function (config) {
  var compLibPaths = getCompLibPaths(config)
  var buildScenarios = new BuildScenarios({objectMode: true}, compLibPaths, config)
  var readConfig = fs.createReadStream(config.vrt.backstopConfigTemplate)
  var writeConfig = fs.createWriteStream(config.vrt.backstopConfig)

  return new Promise(function (resolve, reject) {
    readConfig.setEncoding('utf8')

    readConfig
      .pipe(buildScenarios)
      .on('error', function () {
        reject(new Error('Bad data in template config'))
      })
      .pipe(writeConfig)
      .on('error', function () {
        // calls end() on writeConfig so that tests on Windows finish correctly
        writeConfig.end()
        reject(new Error('Bad data in template config'))
      })
      .on('finish', function () {
        resolve('backstop.json created')
      })
  })
}
