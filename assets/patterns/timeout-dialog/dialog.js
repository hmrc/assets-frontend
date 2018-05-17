//       // AL: disable the non-dialog page to prevent confusion for VoiceOver users
//       $('#skiplink-container, body>header, #global-cookie-message, body>main, body>footer').attr('aria-hidden', 'true')
//
//       var activeElement = document.activeElement
//       var modalFocus = document.getElementById('timeout-dialog')
//       modalFocus.focus()
//       self.addEvents()



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

// on close
//           activeElement.focus()
//       $('#skiplink-container, body>header, #global-cookie-message, body>main, body>footer').removeAttr('aria-hidden')
//         $('.timeout-dialog').removeAttr('aria-live')
