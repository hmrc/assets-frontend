var fs = require('fs')
var path = require('path')
var test = require('tape')
var cheerio = require('cheerio')
var Handlebars = require('handlebars')
var renderPagesFromTemplate = require('../util/pattern-library/lib/renderPagesFromTemplate')

test('renderPagesFromTemplate - returns a data object', function (t) {
  t.plan(3)

  var templatePath = path.join(__dirname, 'fixtures', 'pattern-library', 'design-pattern-library-template.html')
  var templateSource = fs.readFileSync(templatePath).toString()
  var compiledTemplate = Handlebars.compile(templateSource)

  var contents = 'test one'

  var files = [{
    path: 'category-one/thing.html',
    contents: Buffer.from(contents)
  }, {
    path: 'category-one/another-thing.html',
    contents: Buffer.from(contents)
  }, {
    path: 'category-two/thing.html',
    contents: Buffer.from(contents)
  }]

  files = renderPagesFromTemplate(files, compiledTemplate)
  var $ = cheerio.load(files[0].contents)

  t.equal($('#documentation').text(), contents, 'with documentation')
  t.equal($('#sections > *').length, 2, 'with a top nav of categories')
  t.equal($('#nav > *').length, 2, 'with a sub nav of siblings')
})
