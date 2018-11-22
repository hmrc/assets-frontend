var fs = require('fs')
var path = require('path')
var test = require('tape')
var gutil = require('gulp-util')
var cheerio = require('cheerio')
var Handlebars = require('handlebars')
var renderPagesFromTemplate = require('../util/design-system/lib/renderPagesFromTemplate')

var templatePath = path.join(__dirname, 'fixtures', 'pattern-library', 'design-pattern-library-template.html')
var templateSource = fs.readFileSync(templatePath).toString()
var compiledTemplate = Handlebars.compile(templateSource)

var pathPrefix = (process.env.NODE_ENV === 'prod') ? '/assets-frontend' : ''

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
  t.plan(17)

  var output = renderPagesFromTemplate(getFiles(), compiledTemplate)
  var $ = cheerio.load(output[0].contents)

  t.equal($('#documentation').text(), 'Homepage', 'replaces a files object contents with a rendered template')

  t.equal($('#homepage').length, 1, 'with a homepage variable set to true')

  t.equal($('#sections a').length, 2, 'with the right number top nav items')

  t.equal(
    $('#sections a:first-child').attr('href'),
    pathPrefix + '/index.html',
    'that have the expected urls'
  )

  t.equal(
    $('#sections a:first-child').text(),
    'about',
    'and the homepage link should say About'
  )

  t.equal($('#nav a').length, 0, 'with no sub nav')

  t.equal($('#mobileNav').length, 1, 'with a mobile nav')

  t.equal(
    $('#mobileNav ul:first-child li:first-child').length,
    2,
    'with the right number of sections in the mobile nav'
  )

  t.equal(
    $('#mobileNav > ul > li:first-child > a').attr('href'),
    pathPrefix + '/index.html',
    'with the first link to the homepage'
  )

  t.equal(
    $('#mobileNav > ul > li:first-child > a').text(),
    'about',
    'with the first link to the homepage'
  )

  t.equal(
    $('#mobileNav > ul > li:nth-child(2) > a').attr('href'),
    pathPrefix + '/category-one/index.html',
    'with a second section link'
  )

  t.equal(
    $('#mobileNav > ul > li:nth-child(2) > a').text(),
    'category-one',
    'with the correct link text'
  )

  t.equal(
    $('#mobileNav > ul > li:nth-child(2) ul li').length, 2,
    'with a subnav of the correct length'
  )

  t.equal(
    $('#mobileNav > ul > li:nth-child(2) li:first-child a').attr('href'),
    pathPrefix + '/category-one/thing/index.html',
    'with the correct first url'
  )

  t.equal(
    $('#mobileNav > ul > li:nth-child(2) li:first-child a').text(),
    'thing',
    'with the correct first link text'
  )

  t.equal(
    $('#mobileNav > ul > li:nth-child(2) li:nth-child(2) a').attr('href'),
    pathPrefix + '/category-one/thing-two/index.html',
    'with the correct second url'
  )

  t.equal(
    $('#mobileNav > ul > li:nth-child(2) li:nth-child(2) a').text(),
    'thing-two',
    'with the correct second link text'
  )
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
    pathPrefix + '/category-one/index.html',
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
    pathPrefix + '/category-one/thing/index.html',
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
    pathPrefix + '/category-one/thing/index.html',
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
