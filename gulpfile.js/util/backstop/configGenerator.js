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
      .on('error', reject)
      .pipe(writeConfig)
      .on('error', reject)
      .on('finish', function () {
        resolve('backstop.json created')
      })
  })
}
