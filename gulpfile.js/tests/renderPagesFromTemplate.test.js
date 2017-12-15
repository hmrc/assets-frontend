var fs = require('fs')
var path = require('path')
var test = require('tape')
var gutil = require('gulp-util')
var cheerio = require('cheerio')
var Handlebars = require('handlebars')
var renderPagesFromTemplate = require('../util/pattern-library/lib/renderPagesFromTemplate')

var templatePath = path.join(__dirname, 'fixtures', 'pattern-library', 'design-pattern-library-template.html')
var templateSource = fs.readFileSync(templatePath).toString()
var compiledTemplate = Handlebars.compile(templateSource)

var getFiles = function () {
  return [
    getFile(path.resolve('index.html'), 'section', 'Homepage'),
    getFile(path.resolve('category-one', 'thing', 'index.html'), 'page', 'Category One - Thing'),
    getFile(path.resolve('category-one', 'thing-two', 'index.html'), 'page', 'Category One - Thing Two'),
    getFile(path.resolve('category-one', 'index.html'), 'section', 'Category One - Section'),
    getFile(path.resolve('category-two', 'thing', 'index.html'), 'page', 'Category Two - Thing')
  ]
}

test('renderPagesFromTemplate - renders a homepage', function (t) {
  t.plan(6)

  var output = renderPagesFromTemplate(getFiles(), compiledTemplate)
  var $ = cheerio.load(output[0].contents)

  t.equal($('#documentation').text(), 'Homepage', 'replaces a files object contents with a rendered template')

  t.equal($('#homepage').length, 1, 'with a homepage variable set to true')

  t.equal($('#sections a').length, 2, 'with the right number top nav items')

  t.equal(
    $('#sections a:first-child').attr('href'),
    '/index.html',
    'that have the expected urls'
  )

  t.equal(
    $('#sections a:first-child').text(),
    'about',
    'and the homepage link should say About'
  )

  t.equal($('#nav a').length, 0, 'with no sub nav')
})

test('renderPagesFromTemplate - renders a section', function (t) {
  t.plan(8)

  var output = renderPagesFromTemplate(getFiles(), compiledTemplate)
  var $ = cheerio.load(output[3].contents)

  t.equal($('#documentation').text(), 'Category One - Section', 'replaces a files object contents with a rendered template')

  t.equal($('#homepage').length, 0, 'with a homepage variable set to false')

  t.equal($('#sections a').length, 2, 'with the right number top nav items')

  t.equal(
    $('#sections a:nth-child(2)').attr('href'),
    '/category-one' + path.sep + 'index.html',
    'that have the expected urls'
  )

  t.equal(
    $('#sections a:nth-child(2)').text(),
    'category-one',
    'and the expected text'
  )

  t.equal($('#nav a').length, 2, 'with a sub nav of siblings')

  t.equal(
    $('#nav a:first-child').attr('href'),
    '/category-one' + path.sep + 'thing' + path.sep + 'index.html',
    'that have the expected urls'
  )

  t.equal(
    $('#nav a:first-child').text(),
    'thing',
    'that have the expected titles'
  )
})

test('renderPagesFromTemplate - renders a page', function (t) {
  t.plan(8)

  var output = renderPagesFromTemplate(getFiles(), compiledTemplate)
  var $ = cheerio.load(output[1].contents)

  t.equal($('#documentation').text(), 'Category One - Thing', 'with documentation')

  t.equal($('#homepage').length, 0, 'with a homepage variable set to false')

  t.equal($('#sections a').length, 2, 'with the right number top nav items')

  t.equal(
    $('#sections a:first-child').text(),
    'about',
    'that have the expected urls'
  )

  t.equal(
    $('#sections a:nth-child(2)').text(),
    'category-one',
    'that have the expected urls'
  )

  t.equal($('#nav a').length, 2, 'with a sub nav of siblings')

  t.equal(
    $('#nav a:first-child').attr('href'),
    '/category-one' + path.sep + 'thing' + path.sep + 'index.html',
    'that have the expected urls'
  )
  t.equal(
    $('#nav a:first-child').text(),
    'thing',
    'that have the expected titles'
  )
})

function getFile (filePath, type, contents) {
  var file = new gutil.File({
    path: filePath,
    contents: Buffer.from(contents)
  })

  file.type = type

  return file
}
