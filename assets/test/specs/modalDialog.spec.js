require('jquery');
window._gaq = [];
var modalDialog, $body, $actions, $modalDialog, $inner,  $content1, $content2, $actions1, $actions2;

describe('Given I have a modal-dialog module on the page', function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/specs/fixtures/';
    loadFixtures('modal-dialog.html');
    
    modalDialog = require('../../javascripts/modules/modalDialog.js');
    
    $body = $('body');
    $actions = $('.document-actions');
    $modalDialog = $('.modal-dialog');
    $inner = $('.modal-dialog__inner');
    $content1 = $('#content-1');
    $content2 = $('#content-2');
    $actions1 = $('#content-1-actions');
    $actions2 = $('#content-2-actions');
  });

  // open / close
  describe('loading the page', function() {
    beforeEach(function() {
      modalDialog();
    });
    it('should show content 1 is hidden, and content 2 is visible', function() {
      expect($content1.is(':not(:visible)')).toBe(true);
      expect($content2.is(':visible')).toBe(true);
    });
  });

  describe('closing the modal-dialog', function() {
    beforeEach(function() {
      modalDialog();
    });

    describe('by clicking a [data-modaldialog-action="close"] control in modal-dialog content', function() {
      var $contentCloseLink;

      beforeEach(function() {
        $contentCloseLink = $content2.find('a[data-modaldialog-action="close"]');
        expect($contentCloseLink.length).toBe(1);
        $contentCloseLink.click();
      });
      
      it('should hide content', function() {
        expect($content2.is(':not(:visible)')).toBe(true);
        expect($content1.is(':not(:visible)')).toBe(true);
      });
      
      it("should make the body scroll-able", function(){
        expect($body.hasClass('scroll-off')).toBe(false);
      });

      it("should hide the modal-dialog", function(){
        expect($modalDialog.hasClass('modal-dialog--hidden')).toBe(true);
      });
    });

    describe('by clicking a [data-modaldialog-action="close"] control in document content', function() {
      var $documentCloseLink;

      beforeEach(function() {
        $documentCloseLink = $actions.find('[data-modaldialog-action="close"][data-modaldialog-target="content-2"]');
        expect($documentCloseLink.length).toBe(1);
        $documentCloseLink.click();
      });

      it('should hide content', function() {
        expect($content2.is(':not(:visible)')).toBe(true);
        expect($content1.is(':not(:visible)')).toBe(true);
      });

      it("should make the body scroll-able", function(){
        expect($body.hasClass('scroll-off')).toBe(false);
      });

      it("should hide the modal-dialog", function(){
        expect($modalDialog.hasClass('modal-dialog--hidden')).toBe(true);
      });
    });
    
    it('should occur when user uses escape key', function() {
      $documentOpenLink = $actions.find('[data-modaldialog-action="open"][data-modaldialog-target="content-1"]');
      
      simulateKeyEvent($content2, 'keyup', 27);
      
      expect($content2.is(':not(:visible)')).toBe(true);
      expect($content1.is(':not(:visible)')).toBe(true);
      expect($body.hasClass('scroll-off')).toBe(false);
      expect($modalDialog.hasClass('modal-dialog--hidden')).toBe(true);
    });
  });

  describe('opening the modal-dialog', function() {
    beforeEach(function() {
      modalDialog();
    });

    describe('by clicking a [data-modaldialog-action="open"] control in modal-dialog content', function() {
      beforeEach(function() {
        $content2.find('a[data-modaldialog-action="close"]').click();
        expect($content2.is(':not(:visible)')).toBe(true);
        expect($content1.is(':not(:visible)')).toBe(true);
        $actions.find('[data-modaldialog-action="open"][data-modaldialog-target="content-1"]').click();
      });

      it('should make content visible', function() {
        expect($content2.is(':not(:visible)')).toBe(true);
        expect($content1.is(':visible')).toBe(true);

        var $contentOpen = $content1.find('[data-modaldialog-action="open"][data-modaldialog-target="content-2"]');
        expect($contentOpen.length).toBe(1);
        $contentOpen.click();

        expect($content1.is(':not(:visible)')).toBe(true);
        expect($content2.is(':visible')).toBe(true);

        expect($body.hasClass('scroll-off')).toBe(true);
        expect($modalDialog.hasClass('modal-dialog--hidden')).toBe(false);
      });
    });
  
    describe('by clicking a [data-modaldialog-action="open"] control in document content', function () {
      var $documentOpenLink;

      beforeEach(function () {
        // close the modal-dialog
        $actions.find('[data-modaldialog-action="close"][data-modaldialog-target="content-2"]').click();
        expect($content2.is(':not(:visible)')).toBe(true);
        expect($content1.is(':not(:visible)')).toBe(true);

        $documentOpenLink = $actions.find('[data-modaldialog-action="open"][data-modaldialog-target="content-1"]');
        expect($documentOpenLink.length).toBe(1);

        $documentOpenLink.click();
      });

      it('should make content visible', function() {
        expect($content2.is(':not(:visible)')).toBe(true);
        expect($content1.is(':visible')).toBe(true);
      });

      it("should make the body not scroll-able", function(){
        expect($body.hasClass('scroll-off')).toBe(true);
      });

      it("should show the modal-dialog", function(){
        expect($modalDialog.hasClass('modal-dialog--hidden')).toBe(false);
      });

    });
  });  
  
  
  // tabbing 
  describe("the open modal-dialog", function() {
    beforeEach(function() {
      modalDialog();
    });
    
    it("should retain focus when the user clicks elsewhere on the page", function() {
      expect($(document.activeElement).is($content2)).toBe(true);
      $('body').click();
      expect($(document.activeElement).is($content2)).toBe(true);
    });
    
    describe("when content is navigated with tab key", function() {
      var $documentOpenLink;
    
      beforeEach(function() {
        $documentOpenLink = $actions.find('[data-modaldialog-action="open"][data-modaldialog-target="content-1"]');
        expect($documentOpenLink.length).toBe(1);

        $documentOpenLink.click();
      });

      it("should return to the first tab-indexed item after the last", function() {
        // item in focus is modal-dialog__content block
        expect($(document.activeElement).is($content1)).toBe(true);
        expect($(document.activeElement).hasClass('modal-dialog__content')).toBe(true);
        
        simulateKeyEvent($(document.activeElement), 'keydown', 9);
        // item in focus is <button/> content close control link
        expect($content1.find($(document.activeElement)).length).toBe(1);
        expect($(document.activeElement).data('modaldialogAction')).toBe('close');
        
        simulateKeyEvent($(document.activeElement), 'keydown', 9);
        // item in focus is <a/> content open control link
        expect($content1.find($(document.activeElement)).length).toBe(1);
        expect($(document.activeElement).data('modaldialogAction')).toBe('open');
        
        simulateKeyEvent($(document.activeElement), 'keydown', 9);
        expect($(document.activeElement).is($content1)).toBe(true);
        expect($(document.activeElement).hasClass('modal-dialog__content')).toBe(true);
      });

      it("should move to the last tab-indexed item after the first when shift key is used, ", function() {
        // item in focus is modal-dialog__content block
        expect($(document.activeElement).is($content1)).toBe(true);
        expect($(document.activeElement).hasClass('modal-dialog__content')).toBe(true);

        simulateKeyEvent($(document.activeElement), 'keydown', 9, true);
        // item in focus is <a/> content open control link
        expect($content1.find($(document.activeElement)).length).toBe(1);
        expect($(document.activeElement).data('modaldialogAction')).toBe('open');
        
        simulateKeyEvent($(document.activeElement), 'keydown', 9, true);
        // item in focus is <button/> content close control link
        expect($content1.find($(document.activeElement)).length).toBe(1);
        expect($(document.activeElement).data('modaldialogAction')).toBe('close');

        simulateKeyEvent($(document.activeElement), 'keydown', 9, true);
        expect($(document.activeElement).is($content1)).toBe(true);
        expect($(document.activeElement).hasClass('modal-dialog__content')).toBe(true);
        
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
