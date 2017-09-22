var path = require('path')
var util = require('util')
var marked = require('marked')
var nunjucks = require('nunjucks')
var Transform = require('stream').Transform
var config = require('../../../component-lib.json')
var prepareAssetPaths = require('./prepareAssetPaths')

util.inherits(ComponentParser, Transform)

function ComponentParser () {
  var options = {
    objectMode: true
  }

  this.fileTypes = ['.md', '.html']
  this.components = {}

  Transform.call(this, options)
}

ComponentParser.prototype._transform = function (file, encoding, done) {
  var fileExtension = path.parse(file.path).ext

  if (this.fileTypes.includes(fileExtension)) {
    var component = path.parse(path.dirname(file.path)).name

    this.components[component] = this.components[component] || {
      styles: prepareAssetPaths(config.css),
      scripts: prepareAssetPaths(config.js)
    }

    switch (fileExtension) {
      case this.fileTypes[0]:
        nunjucks.configure(path.dirname(file.path))
        var readme = nunjucks.renderString(file.contents.toString())
        this.components[component].description = marked(readme)
        break

      case this.fileTypes[1]:
        this.components[component].markup = file.contents.toString()
        break
    }
  }

  done()
}

ComponentParser.prototype._flush = function (done) {
  this.push(this.components)
  done()
}

module.exports = function () {
  return new ComponentParser()
}
