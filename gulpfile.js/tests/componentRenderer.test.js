var path = require('path')
var test = require('tape')
var PassThrough = require('stream').PassThrough
var componentRenderer = require('../util/component-library/componentRenderer')

test.skip('componentRenderer - Errors when', function (t) {
  t.plan(3)

  var component = new PassThrough({
    objectMode: true
  })

  component.write({})
  component.end()

  component
    .pipe(componentRenderer())
    .on('error', function (error) {
      t.ok(error, 'no options object given')
    })

  component
    .pipe(componentRenderer({}))
    .on('error', function (error) {
      t.ok(error, 'no template option given')
    })

  component
    .pipe(componentRenderer({
      template: path.join('non-existent', 'template.html')
    }))
    .on('error', function (error) {
      t.ok(error, 'a non-existent template path given')
    })
})

test.skip('componentRenderer - Converts a component to a component library file', function (t) {
  t.plan(5)

  var component = {
    example: {
      styles: '<link rel="stylesheet" href="styles.css">',
      scripts: '<script src="script.js"></script>',
      markup: '<h1>Example</h1>',
      description: '<h1>Example content</h1>\n<p>A test description</p>'
    }
  }

  var componentParserMock = new PassThrough({
    objectMode: true
  })

  componentParserMock.write(component)

  componentParserMock.end()

  componentParserMock
    .pipe(componentRenderer({
      template: path.join(__dirname, 'fixtures', 'component-library-template.html')
    }))
    .on('data', function (file) {
      var html = file.contents.toString()

      t.equal(file.path, 'section-example.html', 'with a filename starting with "section-"')
      t.ok(html.includes(component.example.description), 'with a description')
      t.ok(html.includes(component.example.markup), 'with a visual example of the component.example')
      t.ok(html.includes(component.example.styles), 'with styles')
      t.ok(html.includes(component.example.scripts), 'with scripts')
    })
})
