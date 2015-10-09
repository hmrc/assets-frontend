// <details> polyfill
// http://caniuse.com/#feat=details

// FF Support for HTML5's <details> and <summary>
// https://bugzilla.mozilla.org/show_bug.cgi?id=591737

// http://www.sitepoint.com/fixing-the-details-element/

(function() {

  // Add event construct for modern browsers or IE
  // which fires the callback with a pre-converted target reference
  function addEvent(node, type, callback) {
    if (node.addEventListener) {
      node.addEventListener(type, function(e) {
        callback(e, e.target);
      }, false);
    } else if (node.attachEvent) {
      node.attachEvent('on' + type, function(e) {
        callback(e, e.srcElement);
      });
    }
  }

  // Handle cross-modal click events
  function addClickEvent(node, callback) {
    // Prevent space(32) from scrolling the page
    addEvent(node, 'keypress', function(e, target) {
      if (e.keyCode === 32 && e.target == document.body) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      }
    });

    // When the key comes up - check if it is enter(13) or space(32)
    addEvent(node, 'keyup', function(e, target) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        callback(e, target);
      }
    });

    // Ignore right mouse clicks, to avoid problems on Chrome
    addEvent(node, 'mouseup', function(e, target) {
      if (e.which !== 3) {
        callback(e, target);
      }
    });
  }

  // Get the nearest ancestor element of a node that matches a given tag name
  function getAncestor(node, match) {
    do {
      if (!node || node.nodeName.toLowerCase() === match) {
        break;
      }

      node = node.parentNode;
    }
    while (node);

    return node;
  }

  function reapplyDetailsPolyfill() {
    started = false;
    addDetailsPolyfill();
  }

  // Initialisation function
  function addDetailsPolyfill(list) {
    var n,
        i = 0,
        twisty,
        details;

    // If this has already happened, just return
    // else set the flag so it doesn't happen again
    if (started) {
      return;
    }

    started = true;

    // Get the collection of details elements, but if that's empty
    // then we don't need to bother with the rest of the scripting
    if ((list = document.getElementsByTagName('details')).length === 0) {
      return;
    }

    // else iterate through them to apply their initial state
    n = list.length;

    for (n; i < n; i++) {
      details = list[i];

      // Detect native implementations
      details.__native = typeof details.open === 'boolean';

      // Save shortcuts to the inner summary and content elements
      details.__summary = details.getElementsByTagName('summary').item(0);
      details.__content = details.getElementsByTagName('div').item(0);

      // If the content doesn't have an ID, assign it one now
      // which we'll need for the summary's aria-controls assignment
      if (!details.__content.id) {
        details.__content.id = 'details-content-' + i;
      }

      // Add ARIA role="group" to details
      details.setAttribute('role', 'group');

      // Add role=button to summary
      // without overwriting existing role, e.g. alert
      if (!details.__summary.getAttribute('role')) {
        details.__summary.setAttribute('role', 'button');
      }

      // Add aria-controls
      details.__summary.setAttribute('aria-controls', details.__content.id);

      // Set tabindex so the summary is keyboard accessible
      // details.__summary.setAttribute('tabindex', 0);
      // http://www.saliences.com/browserBugs/tabIndex.html
      details.__summary.tabIndex = 0;

      // Detect initial open/closed state

      // Native support - has 'open' attribute
      if (details.open === true) {
        details.__summary.setAttribute('aria-expanded', 'true');
        details.__content.setAttribute('aria-hidden', 'false');
        details.__content.style.display = 'block';
      }

      // Native support - doesn't have 'open' attribute
      if (details.open === false) {
        details.__summary.setAttribute('aria-expanded', 'false');
        details.__content.setAttribute('aria-hidden', 'true');
        details.__content.style.display = 'none';
      }

      // If this is not a native implementation
      if (!details.__native) {
        // Add an arrow
        twisty = document.createElement('i');

        // Check for the 'open' attribute
        // If open exists, but isn't supported it won't have a value
        if (details.getAttribute('open') === '') {
          details.__summary.setAttribute('aria-expanded', 'true');
          details.__content.setAttribute('aria-hidden', 'false');
        }

        // If open doesn't exist - it will be null or undefined
        if (details.getAttribute('open') === null || details.getAttribute('open') === 'undefined') {
          details.__summary.setAttribute('aria-expanded', 'false');
          details.__content.setAttribute('aria-hidden', 'true');
          details.__content.style.display = 'none';
        }

      }

      // Create a circular reference from the summary back to its
      // parent details element, for convenience in the click handler
      details.__summary.__details = details;

      // If this is not a native implementation, create an arrow
      // inside the summary
      if (!details.__native) {

        twisty = document.createElement('i');

        if (details.getAttribute('open') === '') {
          twisty.className = 'arrow arrow-open';
          twisty.appendChild(document.createTextNode('\u25bc'));
        } else {
          twisty.className = 'arrow arrow-closed';
          twisty.appendChild(document.createTextNode('\u25ba'));
        }

        details.__summary.__twisty = details.__summary.insertBefore(twisty, details.__summary.firstChild);
        details.__summary.__twisty.setAttribute('aria-hidden', 'true');

        addEvent(details.__summary, "keydown", function (e) {
          if (e.keyCode == 13 || e.keyCode == 32) {
            e.preventDefault();
          }
        });
      }
    }

    // Define a statechange function that updates aria-expanded and style.display
    // Also update the arrow position
    function statechange(summary) {

      var expanded = summary.__details.__summary.getAttribute('aria-expanded') === 'true',
          hidden = summary.__details.__content.getAttribute('aria-hidden') === 'true';

      summary.__details.__summary.setAttribute('aria-expanded', (expanded ? 'false' : 'true'));
      summary.__details.__content.setAttribute('aria-hidden', (hidden ? 'false' : 'true'));
      summary.__details.__content.style.display = (expanded ? 'none' : 'block');

      if (summary.__twisty) {
        summary.__twisty.firstChild.nodeValue = (expanded ? '\u25ba' : '\u25bc');
        summary.__twisty.setAttribute('class', (expanded ? 'arrow arrow-closed' : 'arrow arrow-open'));
      }

      return true;
    }

    // Bind a click event to handle summary elements
    if (!eventsBound) {
      addClickEvent(document, function(e, summary) {
        if (!(summary = getAncestor(summary, 'summary'))) {
          return true;
        }

        return statechange(summary);
      });
      eventsBound = true;
    }
  }

  // Create a started flag so we can prevent the initialisation
  //  function firing from both DOMContentLoaded and window.onload
  // Create eventsBound flag. If this is to redecorate after ajax load, don't
  //  re-apply event listeners, or they stack up.
  var started = false,
    eventsBound = false;

  // Bind two load events for modern and older browsers
  // If the first one fires it will set a flag to block the second one
  // but if it's not supported then the second one will fire
  addEvent(document, 'DOMContentLoaded', addDetailsPolyfill);
  addEvent(window, 'load', addDetailsPolyfill);

  // explicit firing after ajax load of content with details
  addEvent(window, 'reapplyDetails', reapplyDetailsPolyfill);

})();
