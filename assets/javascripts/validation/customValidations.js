require('jquery');

module.exports = function () {

  //TODO this nino validator can removed and placed in the html input as attribute pattern="^[A-Za-z]{2}\d{6}[A-Za-z]$"
  jQuery.validator.addMethod('nino', function (value, element) {
    return /^[A-Za-z]{2}\d{6}[A-Za-z]$/.test(value);
  });

  // Check if value of input is correctly contained in suggestion data
  jQuery.validator.addMethod('suggestion', function (value, element) {
    var suggestions = window[element.getAttribute('data-suggestions')];
    var validSuggestion = false;

    $(suggestions).each(function (index, suggestion) {
        if (value.toLowerCase() === suggestion.title.toLowerCase() || value === suggestion.value) {
          validSuggestion = true;
          return false;
        }
    });

    return validSuggestion;
  });

  // Use the pattern attribute on your input with a valid regex
  jQuery.validator.addMethod('pattern', function (value, element, pattern) {
    var dataAttributeFlag = element.getAttribute('data-pattern-flags');
    var flag = dataAttributeFlag || '';
    var regex = new RegExp(pattern, flag);

    return regex.test(value);
  });
  
  /*
 * SOURCE: jquery-validation/require_from_group.js at master · jzaefferer/jquery-validation
 *         https://github.com/jzaefferer/jquery-validation/blob/master/src/additional/require_from_group.js 
 *
 * Adds method to validate that x number of inputs from group (by selector) are filled
 *
 * Note:
 * 
 * ..PlayUI _dataAttributes -> s"""data-rule-require_from_group=[3,\".selector\"] """ 
 * ..html attribute -> data-rule-require_from_group=[3,&quot;.dob&quot;] 
 * 
 * Where:
 * - options[0]: number of fields that must be filled in the group
 * - options[1]: CSS selector that defines the group of conditionally required fields
 */
  jQuery.validator.addMethod( "require_from_group", function( value, element, options ) {
    var $fields = $( options[ 1 ], element.form ),
      $fieldsFirst = $fields.eq( 0 ),
      validator = $fieldsFirst.data( "valid_req_grp" ) ? $fieldsFirst.data( "valid_req_grp" ) : $.extend( {}, this ),
      isValid = $fields.filter( function() {
          return validator.elementValue( this );
        } ).length >= options[ 0 ];

    // Store the cloned validator for future validation
    $fieldsFirst.data( "valid_req_grp", validator );

    // If element isn't being validated, run each require_from_group field's validation rules
    if ( !$( element ).data( "being_validated" ) ) {
      $fields.data( "being_validated", true );
      $fields.each( function() {
        validator.element( this );
      } );
      $fields.data( "being_validated", false );
    }
    return isValid;
  });
};
