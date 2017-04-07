/* eslint-env jasmine, jquery */
/* global loadFixtures */

/**
 * Character Counter Module Tests
 */
require('jquery')

describe('Given I have two empty textarea elements set up with a char counter', function () {
  var charCounter = require('./character-counter.js')

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/components/character-counter'
    loadFixtures('character-counter.fixture.html')
    charCounter()
  })

  describe('When I load the page', function () {
    it('The first counter should read 10 remaining characters', function () {
      expect($('#fieldContainer1 [data-counter]').text()).toBe('10')
    })

    it('The second counter should read 2 remaining characters', function () {
      expect($('#fieldContainer2 [data-counter]').text()).toBe('2')
    })
  })

  describe('When I type some text in the first field', function () {
    beforeEach(function () {
      $('#fieldContainer1 [data-char-field]').val('Some text').trigger('input')
    })

    it('The first counter should read 1 remaining character', function () {
      expect($('#fieldContainer1 [data-counter]').text()).toBe('1')
    })

    it('The first counter text should read "character"', function () {
      expect($('#fieldContainer1 [data-char-text]').text()).toBe('character')
    })
  })

  describe('When I type two characters in the second field', function () {
    beforeEach(function () {
      $('#fieldContainer1 [data-char-field]').val('AB').trigger('input')
    })

    it('The counter text should read "characters"', function () {
      expect($('#fieldContainer1 [data-char-text]').text()).toBe('characters')
    })
  })
})
