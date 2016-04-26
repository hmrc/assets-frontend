/**
 
  Dynamic Google Analytics (GA) Tags
 
  Allows the label (third parameter) of a GA event to be dynamically set based on a radio button selection.
  
  Example:
    <form data-journey-dynamic-radios>
			
			<fieldset>
          <legend class="visuallyhidden">Choose approve or reject application</legend>
          <label class="block-label--stacked selected">
              <input type="radio" id="approve-app" name="action" value="APPROVE" data-journey-val="Approved">Approve
          </label>
          <label class="block-label--stacked">
              <input type="radio" id="reject-app" name="action" value="REJECT" data-journey-val="Rejected" checked>Reject
          </label>
      </fieldset>

      <input id="submit" type="submit" class="button" value="Submit" data-journey-click="gate-keeper:Click:Approved" data-journey-target>

    </form>
 
	Note: it is up to server-side template to populate the correct initial GA event string

 */


module.exports = function() {

	$('[data-journey-dynamic-radios]').each(function() {

		var $container = $(this),
        $radioBtns = $container.find('input[type=radio]'),
        $target    = $('#' + $container.attr('data-journey-target'));

    $radioBtns.on("click", function(e) {
      onRadioBtnClick(e, $container);
    });

	});

};


/**
 * Click handler for radio buttons
 */
var onRadioBtnClick = function(e, $container) {

	var $radioBtn    = $(e.currentTarget),
      $target      = $container.find('[data-journey-target]'),
      journeyAttr  = $target.attr('data-journey-click'),
      journeyParts = journeyAttr.split(":");

	if(journeyParts.length === 3) {
		
		// replace label part of GA event string with radio button's specified value
		journeyParts[2] = $radioBtn.attr('data-journey-val');

		// update GA event string on data attribute
		$target.attr('data-journey-click', journeyParts.join(":"));

	}

};
