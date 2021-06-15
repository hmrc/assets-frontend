module.exports = {
  displayDialog: function ($elementToDisplay) {
    var $dialog = $('<div id="timeout-dialog" tabindex="-1" role="dialog" class="timeout-dialog">')
      .append($elementToDisplay)
    var $overlay = $('<div id="timeout-overlay" class="timeout-overlay">')
    var resetElementsFunctionList = []
    var closeCallbacks = []

    if (!$('html').hasClass('noScroll')) {
      $('html').addClass('noScroll')
      resetElementsFunctionList.push(function () {
        $('html').removeClass('noScroll')
      })
    }
    $('body').append($dialog).append($overlay)

    resetElementsFunctionList.push(function () {
      $dialog.remove()
      $overlay.remove()
    })

    // disable the non-dialog page to prevent confusion for VoiceOver users
    $('#skiplink-container, body>header, body>main, body>footer').each(function () {
      var value = $(this).attr('aria-hidden')
      var $elem = $(this)
      resetElementsFunctionList.push(function () {
        if (value) {
          $elem.attr('aria-hidden', value)
        } else {
          $elem.removeAttr('aria-hidden')
        }
      })
    }).attr('aria-hidden', 'true')

    setupFocusHandlerAndFocusDialog()
    setupKeydownHandler()
    preventMobileScrollWhileAllowingPinchZoom()

    function close() {
      while (resetElementsFunctionList.length > 0) {
        var fn = resetElementsFunctionList.shift()
        fn()
      }
    }

    function closeAndInform() {
      $.each(closeCallbacks, function () {
        var fn = this
        fn()
      })
      close()
    }

    function setupFocusHandlerAndFocusDialog() {
      function keepFocus(event) {
        var modalFocus = document.getElementById('timeout-dialog')
        if (modalFocus) {
          if (event.target !== modalFocus && !modalFocus.contains(event.target)) {
            event.stopPropagation()
            modalFocus.focus()
          }
        }
      }

      var elemToFocusOnReset = document.activeElement
      $dialog.focus()

      $(document).on('focus', '*', keepFocus)

      resetElementsFunctionList.push(function () {
        $(document).off('focus', '*', keepFocus)
        $(elemToFocusOnReset).focus()
      })
    }

    function setupKeydownHandler() {
      function keydownListener(e) {
        if (e.keyCode === 27) {
          closeAndInform()
        }
      }

      $(document).on('keydown', keydownListener)

      resetElementsFunctionList.push(function () {
        $(document).off('keydown', keydownListener)
      })
    }

    function preventMobileScrollWhileAllowingPinchZoom() {
      function handleTouch(e) {
        var touches = e.originalEvent.touches || e.originalEvent.changedTouches || []

        if (touches.length === 1) {
          e.preventDefault()
        }
      }

      $(document).on('touchmove', handleTouch)

      resetElementsFunctionList.push(function () {
        $(document).off('touchmove', handleTouch)
      })
    }

    function createSetterFunctionForAttributeOfDialog(attributeName) {
      return function (value) {
        if (value) {
          $dialog.attr(attributeName, value)
        } else {
          $dialog.removeAttr(attributeName)
        }
      }
    }

    return {
      closeDialog: function () {
        close()
      },
      setAriaLive: createSetterFunctionForAttributeOfDialog('aria-live'),
      setAriaLabelledBy: createSetterFunctionForAttributeOfDialog('aria-labelledby'),
      addCloseHandler: function (closeHandler) {
        closeCallbacks.push(closeHandler)
      }
    }
  }
}
