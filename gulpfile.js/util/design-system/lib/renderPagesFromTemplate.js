var upath = require('upath')

var relativeUrl = function (basedir, filePath) {
  return `/${upath.relative(basedir, filePath)}`
}

var renderPagesFromTemplate = function (files, compiledTemplate, baseDirectory) {
  var data = {}
  var homepage = 'about'
  var pathPrefix = (process.env.NODE_ENV === 'prod') ? '/assets-frontend' : ''

  baseDirectory = baseDirectory || ''

  data.sections = files
    .filter((file) => file.type === 'section')
    .map((file) => ({
      url: relativeUrl(baseDirectory, file.relative),
      title: upath.relative(baseDirectory, upath.parse(file.relative).dir) || homepage
    }))

  return files
    .map((file) => {
      var currentSection = homepage

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
          title: upath.parse(upath.parse(file.relative).dir).name
        }))

      data.documentation = file.contents.toString()
      data.homepage = currentSection === homepage
      data.pathPrefix = pathPrefix

      file.contents = Buffer.from(compiledTemplate(data))

      return file
    })
}

module.exports = renderPagesFromTemplate
