var test = require('tape')
var mergeObj = require('./../util/mergeObj')

test('mergeObj - objects should merged as expected', function (t) {
  var parentObj = {parent: 'parent'}
  var childObj = {child: 'child'}
  var resultObj = mergeObj(parentObj, childObj)

  t.plan(4)

  t.equal(typeof resultObj.parent, 'string', 'parent key value should be a string')
  t.equal(resultObj.parent, 'parent', 'parent key value should equal "parent"')
  t.equal(typeof resultObj.child, 'string', 'child value should be a string')
  t.equal(resultObj.child, 'child', 'child value should equal "child"')
})

test('mergeObj - child object value should clobber parent object value of same name', function (t) {
  var parentObj = {value: 'parent'}
  var childObj = {value: 'child'}
  var resultObj = mergeObj(parentObj, childObj)

  t.plan(2)

  t.equal(typeof resultObj.value, 'string', 'parent property should be a string')
  t.equal(resultObj.value, 'child', 'value property should equal "child"')
})
