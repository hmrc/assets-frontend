/* eslint-env jasmine, jquery */
/* global loadFixtures */

require('jquery')

describe('Given I have two sets of radio buttons and corresponding submit buttons with dynamic GA tags', function () {
  var dynamicGaTags
  var $container1
  var $container2

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/test/specs/fixtures/'
    loadFixtures('dynamic-ga-tags-fixture.html')

    dynamicGaTags = require('../../javascripts/modules/dynamicGaTags.js')

    $container1 = $('#container1')
    $container2 = $('#container2')

    dynamicGaTags()
  })

  describe('When I select Reject in the first set of radio buttons', function () {
    beforeEach(function () {
      $('#rejectBtn').prop('checked', true).trigger('click')
    })

    it('Then the 1st submit button\'s GA event label should match the clicked radio\'s data attribute', function () {
      var rejectText = $('#rejectBtn').attr('data-journey-val')
      var gaAttr = $container1.find('input[type=submit]').attr('data-journey-click')
      var updatedText = gaAttr.substr(gaAttr.lastIndexOf(':') + 1)

      expect(updatedText).toBe(rejectText)
    })

    it('Then the 2nd submit button\'s GA event label should not have changed', function () {
      var $checked = $container2.find('input:checked')
      var checkedText = $checked.attr('data-journey-val')
      var gaAttr = $container2.find('input[type=submit]').attr('data-journey-click')
      var gaLabel = gaAttr.substr(gaAttr.lastIndexOf(':') + 1)

      expect(gaLabel).toBe(checkedText)
    })
  })
})
