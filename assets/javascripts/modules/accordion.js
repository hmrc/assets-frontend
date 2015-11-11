
module.exports = function() {

  $('[data-accordion]').each(function() {

    var $this    = $(this),
        $button  = $this.find('[data-accordion-button]'),
        $body    = $this.find('[data-accordion-body]'),
        $arrow   = $this.find('[data-accordion-arrow]'),
        expanded = 'accordion--expanded';

    $button.click(function(e) {
      var newHeight = 0;

      e.preventDefault();      

      if($body.height() === 0) {
        newHeight = $body.get(0).scrollHeight;
        $this.addClass(expanded);
      }

      $body.animate({
        height: newHeight        
      }, 200, function() {

        if(newHeight > 0) {
          $this.addClass(expanded);
        } else {
          $this.removeClass(expanded);
        }

        $arrow.toggleClass('arrow--right arrow--down');
      });

    });

  });

  function buttonClick(e) {

  }

}
