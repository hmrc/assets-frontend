module.exports = function() {

  $('[data-responsive-inline-details]').each(function() {
    var $detailsHolder,
    $detailsTargets,
    $detailsButton;

    $detailsHolder = $(this);
    $detailsButton = $detailsHolder.find('.inline-details-toggle');
    $detailsTargets = $('.' + $detailsHolder.data('responsive-inline-details'));

    $detailsButton.on('click', function(e) {
      detailsButtonClick(e);
    });

    function detailsButtonClick(e) {
      e.preventDefault();

      var isCursorActive = $detailsButton.css('cursor') === 'pointer';

      if (!isCursorActive) {
        return;
      }

      $detailsHolder.toggleClass('hide-inline-details-targets');
    }

  });

};
