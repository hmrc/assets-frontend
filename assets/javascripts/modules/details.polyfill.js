/*! http://mths.be/details v0.1.0 by @mathias | includes http://mths.be/noselect v1.0.3 */
;(function (document, $)
{

  var proto = $.fn,
    details,
    nextDetailsId = 1,
  // :'(
    isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]',
  // Feature test for native `<details>` support
    isDetailsSupported = (function (doc)
    {
      var el = doc.createElement('details'),
        fake,
        root,
        diff;
      if (!('open' in el))
      {
        return false;
      }
      root = doc.body || (function ()
        {
          var de = doc.documentElement;
          fake = true;
          return de.insertBefore(doc.createElement('body'), de.firstElementChild || de.firstChild);
        }());
      el.innerHTML = '<summary>a</summary><div>b</div>';
      el.style.display = 'block';
      root.appendChild(el);
      diff = el.offsetHeight;
      el.open = true;
      diff = diff != el.offsetHeight;
      root.removeChild(el);
      if (fake)
      {
        root.parentNode.removeChild(root);
      }
      return diff;
    }(document)),
    fixDetailContentId = function ($detailsNotSummary)
    {
      var $content = $detailsNotSummary.first();
      if (!$content.attr("id"))
      {
        $content.attr("id", "details-content-" + nextDetailsId++);
      }
    },
    toggleOpen = function ($details, $detailsSummary, $detailsNotSummary, toggle)
    {
      var isOpen = $details.prop('open'),
        close = isOpen && toggle || !isOpen && !toggle;
      if (close)
      {
        $details.removeClass('open').prop('open', false).removeAttr("open").triggerHandler('close.details');
        $detailsSummary.attr('aria-expanded', false);
        $detailsNotSummary.hide();
      }
      else
      {
        $details.addClass('open').prop('open', true).attr("open", "").triggerHandler('open.details');
        $detailsSummary.attr('aria-expanded', true);
        $detailsNotSummary.show();
      }
    };

  /* http://mths.be/noselect v1.0.3 */
  proto.noSelect = function ()
  {

    // Since the string 'none' is used three times, storing it in a variable gives better results after minification
    var none = 'none';

    // onselectstart and ondragstart for WebKit & IE
    // onmousedown for WebKit & Opera
    return this.bind('selectstart dragstart mousedown', function ()
    {
      return false;
    }).css({
      'MozUserSelect': none,
      'msUserSelect': none,
      'webkitUserSelect': none,
      'userSelect': none
    });

  };

  // Execute the fallback only if there’s no native `details` support
  if (isDetailsSupported)
  {

    details = proto.details = function ()
    {
      return this.each(function ()
      {
        var $details = $(this),
          $summary = $('summary', $details).first();

        if ($details.prop("details-initialised"))
          return;

        fixDetailContentId($details.children(':not(summary)'));

        $details.prop("details-initialised", true);
        $summary.attr({
          'role': 'button',
          'aria-expanded': $details.prop('open')
        }).on('click', function ()
        {
          // the value of the `open` property is the old value
          var isOpen = $details.prop('open');
          $summary.attr('aria-expanded', !isOpen);
          $details.toggleClass("open", !isOpen).triggerHandler((isOpen ? 'close' : 'open') + '.details');
        }).on("toggle-open", function ()
        {
          var opened = $details.prop('open');
          $details.prop("open", !opened);
          if (opened)
          {
            $details.removeClass("open").removeAttr("open");
          }
          else
          {
            $details.addClass("open").attr("open", "");
          }
          $summary.attr('aria-expanded', !opened);
          $details.triggerHandler((opened ? 'close' : 'open') + '.details');
        });
      });

    };

    details.support = isDetailsSupported;

  }
  else
  {

    details = proto.details = function ()
    {

      // Loop through all `details` elements
      return this.each(function ()
      {

        // Store a reference to the current `details` element in a variable
        var $details = $(this),
        // Store a reference to the `summary` element of the current `details` element (if any) in a variable
          $detailsSummary = $('summary', $details).first(),
        // Do the same for the info within the `details` element
          $detailsNotSummary = $details.children(':not(summary)'),
        // This will be used later to look for direct child text nodes
          $detailsNotSummaryContents = $details.contents(':not(summary)');

        if ($details.prop("details-initialised"))
        {
          return;
        }

        $details.attr("role", "group");
        $details.prop("details-initialised", true);

        // If there is no `summary` in the current `details` element…
        if (!$detailsSummary.length)
        {
          // …create one with default text
          $detailsSummary = $('<summary>').text('Details').prependTo($details);
        }

        $('<i>').addClass("arrow arrow-open").append(document.createTextNode("\u25bc")).prependTo($detailsSummary);
        $('<i>').addClass("arrow arrow-closed").append(document.createTextNode("\u25ba")).prependTo($detailsSummary);

        // Look for direct child text nodes
        if ($detailsNotSummary.length != $detailsNotSummaryContents.length)
        {
          // Wrap child text nodes in a `span` element
          $detailsNotSummaryContents.filter(function ()
          {
            // Only keep the node in the collection if it’s a text node containing more than only whitespace
            // http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#space-character
            return this.nodeType == 3 && /[^ \t\n\f\r]/.test(this.data);
          }).wrap('<span>');
          // There are now no direct child text nodes anymore — they’re wrapped in `span` elements
          $detailsNotSummary = $details.children(':not(summary)');
        }

        fixDetailContentId($detailsNotSummary);

        // Hide content unless there’s an `open` attribute
        $details.prop('open', typeof $details.attr('open') == 'string');
        toggleOpen($details, $detailsSummary, $detailsNotSummary);

        // Add `role=button` and set the `tabindex` of the `summary` element to `0` to make it keyboard accessible
        $detailsSummary.attr('role', 'button').noSelect().prop('tabIndex', 0)
          .on('click', function ()
          {
            // Focus on the `summary` element
            $detailsSummary.focus();
            // Toggle the `open` and `aria-expanded` attributes and the `open` property of the `details` element and display the additional info
            toggleOpen($details, $detailsSummary, $detailsNotSummary, true);
          })
          .on("toggle-open", function ()
          {
            // Toggle the `open` and `aria-expanded` attributes and the `open` property of the `details` element and display the additional info
            toggleOpen($details, $detailsSummary, $detailsNotSummary, true);
          })
          .keyup(function (event)
          {
            if (32 == event.keyCode || (13 == event.keyCode && !isOpera))
            {
              // Space or Enter is pressed — trigger the `click` event on the `summary` element
              // Opera already seems to trigger the `click` event when Enter is pressed
              event.preventDefault();
              $detailsSummary.click();
            }
          });

      });

    };

    details.support = isDetailsSupported;
  }

  if (!isDetailsSupported)
  {
    $("html").addClass("no-details");
  }

  $(window).on("reapplyDetails", function ()
  {
    $("details").details();
  });

  $(function ()
  {
    $("details").details();
  });
}(document, jQuery));
