/**
 * @name modalDialog
 * @module javascripts/modules/modaldialog
 * @author  Matthew Pepper
 * @requires jquery
 * @requires stageprompt
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
 *      <div id="content-1" class="modal-dialog__content" data-ga-open-event="category:Event:id" tabindex="1" role="dialog" aria-labelledby="heading-id" aria-describedby="message-id" hidden>
 *        <div id="message-id">
 *          <h2 id="heading-id">content 1 heading</h2>
 *          ....
 *          <button role="button" class="button button--secondary" data-journey-click="category:Event:id" data-modaldialog-action="close" tabindex="1">close</button>
 *        </div>
 *      </div>
 *      <div id="content-2" class="modal-dialog__content" data-ga-open-event="category:Event:id" tabindex="1" role="dialog" aria-labelledby="heading-id-2" aria-describedby="message-id-2">
 *        <div id="message-id-2">
 *          <h2 id="heading-id-2">content 2 heading</h2>
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
require('jquery');
var GOVUK = require('stageprompt');

module.exports = function() {
  var $modalDialog = $('.modal-dialog'),
    $container = $('.modal-dialog__inner'),
    $contents = $('.modal-dialog__content'),
    contentShowing = '.modal-dialog__content:not([hidden])',
    $doc = $(document),
    $body = $('body'),
    $returnFocus;

  /**
   * Hide modal-dialog, container & content.
   */
  function hide() {
    // un-fix body position
    $body.removeClass('scroll-off');

    // 'hide' $modalDialog
    $modalDialog.addClass('modal-dialog--hidden').css({width: '', height: ''});

    // hide
    $(contentShowing).each(function() {
      $(this).setHidden(true);
    });

    if ($returnFocus && $returnFocus.length) {
      $returnFocus.focus();
    }
  }

  /**
   * Show modal-dialog, container & content.
   * @param {Event} e - optional event (not passed in init()...
   *                    passed by dom elements which display / close modal-dialog
   *                    using data-modaldialog-action=[open|close] and data-modaldialog-target="modal-dialog__content-id"
   */
  function show(e) {
    var $content = getDisplayContent(e);

    if (!!$content && $content.length) {
      // set currently focussed element for return focus on modal-dialog hide
      $returnFocus = $(document.activeElement);

      // fix body position
      $body.addClass('scroll-off');

      // 'show' $modalDialog
      $modalDialog.removeClass('modal-dialog--hidden');

      // set $modalDialog size (with height dimension relative to content height)
      setDimensions($content);

      // shift focus to showing content
      $(contentShowing).focus();

      // send google analytics event
      fireEventTracking($(contentShowing).data('gaOpenEvent'));
    }
  }

  /**
   * Get the content element to be shown in the modal-dialog
   * @param {Event} e - optional event passed by dom event trigger from element with [data-modaldialog-action="open | close"] attribute)
   * @returns {HTMLElement}
   */
  function getDisplayContent(e) {
    var $content, $target;

    // if event is passed by dom event trigger (from element with [data-modaldialog-action="open | close"])
    if (e && e.target && $(e.target).data('modaldialogTarget') && $(e.target).data('modaldialogAction')) {
      $target = $(e.target);

      // mark currently showing content to be hidden
      $(contentShowing).each(function() {
        $(this).setHidden(true);
      });

      // get target
      $content = $('#' + $target.data('modaldialogTarget'));

      if ($content.length) {
        // mark event target to be shown / hidden
        $content.setHidden($target.data('modaldialogAction') !== 'open');
      }
    }
    else {
      // get content to be shown
      $content = $contents.filter(function() {
        return $(this).getHidden();
      });
    }

    return $content;
  }

  /**
   * Set the dimensions of the modal dialog's inner container to fit the view-port.
   * @param {HTMLElement} $element - content element
   */
  function setDimensions($element) {
    var offset = Math.floor($container.offset().top) - ($container.css('border-width').replace('px', '') * 2),
        maxHeight = Math.max.apply(null, $contents.map(
          function() {
            var thisHeight = Math.min.apply(null, [$(this).outerHeight(false), $element.outerHeight(false)]);
            return thisHeight > $modalDialog.outerHeight(false) ? $modalDialog.outerHeight(false) : thisHeight;
          }).get()),
          total = maxHeight < $(window).height() - offset ? maxHeight : maxHeight - offset;

    if (total) {
      $container.css({'max-height': total + 'px'});
    }
  }

  /**
   * Set the dimensions of the modal dialog element to fit the view-port
   */
  function setModalDialogDimensions() {
    // set height and width to mask to fill up the whole document
    $modalDialog.css({width: $doc.width() + 'px', height: $doc.height() + 'px'});
  }

  /**
   * Helper function to test for modal-dialog displayed.
   * @returns {number|boolean}
   */
  function isModalDialogOpen() {
    return $(contentShowing).length;
  }

  /**
   * Window resize event handler to re-calculate the modal-dialog element's dimensions
   * @param {Function} setMaskDimensions - callback function
   */
  $(window).on('resize', function() {
    setModalDialogDimensions();
    setDimensions($(contentShowing));
  });

  /**
   * Event handler to capture [esc] key press in modal-dialog
   **/
  $modalDialog.on('keyup', contentShowing, function(e) {
    // escape key press to close modal-dialog
    if (isModalDialogOpen() && e.which === 27) {
      // send google analytics event - assume the same value as the close button
      var $closeButton = $(contentShowing).find('[data-modaldialog-action="close"]');

      if ($closeButton.length)
      {
        fireEventTracking($closeButton.data('journeyClick'));
      }

      hide();
    }
  });

  /**
   * Event handler to capture tab key press in modal-dialog - needs to be in doc context to capture tab outside modal-dialog.
   */
  $doc.on('keydown', function(e) {
    if (isModalDialogOpen() && e.which === 9) {
      // listen for tab direction event here
      e.preventDefault();
      var $src = $(e.target),
        isBack = e.shiftKey,
        $tabs = $(contentShowing).find('[tabindex="1"]').addBack(),
        inc = $tabs.index($src) + (isBack ? -1 : 1),
        $focus;

      // if focus has moved out of modal-dialog bring it back
      if (inc < 0) {
        $focus = $tabs.last();
      }
      else if (inc > $tabs.length - 1) {
        $focus = $tabs.first();
        $container.scrollTop(0);
      }
      else {
        $focus = $tabs.eq(inc);
      }

      $focus.focus();
    }
  });

  /**
   * Event handler for document click to return focus to modal-dialog when content showing.
   */
  $doc.on('click', function(e) {
    if (isModalDialogOpen() && !$(contentShowing).find($(e.target)).length) {
      if ($(contentShowing).find('[tabindex="1"]:focus').length) {
        $(contentShowing).find('[tabindex="1"]:focus').focus();
      } else {
        $(contentShowing).focus();
        e.stopPropagation();
      }
    }
  });

  /**
   * Event handler for hiding modal-dialog & content.
   */
  $body.find($contents).addBack().on('click', '[data-modaldialog-action="close"]', function(e) {
    e.preventDefault();
    hide();
  });

  /**
   * Event handler for showing modal-dialog & content.
   */
  $body.find($contents).addBack().on('click', '[data-modaldialog-action="open"]', function(e) {
    e.preventDefault();
    setModalDialogDimensions();
    //setDimensions($(contentShowing));
    show(e);
  });
  
  /**
   * Event handler for custom event triggered by hidden attribute / prop state change.
   */
  $contents.on('hiddenChange', function(e, isHidden) {
    if (isHidden) {
      if (!$(contentShowing).length) {
        hide();
      }
    } else {
      show();
    }
  });

  /**
   * Setup elements
   */
  function setup() {
    $contents.each(function() {
      var $this = $(this);
      $this.setHidden($this.getHidden());
    });

  }

  /**
   * Fire Google Analytics event tracking
   */
  function fireEventTracking(gaEvent) {
    var gaEventFields = gaEvent.split(':');
    if (gaEventFields.length === 3) {
      GOVUK.performance.sendGoogleAnalyticsEvent(gaEventFields[0], gaEventFields[1], gaEventFields[2]);
    }
  }

  /**
   * Module initialization
   */
  function init() {
    if ($modalDialog.length && $contents.length) {
      setModalDialogDimensions();
      setup();
    }
    else {
      $modalDialog.hide();
    }
  }

  /**
   * Set hidden properties & attributes
   * @param {boolean} isHidden
   */
  $.fn.setHidden = function(isHidden) {
    var $el = $(this);

    if (!isHidden) {
      $el.removeProp('hidden');
      $el.removeAttr('hidden');
    }
    else {
      $el.prop('hidden', true);

      // add hidden as string for IE
      $el.attr('hidden', 'true');
    }

    $el.attr('aria-hidden', isHidden);
    $el.trigger('hiddenChange', isHidden);
  };

  /**
   * Get hidden property or attribute
   * @returns {boolean|string}
   */
  $.fn.getHidden = function() {
    var $el = $(this);
    return $el.prop('hidden') || $el.attr('hidden');
  };

  return {
    init: init
  };
};
