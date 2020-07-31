"use strict"

/* eslint-env jasmine, jquery */

/* global loadFixtures */

/**
 * Timeout Dialog tests
 */
require('jquery')

require('../../components/index.js')

var dialog = require('./dialog.js')

var timeoutDialog = require('./timeoutDialog.js')

var redirectHelper = require('./redirectHelper.js')
var timeoutHelper = require('./timeoutHelper.js')

describe('Timeout Dialog', function () {
  var assume
  var testScope // an object which is reset between test runs

  var audibleCountSelector = '.screenreader-content.govuk-visually-hidden[aria-live=assertive]'
  var visualCountSelector = '[aria-hidden=true]'

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

  function getVisualCountText() {
    var elem = testScope.latestDialog$element.querySelector(visualCountSelector)
    return getElemText(elem)
  }

  function getAudibleCountText() {
    return getElemText(testScope.latestDialog$element.querySelector(audibleCountSelector))
  }

  beforeEach(function () {
    document.cookie = 'PLAY_LANG=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path/;'
    jasmine.getFixtures().fixturesPath = 'base/patterns/help-users-when-we-time-them-out-of-a-service'
    assume = expect
    testScope = {
      currentDateTime: 1526544629000 // the time these tests were written - this can change but it's best not to write randomness into tests

    }
    spyOn(Date, 'now').and.callFake(function () {
      return testScope.currentDateTime
    })
    spyOn($, 'get').and.callFake(function () {})
    spyOn(redirectHelper, 'redirectToUrl').and.callFake(function () {})
    spyOn(dialog, 'displayDialog').and.callFake(function ($elementToDisplay) {
      testScope.latestDialog$element = $elementToDisplay[0]
      testScope.latestDialogControl = {
        closeDialog: jasmine.createSpy(),
        setAriaLabelledBy: jasmine.createSpy(),
        addCloseHandler: jasmine.createSpy().and.callFake(function (fn) {
          testScope.latestDialogCloseCallback = fn
        })
      }
      return testScope.latestDialogControl
    })
    jasmine.clock().install()
    testScope.minimumValidConfig = {
      timeout: 900,
      countdown: 120,
      keepAliveUrl: '/keep-alive',
      signOutUrl: '/sign-out'
    }
  })
  afterEach(function () {
    if (testScope.timeoutDialogControl && testScope.timeoutDialogControl.cleanup) {
      testScope.timeoutDialogControl.cleanup()
    }

    delete testScope.timeoutDialogControl
    dialog.displayDialog.calls.reset()
    $.get.calls.reset()
    redirectHelper.redirectToUrl.calls.reset()
    jasmine.clock().uninstall()
    jasmine.getFixtures().cleanUp()
  })
  describe('Delay before displaying', function () {
    it('should start countdown at 2.5 minutes', function () {
      setupDialog({
        timeout: 300,
        countdown: 30,
        title: 'one'
      })
      pretendSecondsHavePassed(269)
      expect(dialog.displayDialog).not.toHaveBeenCalled()
      pretendSecondsHavePassed(1)
      expect(dialog.displayDialog).toHaveBeenCalled()
      expect(testScope.latestDialogControl.setAriaLabelledBy).toHaveBeenCalledWith('timeout-message')
    })
  })
  describe('Timeout Dialog', function () {
    it('should start countdown at 13 minutes', function () {
      setupDialog({
        timeout: 900,
        countdown: 120,
        title: 'two'
      })
      pretendSecondsHavePassed(779)
      expect(dialog.displayDialog).not.toHaveBeenCalled()
      pretendSecondsHavePassed(1)
      expect(dialog.displayDialog).toHaveBeenCalled()
    })
  })
  describe('the default options', function () {
    var initialMessage = 'For your security, we will sign you out in 2 minutes.'

    beforeEach(function () {
      setupDialog()
      pretendSecondsHavePassed(781)
    })
    it('should start with a assertive screenreader tone', function () {
      expect(getElemText(testScope.latestDialog$element.querySelector('[aria-live="assertive"]'))).toBe(initialMessage)
    })
    it('should not show heading', function () {
      expect(testScope.latestDialog$element.querySelector('h1.push--top')).toBeDefined()
    })
    it('should show message', function () {
      expect(getVisualCountText()).toEqual(initialMessage)
      expect(getAudibleCountText()).toEqual(initialMessage)
    })
    it('should show keep signed in button', function () {
      expect(testScope.latestDialog$element.querySelector('button#timeout-keep-signin-btn.button').innerText).toEqual('Stay signed in')
    })
    it('should show sign out link', function () {
      expect(testScope.latestDialog$element.querySelector('#timeout-sign-out-link').innerText).toEqual('Sign out')
    })
    it('should separate the call-to-actions into different containers', function () {
      expect(testScope.latestDialog$element.querySelector('button#timeout-keep-signin-btn.button').parentNode).not.toBe(testScope.latestDialog$element.querySelector('#timeout-sign-out-link').parentNode)
    })
    it('should redirect to signout url when signout is clicked', function () {
      assume(redirectHelper.redirectToUrl).not.toHaveBeenCalled()
      clickElem(testScope.latestDialog$element.querySelector('#timeout-sign-out-link'))
      expect(redirectHelper.redirectToUrl).toHaveBeenCalledWith('/sign-out')
    })
    it('should use the signout url on the signout link', function () {
      var $signoutLink = testScope.latestDialog$element.querySelector('a#timeout-sign-out-link')
      expect($signoutLink.attributes.getNamedItem('href').value).toEqual('/sign-out')
    })
    it('should AJAX call the keep alive URL when the keepalive button is clicked', function () {
      assume(testScope.latestDialogControl.closeDialog).not.toHaveBeenCalled()
      clickElem(testScope.latestDialog$element.querySelector('#timeout-keep-signin-btn'))
      expect($.get).toHaveBeenCalledWith('/keep-alive', jasmine.any(Function))
      expect(testScope.latestDialogControl.closeDialog).toHaveBeenCalled()
      pretendSecondsHavePassed(130)
      expect(redirectHelper.redirectToUrl).not.toHaveBeenCalled()
    })
    it('should AJAX call the keep alive URL when dialog is closed without using the button', function () {
      pretendDialogWasClosedWithoutButtonPress()
      expect($.get).toHaveBeenCalledWith('/keep-alive', jasmine.any(Function))
      expect($.get.calls.count()).toEqual(1)
    })
  })
  describe('the default welsh options', function () {
    beforeEach(function () {
      setLanguageToWelsh()
      setupDialog()
      pretendSecondsHavePassed(780)
    })
    it('should not show heading', function () {
      expect(testScope.latestDialog$element.querySelector('h1.push--top')).toBeNull()
    })
    it('should show message', function () {
      var expected = 'Er eich diogelwch, byddwn yn eich allgofnodi cyn pen 2 funud.'
      expect(getVisualCountText()).toEqual(expected)
      expect(getAudibleCountText()).toEqual(expected)
    })
    it('should show keep signed in button', function () {
      expect(getElemText(testScope.latestDialog$element.querySelector('button#timeout-keep-signin-btn.button'))).toEqual('Parhau i fod wedi’ch mewngofnodi')
    })
    it('should show sign out button', function () {
      expect(getElemText(testScope.latestDialog$element.querySelector('a#timeout-sign-out-link'))).toEqual('Allgofnodi')
    })
  })
  it('should AJAX call the configured URL', function () {
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
  describe('the default options when empty strings are provided', function () {
    beforeEach(function () {
      setupDialog({
        title: '',
        message: '',
        keepAliveButtonText: '',
        signOutButtonText: ''
      })
      pretendSecondsHavePassed(780)
    })
    it('should not show heading', function () {
      expect(testScope.latestDialog$element.querySelector('h1')).toBeNull()
    })
    it('should show message', function () {
      expect(getVisualCountText()).toEqual('For your security, we will sign you out in 2 minutes.')
      expect(getAudibleCountText()).toEqual('For your security, we will sign you out in 2 minutes.')
    })
    it('should show keep signed in button', function () {
      expect(getElemText(testScope.latestDialog$element.querySelector('#timeout-keep-signin-btn'))).toEqual('Stay signed in')
    })
    it('should show sign out button', function () {
      expect(getElemText(testScope.latestDialog$element.querySelector('a#timeout-sign-out-link'))).toEqual('Sign out')
    })
  })
  describe('the configuration options', function () {
    beforeEach(function () {
      setupDialog({
        title: 'my custom TITLE',
        message: 'MY custom message',
        messageSuffix: 'My message suffix.',
        keepAliveButtonText: 'KEEP alive',
        signOutButtonText: 'sign OUT',
        signOutUrl: '/mySignOutUrl.html'
      })
      pretendSecondsHavePassed(780)
    })
    it('should show heading', function () {
      expect(getElemText(testScope.latestDialog$element.querySelector('h1'))).toEqual('my custom TITLE')
    })
    it('should show message', function () {
      expect(getVisualCountText()).toEqual('MY custom message 2 minutes. My message suffix.')
      expect(getAudibleCountText()).toEqual('MY custom message 2 minutes. My message suffix.')
    })
    it('should show keep signed in button', function () {
      expect(getElemText(testScope.latestDialog$element.querySelector('#timeout-keep-signin-btn'))).toEqual('KEEP alive')
    })
    it('should show sign out button', function () {
      expect(getElemText(testScope.latestDialog$element.querySelector('a#timeout-sign-out-link'))).toEqual('sign OUT')
    })

    it('should redirect to default signout url when signout is clicked', function () {
      assume(redirectHelper.redirectToUrl).not.toHaveBeenCalled()

      expect(testScope.latestDialog$element.querySelector('#timeout-sign-out-link')).not.toBeNull()

      clickElem(testScope.latestDialog$element.querySelector('#timeout-sign-out-link'))
      expect(redirectHelper.redirectToUrl).toHaveBeenCalledWith('/mySignOutUrl.html')
    })
  })
  describe('Restarting countdown on close', function () {
    it('should restart with default settings', function () {
      setupDialog({
        message: 'time:'
      })
      pretendSecondsHavePassed(880)
      pretendDialogWasClosedWithoutButtonPress()
      dialog.displayDialog.calls.reset()
      pretendSecondsHavePassed(880)
      expect(dialog.displayDialog).toHaveBeenCalled()
      var expected = 'time: 20 seconds.'
      expect(getVisualCountText()).toEqual(expected)
      expect(getAudibleCountText()).toEqual(expected)
    })
  })
  describe('required configuration', function () {
    it('should fail when timeout is missing', function () {
      delete testScope.minimumValidConfig.timeout
      expect(function () {
        setupDialog()
      }).toThrowError('Missing config item(s): [timeout]')
    })
    it('should fail when countdown is missing', function () {
      delete testScope.minimumValidConfig.countdown
      expect(function () {
        setupDialog()
      }).toThrowError('Missing config item(s): [countdown]')
    })
    it('should fail when keepAliveUrl is missing', function () {
      delete testScope.minimumValidConfig.keepAliveUrl
      expect(function () {
        setupDialog()
      }).toThrowError('Missing config item(s): [keepAliveUrl]')
    })
    it('should fail when signOutUrl is missing', function () {
      delete testScope.minimumValidConfig.signOutUrl
      expect(function () {
        setupDialog()
      }).toThrowError('Missing config item(s): [signOutUrl]')
    })
    it('should fail when all config is missing', function () {
      testScope.minimumValidConfig = {}
      expect(function () {
        setupDialog()
      }).toThrowError('Missing config item(s): [timeout, countdown, keepAliveUrl, signOutUrl]')
    })
    it('should fail when timeout is empty', function () {
      testScope.minimumValidConfig.timeout = ''
      expect(function () {
        setupDialog()
      }).toThrowError('Missing config item(s): [timeout]')
    })
    it('should fail when countdown is empty', function () {
      testScope.minimumValidConfig.countdown = ''
      expect(function () {
        setupDialog()
      }).toThrowError('Missing config item(s): [countdown]')
    })
    it('should fail when keepAliveUrl is empty', function () {
      testScope.minimumValidConfig.keepAliveUrl = ''
      expect(function () {
        setupDialog()
      }).toThrowError('Missing config item(s): [keepAliveUrl]')
    })
    it('should fail when signOutUrl is empty', function () {
      testScope.minimumValidConfig.signOutUrl = ''
      expect(function () {
        setupDialog()
      }).toThrowError('Missing config item(s): [signOutUrl]')
    })
  })
  describe('Cleanup', function () {
    var MINIMUM_TIME_UNTIL_MODAL_DISPLAYED = 10
    it('should not display the dialog if cleanup has already been called', function () {
      setupDialog({
        timeout: 130,
        countdown: 120
      })
      testScope.timeoutDialogControl.cleanup()
      pretendSecondsHavePassed(MINIMUM_TIME_UNTIL_MODAL_DISPLAYED)
      expect(dialog.displayDialog).not.toHaveBeenCalled()
    })
    it('should remove dialog when cleanup is called', function () {
      setupDialog({
        timeout: 130,
        countdown: 120
      })
      pretendSecondsHavePassed(MINIMUM_TIME_UNTIL_MODAL_DISPLAYED)
      assume(dialog.displayDialog).toHaveBeenCalled()
      testScope.timeoutDialogControl.cleanup()
      expect(testScope.latestDialogControl.closeDialog).toHaveBeenCalled()
    })
  })
  describe('Countdown timer', function () {
    it('should countdown minutes and then seconds in english', function () {
      setupDialog({
        timeout: 130,
        countdown: 120,
        message: 'time:',
        signOutUrl: 'logout'
      })
      pretendSecondsHavePassed(10)
      expect(getVisualCountText()).toEqual('time: 2 minutes.')
      expect(getAudibleCountText()).toEqual('time: 2 minutes.')
      pretendSecondsHavePassed(59)
      expect(getVisualCountText()).toEqual('time: 2 minutes.')
      expect(getAudibleCountText()).toEqual('time: 2 minutes.')
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('time: 1 minute.')
      expect(getAudibleCountText()).toEqual('time: 1 minute.')
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('time: 59 seconds.')
      expect(getAudibleCountText()).toEqual('time: 1 minute.')
      pretendSecondsHavePassed(57)
      expect(getVisualCountText()).toEqual('time: 2 seconds.')
      expect(getAudibleCountText()).toEqual('time: 20 seconds.')
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('time: 1 second.')
      expect(getAudibleCountText()).toEqual('time: 20 seconds.')
      expect(redirectHelper.redirectToUrl).not.toHaveBeenCalled()
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('time: 0 seconds.')
      expect(getAudibleCountText()).toEqual('time: 20 seconds.')
      pretendSecondsHavePassed(1)
      expect(redirectHelper.redirectToUrl).toHaveBeenCalledWith('logout')
      expect(getVisualCountText()).toEqual('time: -1 seconds.')
      expect(getAudibleCountText()).toEqual('time: 20 seconds.')
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('time: -2 seconds.')
      expect(getAudibleCountText()).toEqual('time: 20 seconds.')
    })
    it('should have an audio countdown which counts the last minute in 20 second decrements', function () {
      setupDialog({
        timeout: 70,
        countdown: 65,
        message: 'time:',
        signOutUrl: 'logout'
      })
      pretendSecondsHavePassed(10)
      expect(getVisualCountText()).toEqual('time: 1 minute.')
      expect(getAudibleCountText()).toEqual('time: 1 minute.')
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('time: 59 seconds.')
      expect(getAudibleCountText()).toEqual('time: 1 minute.')
      pretendSecondsHavePassed(18)
      expect(getVisualCountText()).toEqual('time: 41 seconds.')
      expect(getAudibleCountText()).toEqual('time: 1 minute.')
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('time: 40 seconds.')
      expect(getAudibleCountText()).toEqual('time: 40 seconds.')
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('time: 39 seconds.')
      expect(getAudibleCountText()).toEqual('time: 40 seconds.')
      pretendSecondsHavePassed(18)
      expect(getVisualCountText()).toEqual('time: 21 seconds.')
      expect(getAudibleCountText()).toEqual('time: 40 seconds.')
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('time: 20 seconds.')
      expect(getAudibleCountText()).toEqual('time: 20 seconds.')
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('time: 19 seconds.')
      expect(getAudibleCountText()).toEqual('time: 20 seconds.')
    })
    it('should countdown minutes and then seconds in welsh', function () {
      setLanguageToWelsh()
      setupDialog({
        timeout: 130,
        countdown: 120,
        message: 'Welsh, time:',
        signOutUrl: 'logout'
      })
      pretendSecondsHavePassed(10)
      expect(getVisualCountText()).toEqual('Welsh, time: 2 funud.')
      expect(getAudibleCountText()).toEqual('Welsh, time: 2 funud.')
      pretendSecondsHavePassed(59)
      expect(getVisualCountText()).toEqual('Welsh, time: 2 funud.')
      expect(getAudibleCountText()).toEqual('Welsh, time: 2 funud.')
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('Welsh, time: 1 funud.')
      expect(getAudibleCountText()).toEqual('Welsh, time: 1 funud.')
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('Welsh, time: 59 eiliad.')
      expect(getAudibleCountText()).toEqual('Welsh, time: 1 funud.')
      pretendSecondsHavePassed(57)
      expect(getVisualCountText()).toEqual('Welsh, time: 2 eiliad.')
      expect(getAudibleCountText()).toEqual('Welsh, time: 20 eiliad.')
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('Welsh, time: 1 eiliad.')
      expect(getAudibleCountText()).toEqual('Welsh, time: 20 eiliad.')
      expect(redirectHelper.redirectToUrl).not.toHaveBeenCalled()
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('Welsh, time: 0 eiliad.')
      expect(getAudibleCountText()).toEqual('Welsh, time: 20 eiliad.')
      pretendSecondsHavePassed(1)
      expect(redirectHelper.redirectToUrl).toHaveBeenCalledWith('logout')
      expect(getVisualCountText()).toEqual('Welsh, time: -1 eiliad.')
      expect(getAudibleCountText()).toEqual('Welsh, time: 20 eiliad.')
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('Welsh, time: -2 eiliad.')
      expect(getAudibleCountText()).toEqual('Welsh, time: 20 eiliad.')
    })
    it('should countdown lots of minutes when countdown is long', function () {
      setupDialog({
        timeout: 1810,
        countdown: 1800,
        message: 'time:'
      })
      pretendSecondsHavePassed(10)
      assume(dialog.displayDialog).toHaveBeenCalled()
      expect(getVisualCountText()).toEqual('time: 30 minutes.')
      expect(getAudibleCountText()).toEqual('time: 30 minutes.')
      pretendSecondsHavePassed(59)
      expect(getVisualCountText()).toEqual('time: 30 minutes.')
      expect(getAudibleCountText()).toEqual('time: 30 minutes.')
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('time: 29 minutes.')
      expect(getAudibleCountText()).toEqual('time: 29 minutes.')
    })
    it('should countdown properly when the starting time is not in a round number of minutes', function () {
      setupDialog({
        timeout: 70,
        countdown: 68,
        message: 'Remaining time is'
      })
      spyOn(timeoutHelper, 'setTimeout').and.callThrough()
      pretendSecondsHavePassed(2.123)
      expect(timeoutHelper.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 7877)
    })
    it('should countdown properly when the starting time is not in a round number of minutes', function () {
      setupDialog({
        timeout: 300,
        countdown: 120,
        message: 'Remaining time is'
      })
      spyOn(timeoutHelper, 'setTimeout').and.callThrough()
      pretendSecondsHavePassed(180.4)
      expect(timeoutHelper.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 59600)
    })
    it('should countdown properly when the the intervals aren\'t at perfect seconds', function () {
      setupDialog({
        timeout: 70,
        countdown: 68,
        message: 'Remaining time is'
      })
      spyOn(timeoutHelper, 'setTimeout').and.callThrough()
      pretendSecondsHavePassed(12.123)
      expect(timeoutHelper.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 877)
      timeoutHelper.setTimeout.calls.reset()
      pretendSecondsHavePassed(0.879)
      expect(timeoutHelper.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 998)
    })
    it('should countdown minutes and then seconds in welsh\nn only seconds when the countdown is short', function () {
      setupDialog({
        timeout: 130,
        countdown: 50,
        message: 'Remaining time is',
        signOutUrl: 'logout'
      })
      var lowestAudibleCount = 'Remaining time is 20 seconds.'
      pretendSecondsHavePassed(80)
      expect(getVisualCountText()).toEqual('Remaining time is 50 seconds.')
      expect(getAudibleCountText()).toEqual('Remaining time is 1 minute.')
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('Remaining time is 49 seconds.')
      expect(getAudibleCountText()).toEqual('Remaining time is 1 minute.')
      pretendSecondsHavePassed(47)
      expect(getVisualCountText()).toEqual('Remaining time is 2 seconds.')
      expect(getAudibleCountText()).toEqual(lowestAudibleCount)
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('Remaining time is 1 second.')
      expect(getAudibleCountText()).toEqual(lowestAudibleCount)
      expect(redirectHelper.redirectToUrl).not.toHaveBeenCalled()
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('Remaining time is 0 seconds.')
      expect(getAudibleCountText()).toEqual(lowestAudibleCount)
      pretendSecondsHavePassed(1)
      expect(redirectHelper.redirectToUrl).toHaveBeenCalledWith('logout')
      expect(getVisualCountText()).toEqual('Remaining time is -1 seconds.')
      expect(getAudibleCountText()).toEqual(lowestAudibleCount)
      pretendSecondsHavePassed(1)
      expect(getVisualCountText()).toEqual('Remaining time is -2 seconds.')
      expect(getAudibleCountText()).toEqual(lowestAudibleCount)
    })
  })
  describe('screen reader tools', function () {
    it('should not place aria-hidden elements inside aria-live elements', function () {
      setupDialog({
        timeout: 130,
        countdown: 50,
        message: 'time:',
        signOutUrl: 'logout'
      })
      pretendSecondsHavePassed(80)
      expect(testScope.latestDialog$element.querySelector('[aria-live] [aria-hidden]')).toBeNull()
    })
  })
  describe('techy features', function () {
    it('should not rely on timeout/interval accuracy for countdown', function () {
      setupDialog({
        timeout: 80,
        countdown: 50,
        message: 'You will be timed out in'
      })
      pretendSecondsHavePassed(29)
      assume(dialog.displayDialog).not.toHaveBeenCalled()
      pretendSecondsHavePassed(1)
      expect(dialog.displayDialog).toHaveBeenCalled()
      expect(getVisualCountText()).toEqual('You will be timed out in 50 seconds.')
      testScope.currentDateTime += 2 * 1000 // two seconds go by without any interval events

      pretendSecondsHavePassed(1)
      expect(dialog.displayDialog).toHaveBeenCalled()
      expect(getVisualCountText()).toEqual('You will be timed out in 47 seconds.')
    })
    describe('Timeouts', function () {
      beforeEach(function () {
        var tmpCount = 0
        testScope.intervalReturn = {
          'data-message': 'this has been returned from a spy'
        }
        testScope.timeoutFirstRun = true
        spyOn(timeoutHelper, 'clearTimeout').and.callFake(function () {})
        spyOn(timeoutHelper, 'setTimeout').and.callFake(function (fn) {
          if (testScope.timeoutFirstRun) {
            testScope.timeoutFirstRun = false
            fn()
            return 'not the first run: ' + tmpCount
          } else {
            return testScope.intervalReturn
          }
        })
        setupDialog({
          timeout: 130,
          countdown: 120
        })
        pretendSecondsHavePassed(30)
        assume(timeoutHelper.setTimeout).toHaveBeenCalled()
        assume(timeoutHelper.clearTimeout).not.toHaveBeenCalled()
      })
      it('should clearTimeout on cleanup', function () {
        testScope.timeoutDialogControl.cleanup()
        expect(timeoutHelper.clearTimeout).toHaveBeenCalledWith(testScope.intervalReturn)
      })
      it('should clearTimeout on closeDialog', function () {
        pretendDialogWasClosedWithoutButtonPress()
        expect(timeoutHelper.clearTimeout).toHaveBeenCalledWith(testScope.intervalReturn)
      })
    })
    it('shouldn\'t regenerate audible countdown', function () {
      setupDialog({
        timeout: 80,
        countdown: 70
      })
      pretendSecondsHavePassed(20)
      var originalJQueryTextFn = $.prototype.text
      var updates = []
      spyOn($.prototype, 'text').and.callFake(function () {
        if ($(this).is(audibleCountSelector) && arguments.length > 0) {
          updates.push(arguments[0])
        }
        return originalJQueryTextFn.apply(this, arguments)
      })
      pretendSecondsHavePassed(19)
      expect(updates).toEqual([])
      pretendSecondsHavePassed(1)
      expect(updates).toEqual(['For your security, we will sign you out in 40 seconds.'])
      pretendSecondsHavePassed(20)
      expect(updates).toEqual(['For your security, we will sign you out in 40 seconds.', 'For your security, we will sign you out in 20 seconds.'])
    })
  })
})

function getElemText(elem) {
  if (!elem) {
    throw new Error('Can\'t get text from an element that doesn\'t exist.')
  }

  var out = ''

  for (var i = 0; i < elem.childNodes.length; i++) {
    var child = elem.childNodes[i]

    if (child.nodeType === 3) {
      out += child.textContent
    } else {
      out += child.innerText
    }
  }

  return out
}

function clickElem(elem) {
  if (!elem) {
    throw new Error('Can\'t click an element that doesn\'t exist.')
  }

  var e = document.createEvent('Events')
  e.initEvent('click', true, true, window, 1)
  elem.dispatchEvent(e)
}

function setLanguageToWelsh() {
  document.cookie = "PLAY_LANG=cy"
}
