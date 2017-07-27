var fs = require('gulp')
var path = require('path')
var test = require('tape')
var componentParser = require('../util/component-library/componentParser')

test('Parses a directory of components', function (t) {
  t.plan(4)

  var dir = path.join(__dirname, 'fixtures', 'components', '**', '*')

  fs.src(dir)
    .pipe(componentParser())
    .on('data', function (data) {
      t.equal(Object.keys(data).length, 1, 'should return one component')
      t.equal(Object.keys(data.component).length, 3, 'with three properties')

      t.ok(
        data.component.description.includes('<h1 id="test-component">Test component</h1>'),
        'with the README file converted to HTML'
      )

      t.ok(
        data.component.markup.includes('<div>Example</div>'),
        'with the HTML file contents as a markup property'
      )
    })
})
