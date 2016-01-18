require('jquery');

/**
Generic form validation
- Place attributes on form inputs,
- Add the class .js-form to your form,
- Add messages for errors via data-msg-<error_type>
- Works with server side errors

JavaScript error messages added in your markup using the .error-notification class
Server side errors handled by using @if(registrationForm("phoneNumber").hasErrors){ error}
---------------------------

Custom Validation:
 Your custom validation will be picked up by jQuery validation via the inputs attribute by adding the following:

 data-rule-suggestion="true"
 (this will add the custom suggestion validation)

Example:
 <input type="text"
        name="country-code-auto-complete"
        id="country-code-auto-complete"
        class="form-control form-control--block"
        autocomplete="off"
        spellcheck="false"
        required
        value=""
        data-rule-suggestion="true"
        aria-autocomplete="list"
        aria-haspopup="country-code-suggestions"
        aria-activedescendant />

Inline error markup example:

 <fieldset class="form-field-group@if(registrationForm("phoneNumber").hasErrors){ form-field-group--error}">
    <legend class="visuallyhidden">@Messages("otpfe.enter_mobile.page.header")</legend>

      <label class="form-element-bold" for="phoneNumber">
      Label text
          <span class="error-notification" role="tooltip" data-journey="search-page:error:phoneNumber">
            Error Message
          </span>
          <span class="form-hint">
           Form Hint
          </span>
          <input type="text"
                 name="phoneNumber"
                 value=""
                 id="phoneNumber"
                 class="form-control"
                 minlength="10"
                 maxlength="15"
                 pattern="^[0-9]{10,15}$"
                 required
                 aria-required="true"
                 data-msg-pattern="Invalid Pattern"
                 data-msg-required="This is required"
                 data-msg-minlength="Minimum length not reached"/>
      </label>
 </fieldset>
---------------------------

Summary Error Markup example:

 <div class="flash error-summary@if(form.hasErrors) { error-summary--show}"
      id="Search-failure"
      role="group"
      aria-labelledby="errorSummaryHeading"
      tabindex="-1">

      <h2 id="errorSummaryHeading" class="h3-heading">@heading</h2>
      <ul class="js-error-summary-messages">
      @if(form.hasErrors) {
        @form.errors.map(error => fragments.errorSummaryItem(error.key, error.message))
      }
      </ul>
 </div>
 */

var $forms;

var displayGlobalErrorSummary = function (validator, errorMessages) {
  var $template = $('<li role="tooltip"><a></a></li>');
  var $errorSummaryListElement;

  if (errorMessages.length) {

    $(errorMessages).each(function (index, errorDetail) {
      $errorSummaryListElement = $template.clone();
      createErrorSummaryListItem($errorSummaryListElement, validator, errorDetail);
    });
  }
};

var createErrorSummaryListItem = function ($liElement, validator, errorDetail) {
  var $errorSummaryMessages = $(validator.currentForm).find('.js-error-summary-messages');
  var $anchorElement = $liElement.find('a');

  $liElement.attr('data-journey', 'search-page:error:' + errorDetail.name);
  $anchorElement.attr('data-focuses', errorDetail.name).attr('id', errorDetail.name + '-error').attr('href', '#' + name).text(errorDetail.message);
  $errorSummaryMessages.append($liElement);
}

/**
 * Clear the following for hidden inputs error messages, reset inputs and remove errors from validator.invalid
 * @param invalidInputs
 */
var flushHiddenElementErrors = function (invalidInputs) {
  for(var inputName in invalidInputs) {
    var $elem = $('[name="' + inputName + '"]');

    if ($elem.is(':hidden')) {
      delete invalidInputs[inputName];
      $elem.val('');
      $elem.closest('.form-field-group').removeClass('form-field-group--error');
    }
  }
};


var handleErrors = function (validator) {
  var $currentForm = $(validator.currentForm);
  var $errorSummary = $('.error-summary', $currentForm);
  var errorSummaryContainer = $errorSummary.find('.js-error-summary-messages');
  var errorMessages;

  // show default errors so the messages get updated before we extract them
  validator.defaultShowErrors();
  errorMessages = getErrorMessages();
  errorSummaryContainer.html('');

  flushHiddenElementErrors(validator.invalid);

  if (errorMessages.length) {
    displayGlobalErrorSummary(validator, errorMessages, $errorSummary);
    $errorSummary.addClass('error-summary--show');
  } else {
    $errorSummary.removeClass('error-summary--show');
  }
};

/**
 * Get the current global error messages show on the form
 *
 * NOTE: this has been create because it is not possible to get all messages via the exposed .errorList or .invalid when
 * using custom errors sent in via data-msg-* rules there is a bug/feature where the message in .invalid is set to "true"
 * in certain circumstances. There is also a feature with .showErrors() interface supplying local and global error lists
 * dependant on blur/click/focus or submit actions. This function normalizes this.
 * @returns {Array}
 */
var getErrorMessages = function () {
  var errorMessages = [];

  $('.error-notification').each(function (index, errorMessageElem) {
    var $errorMessageElem = $(errorMessageElem);
    var name = $errorMessageElem.attr('data-journey').split(':').pop();
    var error = {};

    // only interested in current error messages
    if (!$errorMessageElem.is(':hidden')) {
      error.name = name;
      error.message = $errorMessageElem.text();
      errorMessages.push(error);
    }
  });

  return errorMessages;
};


var setupForm = function ($formElem) {
  var validator = $formElem.validate({
    errorPlacement: function ($error, $element) {
      var $formFieldGroup = $element.closest('.form-field-group');
      $formFieldGroup.find('.error-notification').text($error.text());
    },
    highlight: function (element) {
      $(element).closest('.form-field-group').addClass('form-field-group--error');
    },
    unhighlight: function (element) {
      $(element).closest('.form-field-group').removeClass('form-field-group--error');
    },
    showErrors: function () {
      handleErrors(validator);
    },
    submitHandler: function (form) {
      form.submit();
    },
    invalidHandler: function() {
      // When invalid submission, re-enable the submit button as the preventDoubleSubmit module disables the submit onSubmit
      $formElem.find('.button[type=submit]').prop('disabled', false);
    }
  });
};

var setupValidation = function () {
  $forms.each(function (index, elem) {
    setupForm($(elem));
  });
};

var setup = function () {
  $forms = $('.js-form');
};

var init = function () {
  setup();

  if ($forms.length) {
    setupValidation();
  }
};


module.exports = {
  init: init,
  getErrorMessages: getErrorMessages
}
