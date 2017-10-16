/* eslint-env jasmine, jquery */
/* global loadFixtures */

/**
 * Account menu module tests
 */

require('jquery')

describe('Given I have an account menu of the page', function () {
  var accountMenu

  var $menuItem1, $menuItem2, $subMenu1, $subMenu2

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/components/account-menu'
    loadFixtures('account-menu.html')

    accountMenu = require('./account-menu.js')

    $menuItem1 = $('#account-menu__main-1')
    $menuItem2 = $('#account-menu__main-2')
    $subMenu1 = $('#subnav-1')
    $subMenu2 = $('#subnav-2')
  })

  describe('When the page is loaded', function () {
    beforeEach(function () {
      accountMenu()
    })

    it('An account menu should show menu items with no sub menus visible', function () {
      expect($subMenu1).toHaveClass('js-hidden')
      expect($subMenu2).toHaveClass('js-hidden')
    })
  })

  describe('When I click on the first menu item', function () {
    beforeEach(function () {
      accountMenu()
      $($menuItem1).click()
    })

    it('the first sub menu should open', function () {
      // expect($subMenu1).not.toHaveClass('js-hidden')
    })
  })

  describe('When I click on the second menu item', function () {
    beforeEach(function () {
      accountMenu()
      $menuItem2.trigger('click')
    })

    it('the second sub menu should open', function () {
      // expect($subMenu2).not.toHaveClass('js-hidden')
    })
  })
})
