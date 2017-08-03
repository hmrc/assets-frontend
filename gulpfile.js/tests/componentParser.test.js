var fs = require('gulp')
var path = require('path')
var test = require('tape')
var componentParser = require('../util/componentParser')

test('Parses a directory of components', function (t) {
  t.plan(6)

  var dir = path.join(__dirname, 'fixtures', 'components', '**', '*')

  fs.src(dir)
    .pipe(componentParser())
    .on('data', function (data) {
      var markup = data.component.markup
      var description = data.component.description

      t.equal(Object.keys(data).length, 1, 'should return only one component')
      t.equal(Object.keys(data.component).length, 2, 'with only two properties')

      t.ok(description, 'and assigns the README.md to a content property')
      t.ok(description.includes('<h1 id="test-component">Test component</h1>'), 'converted to markup')

      t.ok(markup, 'and assigns the HTML file to a markup property')
      t.ok(markup.includes('<div>Example</div>'), 'as markup')
    })
})
