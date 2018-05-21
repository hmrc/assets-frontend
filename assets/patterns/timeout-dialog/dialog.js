module.exports = {
  displayDialog: function ($elementToDisplay, closeCallback) {
    var $dialog = $('<div>')
      .attr({
        'id': 'timeout-dialog',
        'tabindex': '-1',
        'role': 'dialog',
        'aria-live': 'polite'
      })
      .addClass('timeout-dialog')
      .append($elementToDisplay)
    var $overlay = $('<div>')
      .attr('id', 'timeout-overlay')
      .addClass('timeout-overlay')
    var noop = function () {
    }
    var safeCallback = closeCallback || noop
    var keydownListener = function (e) {
      if (e.keyCode === 27) {
        closeAndInform()
      }
    }
    var $elementsToAriaHide = $('#skiplink-container, body>header, #global-cookie-message, body>main, body>footer');
    var resetElementsFunctionList = []

    if (!$('html').hasClass('noScroll')) {
      $('html').addClass('noScroll')
      resetElementsFunctionList.push(function () {
        $('html').removeClass('noScroll')
      })
    }
    $('body').append($dialog).append($overlay)

    // disable the non-dialog page to prevent confusion for VoiceOver users
    $elementsToAriaHide.each(function () {
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

    var returnFocusFn = (function () {
      var elemToFocus = document.activeElement
      return function () {
        $(elemToFocus).focus()
      }
    }())
    $dialog.focus()

    $(document).on('focus', '*', keepFocus)
    $(document).on('keydown', keydownListener)

    resetElementsFunctionList.push(function () {
      $dialog.remove()
      $overlay.remove()
      $(document).off('focus', '*', keepFocus)
      $(document).off('keydown', keydownListener)
      returnFocusFn()
    })

    function keepFocus(event) {
      var modalFocus = document.getElementById('timeout-dialog')
      if (modalFocus) {
        if (event.target !== modalFocus && !modalFocus.contains(event.target)) {
          event.stopPropagation()
          modalFocus.focus()
        }
      }
    }

    function close() {
      $.each(resetElementsFunctionList, function () {
        this()
      })
    }

    function closeAndInform() {
      safeCallback()
      close()
    }

    return {
      closeDialog: function () {
        close()
      }
    }
  }
}

//       // AL: prevent scrolling on touch, but allow pinch zoom
//       self.handleTouch = function (e) {
//         var touches = e.originalEvent.touches || e.originalEvent.changedTouches
//         if ($('#timeout-dialog').length) {
//           if (touches.length === 1) {
//             e.preventDefault()
//           }
//         }
//       }
