require('jquery');

/*

AutoComplete module
- Create an autoComplete with the following markup
- Create a JSON object as a global variable, the structure is demonstrated below
- Optionally provide a target input to update with suggestions value


Auto complete html markup:

 <div class="suggestions-input-container">
    <input type="text"
           name="country-code-auto-complete"
           id="country-code-auto-complete"
           class="form-control form-control--block js-choose-country-auto-complete"
           autocomplete="off"
           spellcheck="false"
           required

           // Either pass a global js object to data-suggestions (see schema below):
           data-suggestions="countries"
           // or specify a select input ID to act as source of data:
           data-select-elem="mySelectID"

           // Optionally specify one or more space separated input IDs to be updated with the selected suggestion when picked
           // This can be the select input specified in data-select-elem
           data-target-elem="#countryCode #country-code-prefix"

           data-rule-suggestion="true"
           aria-autocomplete="list"
           aria-haspopup="country-code-suggestions"
           aria-activedescendant />
    <i class="suggestions-clear js-suggestions-clear"></i>
    <span role="status" aria-live="polite" class="visuallyhidden js-suggestions-status"></span>
    <div class="suggestions js-suggestions" id="country-code-suggestions"></div>
 </div>


Data format:

<script type="text/javascript">
  var countries = [{"title":"United Kingdom","value":"44"}]
</script>

*/

var suggestions;
var $suggestionsContainer;
var $autoCompleteInputElem;
var $targetInputs;
var suggestionDisplayFormat;
var $suggestionsStatusMessage;
var $clearInputButton;

/**
 * Display suggestions
 * @param $suggestionsContainer
 * @param matches
 * @param match
 */
var displaySuggestions = function ($suggestionsContainer, matches, match) {
  var ulHtmlFragment = document.createElement('ul');
  var liHtmlFragment = document.createElement('li');
  var containerFragment = document.createElement('div');

  var createSuggestion = function (index, suggestion) {
    var positionalClassNames = [];
    var li = liHtmlFragment.cloneNode();
    var pattern = new RegExp('^(' + match + ')', 'i');
    var html;

    suggestion.title.replace(pattern, '<span class="suggestion__highlight">$1</span>');
    html = (typeof suggestionDisplayFormat === 'function') ? suggestionDisplayFormat(suggestion.title, suggestion.value) : suggestion.title;

    if (index === 0) {
      positionalClassNames.push('suggestion--first');
    }
    if (index === matches.length - 1) {
      positionalClassNames.push('suggestion--last');
    }

    li.innerHTML = html;
    li.className = 'suggestion ' + positionalClassNames.join(' ');
    li.setAttribute('data-suggestion-value', suggestion.value);
    li.setAttribute('data-suggestion-title', suggestion.title);
    li.setAttribute('role', 'option');
    ulHtmlFragment.className = 'suggestions-list';
    ulHtmlFragment.setAttribute('role', 'listbox');
    ulHtmlFragment.appendChild(li);
  };

  $(matches).each(function (index, suggestion) {
    createSuggestion(index, suggestion);
  });

  $suggestionsStatusMessage.text(matches.length + ' suggestion' + (matches.length > 1 ? 's' : '') + ' available, please navigate by using up and down');
  $autoCompleteInputElem.addClass('has-suggestions');

  containerFragment.appendChild(ulHtmlFragment);
  $suggestionsContainer.html(containerFragment.innerHTML);
};

/**
 * close suggestions display
 */
var closeSuggestions = function () {
  $suggestionsContainer.html('');
  $autoCompleteInputElem.removeClass('has-suggestions');
};

/**
 * close suggestions display and focus the auto complete element and place cursor at end of text in input
 */
var closeSuggestionsAndFocus = function () {
  closeSuggestions();
  $autoCompleteInputElem.focus().val($autoCompleteInputElem.val()); //place cursor at end of input text
};

/**
 * empty input, focus input, close suggestions display and empty target input
 */
var clearInput = function () {
  $autoCompleteInputElem.val('').focus();
  updateAutoCompleteAttribData('suggestionValue', '');
  closeSuggestions();
  updateTargetInput(0);
};

/**
 * place cursor at end of input and updateTarget element
 * @param title
 * @param value
 */
var updateInput = function (title, value) {
  $autoCompleteInputElem.val(title).val($autoCompleteInputElem.val()); //place cursor at end of input text
  updateAutoCompleteAttribData('suggestionValue', value.toString());
  updateTargetInput(value);
};

/**
 * Allow auto complete to control and pass over the .value of your suggestion to another optional input
 * specified on creation of the autoComplete
 * if the input is a select, pass the value, otherwise if there is a suggestionDisplayFormat, use that
 * @param value
 */
var updateTargetInput = function (value) {
  var formattedString = (typeof suggestionDisplayFormat === 'function') ? suggestionDisplayFormat('',value) : value;
  $.each($targetInputs, function (index, targetEl) {
    $(targetEl).val($(targetEl).prop('tagName') === "SELECT" ? value : formattedString);
  });
};

/**
  update a data attribute on the autoCompleteInputElem
  @param dataEl
  @param value
  */
var updateAutoCompleteAttribData = function (dataEl, value) {
  $autoCompleteInputElem.data(dataEl, value);
};

/**
 * Controls for the following keys to navigate the suggestions list
 * 40 (down) - move down the suggestions list
 * 38 (up) - move up teh suggestions list
 * 27 (esc) - close from the suggestion list
 * 13 (enter) - choose item if list is open
 * @param keyCode
 * @param $suggestionsContainer
 */
var suggestionsKeyControl = function (keyCode, $suggestionsContainer) {

  //40 (down), 38 (up)
  if ((keyCode === 38 || keyCode === 40) && $suggestionsContainer.html()) {

    var $next;
    var $selected = $suggestionsContainer.find('.suggestion--selected').first();
    var updateAutoCompleteInput = function ($elem) {
      updateInput($elem.data('suggestion-title'), $elem.data('suggestion-value'));
    };

    if (!$selected.length) {
      if (keyCode === 40) {
        $next = $suggestionsContainer.find('li').first().addClass('suggestion--selected').attr('aria-selected', true);
        updateAutoCompleteInput($next);
      }
    } else {
      $next = (keyCode === 40) ? $selected.next() : $selected.prev();
      if ($next.length) {
        $selected.removeClass('suggestion--selected').removeAttr('aria-selected');
        $next.addClass('suggestion--selected').attr('aria-selected', true);
        updateAutoCompleteInput($next);
      } else {
        if ($selected.prev().length === 0 && keyCode === 38) { //hide when reaching top of suggestions
          $selected.removeClass('suggestion--selected').removeAttr('aria-selected');
          closeSuggestionsAndFocus();
        }
      }
    }
  } else if (keyCode === 27 || keyCode === 13) { //27 (esc), 13 (enter)
    closeSuggestionsAndFocus();
  }
};

var addEventListeners = function () {
  inputKeyDownEvent();
  inputKeyupEvent();
  inputBlurEvent();
  clearSuggestionsEvent();
  suggestionsEvent();
};

/**
 * keydown event for auto complete input
 * keydown used to capture enter key (13) before form is submitted if we have suggestions
 * allow suggestion list key controls through
 * 40 (down)
 * 38 (up)
 * 27 (esc)
 * 13 (enter)
 */
var inputKeyDownEvent = function () {
  $autoCompleteInputElem.on('keydown', function (event) {
    var keyCode = event.which;

    if (keyCode === 13 && $suggestionsContainer.html()) {
      event.preventDefault();
    }

    if (keyCode === 38 || keyCode === 40 || keyCode === 13 || keyCode === 27) {
      suggestionsKeyControl(keyCode, $suggestionsContainer);
    }
  });
};

/**
 * keyup event dependant on auto complete input, if key is not a suggestion list key control and we have a value in
 * the auto complete input the search through suggestions.
 *
 * if we have suggestions display them
 * If we have no input value them clear suggestions
 */
var inputKeyupEvent = function () {
  $autoCompleteInputElem.on('keyup', function (event) {
    var inputVal = $(event.target).val();
    var matches = [];
    var keyCode = event.which;

    if(inputVal.length < 2) {
      updateAutoCompleteAttribData('suggestionValue', '');
    }

    if ((keyCode !== 36 && keyCode !== 38 && keyCode !== 40 && keyCode !== 13 && keyCode !== 27) && inputVal) {

      $clearInputButton.removeClass('hidden');

      $(suggestions).each(function (index, suggestion) {
        var regEx;

        try {
          regEx = new RegExp('^(' + inputVal + ')', 'i');
          if (regEx.test(suggestion.title)) {
            matches.push(suggestion);
          }
        } catch (e) {
          //TODO add reporting?
        }

      });

      if (matches.length) {
        displaySuggestions($suggestionsContainer, matches, inputVal);
      }
    } else if (!inputVal) {
      $clearInputButton.addClass('hidden');
      closeSuggestionsAndFocus();
      $suggestionsStatusMessage.text('');
    }
  });
};

/**
 * on blur check to see if what has been entered matches a suggestion, in case the customer hasn't interacted with
 * the suggestions list
 */
var inputBlurEvent = function () {
  $autoCompleteInputElem.on('blur', function (event) {
    isMatchingSuggestion(event.target.value);
    closeSuggestions();
  });
};

/**
 * check to see if the value specified in teh auto complete input matches a unique title found in suggestions
 * if it does then update it and the target input
 * @param value
 */
var isMatchingSuggestion = function (value) {
  var matchFound = false;

  if (value) {
    $(suggestions).each(function (index, suggestion) {
    var returnValue = true;

      if (value.toLowerCase() === suggestion.title.toLowerCase()) {
        if ($autoCompleteInputElem.data('suggestionValue') === suggestion.value) {
          matchFound = true;
          returnValue = false;
        } else if ($autoCompleteInputElem.data('suggestionValue') === '') {
          updateInput(suggestion.title, suggestion.value);
          matchFound = true;
          returnValue = false;
        }

        return returnValue;
      }
    });

    if (!matchFound) { //clear out the input
      updateTargetInput(0);
      updateAutoCompleteAttribData('suggestionValue', '');
    }
  }
};

/**
 * (x) button on input to clear out the input value, close suggestions and clear out input target
 */
var clearSuggestionsEvent = function () {
  $clearInputButton.on('mousedown', function (event) {
    event.preventDefault();
    clearInput();
    updateAutoCompleteAttribData('suggestionValue','');
    $clearInputButton.addClass('hidden');
  });
};

/**
 * update input to suggested values when mouse click actioned on suggestion list
 * mousedown event used so this fires before blur event
 */
var suggestionsEvent = function () {
  $suggestionsContainer.on('mousedown', '.suggestion', function (event) {
    var $suggestion = $(event.target);
    event.preventDefault();

    updateInput($suggestion.data('suggestion-title'), $suggestion.data('suggestion-value'));
    closeSuggestions();
  });
};


/**
  * Either grab a given global variable or generate one from a given select input
*/
var getSuggestions = function (el) {
  var suggestions;
  var dataLinked = $('select[id="' + el.attr("data-select-elem") + '"]');
  if(dataLinked.length > 0){
    // using a select input in-page as the source for the suggestions
    // this is useful when using a select as a fallback for the autocomplete
    suggestions = [];
    dataLinked.find('option').each(function(){
      if($(this).text() > ""){
        suggestions.push({"title":$(this).text(), "value":$(this).attr("value")});
      }
    });
    // need to populate the data-suggestions attribute from this for validation
    // generate a global variable to hold the data and insert into data-suggestions attribute
    window.hmrcAutocompleteData = suggestions;
    el.attr("data-suggestions", "hmrcAutocompleteData");
  } else {
    // allow custom variable
    // this works in the same way as the legacy version by passing in an existing global object name
    suggestions = window[el.attr("data-suggestions")];
  }
  return suggestions;
};

/**
  * Find input to post value back to
  * @param el
*/
var getTargetInput = function (el) {
  var $targets = el.first().data('target-elem') ? el.first().data('target-elem') : $targetInputElem;

  // input to post back a selection from the autocomplete
//  var dataPostTo = $('[id="' + el.attr("data-target-elem") + '"]');
//  if(dataPostTo.length > 0){
//    target = dataPostTo;
//  }
  return $targets;
};

/**
 * setup variables and create the autoComplete
 *
 * @param $autoCompleteInputElem
 *
 * @param suggestionFormat - [optional]
 * Format for the suggestion to be displayed in the suggestion list, this will default to suggestion.title if a format is not supplied
 *
 */
var setup = function ($elem, suggestionsData, $targetInputElem, suggestionFormat) {
  /*
  * Note:
  * $targetInputElem and suggestionsData are for legacy support only
  * please use data attributes (data-suggestions and data-target-elem) to pass their values
  */

  if ($elem.length) {
    $autoCompleteInputElem = $elem;

    /*
    * This is set via the data-target-elem attribute on $autoCompleteInputElem
    * Optional input/select element to apply the suggestion.value to when a suggestion is selected.
    * If this is not supplied then the autoComplete input will contain the
    * suggestion.title which will be sent to the backend as the value of the $autoCompleteInputElem
    */
    $targetInputs = getTargetInput($elem) || $targetInputElem;
    $targetInputs = typeof($targetInputs) === 'string' ? $targetInputs.split(" ") : $targetInputs;
    /*
    * This is set via the data-suggestions attribute on $autoCompleteInputElem
    * e.g. data-suggestions="countries"
    * This holds the suggestions in a global js object (in the above case 'countries')
    * Format is [{title: "United Kingdom", value: "UK"}, {title: "United States", value: "USA"}]
    * This is also used for validation
    * If the id of a select input is provided instead via the data-select-elem attribute then the data-suggestions
    * attribute will be auto-generated (should not be supplied as will be overridden) and a suggestions object generated from its options
    */
    suggestions = suggestionsData || getSuggestions($elem);

    suggestionDisplayFormat = suggestionFormat;
    $clearInputButton = $('.js-suggestions-clear');
    $suggestionsContainer = $('.js-suggestions').first();
    $suggestionsStatusMessage = $('.js-suggestions-status-message').first();

    addEventListeners();
  }
};

module.exports = setup;
