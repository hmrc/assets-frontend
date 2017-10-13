var path = require('path')

var relativeUrl = function (basedir, filePath) {
  return `/${path.relative(basedir, filePath)}`
}

var renderPagesFromTemplate = function (files, compiledTemplate, baseDirectory) {
  var data = {}

  baseDirectory = baseDirectory || ''

  data.sections = files
    .filter((file) => file.type === 'section')
    .map((file) => ({
      url: relativeUrl(baseDirectory, file.relative),
      title: path.relative(baseDirectory, path.parse(file.relative).dir) || 'about'
    }))

  return files
    .map((file) => {
      var currentSection = 'about'

      data.sections.forEach((section) => {
        if (file.relative.includes(section.title)) {
          currentSection = section.title
        }
      })

      data.nav = files
        .filter((file) => file.relative.includes(currentSection))
        .filter((file) => file.type === 'page')
        .map((file) => ({
          url: relativeUrl(baseDirectory, file.relative),
          title: path.parse(path.parse(file.relative).dir).name
        }))

      data.documentation = file.contents.toString()

      file.contents = Buffer.from(compiledTemplate(data))

      return file
    })
}

module.exports = renderPagesFromTemplate
