
module.exports = function() {

  // for each accordion in the page
  $('[data-accordion]').each(function() {

    var $accordion = $(this),
        $button    = $accordion.find('[data-accordion-button]');

    // expand any accordions that have been flagged
    if($accordion.is('[data-accordion-expanded]')) {
      expand($accordion, false);
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
        expandedClass = 'accordion--expanded';
    
    e.preventDefault();

    // if accordion is collapsed
    if($body.height() === 0) {
      expand($accordion, $body, $arrow, expandedClass, true);
    }
    // if accordon is expanded
    else {
      collapse($accordion, $body, $arrow, expandedClass);
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
    var newHeight = $body.get(0).scrollHeight;

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
      .toggleClass('flush flush--top');

    if(animate) {

      // animate expand to new height
      $body.animate({
        height: newHeight        
      }, 200, function() {
        $accordion.addClass(expandedClass);
      });

    }
    else {
      $body.height(newHeight);      
    }

  }

  /**
   * Collapse Accordion
   * 
   * @param  {Object} $accordion    jQuery object of accordion element
   * @param  {Object} $body         jQuery object of accordion body (expanded section)
   * @param  {Object} $arrow        jQuery object of accordion arrow 
   * @param  {String} expandedClass Class to handle visual differences in expand/collapse states
   */
  function collapse($accordion, $body, $arrow, expandedClass) {

    var $body     = $accordion.find('[data-accordion-body]'),
        $arrow    = $accordion.find('[data-accordion-arrow]'),
        expanded  = 'accordion--expanded',
        newHeight = 0;

    $arrow.removeClass('arrow--expand'); 

    $accordion.find('[data-accordion-reveal]').addClass('hidden');

    $accordion
      .find('.accordion__row__right')
      .children()
      .first()
      .toggleClass('flush flush--top');

    $body.animate({
      height: newHeight        
    }, 200, function() {
      $accordion.removeClass(expandedClass);
    });

  }

}
