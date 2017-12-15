var path = require('path')

var relativeUrl = function (basedir, filePath) {
  return `/${basedir}${filePath}`
}

var renderPagesFromTemplate = function (files, compiledTemplate, baseDirectory) {
  var data = {}
  var homepage = 'about'
  var pathPrefix = (process.env.NODE_ENV === 'prod') ? '/assets-frontend' : ''

  baseDirectory = baseDirectory || ''

  data.sections = files
    .filter((file) => file.type === 'section')
    .map((file) => ({
      url: relativeUrl(baseDirectory, file.path),
      title: path.relative(baseDirectory, path.parse(file.path).dir) || homepage
    }))

  return files
    .map((file) => {
      var currentSection = homepage

      data.sections.forEach((section) => {
        if (file.path.includes(section.title)) {
          currentSection = section.title
        }
      })

      data.nav = files
        .filter((file) => file.path.includes(currentSection))
        .filter((file) => file.type === 'page')
        .map((file) => ({
          url: relativeUrl(baseDirectory, file.path),
          title: path.parse(path.parse(file.path).dir).name
        }))

      data.documentation = file.contents.toString()
      data.homepage = currentSection === homepage
      data.pathPrefix = pathPrefix

      file.contents = Buffer.from(compiledTemplate(data))

      return file
    })
}

module.exports = renderPagesFromTemplate
