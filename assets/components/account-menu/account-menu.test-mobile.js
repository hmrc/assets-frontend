/* eslint-env jasmine */
/* global loadFixtures */

/**
 * Account menu module tests
 */

var $ = require('jquery')

describe('Given I have an account menu on the page', function () {
  var accountMenu = require('./account-menu.js')

  var $mobileMenu

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/components/account-menu'
    loadFixtures('account-menu.html')

    $('#jasmine-fixtures').width(320)

    accountMenu()

    $mobileMenu = $('#mobile-menu')
  })

  describe('When the page is loaded on mobile', function () {
    it('should show the mobile version of the navigation', function () {
      expect($mobileMenu.attr('aria-hidden')).toBe('false')
    })
  })
})
