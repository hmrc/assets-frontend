require('jquery');

/*
 Form Hint Helper is a visual aid to guide users on requirements for inputs it allows rules with a regex and flags to be
 associated with an input, and to confirm that the values of two fields match, e.g. passwords.
 When the input matches the specified regex, or the two fields match, the rule will display a tick, otherwise it will
 display as a list element with a list bullet.
 - apply the .js-form-hint-helper to your input for regex matches.
 - associate the rules with the input via the data attribute data-hint-rules="js-hint-example-rule"
 - define the rules on your rule elements associated with your input via the data attribute data-hint-rule="^\w{8,12}$"
 - define which input fields must be equal with the data-hint-confirm data attribute, e.g. data-hint-confirm="password,password-confirm".
 - use the relevant markup and classes

 Password input markup example:

 <input type="password" name="password" id="password" class="js-form-hint-helper" data-hint-rules="js-hint-example-rule"/>

 <input type="password" name="passwordConfirm" id="password-confirm" data-hint-confirm-rule="js-confirm-example-rule"/>

 Form Hint Helper markup example:

 <p class="form-hint">Your input must:</p>
 <ul class="form-hint-list">
   <li class="form-hint-list-item js-hint-example-rule"
       data-hint-rule="^\w{8,12}$"
       data-hint-rule-flag="i">
          <span class="form-hint-list-item__indicator">be between 8 and 12 characters</span>
   </li>
   <li class="form-hint-list-item js-hint-example-rule"
       data-hint-rule="^((?!password)[\S])+$"
       data-hint-rule-flag="i">
          <span class="form-hint-list-item__indicator">should not contain the word 'password'</span>
   </li>
   <li class="form-hint-list-item js-confirm-example-rule"
       data-hint-confirm="password,password-confirm">
          <span class="form-hint-list-item__indicator">match the password confirmation</span>
   </li>
 </ul>
 */
var validClass;
var matchInputsAttr;

var buildRules = function ($ruleElements) {
  var rules = [];

  $ruleElements.each(function (index, ruleElement) {
    var $ruleElement = $(ruleElement);
    var rule = $ruleElement.attr('data-hint-rule');
    var ruleFlag = $ruleElement.attr('data-hint-rule-flag');
    var flag = ruleFlag || '';
    var pattern;

    try {
      pattern = new RegExp(rule, flag);
    } catch (e) {
      //TODO add reporting?
    }

    rules.push({
      $elem: $ruleElement,
      pattern: pattern
    });
  });

  return rules;
};

var setValidClass = function (isValid, $element) {
  if (isValid) {
    $element.addClass(validClass);
  } else {
    $element.removeClass(validClass);
  }
};

var $formHintHelperEvent = function ($formHintHelperInput) {
  var $ruleElements = $('.' + $formHintHelperInput.attr('data-hint-rules'));
  var rules = buildRules($ruleElements);

  $formHintHelperInput.on('keyup', function () {
    var inputValue = $formHintHelperInput.val();

    for (var value in rules) {
      var rule = rules[value];
      setValidClass(rule.pattern.test(inputValue), rule.$elem);
    }
  });
};

var valuesEqualAndNotEmpty = function($inputA, $inputB) {
  return $inputA.val() && $inputB.val() && $inputA.val() === $inputB.val();
};

var $formHintHelperConfirmEvent = function ($ruleElement) {
  var inputsToCompare = $ruleElement.attr(matchInputsAttr).split(',');
  if (inputsToCompare.length === 2) {
    var $inputA = $('#' + inputsToCompare[0]);
    var $inputB = $('#' + inputsToCompare[1]);

    if ($inputA && $inputB) {
      $inputA.on('keyup', function () {
        setValidClass(valuesEqualAndNotEmpty($inputA, $inputB), $ruleElement);
      });
      $inputB.on('keyup', function () {
        setValidClass(valuesEqualAndNotEmpty($inputA, $inputB), $ruleElement);
      });
    }
  }
};

var addListeners = function () {
  $('.js-form-hint-helper').each(function (index, formHintHelperInput) {
    $formHintHelperEvent($(formHintHelperInput));
  });

  $('['+matchInputsAttr+']').each(function (index, confirmRuleElement) {
    $formHintHelperConfirmEvent($(confirmRuleElement));
  });
};

var setup = function() {
  validClass = 'form-hint-list-item--valid';
  matchInputsAttr = 'data-hint-confirm-inputs';
};

module.exports = function () {
  setup();
  addListeners();
};
