var fs = require('fs')
var util = require('util')
var gutil = require('gulp-util')
var cheerio = require('cheerio')
var Transform = require('stream').Transform

util.inherits(RenderComponent, Transform)

function RenderComponent (options) {
  this.template = options.template

  Transform.call(this, {
    objectMode: true
  })
}

RenderComponent.prototype._transform = function (components, encoding, done) {
  var source = fs.readFileSync(this.template)
  var $ = cheerio.load(source)

  Object.keys(components).map((component) => {
    var content = $('<div class="comp-lib-main"></div>')

    var markup = $(
      '<div class="comp-lib-pattern-example">' +
        '<div class="comp-lib-pattern-component">' +
          components[component].markup +
        '</div>' +
        '<div class="comp-lib-code-example">' +
          '<pre class="comp-lib-pre">' +
            '<code class="comp-lib-code html">' +
              components[component].markup +
            '</code>' +
          '</pre>' +
        '</div>' +
      '</div>'
    )

    content.append(components[component].description)
    content.append(markup)

    $('.comp-lib-main').replaceWith(content)

    var file = new gutil.File({
      path: 'components/' + component + '.html',
      contents: new Buffer($.html())
    })

    this.push(file)
  })

  done()
}

module.exports = function (options) {
  return new RenderComponent(options)
}
