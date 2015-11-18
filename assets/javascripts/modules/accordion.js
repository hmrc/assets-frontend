
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
    // if accordon is expanded
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

    $body.height(0).removeClass('hidden');

    if(animate) {

      // animate expand to new height
      $body.animate({
        height: newHeight        
      }, 200, function() {
        $accordion.addClass(expandedClass);
      });

    }
    else {
      $accordion.addClass(expandedClass);
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
        $accordion.removeClass(expandedClass);
        $body.addClass('hidden').height(expandedHeight);
      });

    }
    else {
      $accordion.removeClass(expandedClass);
      $body.height(newHeight);
    }

  }

  function getHeight($element) {

    var height = $element.removeClass('hidden').height();

    $element.addClass('hidden');

    return height;

  }

};
