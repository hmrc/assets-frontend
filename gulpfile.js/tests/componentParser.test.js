var fs = require('fs')
var gulp = require('gulp')
var path = require('path')
var test = require('tape')
var marked = require('marked')
var nunjucks = require('nunjucks')
var componentParser = require('../util/component-library/componentParser')

test('componentParser - Parses a directory of components', function (t) {
  t.plan(6)

  var dir = path.join(__dirname, 'fixtures', 'components')
  var files = path.join(dir, '**', '*')

  var expectedHtml = fs.readFileSync(
    path.join(dir, 'component', 'example.html')
  ).toString()

  var expectedMarkdown = fs.readFileSync(
    path.join(dir, 'component', 'README.md')
  ).toString()

  nunjucks.configure(path.join(dir, 'component'))
  expectedMarkdown = nunjucks.renderString(expectedMarkdown)

  gulp.src(files)
    .pipe(componentParser())
    .on('data', function (data) {
      t.equal(Object.keys(data).length, 1, 'should return one component')
      t.equal(Object.keys(data.component).length, 4, 'with four properties')

      t.ok(
        data.component.description.includes(marked(expectedMarkdown)),
        'with the README file converted to HTML'
      )

      t.ok(
        data.component.markup.includes(expectedHtml),
        'with the HTML file contents as a markup property'
      )

      t.ok(data.component.styles, 'with a styles property')
      t.ok(data.component.scripts, 'with a scripts property')
    })
})
