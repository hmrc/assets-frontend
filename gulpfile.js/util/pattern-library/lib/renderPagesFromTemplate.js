var path = require('path')

var renderPagesFromTemplate = function (files, compiledTemplate) {
  var data = {}

  data.sections = files.map(function (file) {
    return path.parse(file.path).dir
  }).filter(function (value, index, self) {
    return self.indexOf(value) === index
  })

  return files.map(function (file) {
    var currentSection = path.parse(file.path).dir

    data.nav = files.filter(function (file) {
      return currentSection === path.parse(file.path).dir
    }).map(function (file) {
      return path.parse(file.path).name
    })

    data.documentation = file.contents.toString()

    file.contents = Buffer.from(compiledTemplate(data))

    return file
  })
}

module.exports = renderPagesFromTemplate
