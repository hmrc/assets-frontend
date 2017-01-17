/* eslint-env jasmine, jquery */
/* global loadFixtures */

require('jquery')

var passwordReveal
var $passwordRevelElems
var $passwordInputOne
var $passwordInputTwo
var $passwordRevelElementOne
var $passwordRevelElementTwo

var setup = function () {
  passwordReveal()
  $passwordRevelElems = $('.js-password-reveal')
  $passwordRevelElementOne = $passwordRevelElems.eq(0)
  $passwordRevelElementTwo = $passwordRevelElems.eq(1)
  $passwordInputOne = $('#' + $passwordRevelElementOne.attr('data-target'))
  $passwordInputTwo = $('#' + $passwordRevelElementTwo.attr('data-target'))
}

describe('Password Reveal', function () {
  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/specs/fixtures/'
    loadFixtures('password-reveal-fixture.html')
    passwordReveal = require('../../javascripts/modules/passwordReveal.js')
  })

  describe('When I load the page', function () {
    beforeEach(setup)

    it('The passwords should not be shown', function () {
      expect($passwordRevelElementOne.is(':checked')).toBe(false)
      expect($passwordInputOne.attr('type')).toBe('password')

      expect($passwordRevelElementTwo.is(':checked')).toBe(false)
      expect($passwordInputTwo.attr('type')).toBe('password')
    })
  })

  describe('When I interact', function () {
    beforeEach(setup)

    it('The password should be shown after click', function () {
      expect($passwordRevelElementOne.is(':checked')).toBe(false)
      expect($passwordInputOne.attr('type')).toBe('password')

      $passwordRevelElementOne.click()

      expect($passwordRevelElementOne.is(':checked')).toBe(true)
      expect($passwordInputOne.attr('type')).toBe('text')
    })

    it('The password should be hidden after clicking twice', function () {
      expect($passwordRevelElementOne.is(':checked')).toBe(false)
      expect($passwordInputOne.attr('type')).toBe('password')

      $passwordRevelElementOne.click()

      expect($passwordRevelElementOne.is(':checked')).toBe(true)
      expect($passwordInputOne.attr('type')).toBe('text')

      $passwordRevelElementOne.click()

      expect($passwordRevelElementOne.is(':checked')).toBe(false)
      expect($passwordInputOne.attr('type')).toBe('password')
    })

    it('The password should only change its <data-target> input', function () {
      expect($passwordRevelElementOne.is(':checked')).toBe(false)
      expect($passwordInputOne.attr('type')).toBe('password')
      expect($passwordRevelElementTwo.is(':checked')).toBe(false)
      expect($passwordInputTwo.attr('type')).toBe('password')

      $passwordRevelElementOne.click()

      expect($passwordRevelElementOne.is(':checked')).toBe(true)
      expect($passwordInputOne.attr('type')).toBe('text')
      expect($passwordRevelElementTwo.is(':checked')).toBe(false)
      expect($passwordInputTwo.attr('type')).toBe('password')

      $passwordRevelElementOne.click()

      expect($passwordRevelElementOne.is(':checked')).toBe(false)
      expect($passwordInputOne.attr('type')).toBe('password')
      expect($passwordRevelElementTwo.is(':checked')).toBe(false)
      expect($passwordInputTwo.attr('type')).toBe('password')
    })
  })
})
