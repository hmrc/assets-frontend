var path = require('path')
var marked = require('marked')
var nunjucks = require('nunjucks')

var parseDocumentation = function (files) {
  files.forEach(function (file) {
    nunjucks.configure([
      path.join(__dirname, '..', 'macros'),
      path.parse(file.path).dir
    ])

    var fileContents = [
      `{% from 'example.html' import example %}`,
      `{% from 'markup.html' import markup %}`,
      `{% from 'wip.html' import wip %}`,
      `{% from 'deprecated.html' import deprecated %}`,
      file.contents.toString()
    ].join('\n')

    var markdown = nunjucks.renderString(fileContents)
    var html = marked(markdown)

    file.contents = Buffer.from(html)
  })

  return files
}

module.exports = parseDocumentation
