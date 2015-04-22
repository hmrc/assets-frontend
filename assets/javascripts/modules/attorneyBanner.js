module.exports = function(el) {
  //Had to grab the width & vertical position off the original
  //to stop it popping to the windows width when position was changed to fixed
  var orgElementPos = $('.attorneyBanner').offset(),
  orgElementTop = orgElementPos.top,
  widthOrgElement = $('.attorneyBanner').width();

  //Banner pops out the DOM so this makes sure the content below doesn't shift up
  $('#heightHolder').css('height', $('#heightHolder').height());

  //Run the function to reposition the banner
  setInterval(stickIt, 100);

  function stickIt() {
    if ($(window).scrollTop() >= (orgElementTop)) {
      // scrolled past the original position; change the position to fixed.
      $('.attorneyBanner').css('position', 'fixed').css('width', widthOrgElement).css('top', '0px');
    } else {
      //Returns the banner to the DOM once we scroll up
      $('.attorneyBanner').css('position', 'relative');
    }
  }
}
