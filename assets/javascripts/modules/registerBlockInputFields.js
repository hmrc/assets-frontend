GOVUK.registerBlockInputFields = function () {
      var $selectableInputs = $( "label[class*=block-label]" ).find( 'input[type=radio], input[type=checkbox]' );
      
      $selectableInputs.each( function() {
            $( this ).change( function() {
                  if( $( this ).attr( 'type' ) == 'radio' ) {
                        $( this ).closest( 'label' ).siblings( 'label' ).removeClass( 'selected' );
                  }
      	      $( this ).closest( 'label' ).toggleClass( 'selected', $( this ).prop( "checked" ));
            });
            $( this ).on( 'focus', function() {
            	$( this ).closest( 'label' ).addClass( 'add-focus' );
            });
            $( this ).on( 'focusout', function(){
            	$( this ).closest( 'label' ).removeClass( 'add-focus' );
            });
      });
};