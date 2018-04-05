/* eslint-env jasmine, jquery */
/* global loadFixtures */

/**
 * Account menu module tests
 */

var $ = require('jquery')

describe('Given I have an account menu of the page', function () {
  var accountMenu = require('./account-menu.js')

  var $nav
  var $yourAccountLink
  var $yourAccountSubNav
  var $mobileMenuLink
  var $mobileBack

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/components/account-menu'
    loadFixtures('account-menu.html')

    accountMenu()

    $nav = $('#secondary-nav')
    $yourAccountLink = $('#account-menu__main-2')
    $yourAccountSubNav = $('#subnav-2')
    $mobileMenuLink = $('#mobile-menu')
    $mobileBack = $('.account-menu__link--back')
  })

  describe('When the page is loaded', function () {
    it('An account menu should show menu items with no sub menus visible', function () {
      expect($yourAccountSubNav).not.toHaveClass('subnav-reveal')
      expect($yourAccountSubNav.attr('aria-hidden')).toBe('true')
      expect($yourAccountLink.attr('aria-expanded')).toBe('false')
    })

    it('Should have all mobile elements hidden', function () {
      expect($mobileMenuLink).toHaveClass('js-hidden')
      expect($mobileMenuLink.attr('aria-hidden')).toBe('true')
      expect($mobileMenuLink.attr('aria-expanded')).toBe('false')
      expect($mobileBack).toHaveClass('hidden')
      expect($mobileBack.attr('aria-hidden')).toBe('true')
    })
  })

  describe('When \'Your account\' is opened', function () {
    beforeEach(function () {
      $yourAccountLink.click()
    })

    it('should reveal the subnav', function () {
      expect($nav).toHaveClass('subnav-is-open')
      expect($yourAccountLink.attr('aria-expanded')).toBe('true')
      expect($yourAccountLink).toHaveClass('account-menu__link--more-expanded')
      expect($yourAccountSubNav).toHaveClass('subnav-reveal')
      expect($yourAccountSubNav.attr('aria-hidden')).toBe('false')
      expect($yourAccountSubNav.attr('aria-expanded')).toBe('true')
    })

    it('should close the subnav in second click', function () {
      $yourAccountLink.click()
      expect($nav).not.toHaveClass('subnav-is-open')
      expect($yourAccountLink.attr('aria-expanded')).toBe('false')
      expect($yourAccountLink).not.toHaveClass('account-menu__link--more-expanded')
      expect($yourAccountSubNav).not.toHaveClass('subnav-reveal')
      expect($yourAccountSubNav.attr('aria-hidden')).toBe('true')
      expect($yourAccountSubNav.attr('aria-expanded')).toBe('false')
    })
  })
})
