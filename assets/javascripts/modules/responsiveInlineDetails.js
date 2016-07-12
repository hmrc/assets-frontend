module.exports = function() {

  $('[data-responsive-inline-details]').each(function(index, elemnt) {
    var $detailsTargets,
    $detailsButton;

    $detailsHolder = $(this);
    $detailsButton = $detailsHolder.find('.inline-details-toggle');

    $detailsButton.on('click', detailsButtonClick);

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
