/* eslint-env jasmine, jquery */
/* global loadFixtures */

/**
 * Character Counter Module Tests
 */
require('jquery')

describe('Given I have two empty textarea elements set up with a char counter', function () {
  var characterCounter = require('./character-counter.js')
  var characterCount = 0

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/components/character-counter'
    loadFixtures('character-counter.html')
    characterCount = $('.char-counter [data-char-field]').attr('maxLength')
  })

  describe('When the page is loaded', function () {
    it('An empty character counter should show all the remaining characters', function () {
      characterCounter()
      expect($('.char-counter [data-counter]').text()).toBe(characterCount)
    })

    it('A pre-populated character counter should show only the remaining characters', function () {
      var text = 'Pre-populated text'
      $('.char-counter [data-char-field]').val(text)
      characterCounter()
      expect(parseInt($('.char-counter [data-counter]').text())).toBe(characterCount - text.length)
    })
  })

  describe('When some text is typed into the character counter', function () {
    var text

    beforeEach(function () {
      $('.char-counter [data-char-field]').val('')
    })

    it('The remaining character count should update', function () {
      text = 'Some text'
      characterCounter()
      $('.char-counter [data-char-field]').val(text).trigger('input')
      expect(parseInt($('.char-counter [data-counter]').text())).toBe(characterCount - text.length)
    })

    it('The text should be plural for more than 1 remaining character', function () {
      text = 'Some text'
      characterCounter()
      $('.char-counter [data-char-field]').val(text).trigger('input')
      expect($('.char-counter [data-char-text]').text()).toBe('characters')
    })

    it('The text should be singular for 1 remaining character', function () {
      text = Array(parseInt(characterCount)).join('x')
      characterCounter()
      $('.char-counter [data-char-field]').val(text).trigger('input')
      expect($('.char-counter [data-counter]').text()).toBe('1')
      expect($('.char-counter [data-char-text]').text()).toBe('character')
    })
  })
})
