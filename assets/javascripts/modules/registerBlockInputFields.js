GOVUK.registerBlockInputFields = function ( selector ) {
      var $blockInputs = $( selector ).find('input');
      $blockInputs.on('change', function(){
      	$(this).closest('label').toggleClass('selected', $(this).prop("checked"));
      });
      $blockInputs.on('focus', function(){
      	$(this).closest('label').addClass('focused');
      });
      $blockInputs.on('focusout', function(){
      	$(this).closest('label').removeClass('focused');
      });
};