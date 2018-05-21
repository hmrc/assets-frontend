var dialog = require('./dialog.js')

describe('Dialog', function () {
  var assume = expect
  var $DEFAULT_ELEMENT_TO_DISPLAY
  var testScope

  function pretendEscapeWasPressed() {
    triggerKeyPress(ESCAPE_KEY_CODE)
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

  function triggerKeyPress(keyCode) {
    $(document).trigger($.Event('keydown', {keyCode: keyCode}))
  }

  var ESCAPE_KEY_CODE = 27

  beforeEach(function () {
    $DEFAULT_ELEMENT_TO_DISPLAY = $('<div>').text('Dialog message').attr('id', 'added-to-dialog')
    testScope = {}
  })

  afterEach(function () {
    if (testScope.dialogControl) {
      testScope.dialogControl.closeDialog()
    }
  })

  function openDefaultDialog() {
    testScope.closeCallback = jasmine.createSpy('closeCallback')
    testScope.dialogControl = dialog.displayDialog($DEFAULT_ELEMENT_TO_DISPLAY, testScope.closeCallback)
  }

  describe('When open', function () {

    beforeEach(function () {
      assume($('#timeout-overlay')).not.toBeInDOM()
      assume($('#timeout-dialog')).not.toBeInDOM()

      openDefaultDialog()
    })

    it('calling close should remove the elements', function () {
      assume($('#timeout-overlay')).toBeInDOM()
      assume($('#timeout-dialog')).toBeInDOM()

      testScope.dialogControl.closeDialog()

      expect($('#timeout-overlay')).not.toBeInDOM()
      expect($('#timeout-dialog')).not.toBeInDOM()
      expect(testScope.closeCallback).not.toHaveBeenCalled()
    })

    it('should be added to the dom', function () {
      expect($('#timeout-overlay')).toBeInDOM()
      expect($('#timeout-dialog')).toBeInDOM()
    })

    it('should be attached to the end of the body', function () {
      var $lastElement = $('body').children().last()
      var $secondToLastElement = $lastElement.prev()

      expect($lastElement.attr('id')).toEqual('timeout-overlay')
      expect($secondToLastElement.attr('id')).toEqual('timeout-dialog')
    })

    it('should contain provided element', function () {
      expect($('#timeout-dialog')).toContainElement($DEFAULT_ELEMENT_TO_DISPLAY)
    })

    it('should hide when escape is pressed', function () {
      assume(testScope.closeCallback).not.toHaveBeenCalled()

      pretendEscapeWasPressed()

      expect(testScope.closeCallback).toHaveBeenCalled()
      expect($('#timeout-overlay')).not.toBeInDOM()
      expect($('#timeout-dialog')).not.toBeInDOM()
    })

    it('should only call callback once when escape is pressed many times', function () {
      assume(testScope.closeCallback).not.toHaveBeenCalled()

      pretendEscapeWasPressed()
      pretendEscapeWasPressed()
      pretendEscapeWasPressed()
      pretendEscapeWasPressed()
      pretendEscapeWasPressed()

      expect(testScope.closeCallback.calls.count()).toEqual(1)
    })

    it('should only call callback once when escape is pressed after closeDialog was called', function () {
      assume(testScope.closeCallback).not.toHaveBeenCalled()

      testScope.dialogControl.closeDialog()

      pretendEscapeWasPressed()

      expect(testScope.closeCallback).not.toHaveBeenCalled()
    })

    it('should hide when escape is pressed', function () {
      pretendEverythingButEscapeWasPressed()

      expect($('#timeout-dialog')).toBeInDOM()
      expect($('#timeout-overlay')).toBeInDOM()
      expect(testScope.closeCallback).not.toHaveBeenCalled()
    })
  })
  it('should open with specified element', function () {
    var $root = $('<div>').attr('id', 'my-custom-elem').text('abc');

    testScope.dialogControl = dialog.displayDialog($root)

    expect($('#timeout-dialog')).toContainElement($root)
  })
  it('should not error when escape is pressed and no callback is provided', function () {
    testScope.dialogControl = dialog.displayDialog($DEFAULT_ELEMENT_TO_DISPLAY, function(){})

    expect(pretendEscapeWasPressed).not.toThrow()

    expect($('#timeout-dialog')).not.toBeInDOM()
    expect($('#timeout-overlay')).not.toBeInDOM()
  })
//
// it('should not callback on escape after cleanup', function () {
//   spyOn($, 'get')
//
//   testScope.timeoutDialogControl.cleanup();
//
//   pretendDialogWasClosedWithoutButtonPress()
//
//   expect($.get).not.toHaveBeenCalled()
// })
// it('should specify no background scroll while dialog is open', function () {
//   expect($('html')).toHaveClass('noScroll')
// })
//
// it('should remove no background scroll when dialog cleaned up', function () {
//   testScope.timeoutDialogControl.cleanup()
//
//   expect($('html')).not.toHaveClass('noScroll')
// })
//
// it('should remove no background scroll when dialog closes on escape key press', function () {
//   pretendDialogWasClosedWithoutButtonPress()
//
//   expect($('html')).not.toHaveClass('noScroll')
// })
//
// it('should remove no background scroll when dialog closes on keep alive button press', function () {
//   $('#timeout-keep-signin-btn').click()
//
//   expect($('html')).not.toHaveClass('noScroll')
// })
// it('should not AJAX call before dialog is open', function () {
//   spyOn($, 'get')
//
//   testScope.timeoutDialogControl = window.govuk.timeoutDialog()
//   pretendDialogWasClosedWithoutButtonPress()
//
//   expect($.get).not.toHaveBeenCalled()
// })

})
