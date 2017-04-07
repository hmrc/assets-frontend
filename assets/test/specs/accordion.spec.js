/* eslint-env jasmine, jquery */
/* global loadFixtures */

require('jquery')

describe('Given I have an accordion module on the page', function () {
  var accordion, $acc1, $acc2, $acc3

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/test/specs/fixtures/'
    loadFixtures('accordion-fixtures.html')

    accordion = require('../../javascripts/modules/accordion.js')

    $acc1 = $('#accordion1')
    $acc2 = $('#accordion2')
    $acc3 = $('#accordion3')
  })

  describe('When I load the page', function () {
    beforeEach(function () {
      accordion() // init accordion module
    })

    it('Then the accordion #1 is collapsed', function () {
      expect($acc1.find('[data-accordion-body]').height()).toBe(0)
    })

    it('Then any content flagged to be revealed is hidden', function () {
      expect($acc1.find('[data-accordion-reveal]')).toHaveClass('hidden')
    })
  })

  describe('When I click on Accordion #1', function () {
    beforeEach(function () {
      accordion() // init accordion module
      $acc1.find('[data-accordion-button]').click()
    })

    it('Then the accordion is expanded and content to be revealed is shown', function () {
      expect($acc1.find('[data-accordion-body]').height() > 0).toBe(true)
      expect($acc1.find('[data-accordion-reveal]')).not.toHaveClass('hidden')
    })
  })

  describe('When Accordion #2 loads', function () {
    beforeEach(function () {
      accordion() // init accordion module
    })

    it('Then the accordion is expanded by default', function () {
      expect($acc2.find('[data-accordion-body]').height() > 0).toBe(true)
    })

    it('Then any content flagged to be revealed is shown', function () {
      expect($acc2.find('[data-accordion-reveal]')).not.toHaveClass('hidden')
    })

    it('Then clicking the accordion title collapses the accordion', function () {
      $acc2.find('[data-accordion-button]').click()
      expect($acc2.find('[data-accordion-body]').height()).toBe(0)
    })
  })

  describe('When Accordion #3 loads', function () {
    beforeEach(function () {
      window.history.replaceState(null, null, '#accordion3')
      accordion() // init accordion module
    })

    it('Then accordion 3 is expanded because of URL hash', function () {
      expect($acc3.find('[data-accordion-body]').height() > 0).toBe(true)
    })

    it('Then clicking accordion 1 updates the URL hash to accordion 1\'s ID', function () {
      $acc1.find('[data-accordion-button]').click()
      expect($acc1.find('[data-accordion-body]').height() > 0).toBe(true)
      expect(window.location.hash).toBe('#accordion1')
    })

    it('Then clicking accordion 2 does not affect the URL (accordion not configured to do so)', function () {
      $acc2.find('[data-accordion-button]').click()
      expect(window.location.hash).toBe('#accordion3')
    })
  })
})
