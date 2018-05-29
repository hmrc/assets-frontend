/* eslint-env jasmine, jquery */
/* global loadFixtures */

/**
 * Timeout Dialog tests
 */

require('jquery')
require('../../components/index.js')
var dialog = require('./dialog.js')
var redirectHelper = require('./redirectHelper.js')

describe('Timeout Dialog', function () {
  var assume
  var testScope // an object which is reset between test runs

  function pretendSecondsHavePassed(numberOfSeconds) {
    var millis = numberOfSeconds * 1000
    testScope.currentDateTime += millis
    jasmine.clock().tick(millis)
  }

  function pretendDialogWasClosedWithoutButtonPress() {
    if (!testScope.latestDialogCloseCallback) {
      throw new Error('No dialog close callback available.')
    }
    testScope.latestDialogCloseCallback()
  }

  function setupDialog(partialConfig) {
    testScope.timeoutDialogControl = window.GOVUK.timeoutDialog($.extend({}, testScope.minimumValidConfig, partialConfig))
  }

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/patterns/help-users-when-we-time-them-out-of-a-service'
    assume = expect
    testScope = {
      currentDateTime: 1526544629000, // the time these tests were written - this can change but it's best not to write randomness into tests
    }
    spyOn(Date, 'now').and.callFake(function () {
      return testScope.currentDateTime
    })
    spyOn(redirectHelper, 'redirectToUrl')
    spyOn(dialog, 'displayDialog').and.callFake(function ($elementToDisplay) {
      testScope.latestDialog$element = $elementToDisplay
      testScope.latestDialogControl = {
        closeDialog: jasmine.createSpy('closeDialog'),
        setAriaLive: jasmine.createSpy('setAriaLive'),
        setAriaLabelledBy: jasmine.createSpy('setAriaLabelledBy'),
        addCloseHandler: jasmine.createSpy('addCloseHandler').and.callFake(function (fn) {
          testScope.latestDialogCloseCallback = fn
        })
      }
      return testScope.latestDialogControl
    })
    loadFixtures('timeout-dialog.html')
    jasmine.clock().install()
    testScope.minimumValidConfig = {
      timeout: 900,
      countdown: 120,
      keepAliveUrl: '/keep-alive',
      signOutUrl: '/sign-out',
      language: 'en'
    }
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
      setupDialog({timeout: 300, countdown: 30})

      pretendSecondsHavePassed(269)

      expect(dialog.displayDialog).not.toHaveBeenCalled()

      pretendSecondsHavePassed(1)

      expect(dialog.displayDialog).toHaveBeenCalled()
      expect(testScope.latestDialogControl.setAriaLive).not.toHaveBeenCalledWith('polite')
      expect(testScope.latestDialogControl.setAriaLabelledBy).toHaveBeenCalledWith('timeout-message')
    })

    it('should start countdown at 13 minutes', function () {
      setupDialog({timeout: 900, countdown: 120})

      pretendSecondsHavePassed(779)

      expect(dialog.displayDialog).not.toHaveBeenCalled()

      pretendSecondsHavePassed(1)

      expect(dialog.displayDialog).toHaveBeenCalled()
    })

  })

  describe('the default options', function () {
    beforeEach(function () {
      setupDialog()
      pretendSecondsHavePassed(780)
    })

    it('should start with a polite screenreader tone', function () {
      expect(testScope.latestDialogControl.setAriaLive).toHaveBeenCalledWith('polite')
    })

    it('should show heading', function () {
      expect(testScope.latestDialog$element.find('h1.push--top')).toContainText('You’re about to be signed out')
    })

    it('should show message', function () {
      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('For security reasons, you will be signed out of this service in 2 minutes.')
    })

    it('should show keep signed in button', function () {
      expect(testScope.latestDialog$element.find('button#timeout-keep-signin-btn.button').text()).toEqual('Stay signed in')
    })

    it('should show sign out button', function () {
      expect(testScope.latestDialog$element.find('button#timeout-sign-out-btn.button.button--link').text()).toEqual('Sign out')
    })

    it('should redirect to default signout url when signout is clicked', function () {
      assume(redirectHelper.redirectToUrl).not.toHaveBeenCalled()

      testScope.latestDialog$element.find('#timeout-sign-out-btn').click()
      expect(redirectHelper.redirectToUrl).toHaveBeenCalledWith('/sign-out')
    })

    it('should AJAX call the keep alive URL when the keepalive button is clicked', function () {
      spyOn($, 'get')

      assume(testScope.latestDialogControl.closeDialog).not.toHaveBeenCalled()

      testScope.latestDialog$element.find('#timeout-keep-signin-btn').trigger('click')

      expect($.get).toHaveBeenCalledWith('/keep-alive', jasmine.any(Function))
      expect(testScope.latestDialogControl.closeDialog).toHaveBeenCalled()

      pretendSecondsHavePassed(130)
      expect(redirectHelper.redirectToUrl).not.toHaveBeenCalled()
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

    setupDialog({
      timeout: 130,
      countdown: 120,
      keepAliveUrl: '/customKeepAlive'
    })

    pretendSecondsHavePassed(10)
    pretendDialogWasClosedWithoutButtonPress()

    expect($.get).toHaveBeenCalledWith('/customKeepAlive', jasmine.any(Function))
    expect($.get.calls.count()).toEqual(1)
  })

  describe('the configuration options', function () {
    beforeEach(function () {
      setupDialog({
        title: 'my custom TITLE',
        message: 'MY custom message',
        keepAliveButtonText: 'KEEP alive',
        signOutButtonText: 'sign OUT',
        signOutUrl: '/mySignOutUrl.html'
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
      expect(testScope.latestDialog$element.find('#timeout-sign-out-btn.button.button--link').text()).toEqual('sign OUT')
    })

    it('should redirect to default signout url when signout is clicked', function () {
      assume(redirectHelper.redirectToUrl).not.toHaveBeenCalled()

      expect(testScope.latestDialog$element).toContainElement('#timeout-sign-out-btn')

      testScope.latestDialog$element.find('#timeout-sign-out-btn').click()
      expect(redirectHelper.redirectToUrl).toHaveBeenCalledWith('/mySignOutUrl.html')
    })
  })

  describe('Restarting countdown on close', function () {
    it('should restart with default settings', function () {
      setupDialog({message: 'time:'})

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
      spyOn(window.GOVUK, 'timeoutDialog')
      spyOn(window.console, 'warn')
    })

    it('should log a deprecation warning', function () {
      $.timeoutDialog();

      expect(window.console.warn).toHaveBeenCalledWith('$.timeout is now deprecated, please use window.GOVUK.timeoutDialog')
    })

    it('should provide legacy defaults when no config object is provided', function () {
      $.timeoutDialog();

      expect(window.GOVUK.timeoutDialog).toHaveBeenCalledWith({
        timeout: 900,
        countdown: 120,
        keepAliveUrl: '/keep-alive',
        signOutUrl: '/sign-out',
        language: 'en'
      });
    })

    it('should override legacy defaults with specified config, overrides turned into camelCase', function () {
      var config = {
        timeout: 200,
        keep_alive_url: '/hello-world',
        logout_url: '/goodbye-world',
        keep_alive_button_text: 'my button text',
        sign_out_button_text: 'sign out button text',
        language: 'en'
      }

      $.timeoutDialog(config);

      expect(window.GOVUK.timeoutDialog).toHaveBeenCalledWith({
          timeout: 200,
          countdown: 120,
          keepAliveUrl: '/hello-world',
          signOutUrl: '/goodbye-world',
          keepAliveButtonText: 'my button text',
          signOutButtonText: 'sign out button text',
          language: 'en'
        }
      );
    })

    it('should mix defaults with specified config', function () {
      var config = {
        timeout: 700,
        language: 'cy',
        otherConfigItem: 'something'
      }

      $.timeoutDialog(config);

      expect(window.GOVUK.timeoutDialog).toHaveBeenCalledWith({
        timeout: 700,
        countdown: 120,
        keepAliveUrl: '/keep-alive',
        signOutUrl: '/sign-out',
        language: 'cy',
        otherConfigItem: 'something'
      });
    })
  })
  describe('required configuration', function () {
    it('should fail when timeout is missing', function () {
      delete testScope.minimumValidConfig.timeout

      expect(function () {
        GOVUK.timeoutDialog(testScope.minimumValidConfig)
      }).toThrow(new Error('Missing config item(s): [timeout]'))
    })

    it('should fail when countdown is missing', function () {
      delete testScope.minimumValidConfig.countdown

      expect(function () {
        GOVUK.timeoutDialog(testScope.minimumValidConfig)
      }).toThrow(new Error('Missing config item(s): [countdown]'))
    })

    it('should fail when keepAliveUrl is missing', function () {
      delete testScope.minimumValidConfig.keepAliveUrl

      expect(function () {
        GOVUK.timeoutDialog(testScope.minimumValidConfig)
      }).toThrow(new Error('Missing config item(s): [keepAliveUrl]'))
    })

    it('should fail when signOutUrl is missing', function () {
      delete testScope.minimumValidConfig.signOutUrl

      expect(function () {
        GOVUK.timeoutDialog(testScope.minimumValidConfig)
      }).toThrow(new Error('Missing config item(s): [signOutUrl]'))
    })

    it('should fail when language is missing', function () {
      delete testScope.minimumValidConfig.language

      expect(function () {
        GOVUK.timeoutDialog(testScope.minimumValidConfig)
      }).toThrow(new Error('Missing config item(s): [language]'))
    })

    it('should fail when all config is missing', function () {
      expect(function () {
        GOVUK.timeoutDialog({})
      }).toThrow(new Error('Missing config item(s): [timeout, countdown, keepAliveUrl, signOutUrl, language]'))
    })

    it('should allow english as a language', function () {
      testScope.minimumValidConfig.language = 'en'
      expect(function () {
        GOVUK.timeoutDialog(testScope.minimumValidConfig)
      }).not.toThrow()
    })

    it('should allow welsh as a language', function () {
      testScope.minimumValidConfig.language = 'cy'
      expect(function () {
        GOVUK.timeoutDialog(testScope.minimumValidConfig)
      }).not.toThrow()
    })

    it('should not allow other languages', function () {
      $.each(['fr', 'de', 'not-a-language'], function () {
        var lang = testScope.minimumValidConfig.language = this
        expect(function () {
          GOVUK.timeoutDialog(testScope.minimumValidConfig)
        }).toThrow(new Error('Invalid language provided [' + lang + ']'))
      })
    })
  })

  describe('Cleanup', function () {
    var MINIMUM_TIME_UNTIL_MODAL_DISPLAYED = 10;

    it('should not display the dialog if cleanup has already been called', function () {
      setupDialog({timeout: 130, countdown: 120})

      testScope.timeoutDialogControl.cleanup()
      pretendSecondsHavePassed(MINIMUM_TIME_UNTIL_MODAL_DISPLAYED)
      expect(dialog.displayDialog).not.toHaveBeenCalled()
    })

    it('should remove dialog when cleanup is called', function () {
      setupDialog({timeout: 130, countdown: 120})
      pretendSecondsHavePassed(MINIMUM_TIME_UNTIL_MODAL_DISPLAYED)
      assume(dialog.displayDialog).toHaveBeenCalled()

      testScope.timeoutDialogControl.cleanup()

      expect(testScope.latestDialogControl.closeDialog).toHaveBeenCalled()
    })
  })

  describe('Countdown timer', function () {
    it('should countdown minutes and then seconds', function () {
      setupDialog({
        timeout: 130,
        countdown: 120,
        message: 'time:',
        signOutUrl: 'logout'
      })

      pretendSecondsHavePassed(10)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 2 minutes.')
      pretendSecondsHavePassed(59)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 2 minutes.')
      expect(testScope.latestDialogControl.setAriaLive).not.toHaveBeenCalledWith()
      pretendSecondsHavePassed(1)

      expect(testScope.latestDialogControl.setAriaLive).toHaveBeenCalledWith()
      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 1 minute.')
      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 59 seconds.')
      pretendSecondsHavePassed(57)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 2 seconds.')
      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 1 second.')
      expect(redirectHelper.redirectToUrl).not.toHaveBeenCalled()

      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 0 seconds.')
      pretendSecondsHavePassed(1)

      expect(redirectHelper.redirectToUrl).toHaveBeenCalledWith('logout')
      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: -1 seconds.')
      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: -2 seconds.')
    })

    it('should countdown lots of minutes when countdown is long', function () {
      setupDialog({
        timeout: 1810,
        countdown: 1800,
        message: 'time:'
      })

      pretendSecondsHavePassed(10)
      assume(dialog.displayDialog).toHaveBeenCalled()
      expect(testScope.latestDialogControl.setAriaLive).toHaveBeenCalledWith('polite')

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 30 minutes.')
      pretendSecondsHavePassed(59)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 30 minutes.')
      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 29 minutes.')
    })

    it('should countdown only seconds when the countdown is short', function () {
      setupDialog({
        timeout: 130,
        countdown: 50,
        message: 'time:',
        signOutUrl: 'logout',
      })

      pretendSecondsHavePassed(80)

      expect(testScope.latestDialogControl.setAriaLive).not.toHaveBeenCalled()
      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 50 seconds.')
      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 49 seconds.')
      pretendSecondsHavePassed(47)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 2 seconds.')
      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 1 second.')
      expect(redirectHelper.redirectToUrl).not.toHaveBeenCalled()

      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: 0 seconds.')
      pretendSecondsHavePassed(1)

      expect(redirectHelper.redirectToUrl).toHaveBeenCalledWith('logout')
      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: -1 seconds.')
      pretendSecondsHavePassed(1)

      expect(testScope.latestDialog$element.find('#timeout-message').text()).toEqual('time: -2 seconds.')
    })
  })
  describe('techy features', function () {
    it('should not rely on setInterval for countdown', function () {
      setupDialog({
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

      setupDialog({timeout: 130, countdown: 120})
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

      setupDialog({timeout: 130, countdown: 120})
      assume(window.setInterval).toHaveBeenCalled()
      assume(window.clearInterval).not.toHaveBeenCalled()

      testScope.latestDialogCloseCallback()
      expect(window.clearInterval).toHaveBeenCalledWith(intervalReturn)
    })
  })
})
