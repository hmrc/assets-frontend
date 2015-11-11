
module.exports = function() {

  $('[data-accordion]').each(function() {

    var $this  = $(this),
        $button = $this.find('[data-accordion-button]'),
        $body  = $this.find('[data-accordion-body]'),
        $arrow = $this.find('[data-accordion-arrow]');

    $button.click(function(e) {
      e.preventDefault();      

      var newHeight = 0;

      if($body.hasClass('accordion--expanded')) {
        console.log("should be contracting");
        newHeight = 0;
      }
      else {
        console.log("should be expanding");
        newHeight = $body.get(0).scrollHeight;
      }

      $body.animate({
        height: newHeight        
      }, 200, function() {
        $body.toggleClass('accordion--expanded');
        $arrow.toggleClass('arrow--right arrow--down');
      });

    });

  });

}
