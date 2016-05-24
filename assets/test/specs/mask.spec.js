require('jquery');

var JS_VISIBLE_SELECTOR = 'js-visible';
var JS_HIDDEN_SELECTOR = 'js-hidden';
var SECRET_KEY = 'secret-key';
var ERROR_MESSAGE = 'Invalid credential';

var fixtureOneMaskText;
var fixtureOneSecretText;
var fixtureOneControlTextShow;
var fixtureOneControlTextHide;

var fixtureTwoMaskText;
var fixtureTwoSecretText;
var fixtureTwoControlTextShow;
var fixtureTwoControlTextHide;

var $fixtureThreeMaskToggleTarget;
var fixtureThreeMaskText;
var fixtureThreeSecretText;
var fixtureThreeControlTextShow;
var fixtureThreeControlTextHide;

var $fixtureOne;
var $fixtureOneQaMask;
var $fixtureOneQaSecret;
var $fixtureOneControl;

var $fixtureTwo;
var $fixtureTwoQaMask;
var $fixtureTwoQaSecret;
var $fixtureTwoControl;
var mask;

var $fixtureThree;
var $fixtureThreeQaMask;
var $fixtureThreeQaSecret;
var $fixtureThreeControl;
var $fixtureThreeTarget;
var $fixtureThreeErrorMessage;

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

  $fixtureThree = $('#fixture-three');
  $fixtureThreeQaMask = $fixtureThree.find('.qa-mask');
  $fixtureThreeQaSecret = $fixtureThree.find('.qa-secret');
  $fixtureThreeControl = $fixtureThree.find('.qa-mask-control');
  $fixtureThreeTarget = $fixtureThree.find('.qa-mask-target');
  $fixtureThreeErrorMessage = $fixtureThree.find('.qa-error-message');

  fixtureOneMaskText = $fixtureOneQaMask.text();
  fixtureOneSecretText = $fixtureOneQaSecret.text();
  fixtureOneControlTextShow = $fixtureOneControl.data('textShow') + ' ' +
                              $fixtureOneControl.data('accessibleText');
  fixtureOneControlTextHide = $fixtureOneControl.data('textHide') + ' ' +
                              $fixtureOneControl.data('accessibleText');

  fixtureTwoMaskText = $fixtureTwoQaMask.text();
  fixtureTwoSecretText = $fixtureTwoQaSecret.text();
  fixtureTwoControlTextShow = $fixtureTwoControl.data('textShow') + ' ' +
                              $fixtureTwoControl.data('accessibleText');
  fixtureTwoControlTextHide = $fixtureTwoControl.data('textHide') + ' ' +
                              $fixtureTwoControl.data('accessibleText');


  $fixtureThreeMaskToggleTarget = $fixtureThreeControl.data('mask-toggle-target');
  fixtureThreeMaskText = $fixtureThreeQaMask.text();
  fixtureThreeSecretText = $fixtureThreeQaSecret.text();
  fixtureThreeControlTextShow = $fixtureThreeControl.data('textShow') + ' ' +
                                $fixtureThreeControl.data('accessibleText');
  fixtureThreeControlTextHide = $fixtureThreeControl.data('textHide') + ' ' +
                                $fixtureThreeControl.data('accessibleText');

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

      expect(fixtureThreeMaskText).toBe(fixtureThreeMaskText);
      expect(fixtureThreeSecretText).toBe(fixtureThreeSecretText);
      expect($fixtureThreeControl.text()).toBe(fixtureThreeControlTextShow);
      expect($fixtureThreeMaskToggleTarget).toBe('qa-mask-target');
    });

    it('components visibility is correctly set up', function () {
      expect($fixtureOneQaMask).toHaveClass(JS_VISIBLE_SELECTOR);
      expect($fixtureOneQaSecret).toHaveClass(JS_HIDDEN_SELECTOR);

      expect($fixtureTwoQaMask).toHaveClass(JS_VISIBLE_SELECTOR);
      expect($fixtureTwoQaSecret).toHaveClass(JS_HIDDEN_SELECTOR);

      expect($fixtureThreeTarget).toHaveClass(JS_HIDDEN_SELECTOR);
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

    it('should show target (if defined) when control', function () {
      $fixtureThreeControl.click();
      expect($fixtureThreeQaMask).toHaveClass(JS_VISIBLE_SELECTOR);
      expect($fixtureThreeQaSecret).toHaveClass(JS_HIDDEN_SELECTOR);
      expect($fixtureThreeTarget).toHaveClass(JS_VISIBLE_SELECTOR);
    });

    it('should set secret key on "unmask" event', function () {
      $fixtureThreeControl.trigger('unmask', SECRET_KEY);
      expect($fixtureThreeQaSecret.text()).toBe(SECRET_KEY);
    });
  });

  describe('on revealing a timer-configured secret', function() {

    beforeEach(function(done) {
      setup();

      // click to reveal secret
      $fixtureTwoControl.click();

      // wait longer than configured timer (145 miliseconds) to check that secret is hidden
      setTimeout(function() {
        done();
      }, 150);

    });

    it('150 milliseconds after revealing secret, the secret is masked', function(done) {    
      expect($fixtureTwoQaMask).toHaveClass(JS_VISIBLE_SELECTOR);
      done();
    });

    it('150 milliseconds after revealing secret, link contains correct text', function(done) {
      expect($fixtureTwoControl.text()).toBe(fixtureTwoControlTextShow);
      done();
    });

  });

});
