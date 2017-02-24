var test = require('tape')
var PassThrough = require('stream').PassThrough
var BuildScenarios = require('./../util/backstop/BuildScenarios')

test('buildScenarios - scenarios should be built as expected', function (t) {
  var scenarios = new PassThrough({objectMode: true})
  var buildScenarios = new BuildScenarios({objectMode: true}, [
    'section-test-example-one.html',
    'section-test-example-two.html',
    'section-test-example-three.html'
  ], {
    compLib: {
      host: 'http://example-host',
      port: 4000
    }
  })

  scenarios.write(JSON.stringify({
    'scenarios': []
  }))
  scenarios.end()

  scenarios
    .pipe(buildScenarios)
    .on('data', function (data) {
      var result

      try {
        result = JSON.parse(data)
      } catch (err) {
        throw err
      }

      t.equal(
        result.scenarios[0].label, 'Test-example-one',
        'result label should contain "Test-example-one"'
      )
      t.equal(
        result.scenarios[1].label, 'Test-example-two',
        'result label should contain "Test-example-two"'
      )
      t.equal(
        result.scenarios[2].label, 'Test-example-three',
        'result label should contain "Test-example-three"'
      )

      t.end()
    })
})

test('buildScenarios - JSON parse error caught as expected', function (t) {
  var badJSON = new PassThrough({objectMode: true})
  var buildScenarios = new BuildScenarios({objectMode: true}, [], {
    compLib: {
      host: 'http://example-host',
      port: 4000
    }
  })

  badJSON.write('')
  badJSON.end()

  badJSON
    .pipe(buildScenarios)
    .on('error', function (err) {
      t.equal(
        err.message, 'Unexpected end of input',
        'error message should be "Unexpected end of input"')
      t.true(
        err instanceof SyntaxError,
        'error message should be of type "SyntaxError"'
      )

      t.end()
    })
})
