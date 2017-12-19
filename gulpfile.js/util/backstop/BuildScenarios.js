'use strict'

var mergeObj = require('./../mergeObj')
var Transform = require('stream').Transform
var util = require('util')
var scenarioTemplate = {
  selectors: [
    '.comp-lib-pattern-component'
  ],
  misMatchThreshold: 0.1,
  'selectorExpansion': true
}
var BuildScenarios = function (options, pagePaths, config) {
  Transform.call(this, options)
  this.pagePaths = pagePaths
  this.data = []
  this.componentLibraryUrl = config.compLib.host + ':' + config.compLib.port
}

util.inherits(BuildScenarios, Transform)

BuildScenarios.prototype._transform = function (chunk, encoding, done) {
  this.data.push(chunk)
  done()
}

BuildScenarios.prototype._flush = function (done) {
  var jsonData
  var dataAsString

  try {
    jsonData = JSON.parse(this.data)
    jsonData.scenarios = jsonData.scenarios.concat(this.createScenarios())
    dataAsString = JSON.stringify(jsonData, null, 2)
  } catch (err) {
    this.emit('error', 'Malformed JSON error')
  }

  this.push(dataAsString || this.data)
  done()
}

BuildScenarios.prototype.createScenarios = function () {
  var componentLibraryUrl = this.componentLibraryUrl

  return this.pagePaths.map(function (path) {
    var pageName = path.slice(8, -5)
    var scenario = mergeObj({
      label: pageName[0].toUpperCase() + pageName.slice(1),
      url: componentLibraryUrl + '/' + path
    }, scenarioTemplate)

    return scenario
  })
}

module.exports = BuildScenarios
