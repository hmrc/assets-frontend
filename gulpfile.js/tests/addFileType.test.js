var path = require('path')
var test = require('tape')
var addFileType = require('./../util/pattern-library/lib/addFileType')

test('addFileType - determines whether a file is a category or a page', function (t) {
  t.plan(4)

  var sectionPath = path.join(__dirname, 'components')

  var stringConfig = {
    src: sectionPath
  }

  var arrayConfig = {
    src: [sectionPath]
  }

  var files = [{
    path: path.join(sectionPath, 'component', 'thing.html')
  }, {
    path: path.join(sectionPath, 'index.html')
  }]

  var filesFromString = addFileType(stringConfig, files)

  t.equal(filesFromString[0].type, 'page', 'a page')
  t.equal(filesFromString[1].type, 'section', 'a section')

  var filesFromArray = addFileType(arrayConfig, files)

  t.equal(filesFromArray[0].type, 'page', 'a page')
  t.equal(filesFromArray[1].type, 'section', 'a section')
})
