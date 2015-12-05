require('jquery');

/**
Generic form validation
Place attributes on form inputs and add the class .js-form to your form.

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
        class="form-control form-control--block js-choose-country-auto-complete"
        autocomplete="off"
        spellcheck="false"
        required
        data-rule-suggestion="true"
        aria-autocomplete="list"
        aria-haspopup="country-code-suggestions"
        aria-activedescendant />

Inline error markup example:

 <fieldset class="form-field-group@if(registrationForm("phoneNumber").hasErrors){ error}">
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
                 value="@registrationForm("phoneNumber").value"
                 id="phoneNumber"
                 class="form-control"
                 minlength="10"
                 maxlength="15"
                 pattern="^[0-9]{10,15}$"
                 required
                 aria-required="true"/>
      </label>
 </fieldset>
---------------------------

Summary Error Markup example:

 <div class="flash error-summary@if(!registrationForm.hasErrors){ hidden}" id="Search-failure" role="group" aria-labelledby="errorSummaryHeading" tabindex="-1">
 <h2 id="errorSummaryHeading" class="h3-heading">Heading</h2>

 @* ----- Form Summary errors (JavaScript only) ----- *@
 <ul class="js-error-summary-messages">
    <li class="hidden" role="tooltip" data-journey="search-page:error:phoneNumber">
      <a href="#phoneNumber" class="error-list" data-focuses="phoneNumber" id="phoneNumber-error">
        Error Message phone Number
      </a>
    </li>
    <li class="hidden" role="tooltip" data-journey="search-page:error:uk-number">
      <a href="#uk-number" class="error-list" data-focuses="uk-number" id="uk-number-error">
        Error Message uk number
      </a>
    </li>
    <li class="hidden" role="tooltip" data-journey="search-page:error:country-code-auto-complete">
      <a href="#country-code-auto-complete" class="error-list" data-focuses="country-code-auto-complete" id="country-code-auto-complete-error">
        Error Message Auto Complete
      </a>
    </li>
 </ul>

 @* ----- Form Summary Server side errors ----- *@
 @if(registrationForm.hasErrors){
    <ul class="js-error-summary-messages">
        @registrationForm.errors.map { error =>
            <li role="tooltip" data-journey="search-page:error:@error.key">
                <a href="#@error.key" class="error-list" data-focuses="@error.key" id="@{error.key}-error">
                @Messages(error.message)
                </a>
            </li>
        }
    </ul>
  }
 </div>
 */

var $forms;

var toggleSubmitButtonSate = function(submitButton, disable) {
  if (submitButton) { //submit not available when focused on input
    submitButton.disabled = disable;
  }
};

var displayErrorSummary = function (validator, $errorSummary) {
  var $errorSummaryMessages = $errorSummary.find('.js-error-summary-messages > li');
  var invalidInputs = validator.invalid;

  $errorSummaryMessages.each(function (index, elem) {
    var $elem = $(elem);
    var identSplit = $elem.data('journey').split('search-page:error:');
    var validationId = identSplit && identSplit[1];

    // find the error message and display
    if (invalidInputs[validationId]) {
      //do not re-show server-rendered error messages when performing JS validation
      if ($elem.hasClass('server-rendered')) {
        $elem.addClass('hidden');
      } else {
        $elem.removeClass('hidden');
      }
    } else {
      $elem.addClass('hidden');
    }
  });

  $errorSummary.removeClass('hidden');
};

var flushErrors = function (invalid) {
  for(var inputName in invalid) {
    var $elem = $('[name="' + inputName + '"]');

    if ($elem.is(':hidden')) {
      delete invalid[inputName];
      $elem.val('');
      $elem.closest('.form-field-group').removeClass('error');
    }
  }
};

var handleErrors = function (validator) {
  var $currentForm = $(validator.currentForm);
  var $errorSummary = $('.error-summary', $currentForm);
  var submitButton = $currentForm.find(':submit')[0];

  flushErrors(validator.invalid);

  if (validator.numberOfInvalids()) {
    displayErrorSummary(validator, $errorSummary);
    toggleSubmitButtonSate(submitButton, true);
  } else {
    $errorSummary.addClass('hidden');
    toggleSubmitButtonSate(submitButton, false);
  }
};

var setupForm = function ($formElem) {

  var validator = $formElem.validate({
    errorPlacement: function () {
      // error messages shown by revealing hidden content in markup
    },
    highlight: function (element) {
      $(element).closest('.form-field-group').addClass('error');
    },
    unhighlight: function (element) {
      $(element).closest('.form-field-group').removeClass('error');
    },
    showErrors: function () {
      handleErrors(validator);
      validator.defaultShowErrors();
    },
    submitHandler: function (form) {
      form.submit();
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

module.exports = function () {
  return {
    init: init
  };
};
