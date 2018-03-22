/* eslint-env jasmine, jquery */
/* global loadFixtures */

/**
 * Account menu module tests
 */

var $ = require('jquery')

describe('Given I have an account menu of the page', function () {
  var accountMenu = require('./account-menu.js')

  var $menuItem1
  var $menuItem2
  var $subMenu1
  var $subMenu2

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/components/account-menu'
    loadFixtures('account-menu.html')

    accountMenu()

    $menuItem1 = $('#account-menu__main-1')
    $menuItem2 = $('#account-menu__main-2')
    $subMenu1 = $('#subnav-1')
    $subMenu2 = $('#subnav-2')
  })

  describe('When the page is loaded', function () {
    it('An account menu should show menu items with no sub menus visible', function () {
      expect($subMenu1).toHaveClass('js-hidden')
      expect($subMenu2).toHaveClass('js-hidden')
    })
  })

  // describe('When I click on the first menu item', function () {
  //   it('the first sub menu should open', function () {
  //     expect($subMenu1).not.toHaveClass('js-hidden')
  //   })
  // })

  // describe('When I click on the second menu item', function () {
  //   it('the second sub menu should open', function () {
  //     expect($subMenu2).not.toHaveClass('js-hidden')
  //   })
  // })
})
