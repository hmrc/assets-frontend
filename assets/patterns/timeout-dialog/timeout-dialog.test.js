/* eslint-env jasmine, jquery */
/* global loadFixtures */

/**
 * Timeout Dialog tests
 */

require('jquery')
require('../../components/index.js')


describe('Timeout Dialog', function () {
  var ESCAPE_KEY_CODE = 27
  var timeoutDialogControl
  var redirector
  var assume

  function pretendSecondsHavePassed(numberOfSeconds) {
    jasmine.clock().tick(numberOfSeconds * 1000)
  }

  beforeEach(function () {
    assume = expect
    jasmine.getFixtures().fixturesPath = 'base/patterns/timeout-dialog'
    loadFixtures('timeout-dialog.html')
    jasmine.clock().install()
    redirector = jasmine.createSpy('redirector')
  })

  afterEach(function () {
    if (timeoutDialogControl && timeoutDialogControl.cleanup) {
      timeoutDialogControl.cleanup();
    }
    delete timeoutDialogControl
    jasmine.clock().uninstall()
    jasmine.getFixtures().cleanUp()
  })

  describe('Delay before displaying', function () {
    it('should start countdown at 2.5 minutes', function () {
      timeoutDialogControl = window.govuk.timeoutDialog({timeout: 300, countdown: 30})

      pretendSecondsHavePassed(269)

      expect($('#timeout-dialog')).not.toBeInDOM()

      pretendSecondsHavePassed(1)

      expect($('#timeout-dialog')).toBeInDOM()
    })
    it('should start countdown at 13 minutes by default', function () {
      timeoutDialogControl = window.govuk.timeoutDialog()

      pretendSecondsHavePassed(779)

      expect($('#timeout-dialog')).not.toBeInDOM()

      pretendSecondsHavePassed(1)

      expect($('#timeout-dialog')).toBeInDOM()
    })
  })
  describe('the default options', function () {
    beforeEach(function () {
      timeoutDialogControl = window.govuk.timeoutDialog({redirector: redirector})
      pretendSecondsHavePassed(780)
    })
    it('should show heading', function () {
      expect($('#timeout-dialog h1')).toContainText('You’re about to be signed out')
    })

    it('should show message', function () {
      expect($('#timeout-dialog #timeout-message').text()).toEqual('For security reasons, you will be signed out of this service in 2 minutes.')
    })

    it('should show keep signed in button', function () {
      expect($('#timeout-dialog #timeout-keep-signin-btn').text()).toEqual('Stay signed in')
    })

    it('should show sign out button', function () {
      expect($('#timeout-dialog #timeout-sign-out-btn').text()).toEqual('Sign out')
    })
    it('should hide when escape is pressed', function () {
      var esc = $.Event('keydown', {keyCode: ESCAPE_KEY_CODE})
      $('#timeout-dialog').trigger(esc)
      expect($('#timeout-dialog')).not.toBeInDOM()
    })
    it('should not hide when everything other than the escape key is pressed', function () {
      var keyCode = 256
      while (keyCode >= 0) {
        keyCode--
        if (keyCode !== ESCAPE_KEY_CODE) {
          $('#timeout-dialog').trigger($.Event('keydown', {keyCode: keyCode}))
        }
      }
      expect($('#timeout-dialog')).toBeInDOM()
    })
    it('should be attached to the end of the body', function () {
      var $lastElement = $('body').children().last()
      var $secondToLastElement = $lastElement.prev()

      expect($lastElement.attr('id')).toEqual('timeout-overlay')
      expect($secondToLastElement.attr('id')).toEqual('timeout-dialog')
    })
    it('should redirect to default signout url when signout is clicked', function () {
      assume(redirector).not.toHaveBeenCalled()

      $('#timeout-dialog #timeout-sign-out-btn').click()

      expect(redirector).toHaveBeenCalledWith('/sign-out')
    })

    it('should specify no background scroll while dialog is open', function () {
      expect($('html')).toHaveClass('noScroll')
    })

    it('should remove no background scroll when dialog closes', function () {
      timeoutDialogControl.cleanup()
      expect($('html')).not.toHaveClass('noScroll')
    })
  })
  describe('the configuration options', function () {
    beforeEach(function () {
      timeoutDialogControl = window.govuk.timeoutDialog({
        title: 'my custom TITLE',
        message: 'MY custom message',
        keep_alive_button_text: 'KEEP alive',
        sign_out_button_text: 'sign OUT',
        logout_url: '/myLogoutUrl.html',
        redirector: redirector
      })
      pretendSecondsHavePassed(780)
    })
    it('should show heading', function () {
      expect($('#timeout-dialog h1')).toContainText('my custom TITLE')
    })

    it('should show message', function () {
      expect($('#timeout-dialog #timeout-message').text()).toEqual('MY custom message 2 minutes.')
    })

    it('should show keep signed in button', function () {
      expect($('#timeout-dialog #timeout-keep-signin-btn').text()).toEqual('KEEP alive')
    })

    it('should show sign out button', function () {
      expect($('#timeout-dialog #timeout-sign-out-btn').text()).toEqual('sign OUT')
    })

    it('should redirect to default signout url when signout is clicked', function () {
      assume(redirector).not.toHaveBeenCalled()

      $('#timeout-dialog #timeout-sign-out-btn').click()

      expect(redirector).toHaveBeenCalledWith('/myLogoutUrl.html')
    })
  })
  describe('Using the legacy interface', function () {
    beforeEach(function () {
      spyOn(window.govuk, 'timeoutDialog')
    })
    it('should log a deprecation warning', function () {
      spyOn(window.console, 'warn')

      $.timeoutDialog();

      expect(window.console.warn).toHaveBeenCalledWith('$.timeout is now deprecated, please use window.govuk.timeoutDialog')
    })
    it('should provide legacy defaults when no config object is provided', function () {
      $.timeoutDialog();

      expect(window.govuk.timeoutDialog).toHaveBeenCalledWith({
        timeout: 900,
        countdown: 120,
        keep_alive_url: '/keep-alive',
        logout_url: '/sign-out'
      });
    })
    it('should override legacy defaults with specified config', function () {
      var config = {
        timeout: 100,
        countdown: 50,
        keep_alive_url: '/hello-world',
        logout_url: '/goodbye-world'
      }

      $.timeoutDialog(config);

      expect(window.govuk.timeoutDialog).toHaveBeenCalledWith(config);
    })
  })
  describe('Cleanup', function () {
    var MINIMUM_TIME_UNTIL_MODAL_DISPLAYED = 10;
    beforeEach(function () {
      timeoutDialogControl = window.govuk.timeoutDialog({timeout: 130, countdown: 120})
    })
    it('should not display the dialog if cleanup has already been called', function () {
      timeoutDialogControl.cleanup()
      pretendSecondsHavePassed(MINIMUM_TIME_UNTIL_MODAL_DISPLAYED)
      expect($('#timeout-dialog')).not.toBeInDOM()
    })
    it('should remove dialog when cleanup is called', function () {
      pretendSecondsHavePassed(MINIMUM_TIME_UNTIL_MODAL_DISPLAYED)
      expect($('#timeout-dialog')).toBeInDOM()
      timeoutDialogControl.cleanup()
      expect($('#timeout-dialog')).not.toBeInDOM()
    })
  })

  describe('Countdown timer', function () {
    it('should countdown minutes and then seconds', function () {
      window.govuk.timeoutDialog({timeout: 130, count: 120, message: 'time:', logout_url: 'logout', redirector: redirector})

      pretendSecondsHavePassed(10)

      expect($('#timeout-dialog #timeout-message').text()).toEqual('time: 2 minutes.')

      pretendSecondsHavePassed(59)

      expect($('#timeout-dialog #timeout-message').text()).toEqual('time: 2 minutes.')

      pretendSecondsHavePassed(1)

      expect($('#timeout-dialog #timeout-message').text()).toEqual('time: 1 minute.')

      pretendSecondsHavePassed(1)

      expect($('#timeout-dialog #timeout-message').text()).toEqual('time: 59 seconds.')

      pretendSecondsHavePassed(57)

      expect($('#timeout-dialog #timeout-message').text()).toEqual('time: 2 seconds.')

      pretendSecondsHavePassed(1)

      expect($('#timeout-dialog #timeout-message').text()).toEqual('time: 1 seconds.')
      expect(redirector).not.toHaveBeenCalled()

      pretendSecondsHavePassed(1)

      expect($('#timeout-dialog #timeout-message').text()).toEqual('time: 0 seconds.')

      pretendSecondsHavePassed(1)

      expect(redirector).toHaveBeenCalledWith('logout')
      expect($('#timeout-dialog #timeout-message').text()).toEqual('time: -1 seconds.')

      pretendSecondsHavePassed(1)

      expect($('#timeout-dialog #timeout-message').text()).toEqual('time: -2 seconds.')
    })
    it('should countdown only seconds when the countdown is short', function () {
      window.govuk.timeoutDialog({timeout: 130, count: 50, message: 'time:', logout_url: 'logout', redirector: redirector})

      pretendSecondsHavePassed(80)

      expect($('#timeout-dialog #timeout-message').text()).toEqual('time: 50 seconds.')

      pretendSecondsHavePassed(1)

      expect($('#timeout-dialog #timeout-message').text()).toEqual('time: 49 seconds.')

      pretendSecondsHavePassed(47)

      expect($('#timeout-dialog #timeout-message').text()).toEqual('time: 2 seconds.')

      pretendSecondsHavePassed(1)

      expect($('#timeout-dialog #timeout-message').text()).toEqual('time: 1 seconds.')
      expect(redirector).not.toHaveBeenCalled()

      pretendSecondsHavePassed(1)

      expect($('#timeout-dialog #timeout-message').text()).toEqual('time: 0 seconds.')

      pretendSecondsHavePassed(1)

      expect(redirector).toHaveBeenCalledWith('logout')
      expect($('#timeout-dialog #timeout-message').text()).toEqual('time: -1 seconds.')

      pretendSecondsHavePassed(1)

      expect($('#timeout-dialog #timeout-message').text()).toEqual('time: -2 seconds.')
    })
  })
})
