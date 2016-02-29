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
  describe('and on loading the page', function() {
    beforeEach(function() {
      modalDialog().init(); // init modal-dialog module
    });
    it('shows content 1 is hidden, and content 2 is visible', function() {
      expect($content1.is(':not(:visible)')).toBe(true);
      expect($content2.is(':visible')).toBe(true);
    });
  });

  describe('and the modal-dialog closes', function() {
    beforeEach(function() {
      modalDialog().init(); // init modal-dialog module
    });

    describe('when clicking a [data-modaldialog-action="close"] control in modal-dialog content', function() {
      var $contentCloseLink;

      beforeEach(function() {
        $contentCloseLink = $content2.find('a[data-modaldialog-action="close"]');
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

      it("modal-dialog is hidden", function(){
        expect($modalDialog.hasClass('modal-dialog--hidden')).toBe(true);
      });
    });

    describe('when clicking a [data-modaldialog-action="close"] control in document content', function() {
      var $documentCloseLink;

      beforeEach(function() {
        $documentCloseLink = $actions.find('[data-modaldialog-action="close"][data-modaldialog-target="content-2"]');
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

      it("the modal-dialog is hidden", function(){
        expect($modalDialog.hasClass('modal-dialog--hidden')).toBe(true);
      });
    });
    
    it('when user uses escape key', function() {
      $documentOpenLink = $actions.find('[data-modaldialog-action="open"][data-modaldialog-target="content-1"]');

      //var e = $.Event("keyup");
      //e.which = 27;
      //$content2.trigger(e);
      
      simulateKeyEvent($content2, 'keyup', 27);
      
      expect($content2.is(':not(:visible)')).toBe(true);
      expect($content1.is(':not(:visible)')).toBe(true);
      expect($body.hasClass('scroll-off')).toBe(false);
      expect($modalDialog.hasClass('modal-dialog--hidden')).toBe(true);
    });
  });

  describe('and the modal-dialog opens', function() {
    beforeEach(function() {
      modalDialog().init(); // init modal-dialog module
    });

    describe('when clicking a [data-modaldialog-action="open"] control in modal-dialog content', function() {
      beforeEach(function() {
        $content2.find('a[data-modaldialog-action="close"]').click();
        expect($content2.is(':not(:visible)')).toBe(true);
        expect($content1.is(':not(:visible)')).toBe(true);
        $actions.find('[data-modaldialog-action="open"][data-modaldialog-target="content-1"]').click();
      });

      it('content is visible', function() {
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
  
    describe('when clicking a [data-modaldialog-action="open"] control in document content', function () {
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

      it('content is visible', function() {
        expect($content2.is(':not(:visible)')).toBe(true);
        expect($content1.is(':visible')).toBe(true);
      });

      it("body is not scroll-able", function(){
        expect($body.hasClass('scroll-off')).toBe(true);
      });

      it("modal-dialog is not hidden", function(){
        expect($modalDialog.hasClass('modal-dialog--hidden')).toBe(false);
      });

    });
  });  
  
  
  // tabbing 
  describe("and the open modal-dialog retains focus when the user", function() {
    beforeEach(function() {
      modalDialog().init(); // init modal-dialog module
    });
    
    it("clicks elsewhere on the page", function() {
      expect($(document.activeElement).is($content2)).toBe(true);
      $('body').click();
      expect($(document.activeElement).is($content2)).toBe(true);
    });
    
    describe("navigates the content with tab key", function() {
      var $documentOpenLink;
    
      beforeEach(function() {
        $documentOpenLink = $actions.find('[data-modaldialog-action="open"][data-modaldialog-target="content-1"]');
        expect($documentOpenLink.length).toBe(1);

        $documentOpenLink.click();
      });

      it("returning to the first tab-indexed item after the last", function() {
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

      it("+ shift key in reverse, moveing to the last tabindex item after the first", function() {
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
