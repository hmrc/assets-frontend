var path = require('path')
var test = require('tape')
var PassThrough = require('stream').PassThrough
var componentRenderer = require('../util/component-library/componentRenderer')

test('Converts a component to a component library file', function (t) {
  t.plan(3)

  var component = new PassThrough({
    objectMode: true
  })

  component.write({
    component: {
      markup: '<h1>Example</h1>',
      description: '<h1>Example content</h1>\n<p>A test description</p>'
    }
  })

  component.end()

  component
    .pipe(componentRenderer({
      template: path.join(__dirname, 'fixtures', 'component-library', 'index.html')
    }))
    .on('data', function (file) {
      var html = file.contents.toString()

      t.ok(html.includes('<h1>Example content</h1>'), 'with a description')
      t.ok(html.includes('<h1>Example</h1>'), 'a visual example of the component')
      t.ok(html.includes('comp-lib-pattern-example'), 'and an example of the markup')
    })
})
