var test = require('tape')
var deepClone = require('./../util/deepClone')

test('deepClone - objects should be cloned as expected', function (t) {
  var obj = {
    example: 'example',
    nested: {
      example: 'nested example',
      array: [1, 2, 3]
    }
  }
  var copy = deepClone(obj)

  t.plan(1)

  t.deepEqual(obj, copy, 'copied obj should be equal')
})

test('deepClone - copied object values reference should be broken', function (t) {
  var obj = {
    example: 'example',
    nested: {
      example: 'nested example',
      array: [1, 2, 3]
    }
  }
  var copy = deepClone(obj)
  copy.example = 'another example'
  copy.nested.example = 'another nested example'

  t.plan(4)

  t.equal(
    copy.example, 'another example',
    'copied property value should be "another example"'
  )
  t.equal(
    obj.example, 'example',
    'original property value should be "example"'
  )

  t.equal(
    copy.nested.example, 'another nested example',
    'nested object copied property value should be "another nested example"'
  )
  t.equal(
    obj.nested.example, 'nested example',
    'nested object original property value should be "nested example"'
  )
})
