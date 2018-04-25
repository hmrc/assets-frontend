/* eslint-env jquery */

require('jquery')

/*
Form Hint Helper is a visual aid to guide users on requirements for inputs it allows rules with a regex and flags to be
associated with an input. When the input matches the specified regex the rule will display a tick, otherwise it will
display as a list element with a list bullet.
- apply the .js-form-hint-helper to your input
- associate the rules with the input via the data attribute data-hint-rules="js-hint-example-rule"
- define the rules on your rule elements associated with your input via the data attribute data-hint-rule="^\w{8,12}$"
- use the relevant markup and classes

Password input markup example:

 <input type="password" name="password" id="password" class="js-form-hint-helper" data-hint-rules="js-hint-example-rule"/>

Form Hint Helper markup example:

 <p class="form-hint">Your input must:</p>
 <ul class="form-hint-list">
  <li class="form-hint-list-item js-hint-example-rule"
      id="password-hint-rule-one"
      data-hint-rule="^\w{8,12}$"
      data-hint-rule-flag="i">
    <span class="form-hint-list-item__indicator"></span>be between 8 and 12 characters
  </li>
  <li class="form-hint-list-item js-hint-example-rule"
      id="password-hint-rule-four"
      data-hint-rule="^((?!password)[\S])+$"
      data-hint-rule-flag="i">
    <span class="form-hint-list-item__indicator"></span>should not contain the word 'password'
  </li>
 </ul>
*/
var $formHintHelperInputs

var buildRules = function ($ruleElements) {
  var rules = []

  $ruleElements.each(function (index, ruleElement) {
    var $ruleElement = $(ruleElement)
    var rule = $ruleElement.attr('data-hint-rule')
    var ruleFlag = $ruleElement.attr('data-hint-rule-flag')
    var flag = ruleFlag || ''
    var pattern

    try {
      pattern = new RegExp(rule, flag)
    } catch (e) {
      // TODO add reporting?
    }

    rules.push({
      $elem: $ruleElement,
      pattern: pattern
    })
  })

  return rules
}

var $formHintHelperEvent = function ($formHintHelperInput) {
  var $ruleElements = $('.' + $formHintHelperInput.attr('data-hint-rules'))
  var rules = buildRules($ruleElements)

  $formHintHelperInput.on('keyup', function () {
    var inputValue = $formHintHelperInput.val()

    for (var i = 0, length1 = rules.length; i < length1; i++) {
      var rule = rules[i]

      if (rule.pattern.test(inputValue)) {
        rule.$elem.addClass('form-hint-list-item--valid')
      } else {
        rule.$elem.removeClass('form-hint-list-item--valid')
      }
    }
  })
}

var addListeners = function () {
  $formHintHelperInputs.each(function (index, formHintHelperInput) {
    $formHintHelperEvent($(formHintHelperInput))
  })
}

var setup = function () {
  $formHintHelperInputs = $('.js-form-hint-helper')
}

module.exports = function () {
  setup()

  if ($formHintHelperInputs.length) {
    addListeners()
  }
}
