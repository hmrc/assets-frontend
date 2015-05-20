module.exports = function(el) {
  //Had to grab the width & vertical position off the original
  //to stop it popping to the windows width when position was changed to fixed
  //ADD THE DATA-FOCUSES TAG TO YOUR ELEMENT WITH ITS OWN ID IN IT
  var bannerId = $('[data-focuses="attorneyBanner"]').attr('id'),
      idOfBanner,
      orgElementPos,
      orgElementTop,
      widthOrgElement;

  if (!bannerId) {
    return;
  }

  idOfBanner = $('#' + bannerId);
  orgElementPos = idOfBanner.offset();
  orgElementTop = orgElementPos.top;
  widthOrgElement = idOfBanner.width();

  //Banner pops out the DOM so this makes sure the content below doesn't shift up
  //You need a containing element around the floating element!
  idOfBanner.parent().css('height', idOfBanner.parent().height());

  function stickIt() {
    if ($(window).scrollTop() >= (orgElementTop)) {
      // scrolled past the original position; change the position to fixed.
      idOfBanner.css('position', 'fixed').css('width', widthOrgElement).css('top', '0px');
    } else {
      //Returns the banner to the DOM once we scroll up
      idOfBanner.css('position', 'relative');
    }
  }

  //Run the function to reposition the banner
  setInterval(stickIt, 100);

}
