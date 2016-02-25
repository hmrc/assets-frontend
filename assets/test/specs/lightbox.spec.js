require('jquery');
window._gaq = [];
var lightBox, $body, $actions, $lightBox, $inner,  $content1, $content2, $actions1, $actions2;

describe('Given I have a light-box module on the page', function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/specs/fixtures/';
    loadFixtures('light-box.html');
    
    lightBox = require('../../javascripts/modules/lightbox.js');
    
    $body = $('body');
    $actions = $('.document-actions');
    $lightBox = $('.light-box');
    $inner = $('.light-box__inner');
    $content1 = $('#content-1');
    $content2 = $('#content-2');
    $actions1 = $('#content-1-actions');
    $actions2 = $('#content-2-actions');
  });

  // open / close
  describe('and on loading the page', function() {
    beforeEach(function() {
      lightBox().init(); // init light-box module
    });
    it('shows content 1 is hidden, and content 2 is visible', function() {
      expect($content1.is(':not(:visible)')).toBe(true);
      expect($content2.is(':visible')).toBe(true);
    });
  });

  describe('and the light-box closes', function() {
    beforeEach(function() {
      lightBox().init(); // init light-box module
    });

    describe('when clicking a [data-lightbox-action="close"] control in light-box content', function() {
      var $contentCloseLink;

      beforeEach(function() {
        $contentCloseLink = $content2.find('a[data-lightbox-action="close"]');
        expect($contentCloseLink.length).toBe(1);
        $contentCloseLink.click();
      });
      
      it('content is not visible', function() {
        expect($content2.is(':not(:visible)')).toBe(true);
        expect($content1.is(':not(:visible)')).toBe(true);
      });
      
      it("body becomes scroll-able", function(){
        expect($body.hasClass('scroll-off')).toBe(false);
      });

      it("light-box is hidden", function(){
        expect($lightBox.hasClass('light-box--hidden')).toBe(true);
      });
    });

    describe('when clicking a [data-lightbox-action="close"] control in document content', function() {
      var $documentCloseLink;

      beforeEach(function() {
        $documentCloseLink = $actions.find('[data-lightbox-action="close"][data-lightbox-target="content-2"]');
        expect($documentCloseLink.length).toBe(1);
        $documentCloseLink.click();
      });

      it('content is not visible', function() {
        expect($content2.is(':not(:visible)')).toBe(true);
        expect($content1.is(':not(:visible)')).toBe(true);
      });

      it("body becomes scroll-able", function(){
        expect($body.hasClass('scroll-off')).toBe(false);
      });

      it("the light-box is hidden", function(){
        expect($lightBox.hasClass('light-box--hidden')).toBe(true);
      });
    });
    
    it('when user uses escape key', function() {
      $documentOpenLink = $actions.find('[data-lightbox-action="open"][data-lightbox-target="content-1"]');

      //var e = $.Event("keyup");
      //e.which = 27;
      //$content2.trigger(e);
      
      simulateKeyEvent($content2, 'keyup', 27);
      
      expect($content2.is(':not(:visible)')).toBe(true);
      expect($content1.is(':not(:visible)')).toBe(true);
      expect($body.hasClass('scroll-off')).toBe(false);
      expect($lightBox.hasClass('light-box--hidden')).toBe(true);
    });
  });

  describe('and the light-box opens', function() {
    beforeEach(function() {
      lightBox().init(); // init light-box module
    });

    describe('when clicking a [data-lightbox-action="open"] control in light-box content', function() {
      beforeEach(function() {
        $content2.find('a[data-lightbox-action="close"]').click();
        expect($content2.is(':not(:visible)')).toBe(true);
        expect($content1.is(':not(:visible)')).toBe(true);
        $actions.find('[data-lightbox-action="open"][data-lightbox-target="content-1"]').click();
      });

      it('content is visible', function() {
        expect($content2.is(':not(:visible)')).toBe(true);
        expect($content1.is(':visible')).toBe(true);

        var $contentOpen = $content1.find('[data-lightbox-action="open"][data-lightbox-target="content-2"]');
        expect($contentOpen.length).toBe(1);
        $contentOpen.click();

        expect($content1.is(':not(:visible)')).toBe(true);
        expect($content2.is(':visible')).toBe(true);

        expect($body.hasClass('scroll-off')).toBe(true);
        expect($lightBox.hasClass('light-box--hidden')).toBe(false);
      });
    });
  
    describe('when clicking a [data-lightbox-action="open"] control in document content', function () {
      var $documentOpenLink;

      beforeEach(function () {
        // close the light-box
        $actions.find('[data-lightbox-action="close"][data-lightbox-target="content-2"]').click();
        expect($content2.is(':not(:visible)')).toBe(true);
        expect($content1.is(':not(:visible)')).toBe(true);

        $documentOpenLink = $actions.find('[data-lightbox-action="open"][data-lightbox-target="content-1"]');
        expect($documentOpenLink.length).toBe(1);

        $documentOpenLink.click();
      });

      it('content is visible', function() {
        expect($content2.is(':not(:visible)')).toBe(true);
        expect($content1.is(':visible')).toBe(true);
      });

      it("body is not scroll-able", function(){
        expect($body.hasClass('scroll-off')).toBe(true);
      });

      it("light-box is not hidden", function(){
        expect($lightBox.hasClass('light-box--hidden')).toBe(false);
      });

    });
  });  
  
  
  // tabbing 
  describe("and the open light-box retains focus when the user", function() {
    beforeEach(function() {
      lightBox().init(); // init light-box module
    });
    
    it("clicks elsewhere on the page", function() {
      expect($(document.activeElement).is($content2)).toBe(true);
      $('body').click();
      expect($(document.activeElement).is($content2)).toBe(true);
    });
    
    describe("navigates the content with tab key", function() {
      var $documentOpenLink;
    
      beforeEach(function() {
        $documentOpenLink = $actions.find('[data-lightbox-action="open"][data-lightbox-target="content-1"]');
        expect($documentOpenLink.length).toBe(1);

        $documentOpenLink.click();
      });

      it("returning to the first tab-indexed item after the last", function() {
        // item in focus is light-box__content block
        expect($(document.activeElement).is($content1)).toBe(true);
        expect($(document.activeElement).hasClass('light-box__content')).toBe(true);
        
        simulateKeyEvent($(document.activeElement), 'keydown', 9);
        // item in focus is <button/> content close control link
        expect($content1.find($(document.activeElement)).length).toBe(1);
        expect($(document.activeElement).data('lightboxAction')).toBe('close');
        
        simulateKeyEvent($(document.activeElement), 'keydown', 9);
        // item in focus is <a/> content open control link
        expect($content1.find($(document.activeElement)).length).toBe(1);
        expect($(document.activeElement).data('lightboxAction')).toBe('open');
        
        simulateKeyEvent($(document.activeElement), 'keydown', 9);
        expect($(document.activeElement).is($content1)).toBe(true);
        expect($(document.activeElement).hasClass('light-box__content')).toBe(true);
      });

      it("+ shift key in reverse, moveing to the last tabindex item after the first", function() {
        // item in focus is light-box__content block
        expect($(document.activeElement).is($content1)).toBe(true);
        expect($(document.activeElement).hasClass('light-box__content')).toBe(true);

        simulateKeyEvent($(document.activeElement), 'keydown', 9, true);
        // item in focus is <a/> content open control link
        expect($content1.find($(document.activeElement)).length).toBe(1);
        expect($(document.activeElement).data('lightboxAction')).toBe('open');
        
        simulateKeyEvent($(document.activeElement), 'keydown', 9, true);
        // item in focus is <button/> content close control link
        expect($content1.find($(document.activeElement)).length).toBe(1);
        expect($(document.activeElement).data('lightboxAction')).toBe('close');

        simulateKeyEvent($(document.activeElement), 'keydown', 9, true);
        expect($(document.activeElement).is($content1)).toBe(true);
        expect($(document.activeElement).hasClass('light-box__content')).toBe(true);
        
      });
    });
  });
});

function simulateKeyEvent($dom, type, keyCode, shiftKey) {
  var e = $.Event(type);
  e.which = keyCode;
  e.shiftKey = shiftKey || false;
  return $dom.trigger(e);
}
