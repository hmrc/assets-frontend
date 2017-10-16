'use strict'

var fs = require('fs')
var path = require('path')
var test = require('tape')
var gutil = require('gulp-util')
var cheerio = require('cheerio')
var PassThrough = require('stream').PassThrough
var updateLibraryNav = require('../util/component-library/updateLibraryNav')

test('updateLibraryNav - Updates the library navigation with new components', function (t) {
  t.plan(4)

  var compLibPath = path.join(__dirname, 'fixtures', 'component-library')
  var newFile = path.join(compLibPath, 'components', 'new-component.html')

  var existingFile = path.join(compLibPath, 'section-existing-component.html')
  var existingFileContents = fs.readFileSync(existingFile)

  var newFileObj = new gutil.File({
    path: path.join(__dirname, 'fixtures', 'component-library', 'section-component.html'),
    contents: fs.readFileSync(newFile)
  })

  var componentRendererMock = new PassThrough({
    objectMode: true
  })

  componentRendererMock.write(newFileObj)
  componentRendererMock.end()

  componentRendererMock
    .pipe(updateLibraryNav({
      library: path.join(__dirname, 'fixtures', 'component-library')
    }))
    .on('data', function (file) {
      var $ = cheerio.load(file.contents.toString())

      var $links = $('.comp-lib-sidebar > nav > ul > li')
      var $selfLink = $links.find('[href="section-component.html"]').parent()
      var $othersLink = $links.filter(function () {
        return $(this).find('a').text() === 'Existing Component'
      })

      t.equal($selfLink.length, 1, 'add itself to the nav')
      t.ok($selfLink.hasClass('comp-lib-menu-item--highlighted'), 'with a highlighted class')
      t.equal($othersLink.length, 1, 'add existing files to the nav')
    })
    .on('finish', function () {
      var html = fs.readFileSync(existingFile).toString()
      var $ = cheerio.load(html)

      var $newFileLink = $('[href="section-component.html"]')

      t.equal($newFileLink.length, 1, 'add new file to existing file\'s nav')

      cleanup()
    })

  function cleanup () {
    fs.writeFileSync(existingFile, existingFileContents)
  }
})
