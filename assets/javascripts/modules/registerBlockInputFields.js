GOVUK.registerBlockInputFields = function ( selector ) {
      var $selectableInputs = $( selector ).find( 'input[type=radio], input[type=checkbox]' );
      
      $selectableInputs.each( function() {
            $( this ).change( function() {
                  if( $( this ).attr( 'type' ) == 'radio' ) {
                        $( this ).closest( 'label' ).siblings( 'label' ).removeClass( 'selected' );
                  }
      	      $( this ).closest( 'label' ).toggleClass( 'selected', $( this ).prop( "checked" ));
            });
            $( this ).on( 'focus', function() {
            	$( this ).closest( 'label' ).addClass( 'in-focus' );
            });
            $( this ).on( 'focusout', function(){
            	$( this ).closest( 'label' ).removeClass( 'in-focus' );
            });
      });
};