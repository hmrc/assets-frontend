var fs = require('fs')
var path = require('path')
var test = require('tape')
var gutil = require('gulp-util')
var cheerio = require('cheerio')
var Handlebars = require('handlebars')
var renderPagesFromTemplate = require('../util/pattern-library/lib/renderPagesFromTemplate')

test('renderPagesFromTemplate - replaces a files object contents with a rendered template', function (t) {
  t.plan(6)

  var templatePath = path.join(__dirname, 'fixtures', 'pattern-library', 'design-pattern-library-template.html')
  var templateSource = fs.readFileSync(templatePath).toString()
  var compiledTemplate = Handlebars.compile(templateSource)

  var files = [
    getFile(path.resolve('index.html'), 'section'),
    getFile(path.resolve('category-one', 'thing', 'index.html'), 'page'),
    getFile(path.resolve('category-one', 'thing-two', 'index.html'), 'page'),
    getFile(path.resolve('category-one', 'index.html'), 'section'),
    getFile(path.resolve('category-two', 'thing', 'index.html'), 'page')
  ]

  files = renderPagesFromTemplate(files, compiledTemplate)
  var $ = cheerio.load(files[1].contents)

  t.equal($('#documentation').text(), 'Test contents', 'with documentation')
  t.equal($('#sections a').length, 2, 'with the right number top nav items')
  t.equal(
    $('#sections a:nth-child(2)').attr('href'),
    '/category-one/index.html',
    'that have the expected urls'
  )

  t.equal($('#nav a').length, 2, 'with a sub nav of siblings')
  t.equal(
    $('#nav a:first-child').attr('href'),
    '/category-one/thing/index.html',
    'that have the expected urls'
  )
  t.equal(
    $('#nav a:first-child').text(),
    'thing',
    'that have the expected titles'
  )
})

function getFile (filePath, type) {
  var file = new gutil.File({
    path: filePath,
    contents: Buffer.from('Test contents')
  })

  file.type = type

  return file
}
