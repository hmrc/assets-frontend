var path = require('path')

var renderPagesFromTemplate = function (files, compiledTemplate, baseDirectory) {
  var data = {}

  baseDirectory = baseDirectory || ''

  data.sections = files
    .filter((file) => {
      return file.type === 'section'
    })
    .map((file) => {
      var data = {
        url: `/${path.relative(baseDirectory, file.relative)}`,
        title: path.relative(baseDirectory, path.parse(file.relative).dir) || 'about'
      }

      return data
    })

  return files
    .map((file) => {
      var currentSection = path.relative(baseDirectory, path.parse(file.relative).dir) || 'about'

      data.nav = files
        .filter((file) => {
          return file.relative.includes(currentSection)
        })
        .filter((file) => file.type === 'page')
        .map((file) => {
          return {
            url: `/${path.relative(baseDirectory, file.relative)}`,
            title: path.parse(path.parse(file.relative).dir).name
          }
        })

      data.documentation = file.contents.toString()

      file.contents = Buffer.from(compiledTemplate(data))

      return file
    })
}

module.exports = renderPagesFromTemplate
