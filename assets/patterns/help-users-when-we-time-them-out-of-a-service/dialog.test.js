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
    testScope.dialogControl = dialog.displayDialog($DEFAULT_ELEMENT_TO_DISPLAY)
    testScope.dialogControl.addCloseHandler(testScope.closeCallback)
  }

  describe('When open', function () {

    beforeEach(function () {
      assume($('#timeout-overlay')).not.toBeInDOM()
      assume($('#timeout-dialog')).not.toBeInDOM()

      openDefaultDialog()
    })

    it('calling close should remove the elements', function () {
      assume($('#timeout-overlay.timeout-overlay')).toBeInDOM()
      assume($('#timeout-dialog.timeout-dialog')).toBeInDOM()

      testScope.dialogControl.closeDialog()

      expect($('#timeout-overlay')).not.toBeInDOM()
      expect($('#timeout-dialog')).not.toBeInDOM()
      expect(testScope.closeCallback).not.toHaveBeenCalled()
    })

    it('should be added to the dom with correct attributes', function () {
      var $overlay = $('#timeout-overlay')
      var $dialog = $('#timeout-dialog')

      expect($overlay).toBeInDOM()
      expect($overlay).toHaveClass('timeout-overlay')
      expect($dialog).toBeInDOM()
      expect($dialog).toHaveClass('timeout-dialog')
      expect($dialog).toHaveAttr('role', 'dialog')
      expect($dialog).toHaveAttr('tabindex', '-1')
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

    it('should specify no background scroll', function () {
      expect($('html')).toHaveClass('noScroll')
    })

    it('should remove no background scroll when closed with escape key', function () {
      pretendEscapeWasPressed()

      expect($('html')).not.toHaveClass('noScroll')
    })

    it('should remove no background scroll when closed with control function', function () {
      testScope.dialogControl.closeDialog()

      expect($('html')).not.toHaveClass('noScroll')
    })
  })

  it('should not remove noScroll class if it was set before opening', function () {
    $('html').addClass('noScroll')

    openDefaultDialog()
    pretendEscapeWasPressed()

    expect($('html')).toHaveClass('noScroll')

    $('html').removeClass('noScroll') // to cleanup before the next test
  })

  it('should open with specified element', function () {
    var $root = $('<div>').attr('id', 'my-custom-elem').text('abc');

    testScope.dialogControl = dialog.displayDialog($root)

    expect($('#timeout-dialog')).toContainElement($root)
  })
  it('should not error when escape is pressed and no callback is provided', function () {
    testScope.dialogControl = dialog.displayDialog($DEFAULT_ELEMENT_TO_DISPLAY)

    expect(pretendEscapeWasPressed).not.toThrow()

    expect($('#timeout-dialog')).not.toBeInDOM()
    expect($('#timeout-overlay')).not.toBeInDOM()
  })

  describe('Manipulating page elements for dialog', function () {
    beforeEach(function () {
      testScope.elementsCreatedForThisTest = []
      if ($('#skiplink-container').length === 0) {
        testScope.elementsCreatedForThisTest.push($('<div id=skiplink-container>').appendTo($('body')))
      }
      if ($('#global-cookie-message').length === 0) {
        testScope.elementsCreatedForThisTest.push($('<div id=global-cookie-message>').appendTo($('body')))
      }
      if ($('body>header').length === 0) {
        testScope.elementsCreatedForThisTest.push($('<header>').appendTo($('body')))
      }
      if ($('body>main').length === 0) {
        testScope.elementsCreatedForThisTest.push($('<main>').appendTo($('body')))
      }
      if ($('body>footer').length === 0) {
        testScope.elementsCreatedForThisTest.push($('<footer>').appendTo($('body')))
      }
    })
    afterEach(function () {
      testScope.elementsCreatedForThisTest.forEach(function ($elem) {
        $elem.remove()
      })
    })

    it('should set aria-hidden when dialog is open', function () {
      var selectors = [
        '#skiplink-container',
        'body>header',
        '#global-cookie-message',
        'body>main',
        'body>footer'
      ];
      selectors.forEach(function (selector) {
        assume($(selector)).toBeInDOM()
      })

      openDefaultDialog()

      selectors.forEach(function (selector) {
        var $selected = $(selector);
        $selected.each(function () {
          expect($(this)).toHaveAttr('aria-hidden', 'true')
        })
      })
    })

    it('should reset to previous values when closed', function () {
      assume(testScope.elementsCreatedForThisTest.length).toBeGreaterThanOrEqual(3)
      testScope.elementsCreatedForThisTest[0].attr('aria-hidden', 'abcd')
      testScope.elementsCreatedForThisTest[1].attr('aria-hidden', 'efgh')
      assume(testScope.elementsCreatedForThisTest[2]).not.toHaveAttr('aria-hidden')

      openDefaultDialog()

      expect(testScope.elementsCreatedForThisTest[0]).toHaveAttr('aria-hidden', 'true')
      expect(testScope.elementsCreatedForThisTest[1]).toHaveAttr('aria-hidden', 'true')
      expect(testScope.elementsCreatedForThisTest[2]).toHaveAttr('aria-hidden', 'true')

      pretendEscapeWasPressed()

      expect(testScope.elementsCreatedForThisTest[0]).toHaveAttr('aria-hidden', 'abcd')
      expect(testScope.elementsCreatedForThisTest[1]).toHaveAttr('aria-hidden', 'efgh')
      expect(testScope.elementsCreatedForThisTest[2]).not.toHaveAttr('aria-hidden')
    })

    it('should allow aria-live to be set, reset and removed', function () {
      openDefaultDialog()
      var $dialog = $('#timeout-dialog');

      expect($dialog).not.toHaveAttr('aria-live')

      testScope.dialogControl.setAriaLive('polite')

      expect($dialog).toHaveAttr('aria-live', 'polite')

      testScope.dialogControl.setAriaLive()

      expect($dialog).not.toHaveAttr('aria-live')
    })

    it('should allow aria-labelledby to be set, reset and removed', function () {
      openDefaultDialog()
      var $dialog = $('#timeout-dialog');

      expect($dialog).not.toHaveAttr('aria-labelledby')

      testScope.dialogControl.setAriaLabelledBy('element-id')

      expect($dialog).toHaveAttr('aria-labelledby', 'element-id')

      testScope.dialogControl.setAriaLabelledBy('something-else')

      expect($dialog).toHaveAttr('aria-labelledby', 'something-else')

      testScope.dialogControl.setAriaLabelledBy()

      expect($dialog).not.toHaveAttr('aria-labelledby')
    })

    describe('Focus control', function () {
      function expeectActiveElementToHaveId(id) {
        expect($(document.activeElement).attr('id') || document.activeElement.outerHTML).toEqual(id)
      }

      function appendToBody($elem) {
        testScope.elementsCreatedForThisTest.push($elem.appendTo($('body')))
        return $elem
      }

      beforeEach(function () {
        appendToBody($('<a href=#>').text('abc').attr('id', 'the-element-with-the-focus')).focus()
        appendToBody($('<input>').attr('id', 'different-elem'))
        appendToBody($('<button>').text('abc'))
        appendToBody($('<textarea>').text('abc'))
        appendToBody($('<div tabindex="-1">').text('abc'))
        appendToBody($('<div tabindex="10">').text('def'))
      })

      it('should take focus when opening', function () {
        openDefaultDialog()

        expeectActiveElementToHaveId('timeout-dialog')
      })

      it('should return the focus when closed', function () {
        $('#the-element-with-the-focus').focus()
        expeectActiveElementToHaveId('the-element-with-the-focus')

        openDefaultDialog()
        testScope.dialogControl.closeDialog()

        expeectActiveElementToHaveId('the-element-with-the-focus')

        $('#different-elem').focus()

        openDefaultDialog()
        pretendEscapeWasPressed()

        expeectActiveElementToHaveId('different-elem')
      })

      it('should not allow focus to move outside the dialog', function () {
        openDefaultDialog()

        appendToBody($('<a href=#>').text('this was added after dialog open').attr('id', 'added-after-open'))

        testScope.elementsCreatedForThisTest.forEach(function ($elem) {
          $elem.focus()
          expeectActiveElementToHaveId('timeout-dialog')
        })
      })

      it('should allow focus to move outside the dialog after closing', function () {
        openDefaultDialog()
        testScope.dialogControl.closeDialog()

        $('#the-element-with-the-focus').focus()
        expeectActiveElementToHaveId('the-element-with-the-focus')

        $('#different-elem').focus()
        expeectActiveElementToHaveId('different-elem')
      })

      it('should allow focus to move inside the dialog', function () {
        expeectActiveElementToHaveId('the-element-with-the-focus')

        testScope.dialogControl = dialog.displayDialog($('<div><a href=# id="button-a">Button A</a><a href=# id="button-b">Button B</a></div>'))

        $('#button-a').focus()
        expeectActiveElementToHaveId('button-a')

        $('#button-b').focus()
        expeectActiveElementToHaveId('button-b')

        testScope.dialogControl.closeDialog()

        expeectActiveElementToHaveId('the-element-with-the-focus')
      })
    })
  })

  describe('Zoom and Scroll on Mobile', function () {
    function simulateTouchmoveWithNumberOfFingers(n) {
      return triggerTouchmoveEventWith('touches', n)
    }

    function simulateNumberOfChangedTouches(n) {
      return triggerTouchmoveEventWith('changedTouches', n)
    }

    function triggerTouchmoveEventWith(arrayName, arrayLength) {
      var arr = []
      for (var i = 0; i < arrayLength; i++) {
        arr.push({})
      }
      var originalEvent = {}
      originalEvent[arrayName] = arr
      var event = $.Event('touchmove', {originalEvent: originalEvent})
      $(document).trigger(event)
      return event
    }

    beforeEach(function () {
      jasmine.addMatchers({
        toHaveHadDefaultPrevented: function () {
          return {
            compare: function (actual) {
              var result = {}
              var passMessage = ['Expected', actual.type, 'event']
              result.pass = actual.isDefaultPrevented()
              if (result.pass) {
                passMessage.push('not', 'to have had default prevented')
              } else {
                passMessage.push('to have had default prevented, but it wasn\'t prevented')
              }
              result.message = passMessage.join(' ')
              return result
            }
          }
        }
      })
    })
    it('should allow all combinations before dialog is open', function () {
      expect(simulateTouchmoveWithNumberOfFingers(1)).not.toHaveHadDefaultPrevented()
      expect(simulateTouchmoveWithNumberOfFingers(2)).not.toHaveHadDefaultPrevented()
      expect(simulateTouchmoveWithNumberOfFingers(3)).not.toHaveHadDefaultPrevented()
      expect(simulateTouchmoveWithNumberOfFingers(4)).not.toHaveHadDefaultPrevented()
      expect(simulateTouchmoveWithNumberOfFingers(5)).not.toHaveHadDefaultPrevented()
      expect(simulateNumberOfChangedTouches(1)).not.toHaveHadDefaultPrevented()
      expect(simulateNumberOfChangedTouches(2)).not.toHaveHadDefaultPrevented()
      expect(simulateNumberOfChangedTouches(3)).not.toHaveHadDefaultPrevented()
      expect(simulateNumberOfChangedTouches(4)).not.toHaveHadDefaultPrevented()
      expect(simulateNumberOfChangedTouches(5)).not.toHaveHadDefaultPrevented()
    })
    it('should disallow scroll while dialog is open', function () {
      openDefaultDialog()

      expect(simulateTouchmoveWithNumberOfFingers(1)).toHaveHadDefaultPrevented()
      expect(simulateNumberOfChangedTouches(1)).toHaveHadDefaultPrevented()
    })
    it('should allow pinch scroll while dialog is open', function () {
      openDefaultDialog()

      expect(simulateTouchmoveWithNumberOfFingers(2)).not.toHaveHadDefaultPrevented()
      expect(simulateNumberOfChangedTouches(2)).not.toHaveHadDefaultPrevented()
    })
    it('should allow other multifinger touches while dialog is open', function () {
      openDefaultDialog()

      expect(simulateTouchmoveWithNumberOfFingers(3)).not.toHaveHadDefaultPrevented()
      expect(simulateTouchmoveWithNumberOfFingers(4)).not.toHaveHadDefaultPrevented()
      expect(simulateTouchmoveWithNumberOfFingers(5)).not.toHaveHadDefaultPrevented()
      expect(simulateNumberOfChangedTouches(3)).not.toHaveHadDefaultPrevented()
      expect(simulateNumberOfChangedTouches(4)).not.toHaveHadDefaultPrevented()
      expect(simulateNumberOfChangedTouches(5)).not.toHaveHadDefaultPrevented()
    })
    it('should allow all combinations after dialog is closed', function () {
      openDefaultDialog()
      testScope.dialogControl.closeDialog()

      expect(simulateTouchmoveWithNumberOfFingers(1)).not.toHaveHadDefaultPrevented()
      expect(simulateTouchmoveWithNumberOfFingers(2)).not.toHaveHadDefaultPrevented()
      expect(simulateTouchmoveWithNumberOfFingers(3)).not.toHaveHadDefaultPrevented()
      expect(simulateTouchmoveWithNumberOfFingers(4)).not.toHaveHadDefaultPrevented()
      expect(simulateTouchmoveWithNumberOfFingers(5)).not.toHaveHadDefaultPrevented()
      expect(simulateNumberOfChangedTouches(1)).not.toHaveHadDefaultPrevented()
      expect(simulateNumberOfChangedTouches(2)).not.toHaveHadDefaultPrevented()
      expect(simulateNumberOfChangedTouches(3)).not.toHaveHadDefaultPrevented()
      expect(simulateNumberOfChangedTouches(4)).not.toHaveHadDefaultPrevented()
      expect(simulateNumberOfChangedTouches(5)).not.toHaveHadDefaultPrevented()

    })
  })
})
