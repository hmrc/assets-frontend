require('jquery');

var formHintHelper;
var $exampleOneRuleOneElem;
var $exampleOneRuleTwoElem;
var $exampleOneRuleThreeElem;
var $exampleOneRuleFourElem;
var $exampleTwoRuleOneElem;
var $exampleOneInputElem;
var $exampleTwoInputElem;
var assertRulesAreNotValid = function (rules) {
  rules.map(function ($elem) {
    expect($elem).not.toHaveClass('form-hint-list-item--valid');
  });
}

var setup = function () {
  formHintHelper();
  $exampleOneRuleOneElem = $('#example-hint-rule-one');
  $exampleOneRuleTwoElem = $('#example-hint-rule-two');
  $exampleOneRuleThreeElem = $('#example-hint-rule-three');
  $exampleOneRuleFourElem = $('#example-hint-rule-four');
  $exampleTwoRuleOneElem = $('#example-two-hint-rule-one');
  $exampleOneInputElem = $('#example');
  $exampleTwoInputElem = $('#example-two');
};

describe('Form Hint Helper', function () {

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/specs/fixtures/';
    loadFixtures('form-hint-helper-fixture.html');
    formHintHelper = require('../../javascripts/modules/formHintHelper.js');
  });

  describe('When I load the page', function () {
    beforeEach(setup);

    it('there should be no ticks shown', function () {
      assertRulesAreNotValid([
        $exampleOneRuleOneElem,
        $exampleOneRuleTwoElem,
        $exampleOneRuleThreeElem,
        $exampleOneRuleFourElem,
        $exampleTwoRuleOneElem
      ]);
    });
  });

  describe('When I interact', function () {
    beforeEach(setup);

    it('a correct entry should display a tick for correct rules', function () {
      $exampleOneInputElem.val('1').trigger('keyup');

      expect($exampleOneRuleThreeElem).toHaveClass('form-hint-list-item--valid');
      expect($exampleOneRuleFourElem).toHaveClass('form-hint-list-item--valid');

      assertRulesAreNotValid([
        $exampleOneRuleOneElem,
        $exampleOneRuleTwoElem,
        $exampleTwoRuleOneElem
      ]);
    });

    it('an incorrect entry should not display a tick', function () {
      $exampleOneInputElem.val('example').trigger('keyup');

      expect($exampleOneRuleTwoElem).toHaveClass('form-hint-list-item--valid');

      assertRulesAreNotValid([
        $exampleOneRuleOneElem,
        $exampleOneRuleThreeElem,
        $exampleOneRuleFourElem,
        $exampleTwoRuleOneElem
      ]);
    });

    it('a correct entry should not display a tick when altered to be incorrect', function () {
      $exampleOneInputElem.val('example').trigger('keyup');

      expect($exampleOneRuleTwoElem).toHaveClass('form-hint-list-item--valid');

      assertRulesAreNotValid([
        $exampleOneRuleOneElem,
        $exampleOneRuleThreeElem,
        $exampleOneRuleFourElem,
        $exampleTwoRuleOneElem
      ]);

      $exampleOneInputElem.val('exampl').trigger('keyup');

      expect($exampleOneRuleTwoElem).toHaveClass('form-hint-list-item--valid');
      expect($exampleOneRuleFourElem).toHaveClass('form-hint-list-item--valid');

      assertRulesAreNotValid([
        $exampleOneRuleOneElem,
        $exampleOneRuleThreeElem,
        $exampleTwoRuleOneElem
      ]);
    });

    it('multiple rules should be ticked', function () {
      $exampleOneInputElem.val('thiswillwor6').trigger('keyup');

      expect($exampleOneRuleOneElem).toHaveClass('form-hint-list-item--valid');
      expect($exampleOneRuleTwoElem).toHaveClass('form-hint-list-item--valid');
      expect($exampleOneRuleThreeElem).toHaveClass('form-hint-list-item--valid');
      expect($exampleOneRuleFourElem).toHaveClass('form-hint-list-item--valid');

      expect($exampleTwoRuleOneElem).not.toHaveClass('form-hint-list-item--valid');
    });

    it('a correct entry should display a tick for associated rules only', function () {
      $exampleTwoInputElem.val('12345678910111213140').trigger('keyup');

      expect($exampleTwoRuleOneElem).toHaveClass('form-hint-list-item--valid');

      assertRulesAreNotValid([
        $exampleOneRuleOneElem,
        $exampleOneRuleTwoElem,
        $exampleOneRuleThreeElem,
        $exampleOneRuleFourElem,
      ]);
    });
  });
});
