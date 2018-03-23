/* eslint-env jasmine */
/* global loadFixtures */

/**
 * Account menu module tests
 */

var $ = require('jquery')

describe('Given I have an account menu on the page', function () {
  var accountMenu = require('./account-menu.js')

  var $mobileMenuLink

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/components/account-menu'
    loadFixtures('account-menu.html')

    viewport.set(320, 480)

    accountMenu()

    $nav = $('#secondary-nav')
    $mobileMenuLink = $('#mobile-menu')
    $mobileSubMenu = $('.account-menu__main')
    $yourAccountLink = $('#account-menu__main-2')
    $subnavItems = $('.subnav-items')
    $mobileBack = $('.account-menu__link--back')
    $mobileBackLink = $('.account-menu__link--back a')
  })

  describe('When the page is loaded on mobile', function () {
    it('should show the mobile version of the navigation', function () {
      expect($nav).toHaveClass('is-smaller')
      expect($mobileMenuLink.attr('aria-hidden')).toBe('false')
      expect($mobileMenuLink).toHaveClass('js-visible')
      expect($mobileMenuLink).not.toHaveClass('js-hidden')
      expect($mobileSubMenu).toHaveClass('js-hidden')
      expect($mobileBack.attr('aria-hidden')).toBe('true')
    })

    it('should show the sub nav when account menu is clicked', function () {
      $mobileMenuLink.click()
      expect($mobileMenuLink).toHaveClass('account-home--account--is-open')
      expect($mobileMenuLink.attr('aria-expanded')).toBe('true')
      expect($mobileSubMenu).toHaveClass('main-nav-is-open')
      expect($mobileSubMenu.attr('aria-expanded')).toBe('true')
      expect($yourAccountLink.attr('aria-expanded')).toBe('false')
    })

    it('should reveals the your account subnav when clicked', function () {
      $mobileMenuLink.click()
      $yourAccountLink.click()
      expect($nav).toHaveClass('subnav-is-open')
      expect($mobileSubMenu).toHaveClass('subnav-is-open')
      expect($yourAccountLink.attr('aria-expanded')).toBe('true')
      expect($mobileBack).not.toHaveClass('hidden')
      expect($mobileBack.attr('aria-hidden')).toBe('false')
      expect($subnavItems).toHaveClass('hidden')
    })

    it('should close the your account navigation when clicking back', function () {
      $mobileMenuLink.click()
      $yourAccountLink.click()
      $mobileBackLink.click()
      expect($nav).not.toHaveClass('subnav-is-open')
      expect($mobileSubMenu).not.toHaveClass('subnav-is-open')
      expect($mobileSubMenu).toHaveClass('main-nav-is-open')
      expect($mobileBack).toHaveClass('hidden')
      expect($mobileBack.attr('aria-hidden')).toBe('true')
      expect($subnavItems).not.toHaveClass('hidden')
    })
  })
})
