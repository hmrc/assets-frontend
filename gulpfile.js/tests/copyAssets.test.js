var fs = require('fs')
var del = require('del')
var path = require('path')
var test = require('tape')
var copyAssets = require('../util/pattern-library/lib/copyAssets')

test('copyAssets - throws is not given a config object', function (t) {
  t.plan(1)

  t.throws(
    () => copyAssets(),
    /You must provide a config object/
  )
})

test.only('copyAssets - copies a public directory from the template to the destination', function (t) {
  t.plan(2)

  var template = path.join(__dirname, 'fixtures', 'pattern-library', 'design-pattern-library-template.html')
  var destination = path.join(__dirname, 'pattern-library')
  var config = {
    dest: destination,
    template: template
  }

  del.sync([destination])

  copyAssets(config)
    .then((files) => {
      var file = path.join('public', 'stylesheets', 'example.css')

      t.deepEqual(
        fs.readdirSync(path.join(destination, 'public')),
        fs.readdirSync(path.join(path.parse(template).dir, 'public')),
        'copies all the directories in public to public'
      )

      t.equal(
        fs.readFileSync(path.join(destination, file)).toString(),
        fs.readFileSync(path.join(path.parse(template).dir, file)).toString(),
        `and doesn't alter the file contents`
      )

      del.sync([destination])
    })
})
