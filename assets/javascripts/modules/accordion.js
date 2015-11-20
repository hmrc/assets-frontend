/**
 * Accordion Module
 * 
 * Usage:
 *
 *  <div class="accordion" data-accordion>
 *
 *    <div class="accordion__row">     
 *      <i class="arrow arrow--right" data-accordion-arrow></i>
 *      <a href="#" data-accordion-button>Accordion Title</a>  
 *      <div data-accordion-reveal>
 *        <p>Optionally reveal content that is not part of the body on expand</p>
 *      </div>
 *    </div>
 *
 *    <div class="accordion__body hidden" data-accordion-body>                        
 *      <p>Accordion Body</p>
 *    </div>
 *
 *   </div>
 *
 * NOTES: 
 * 
 *  - All data attribute hooks are mandatory
 *  - These classes are mandatory: accordion, accordion__body, hidden
 *  - All other classes are optional
 *  - The arrow is optional
 *  - data-accordion-expanded can be placed on the container to expand by default
 * 
 */


module.exports = function() {

  // for each accordion in the page
  $('[data-accordion]').each(function() {

    var $accordion    = $(this),
        $button       = $accordion.find('[data-accordion-button]'),
        $body         = $accordion.find('[data-accordion-body]'),
        $arrow        = $accordion.find('[data-accordion-arrow]'),
        expandedClass = 'accordion--expanded';
    
    // hide any elements flagged to be revealed only on expand
    $accordion.find('[data-accordion-reveal]').addClass('hidden');

    // expand any accordions that have been flagged
    if($accordion.is('[data-accordion-expanded]')) {
      expand($accordion, $body, $arrow, expandedClass, false);
    }

    // bind accordion click
    $button.click(function(e) {
      buttonClick(e, $accordion);
    });

  });

  /**
   * Triggered on click of accordion for expand/collapse of body
   * 
   * @param  {Object} e            event object
   * @param  {Object} $accordion   jQuery object of accorodion element    
   */
  function buttonClick(e, $accordion) {

    var $body         = $accordion.find('[data-accordion-body]'),
        $arrow        = $accordion.find('[data-accordion-arrow]'),
        expandedClass = 'accordion--expanded',
        animate       = $accordion.is('[data-accordion-animate]');

    e.preventDefault();

    // if accordion is collapsed
    if($body.hasClass('hidden')) {
      expand($accordion, $body, $arrow, expandedClass, animate);
    }
    // if accordion is expanded
    else {
      collapse($accordion, $body, $arrow, expandedClass, animate);
    }

  }

  /**
   * Expand Accordion
   * 
   * @param  {Object} $accordion    jQuery object of accordion element
   * @param  {Object} $body         jQuery object of accordion body (expanded section)
   * @param  {Object} $arrow        jQuery object of accordion arrow 
   * @param  {String} expandedClass Class to handle visual differences in expand/collapse states
   * @param  {Boolean} animate      To animate or not, that is the question
   */
  function expand($accordion, $body, $arrow, expandedClass, animate) {
   
    // height of accordion body once expanded
    var newHeight = getHeight($body);

    // set class to handle subtle style differences (borders)
    $accordion.addClass(expandedClass);

    // animates arrow to pointing down state
    $arrow.addClass('arrow--expand');

    // reveal any elements flagged as such
    $accordion.find('[data-accordion-reveal]').removeClass('hidden');
    
    // ensure first element of right row has margin for content below it
    $accordion
      .find('.accordion__row__right')
      .children()
      .first()
      .addClass('flush--top')
      .removeClass('flush');

    // body must be height 0 and visible before expanding 
    $body.height(0).removeClass('hidden');

    if(animate) {

      // animate expand to new height
      $body.animate({
        height: newHeight        
      }, 200, function() {
        $accordion.addClass(expandedClass);
        $body.css({height: 'auto'});
      });

    }
    else {
      $accordion.addClass(expandedClass);
      $body.height(newHeight);
      $body.css({height: 'auto'});
    }

  }

  /**
   * Collapse Accordion
   * 
   * @param  {Object} $accordion    jQuery object of accordion element
   * @param  {Object} $body         jQuery object of accordion body (expanded section)
   * @param  {Object} $arrow        jQuery object of accordion arrow 
   * @param  {String} expandedClass Class to handle visual differences in expand/collapse states
   * @param  {Boolean} animate      To animate or not, that is the question
   */
  function collapse($accordion, $body, $arrow, expandedClass, animate) {
   
    var expandedHeight = $body.height(),
        newHeight      = 0;

    $arrow.removeClass('arrow--expand'); 

    $accordion.find('[data-accordion-reveal]').addClass('hidden');

    $accordion
      .find('.accordion__row__right')
      .children()
      .first()
      .removeClass('flush--top')
      .addClass('flush');

    if(animate) {

      $body.animate({
        height: newHeight        
      }, 200, function() {

        // adjust borders
        $accordion.removeClass(expandedClass);

        // hide body and restore height to 0 for next expand
        $body.addClass('hidden').height(expandedHeight);        

      });

    }
    else {

      // adjust borders
      $accordion.removeClass(expandedClass);

      // collapse accordion body
      $body.height(newHeight);

    }

  }

  /**
   * Helper to get actual height of element 
   * 
   * @param  {Object} $element jQuery object of element 
   * @return {Number} height   height of element
   */
  function getHeight($element) {

    var height = $element.removeClass('hidden').height();

    $element.addClass('hidden');

    return height;

  }

};

