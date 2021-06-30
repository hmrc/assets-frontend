/* eslint-env jquery */

/**
 * @name modalDialog
 * @module javascripts/modules/modaldialog
 * @author  Matthew Pepper
 * @requires jquery
 * @requires scss/modules/_modal-dialog.scss
 *
 * @summary An accessible modal-dialog component module consisting of:
 * - outer container masking element, covering the page
 * - inner container for content, with auto scrolling if content exceeds inner container height
 * - content(s) with visibility toggle
 * - Tested on: IE8+, MSEdge, Safari 9.0.3, Google Chrome 48.0.2564.1, Firefox 44.0.2,
 * - Responsive resolutions: 1920x1080, 1280x800, 768x1024, 750x1334, 600x800, 320x568, 320x480
 *
 * @see @link{https://designpatterns.hackpad.com/Modal-dialog-boxes-ZJNqssq4Dll|Modal dialog boxes - designpatterns.hackpad.com}
 * @see @link{https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_dialog_role|Using the dialog role}
 * @see @link{https://www.nczonline.net/blog/2013/02/12/making-an-accessible-dialog-box/|Making an accessible dialog box - NCZOnline}
 * @see @link{https://www.paciellogroup.com/blog/2012/05/html5-accessibility-chops-hidden-and-aria-hidden/|HTML5 Accessibility Chops: hidden and aria-hidden}
 * @see @link{'Tab key does not select menus or buttons|https://support.mozilla.org/en-US/kb/Pressing%20Tab%20key%20does%20not%20select%20menus%20or%20buttons}
 *
 * @example:
 * - include "modal-dialog" & "modal-dialog__container" in page or page template
 * - include "modal-dialog__content" inner html markup in partial views
 *
 *  <div class="modal-dialog">
 *    <div class="modal-dialog__inner">
 *      <div id="content-1" class="modal-dialog__content" data-ga-open-event="category:Event:id" tabindex="1" role="dialog"
 *          aria-labelledby="heading-id" aria-describedby="message-id" hidden>
 *        <div id="message-id">
 *          <h2 id="heading-id">content 1 heading</h2>
 *          ....
 *          <button role="button" class="button button--secondary" data-journey-click="category:Event:id"
 *            data-modaldialog-action="close" tabindex="1">close</button>
 *        </div>
 *      </div>
 *      <div id="content-2" class="modal-dialog__content" data-ga-open-event="category:Event:id" tabindex="1" role="dialog"
 *        aria-labelledby="heading-id-2" aria-describedby="message-id-2">
 *        <div id="message-id-2">
 *          <h2 i fd="heading-id-2">content 2 heading</h2>
 *          ...
 *          <a href="#" data-modaldialog-action="close" tabindex="1" data-journey-click="category:Event:id">...</a>
 *        </div>
 *      </div>
 *    </div>
 *  </div>
 *
 *  // to display modal-dialog on a link's click event:
 *  <a class="" href="#" data-modaldialog-action="id-selector-of-content" data-journey-click="category:Event:id">click to open</a>
 *
 */
require('jquery')

module.exports = function () {
  var $modalDialog = $('.modal-dialog')
  var $container = $modalDialog.find('.modal-dialog__inner')
  var $modalContents = $container.find('.modal-dialog__content')
  var contentShowing = '.modal-dialog__content:not([hidden])'
  var $doc = $(document)
  var $body = $('body')
  var $returnFocus

  /**
   * Hide modal-dialog and return focus to previously active element.
   */
  function hide () {
    // set showing content "hidden" attr
    setHidden($(contentShowing), true)

    // un-fix body the position so that it can scroll
    $body.removeClass('scroll-off')

    // 'hide' $modalDialog
    $modalDialog.addClass('modal-dialog--hidden')

    // return focus to the active element before modal was shown
    if ($returnFocus && $returnFocus.length) {
      $returnFocus.focus()
    }
  }

  /**
   * Show modal-dialog, container & content.
   * @param {Event} e - optional event (not passed in init()...
   *                    passed by dom elements which display / close modal-dialog
   *                    using data-modaldialog-action=[open|close] and data-modaldialog-target="modal-dialog__content-id"
   */
  function show (e) {
    // get content to be shown - from event if it is passed, or from element with attribute hidden=false
    var $content = !e ? $modalContents.filter(function () {
      return getHidden($(this))
    }) : getContentToShow(e)

    if (!!$content && $content.length) {
      // set currently focussed element for return focus on modal-dialog hide
      $returnFocus = $(document.activeElement)

      // fix body position
      $body.addClass('scroll-off')

      // 'show' $modalDialog
      $modalDialog.removeClass('modal-dialog--hidden')

      // set $modalDialog size (with height dimension relative to content height)
      setDimensions($content)

      // shift focus to showing content
      $(contentShowing).focus()
    }
  }

  /**
   * Get the content element to be shown in the modal-dialog
   * @param {Event} e - optional event passed by dom event trigger from element with [data-modaldialog-action="open | close"] attribute)
   * @returns {HTMLElement}
   */
  function getContentToShow (e) {
    var $content
    var $target

    // if event is passed by dom event trigger
    // from element with [data-modaldialog-action="open | close"] and [data-modaldialog-target] attributes
    if (e && e.target && $(e.target).data('modaldialogTarget') && $(e.target).data('modaldialogAction')) {
      // get element which triggered the event
      $target = $(e.target)

      // get target element to be opened /closed
      $content = $('#' + $target.data('modaldialogTarget'))

      // if the target element exists
      if ($content.length) {
        // set the target element hidden attribute
        setHidden($content, $target.data('modaldialogAction') !== 'open')
      }
    }

    // return the target element or undefined
    return $content
  }

  /**
   * Set the dimensions of the modal dialog's inner container to fit the view-port, with scrolling for smaller resolutions.
   * @param {HTMLElement} $element - content element
   */
  function setDimensions ($element) {
    // distance from top of view-port (less the top and bottom border)
    var offset = Math.floor($container.offset().top) - ($container.css('border-width').replace('px', '') * 2)

        // iterate modal content to calc the max height of required for tallest content
    var maxHeight = Math.max.apply(null, $modalContents.map(
      function () {
        // content height
        var thisHeight = Math.min.apply(null, [$(this).outerHeight(false), $element.outerHeight(false)])

        // return the greater of the content or modal dialog height
        return thisHeight > $modalDialog.outerHeight(false) ? $modalDialog.outerHeight(false) : thisHeight
      }).get()
    )

    // if maxHeight is less than the window height less the offset, use maxHeight, else use maxHeight less offset
    var containerHeight = maxHeight < $(window).height() - offset ? maxHeight : maxHeight - offset

    // if calc height is > 0
    if (containerHeight) {
      $container.css({'max-height': containerHeight + 'px'})
    }
  }

  /**
   * Set the dimensions of the modal dialog element to fit the view-port
   */
  function setModalDialogDimensions () {
    // set height and width to mask to fill up the whole document
    $modalDialog.css({width: $doc.width() + 'px', height: $doc.height() + 'px'})
  }

  /**
   * Window resize event handler to re-calculate the modal-dialog element's dimensions
   * @param {Function} setMaskDimensions - callback function
   */
  $(window).on('resize', function () {
    // stretch opacity mask to fit page
    setModalDialogDimensions()
  })

  /**
   * Event handler to capture [esc] key press in modal-dialog
   **/
  $modalDialog.on('keyup', contentShowing, function (e) {
    // escape key press to close modal-dialog
    if ($(contentShowing).length && e.which === 27) {
      hide()
    }
  })

  /**
   * Event handler to capture tab key press in modal-dialog - needs to be in doc context to capture tab outside modal-dialog.
   */
  $doc.on('keydown', function (e) {
    // if there is showing content in the modal dialog and the tab key is pressed
    if ($(contentShowing).length && e.which === 9) {
      e.preventDefault()

      var $src = $(e.target) // the element losing focus by the tab key press
      var isBack = e.shiftKey // is the shift key being held down (is the focus moving to previous or next element in tab order)
      var $tabs = $(contentShowing).find('[tabindex="1"]').addBack() // the elements in the content's tab order
      var inc = $tabs.index($src) + (isBack ? -1 : 1) // incremental value to move through the tab order by
      var $focus // element to move focus to

      // if focus has moved out of modal-dialog bring it back
      if (inc < 0) {
        // if increment is negative move back in tab order, move to last element in the tab order
        $focus = $tabs.last()
      } else if (inc > $tabs.length - 1) {
        // if increment is greater than the number of elements in the tab order, move to first element in the tab order
        $focus = $tabs.first()
        $container.scrollTop(0)
      } else {
        // else use the increment to move to the element in the tab order by index
        $focus = $tabs.eq(inc)
      }

      $focus.focus()
    }
  })

  /**
   * Event handler for document click to return focus to modal-dialog when content showing.
   */
  $doc.on('click', function (e) {
    // if content is showing in the modal, and doesn't contain the element clicked on
    if ($(contentShowing).length && !$(contentShowing).find($(e.target)).length) {
      // if the shown content contains a element which is in the tab order
      if ($(contentShowing).find('[tabindex="1"]:focus').length) {
        // move the focus to it
        $(contentShowing).find('[tabindex="1"]:focus').focus()
      } else {
        // move the focus to the content element itself
        $(contentShowing).focus()
        e.stopPropagation()
      }
    }
  })

  /**
   * Event handler for hiding modal-dialog & content.
   */
  $body.find($modalContents).addBack().on('click', '[data-modaldialog-action="close"]', function (e) {
    e.preventDefault()
    e.stopPropagation()

    // hide the modal
    hide()
  })

  /**
   * Event handler for showing modal-dialog & content.
   */
  $body.find($modalContents).addBack().on('click', '[data-modaldialog-action="open"]', function (e) {
    // stop default event and propagation
    e.preventDefault()
    e.stopPropagation()

    // hide the content showing in the modal
    setHidden($(contentShowing), true)

    // show the modal
    show(e)
  })

  /**
   * Set the value of the "hidden" attributes
   * @param {HTMLElement} $el
   * @param {boolean} isHidden
   */
  function setHidden ($el, isHidden) {
    // if not hidden
    if (!isHidden) {
      // remove the "hidden" attribute
      $el.removeAttr('hidden')
    } else {
      // set the "hidden" attribute (as string for IE compat)
      $el.attr('hidden', 'true')
    }

    // set the aria-hidden attribute
    $el.attr('aria-hidden', isHidden)
  }

  /**
   * Get the value of the "hidden" attribute
   * @returns {boolean|string}
   */
  function getHidden ($el) {
    return $el.attr('hidden')
  }

  // initialize if the modal dialog and modal dialog content exist
  if ($modalDialog.length && $modalContents.length) {
    // set the dimensions of the modal dialog element
    setModalDialogDimensions()

    // if there is modal content to show (when page loads)
    if ($(contentShowing).length) {
      show()
    }
  }
}
