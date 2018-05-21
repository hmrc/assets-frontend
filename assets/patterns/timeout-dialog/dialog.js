module.exports = {
  displayDialog: function ($elementToDisplay, closeCallback) {
    var $dialog = $('<div>')
      .attr({
        'id': 'timeout-dialog',
        'tabindex': '-1'
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
//       // AL: add touchmove handler
//       $(document).on('touchmove', self.handleTouch)

//     addEvents: function () {
//       var self = this
//       // trap focus in modal (or browser chrome)
//       $('a, input, textarea, button, [tabindex]').not('[tabindex="-1"]').on('focus', function (event) {
//         var modalFocus = document.getElementById('timeout-dialog')
//         if (modalFocus && self.dialogOpen) {
//           if (!modalFocus.contains(event.target)) {
//             event.stopPropagation()
//             modalFocus.focus()
//           }
//         }
//       })
//
//       function handleFocus () {
//         if (self.dialogOpen) {
//           // clear the countdown
//           window.clearInterval(self.countdown)
//           // calculate remaining time
//           var expiredSeconds = (Math.round(Date.now() / 1000, 0)) - self.startTime
//           var currentCounter = settings.countdown - expiredSeconds
//           self.updateUI(currentCounter)
//           self.startCountdown(currentCounter)
//         }
//       }
//
//       // AL: handle browsers pausing timeouts/intervals by recalculating the remaining time on window focus
//       // need to widen this to cover the setTimeout which triggers the dialog for browsers which pause timers on blur
//       // hiding this from IE8 and it breaks the reset - to investigate further
//       if (navigator.userAgent.match(/MSIE 8/) == null) {
//         // $(window).on("blur", function(){
//         $(window).off('focus', handleFocus)
//         $(window).on('focus', handleFocus)
//         // });
//       }
//     },


// var escPress = function (event) {
//   if (event.keyCode === 27) {
//     keepAliveAndClose()
//   }
// }

// <div id="timeout-dialog" class="timeout-dialog" role="dialog" aria-labelledby="timeout-message" tabindex=-1 aria-live="polite">
// </div>
// <div id="timeout-overlay" class="timeout-overlay"></div>
// on close
//           activeElement.focus()
//       $('#skiplink-container, body>header, #global-cookie-message, body>main, body>footer').removeAttr('aria-hidden')
//         $('.timeout-dialog').removeAttr('aria-live')
