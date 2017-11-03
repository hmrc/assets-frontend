/* eslint-env jasmine, jquery */
/* global loadFixtures */

require('jquery')

describe('Given I have an flexbox module on the page', function () {
  var flexbox

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/test/specs/fixtures/'
    loadFixtures('flexbox-fixtures.html')

    flexbox = require('../../javascripts/modules/flexbox.js')
  })

  describe('When I load the page', function () {
    beforeEach(function () {
      flexbox() // init flexbox module
    })

    it('Then flexbox #1 has the data-style element dynamically added', function () {
      expect($('.grid-row.flex-container.container1').attr('data-style')).toContain('display: flex;')
    })

    it('Then flexbox #2 has the data-style element dynamically added', function () {
      expect($('.grid-row.flex-container.container2').attr('data-style')).toContain('display: flex;')
    })
  })
})
