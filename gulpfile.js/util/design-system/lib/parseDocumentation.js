var fs = require('fs')
var path = require('path')
var marked = require('marked')
var nunjucks = require('nunjucks')
var config = require('../../../config')

var parseDocumentation = function (files) {
  var macros = fs.readdirSync(config.designSystem.macrosPath)
    .map(fileName => `{% from '${fileName}' import '${path.parse(fileName).name}' %}`)
    .join('')

  files.forEach(function (file) {
    var environment = nunjucks.configure([
      config.designSystem.macrosPath,
      path.parse(file.path).dir,
      config.designSystem.sourceBaseDir
    ])

    environment.addFilter('getWelshFileName', function (filePath) {
      var filePathArray = filePath.split('.')
      var fileType = filePathArray.pop()
      filePathArray.push('cy')
      filePathArray.push(fileType)
      return filePathArray.join('.')
    })

    environment.addGlobal('filePath', path.parse(path.relative(config.designSystem.sourceBaseDir, file.path)).dir)

    var fileContents = macros + file.contents.toString()
    var markdown = nunjucks.renderString(fileContents)
    var html = marked(markdown)

    file.contents = Buffer.from(html)
  })

  return files
}

module.exports = parseDocumentation
