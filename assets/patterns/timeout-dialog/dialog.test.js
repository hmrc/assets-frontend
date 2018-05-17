// it('should hide when escape is pressed', function () {
//   pretendEscapeWasPressed()
//   expect(dialog.displayDialog).not.toHaveBeenCalled()
// })
//
// it('should not hide when everything other than the escape key is pressed', function () {
//   pretendEverythingButEscapeWasPressed()
//   expect(dialog.displayDialog).toHaveBeenCalled()
// })
// it('should be attached to the end of the body', function () {
//   var $lastElement = $('body').children().last()
//   var $secondToLastElement = $lastElement.prev()
//
//   expect($lastElement.attr('id')).toEqual('timeout-overlay')
//   expect($secondToLastElement.attr('id')).toEqual('timeout-dialog')
// })
//
// it('should not AJAX call the keep alive URL when escape is not pressed', function () {
//   spyOn($, 'get')
//
//   pretendEverythingButEscapeWasPressed()
//
//   expect($.get).not.toHaveBeenCalled()
// })
//
// it('should only AJAX call once - while closing the dialog', function () {
//   spyOn($, 'get')
//
//   pretendDialogWasClosedWithoutButtonPress()
//   pretendDialogWasClosedWithoutButtonPress()
//   pretendDialogWasClosedWithoutButtonPress()
//   pretendDialogWasClosedWithoutButtonPress()
//   pretendDialogWasClosedWithoutButtonPress()
//
//   expect($.get.calls.count()).toEqual(1)
// })
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
