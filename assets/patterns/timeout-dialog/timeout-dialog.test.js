/* eslint-env jasmine, jquery */
/* global loadFixtures */

/**
 * Timeout Dialog tests
 */

require('jquery')


describe('Timeout Dialog', function () {
  var timeoutDialog = require('./timeoutDialog.js')

  function pretendSecondsHavePassed(numberOfSeconds) {
    jasmine.clock().tick(numberOfSeconds * 10)
  }

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/patterns/timeout-dialog'
    loadFixtures('timeout-dialog.html')
    jasmine.clock().install()
    $.timeoutDialog = timeoutDialog
  })

  afterEach(function () {
    jasmine.clock().uninstall()
    jasmine.getFixtures().cleanUp()
  })


  describe('with custom settings', function () {
    it('should start countdown at 2.5 minutes', function () {
      $.timeoutDialog({timeout: 300, count: 30})

      pretendSecondsHavePassed(269)

      expect($('#timeout-dialog')).not.toBeInDOM()

      pretendSecondsHavePassed(1)

      expect($('#timeout-dialog')).toBeInDOM()
    })
  })
  describe('with default settings', function () {
    it('should start countdown at 13 minutes', function () {
      $.timeoutDialog()

      pretendSecondsHavePassed(779)

      expect($('#timeout-dialog')).not.toBeInDOM()

      pretendSecondsHavePassed(1)

      expect($('#timeout-dialog')).toBeInDOM()
    })
  })

  describe('the default options', function () {

    beforeEach(function () {
      $.timeoutDialog()
      pretendSecondsHavePassed(780)
    })
    it('should show heading', function () {
      expect($('#timeout-dialog h1')).toContainText('You’re about to be signed out')
    })

    it('should show message', function () {
      expect($('#timeout-message').text()).toEqual('For security reasons, you will be signed out of this service in 2 minutes')
    })

    it('should show keep signed in button', function () {
      expect($('#timeout-keep-signin-btn').text()).toEqual('Stay signed in')
    })

    it('should show sign out button', function () {
      expect($('#timeout-sign-out-btn').text()).toEqual('Sign out')
    })
    it('should hide when escape is pressed', function () {
      var esc = $.Event('keydown', { keyCode: 27 })
      $('#timeout-dialog').trigger(esc)
      expect($('#timeout-dialog')).not.toBeInDOM()
    })
    it('should not hide when space bar is pressed', function () {
      var esc = $.Event('keydown', { keyCode: 32 })
      $('#timeout-dialog').trigger(esc)
      expect($('#timeout-dialog')).toBeInDOM()
    })
  })
})
