var marked = require('marked')
var nunjucks = require('nunjucks')

var parseDocumentation = function (files) {
  files.forEach(function (file) {
    nunjucks.configure(file.base)

    var fileContents = file.contents.toString()
    var markdown = nunjucks.renderString(fileContents)
    var html = marked(markdown)

    file.contents = Buffer.from(html)
  })

  return files
}

module.exports = parseDocumentation
