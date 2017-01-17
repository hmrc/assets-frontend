'use strict'

var mergeObj = require('./../mergeObj')
var sep = require('path').sep
var Transform = require('stream').Transform
var util = require('util')
var config = require('./../../config')
var componentLibraryUrl = config.compLib.host + ':' + config.compLib.port
var scenarioTemplate = {
  selectors: [
    '.comp-lib-pattern-component'
  ],
  misMatchThreshold: 0.1,
  'selectorExpansion': true
}
var AddScenarios = function (options, pagePaths) {
  Transform.call(this, options)
  this.pagePaths = pagePaths
  this.data = []
}

util.inherits(AddScenarios, Transform)

AddScenarios.prototype._transform = function (chunk, encoding, done) {
  this.data.push(chunk)
  done()
}

AddScenarios.prototype._flush = function (done) {
  let jsonData
  let stringData

  try {
    jsonData = JSON.parse(this.data)
  } catch (err) {
    throw err
  }

  Array.prototype.push.apply(jsonData.scenarios, this.createScenarios())

  try {
    stringData = JSON.stringify(jsonData, null, 2)
  } catch (err) {
    throw err
  }

  this.push(stringData)
  done()
}

AddScenarios.prototype.createScenarios = function () {
  return this.pagePaths.map(function (path) {
    var pageName = path.slice(8, -5)
    var scenario = mergeObj({
      label: pageName[0].toUpperCase() + pageName.slice(1),
      url: componentLibraryUrl + sep + path
    }, scenarioTemplate)

    return scenario
  })
}

module.exports = AddScenarios
