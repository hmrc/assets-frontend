var fs = require('fs')
var path = require('path')
var test = require('tape')
var configGenerator = require('./../util/backstop/configGenerator')
var deepClone = require('./../util/deepClone')
var testFixturesPath = './gulpfile.js/tests/fixtures/configGenerator/'
var config = {
  compLib: {
    port: 7000,
    host: 'http://example',
    baseDir: testFixturesPath
  },
  vrt: {
    backstopConfigTemplate: testFixturesPath + 'backstop.template.json',
    backstopConfig: testFixturesPath + 'backstop.json'
  }
}

var removeFiles = function (files) {
  return new Promise(function (resolve) {
    files.forEach(function (file) {
      fs.unlink(file, resolve)
    })
  })
}

var getBackstopConfigData = function () {
  return new Promise(function (resolve, reject) {
    fs.readFile(config.vrt.backstopConfig, function (err, data) {
      var backstopConfig

      if (err) {
        reject(err)
      }

      try {
        backstopConfig = JSON.parse(data)
        resolve(backstopConfig)
      } catch (err) {
        reject(err)
      }
    })
  })
}

test('configGenerator - config file should be created', function (t) {
  configGenerator(config)
    .then(function (message) {
      t.equal(
        message, 'backstop.json created',
        'configGenerator should resolve with correct message'
      )
      fs.stat(config.vrt.backstopConfig, function (err, stats) {
        if (err) {
          t.true(false, 'backstop.json file should exist')
        }
        t.true(stats.isFile(), 'backstop.json file should exist')
        t.end()
      })
    })
})

test('configGenerator - config properties should contain correct values', function (t) {
  removeFiles([config.vrt.backstopConfig])
    .then(function () {
      return configGenerator(config)
    })
    .then(getBackstopConfigData)
    .then(function (backstopConfig) {
      var firstScenario = backstopConfig.scenarios[0]

      t.ok(
        backstopConfig.scenarios.length,
        'scenarios should only contain one object'
      )
      t.equal(
        firstScenario.label, 'Test-example',
        'config "label" should equal "Test-example"'
      )
      t.equal(
        firstScenario.url, 'http://example:7000' + path.sep + 'section-test-example.html',
        'config "url" should equal "http://example:7000' + path.sep + 'section-test-example.html"'
      )
      t.equal(
        firstScenario.selectors[0], '.comp-lib-pattern-component',
        'config "selectors[0]" should equal ".comp-lib-pattern-component"'
      )
      t.true(
        firstScenario.selectorExpansion,
        'config "selectorExpansion" should be true'
      )
      t.equal(
        firstScenario.misMatchThreshold, 0.1,
        'config "misMatchThreshold" should be 0.1'
      )
      t.end()
    })
})

test('configGenerator - bad template data should throw', function (t) {
  var brokenConfig = deepClone(config)
  brokenConfig.vrt.backstopConfigTemplate = testFixturesPath + 'backstop.broken.template.json'

  removeFiles([config.vrt.backstopConfig])
    .then(function () {
      return configGenerator(brokenConfig)
    })
    .catch(function (err) {
      t.equal(
        err.message, 'Bad data in template config',
        'bad data in template config should throw error'
      )
      t.end()
    })
})

test('configGenerator - teardown', function (t) {
  removeFiles([config.vrt.backstopConfig])
    .then(function () {
      t.pass('teardown complete')
      t.end()
    })
})
