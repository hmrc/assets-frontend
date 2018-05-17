/* eslint-env jasmine, jquery */
/* global loadFixtures */

/**
 * Timeout Dialog tests
 */

require('jquery')
require('../../components/index.js')
var dialog = require('../../patterns/timeout-dialog/dialog.js')


describe('Timeout Dialog', function () {
  var ESCAPE_KEY_CODE = 27
  var assume
  var testScope // an object which is reset between test runs

  function pretendSecondsHavePassed(numberOfSeconds) {
    var millis = numberOfSeconds * 1000
    testScope.currentDateTime += millis
    jasmine.clock().tick(millis)
  }

  function triggerKeyPress(keyCode) {
    $('#timeout-dialog').trigger($.Event('keydown', {keyCode: keyCode}))
  }

  function pretendDialogWasClosedWithoutButtonPress() {
    if (!testScope.latestDialogCloseCallback) {
      throw new Error('No dialog close callback available.')
    }
    testScope.latestDialogCloseCallback()
  }

  function pretendEverythingButEscapeWasPressed() {
    var keyCode = 256
    while (keyCode >= 0) {
      keyCode--
      if (keyCode !== ESCAPE_KEY_CODE) {
        triggerKeyPress(keyCode)
      }
    }
  }

  beforeEach(function () {
    assume = expect
    testScope = {
      currentDateTime: 1526544629000, // the time these tests were written - this can change but it's best not to write randomness into tests
      redirector: jasmine.createSpy('redirector')
    }
    spyOn(Date, 'now').and.callFake(function () {
      return testScope.currentDateTime
    })
    spyOn(dialog, 'displayDialog').and.callFake(function ($elementToDisplay, closeCallback) {
      testScope.latestDialog$element = $elementToDisplay
      testScope.latestDialogCloseCallback = closeCallback
      testScope.latestDialogControl = {
        closeDialog: jasmine.createSpy('closeDialog')
      }
      return testScope.latestDialogControl
    })
    jasmine.getFixtures().fixturesPath = 'base/patterns/timeout-dialog'
    loadFixtures('timeout-dialog.html')
    jasmine.clock().install()
  })

  afterEach(function () {
    if (testScope.timeoutDialogControl && testScope.timeoutDialogControl.cleanup) {
      testScope.timeoutDialogControl.cleanup();
    }
    delete testScope.timeoutDialogControl
    jasmine.clock().uninstall()
    jasmine.getFixtures().cleanUp()
  })

  describe('Delay before displaying', function () {
    it('should start countdown at 2.5 minutes', function () {
      testScope.timeoutDialogControl = window.govuk.timeoutDialog({timeout: 300, countdown: 30})

      pretendSecondsHavePassed(269)

      expect(dialog.displayDialog).not.toHaveBeenCalled()
      expect(dialog.displayDialog).not.toHaveBeenCalled()

      pretendSecondsHavePassed(1)

      expect(dialog.displayDialog).toHaveBeenCalled()
    })
    it('should start countdown at 13 minutes by default', function () {
      testScope.timeoutDialogControl = window.govuk.timeoutDialog()

      pretendSecondsHavePassed(779)

      expect(dialog.displayDialog).not.toHaveBeenCalled()

      pretendSecondsHavePassed(1)

      expect(dialog.displayDialog).toHaveBeenCalled()
    })
  })

  describe('the default options', function () {
    beforeEach(function () {
      testScope.timeoutDialogControl = window.govuk.timeoutDialog({redirector: testScope.redirector})
      pretendSecondsHavePassed(780)
    })

    it('should show heading', function () {
      expect(testScope.latestDialog$element.find('h1.push--top')).toContainText('You’re about to be signed out')
    })

    it('should show message', function () {
      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('For security reasons, you will be signed out of this service in 2 minutes.')
    })

    it('should show keep signed in button', function () {
      expect(testScope.latestDialog$element.find('#timeout-keep-signin-btn.button').text()).toEqual('Stay signed in')
    })

    it('should show sign out button', function () {
      expect(testScope.latestDialog$element.find('#timeout-sign-out-btn.link').text()).toEqual('Sign out')
    })

    it('should redirect to default signout url when signout is clicked', function () {
      assume(testScope.redirector).not.toHaveBeenCalled()

      testScope.latestDialog$element.find('#timeout-sign-out-btn').click()
      expect(testScope.redirector).toHaveBeenCalledWith('/sign-out')
    })

    it('should AJAX call the keep alive URL when the keepalive button is clicked', function () {
      spyOn($, 'get')

      assume(testScope.latestDialogControl.closeDialog).not.toHaveBeenCalled()

      testScope.latestDialog$element.find('#timeout-keep-signin-btn').trigger('click')

      expect($.get).toHaveBeenCalledWith('/keep-alive', jasmine.any(Function))
      expect(testScope.latestDialogControl.closeDialog).toHaveBeenCalled()

      pretendSecondsHavePassed(130)
      expect(testScope.redirector).not.toHaveBeenCalled()
    })

    it('should AJAX call the keep alive URL when dialog is closed without using the button', function () {
      spyOn($, 'get')

      pretendDialogWasClosedWithoutButtonPress()

      expect($.get).toHaveBeenCalledWith('/keep-alive', jasmine.any(Function))
      expect($.get.calls.count()).toEqual(1)
    })

  })

  it('should AJAX call the configured URL', function () {
    spyOn($, 'get')

    testScope.timeoutDialogControl = window.govuk.timeoutDialog({timeout: 130, countdown: 120, keep_alive_url: '/customKeepAlive'})

    pretendSecondsHavePassed(10)
    pretendDialogWasClosedWithoutButtonPress()

    expect($.get).toHaveBeenCalledWith('/customKeepAlive', jasmine.any(Function))
    expect($.get.calls.count()).toEqual(1)
  })

  describe('the configuration options', function () {
    beforeEach(function () {
      testScope.timeoutDialogControl = window.govuk.timeoutDialog({
        title: 'my custom TITLE',
        message: 'MY custom message',
        keep_alive_button_text: 'KEEP alive',
        sign_out_button_text: 'sign OUT',
        logout_url: '/myLogoutUrl.html',
        redirector: testScope.redirector
      })
      pretendSecondsHavePassed(780)
    })

    it('should show heading', function () {
      expect(testScope.latestDialog$element.find('h1')).toContainText('my custom TITLE')
    })

    it('should show message', function () {
      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('MY custom message 2 minutes.')
    })

    it('should show keep signed in button', function () {
      expect(testScope.latestDialog$element.find('#timeout-keep-signin-btn').text()).toEqual('KEEP alive')
    })

    it('should show sign out button', function () {
      expect(testScope.latestDialog$element.find('#timeout-sign-out-btn').text()).toEqual('sign OUT')
    })

    it('should redirect to default signout url when signout is clicked', function () {
      assume(testScope.redirector).not.toHaveBeenCalled()

      expect(testScope.latestDialog$element).toContainElement('#timeout-sign-out-btn')

      testScope.latestDialog$element.find('#timeout-sign-out-btn').click()
      expect(testScope.redirector).toHaveBeenCalledWith('/myLogoutUrl.html')
    })
  })

  describe('Restarting countdown on close', function () {
    it('should restart with default settings', function () {
      testScope.timeoutDialogControl = window.govuk.timeoutDialog({message: 'time:'})

      pretendSecondsHavePassed(880)
      pretendDialogWasClosedWithoutButtonPress()
      dialog.displayDialog.calls.reset()
      pretendSecondsHavePassed(880)

      expect(dialog.displayDialog).toHaveBeenCalled()
      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 20 seconds.')
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
      spyOn(window.console, 'warn')
      $.timeoutDialog();

      expect(window.govuk.timeoutDialog).toHaveBeenCalledWith({
        timeout: 900,
        countdown: 120,
        keep_alive_url: '/keep-alive',
        logout_url: '/sign-out'
      });
    })

    it('should override legacy defaults with specified config', function () {
      spyOn(window.console, 'warn')
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

    it('should not display the dialog if cleanup has already been called', function () {
      testScope.timeoutDialogControl = window.govuk.timeoutDialog({timeout: 130, countdown: 120})

      testScope.timeoutDialogControl.cleanup()
      pretendSecondsHavePassed(MINIMUM_TIME_UNTIL_MODAL_DISPLAYED)
      expect(dialog.displayDialog).not.toHaveBeenCalled()
    })

    it('should remove dialog when cleanup is called', function () {
      testScope.timeoutDialogControl = window.govuk.timeoutDialog({timeout: 130, countdown: 120})
      pretendSecondsHavePassed(MINIMUM_TIME_UNTIL_MODAL_DISPLAYED)
      assume(dialog.displayDialog).toHaveBeenCalled()

      testScope.timeoutDialogControl.cleanup()

      expect(testScope.latestDialogControl.closeDialog).toHaveBeenCalled()
    })
  })

  describe('Countdown timer', function () {
    it('should countdown minutes and then seconds', function () {
      testScope.timeoutDialogControl = window.govuk.timeoutDialog({
        timeout: 130,
        countdown: 120,
        message: 'time:',
        logout_url: 'logout',
        redirector: testScope.redirector
      })

      pretendSecondsHavePassed(10)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 2 minutes.')
      pretendSecondsHavePassed(59)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 2 minutes.')
      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 1 minute.')
      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 59 seconds.')
      pretendSecondsHavePassed(57)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 2 seconds.')
      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 1 second.')
      expect(testScope.redirector).not.toHaveBeenCalled()

      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 0 seconds.')
      pretendSecondsHavePassed(1)

      expect(testScope.redirector).toHaveBeenCalledWith('logout')
      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: -1 seconds.')
      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: -2 seconds.')
    })

    it('should countdown lots of minutes when countdown is long', function () {
      testScope.timeoutDialogControl = window.govuk.timeoutDialog({
        timeout: 1810,
        countdown: 1800,
        message: 'time:'
      })

      pretendSecondsHavePassed(10)
      assume(dialog.displayDialog).toHaveBeenCalled()

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 30 minutes.')
      pretendSecondsHavePassed(59)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 30 minutes.')
      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 29 minutes.')
    })

    it('should countdown only seconds when the countdown is short', function () {
      testScope.timeoutDialogControl = window.govuk.timeoutDialog({
        timeout: 130,
        countdown: 50,
        message: 'time:',
        logout_url: 'logout',
        redirector: testScope.redirector
      })

      pretendSecondsHavePassed(80)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 50 seconds.')
      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 49 seconds.')
      pretendSecondsHavePassed(47)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 2 seconds.')
      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 1 second.')
      expect(testScope.redirector).not.toHaveBeenCalled()

      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 0 seconds.')
      pretendSecondsHavePassed(1)

      expect(testScope.redirector).toHaveBeenCalledWith('logout')
      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: -1 seconds.')
      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: -2 seconds.')
    })
  })
  describe('techy features', function () {
    it('should not rely on setInterval for countdown', function () {
      testScope.timeoutDialogControl = window.govuk.timeoutDialog({
        timeout: 80,
        countdown: 50,
        message: 'time:'
      })

      pretendSecondsHavePassed(29)

      assume(dialog.displayDialog).not.toHaveBeenCalled()
      pretendSecondsHavePassed(1)

      expect(dialog.displayDialog).toHaveBeenCalled()
      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 50 seconds.')
      testScope.currentDateTime += 2 * 1000 // two seconds go by without any interval events
      pretendSecondsHavePassed(1)

      expect(dialog.displayDialog).toHaveBeenCalled()
      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 47 seconds.')
    })

    it('should clearInterval on cleanup', function () {
      var intervalReturn = {message: 'this has been returned from a spy'}
      jasmine.clock().uninstall()
      spyOn(window, 'setInterval').and.returnValue(intervalReturn)
      spyOn(window, 'clearInterval')
      spyOn(window, 'setTimeout').and.callFake(function (fn) {
        fn()
      })

      testScope.timeoutDialogControl = window.govuk.timeoutDialog({timeout: 130, countdown: 120})
      assume(window.setInterval).toHaveBeenCalled()
      assume(window.clearInterval).not.toHaveBeenCalled()

      testScope.timeoutDialogControl.cleanup()
      expect(window.clearInterval).toHaveBeenCalledWith(intervalReturn)
    })

    it('should clearInterval on closeDialog', function () {
      var intervalReturn = {message: 'this has been returned from a spy'}
      jasmine.clock().uninstall()
      spyOn(window, 'setInterval').and.returnValue(intervalReturn)
      spyOn(window, 'clearInterval')
      spyOn(window, 'setTimeout').and.callFake(function (fn) {
        fn()
      })

      testScope.timeoutDialogControl = window.govuk.timeoutDialog({timeout: 130, countdown: 120})
      assume(window.setInterval).toHaveBeenCalled()
      assume(window.clearInterval).not.toHaveBeenCalled()

      testScope.latestDialogCloseCallback()
      expect(window.clearInterval).toHaveBeenCalledWith(intervalReturn)
    })
  })
})
