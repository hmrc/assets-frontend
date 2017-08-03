var fs = require('fs')
var path = require('path')
var util = require('util')
var cheerio = require('cheerio')
var Transform = require('stream').Transform

util.inherits(UpdateLibraryNav, Transform)

function UpdateLibraryNav (options) {
  this.libraryDir = options.library

  Transform.call(this, {
    objectMode: true
  })
}

UpdateLibraryNav.prototype._transform = function (newFile, encoding, done) {
  var $newPage = cheerio.load(newFile.contents.toString())
  var $newPageNav = $newPage('.comp-lib-sidebar > nav > ul')

  var title = toTitleCase(path.parse(newFile.path).name.replace('section-', ''))

  var $newNavItem = $newPage(
    `<li class="comp-lib-menu-item">
      <a href="${path.parse(newFile.path).base}"  class="comp-lib-menu-link">${title}</a>
    </li>`
  )

  var libraryFiles = fs.readdirSync(this.libraryDir)

  libraryFiles
    .map((file) => {
      return path.join(this.libraryDir, file)
    })
    .filter((file) => {
      return fs.statSync(file).isFile()
    })
    .forEach((file) => {
      var html = fs.readFileSync(file).toString()
      var $existingPage = cheerio.load(html)

      var $existingPageNav = $existingPage('.comp-lib-sidebar > nav > ul')
      $existingPageNav.children().first().after($newNavItem)

      fs.writeFileSync(file, $existingPage.html())

      var $existingNavItem = $existingPageNav.find(`[href="${path.parse(file).base}"]`).parent()
      $existingNavItem.removeClass('comp-lib-menu-item--highlighted')
      $existingNavItem.find('ul').remove()
      $newPageNav.append($existingNavItem)
    })

  $newNavItem.addClass('comp-lib-menu-item--highlighted')
  $newPageNav.children().first().after($newNavItem)

  newFile.contents = Buffer.from($newPage.html())

  this.push(newFile)
  done()
}

function toTitleCase (text) {
  return text.replace(/-/g, ' ').replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

module.exports = function (options) {
  return new UpdateLibraryNav(options)
}
