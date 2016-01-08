require('jquery');

var JS_VISIBLE_SELECTOR = 'js-visible';
var JS_HIDDEN_SELECTOR = 'js-hidden';
var fixtureOneMaskText;
var fixtureOneSecretText;
var fixtureOneControlTextShow;
var fixtureOneControlTextHide;

var fixtureTwoMaskText;
var fixtureTwoSecretText;
var fixtureTwoControlTextShow;
var fixtureTwoControlTextHide;

var $fixtureOne;
var $fixtureOneQaMask;
var $fixtureOneQaSecret;
var $fixtureOneControl;

var $fixtureTwo;
var $fixtureTwoQaMask;
var $fixtureTwoQaSecret;
var $fixtureTwoControl;
var mask;


var setup = function () {
  mask();

  $fixtureOne = $('#fixture-one');
  $fixtureOneQaMask = $fixtureOne.find('.qa-mask');
  $fixtureOneQaSecret = $fixtureOne.find('.qa-secret');
  $fixtureOneControl = $fixtureOne.find('.qa-mask-control');

  $fixtureTwo = $('#fixture-two');
  $fixtureTwoQaMask = $fixtureTwo.find('.qa-mask');
  $fixtureTwoQaSecret = $fixtureTwo.find('.qa-secret');
  $fixtureTwoControl = $fixtureTwo.find('.qa-mask-control');

  fixtureOneMaskText = $fixtureOneQaMask.text();
  fixtureOneSecretText = $fixtureOneQaSecret.text();
  fixtureOneControlTextShow = $fixtureOneControl.data('textShow');
  fixtureOneControlTextHide = $fixtureOneControl.data('textHide');

  fixtureTwoMaskText = $fixtureTwoQaMask.text();
  fixtureTwoSecretText = $fixtureTwoQaSecret.text();
  fixtureTwoControlTextShow = $fixtureTwoControl.data('textShow');
  fixtureTwoControlTextHide = $fixtureTwoControl.data('textHide');
};

describe('Mask', function () {

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/specs/fixtures/';
    loadFixtures('mask-fixture.html');
    mask = require('../../javascripts/modules/mask.js');
  });

  describe('on page load', function () {
    beforeEach(setup);

    it('components are correctly set up', function () {
      expect(fixtureOneMaskText).toBe(fixtureOneMaskText);
      expect(fixtureOneSecretText).toBe(fixtureOneSecretText);
      expect($fixtureOneControl.text()).toBe(fixtureOneControlTextShow);

      expect(fixtureTwoMaskText).toBe(fixtureTwoMaskText);
      expect(fixtureTwoSecretText).toBe(fixtureTwoSecretText);
      expect($fixtureTwoControl.text()).toBe(fixtureTwoControlTextShow);
    });

    it('components visibility is correctly set up', function () {
      expect($fixtureOneQaMask).toHaveClass(JS_VISIBLE_SELECTOR);
      expect($fixtureOneQaSecret).toHaveClass(JS_HIDDEN_SELECTOR);

      expect($fixtureTwoQaMask).toHaveClass(JS_VISIBLE_SELECTOR);
      expect($fixtureTwoQaSecret).toHaveClass(JS_HIDDEN_SELECTOR);
    });
  });

  describe('on interaction', function () {

    beforeEach(setup);

    it('secret is shown when control is clicked', function () {
      $fixtureOneControl.click();
      expect($fixtureOneQaMask).toHaveClass(JS_HIDDEN_SELECTOR);
      expect($fixtureOneQaSecret).toHaveClass(JS_VISIBLE_SELECTOR);
      expect($fixtureOneControl.text()).toBe(fixtureOneControlTextHide);
    });

    it('secret is hidden when control is clicked twice', function () {
      $fixtureOneControl.click().click();

      expect($fixtureOneQaMask).toHaveClass(JS_VISIBLE_SELECTOR);
      expect($fixtureOneQaSecret).toHaveClass(JS_HIDDEN_SELECTOR);
      expect($fixtureOneControl.text()).toBe(fixtureOneControlTextShow);
    });

    it('only the current components secret is shown when control is clicked', function () {
      $fixtureOneControl.click();

      expect($fixtureOneQaMask).toHaveClass(JS_HIDDEN_SELECTOR);
      expect($fixtureOneQaSecret).toHaveClass(JS_VISIBLE_SELECTOR);
      expect($fixtureOneControl.text()).toBe(fixtureOneControlTextHide);

      expect($fixtureTwoQaMask).toHaveClass(JS_VISIBLE_SELECTOR);
      expect($fixtureTwoQaSecret).toHaveClass(JS_HIDDEN_SELECTOR);
      expect($fixtureTwoControl.text()).toBe(fixtureTwoControlTextShow);
    });
  });
});
