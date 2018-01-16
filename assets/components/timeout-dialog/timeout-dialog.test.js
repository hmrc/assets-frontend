/* eslint-env jasmine, jquery */
/* global loadFixtures */

/**
 * Timeout Dialog tests
 */

require('jquery')
describe('Given the timeout dialog has been called', function () {
  var timeoutDialog

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/components/timeout-dialog'
    loadFixtures('timeout-dialog.html')
    timeoutDialog = require('./timeoutDialog.js')
    $(function () {
      $.timeoutDialog = timeoutDialog
    })
    $.timeoutDialog({ timeout: 120 })
  })

  describe('the timeout dialog', function () {
    it('should not display on page load', function () {
      expect($('#timeout-dialog')).not.toBeInDOM()
    })

    it('should display', function (done) {
      setTimeout(function () {
        expect($('#timeout-dialog')).toBeInDOM()
        done()
      }, 10)
    })
  })

  describe('the default options', function () {
    it('should show heading', function () {
      expect($('#timeout-dialog h1')).toContainText('You’re about to be signed out')
    })

    it('should show message', function () {
      expect($('#timeout-message')).toContainText('For security reasons, you will be signed out of this service in 2 minutes')
    })

    it('should show keep signed in button', function () {
      expect($('#timeout-keep-signin-btn')).toContainText('Stay signed in')
    })

    it('should show sign out button', function () {
      expect($('#timeout-sign-out-btn')).toContainText('Sign out')
    })
  })

  describe('when the esc key is pressed', function () {
    beforeEach(function () {
      var esc = $.Event('keydown', { keyCode: 27 })
      $('#timeout-dialog').trigger(esc)
    })
    it('should not display', function () {
      expect($('#timeout-dialog')).not.toBeInDOM()
    })
  })
})
