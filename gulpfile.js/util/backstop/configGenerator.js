'use strict'

var fs = require('fs')
var config = require('./../../config')
var BuildScenarios = require('./buildScenarios')

// var Transform = require('stream').Transform
// var util = require('util')

var RemoveBrowserReportOnCI = function (options) {
  Transform.call(this, options)
}

util.inherits(RemoveBrowserReportOnCI, Transform)

RemoveBrowserReportOnCI.prototype._transform = function (chunk, enc, cb) {
  var json = JSON.parse(chunk)

  if (process.env.COMMIT) {
    json.report.splice(json.report.indexOf('browser'), 1)
  }

  this.push(JSON.stringify(json))
  cb()
}

var getCompLibPaths = function () {
  var files = fs.readdirSync(config.compLib.baseDir)

  return files.filter(function (file) {
    return file !== 'index.html' && file.includes('.html')
  })
}

module.exports = function () {
  var compLibPaths = getCompLibPaths()
  var addScenarios = new BuildScenarios({objectMode: true}, compLibPaths)
  var readConfig = fs.createReadStream(config.vrt.backstopConfigTemplate)
  var writeConfig = fs.createWriteStream(config.vrt.backstopConfig)
  // var removeBrowserReportOnCI = new RemoveBrowserReportOnCI({objectMode: true})

  return new Promise(function (resolve, reject) {
    readConfig.setEncoding('utf8')
    readConfig
      .pipe(removeBrowserReportOnCI)
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
