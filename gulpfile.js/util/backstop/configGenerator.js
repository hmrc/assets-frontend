'use strict'

var fs = require('fs')
var config = require('./../../config')
var BuildScenarios = require('./buildScenarios')

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
      .pipe(addScenarios)
      .pipe(writeConfig)
      .on('finish', function () {
        resolve('backstop.json created')
      })
      .on('error', function (err) {
        reject(err)
      })
  })
}
