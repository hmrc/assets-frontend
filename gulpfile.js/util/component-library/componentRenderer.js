var fs = require('fs')
var util = require('util')
var gutil = require('gulp-util')
var cheerio = require('cheerio')
var Transform = require('stream').Transform
var Handlebars = require('handlebars')

util.inherits(RenderComponent, Transform)

function RenderComponent (options) {
  this.template = (options) ? options.template : ''

  Transform.call(this, {
    objectMode: true
  })
}

RenderComponent.prototype._transform = function (components, encoding, done) {
  try {
    var source = fs.readFileSync(this.template).toString()
    var template = Handlebars.compile(source)

    Object.keys(components).map((component) => {
      var html = template(components[component])

      var file = new gutil.File({
        path: 'components/' + component + '.html',
        contents: new Buffer(html)
      })

      this.push(file)
    })

    done()
  } catch (error) {
    done(error)
  }
}

module.exports = function (options) {
  return new RenderComponent(options)
}
