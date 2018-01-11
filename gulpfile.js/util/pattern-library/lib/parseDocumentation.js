var fs = require('fs')
var path = require('path')
var marked = require('marked')
var nunjucks = require('nunjucks')
var config = require('../../../config')

var parseDocumentation = function (files) {
  var macros = fs.readdirSync(config.patternLibrary.macrosPath)
    .map(fileName => `{% from '${fileName}' import '${path.parse(fileName).name}' %}`)
    .join('')

  files.forEach(function (file) {
    nunjucks.configure([
      config.patternLibrary.macrosPath,
      path.parse(file.path).dir,
      config.patternLibrary.sourceBaseDir
    ])

    var fileContents = macros + file.contents.toString()
    var markdown = nunjucks.renderString(fileContents)
    var html = marked(markdown)

    file.contents = Buffer.from(html)
  })

  return files
}

module.exports = parseDocumentation
