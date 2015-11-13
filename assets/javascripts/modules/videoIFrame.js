require('jquery');

/**
 * Allow links to update the src of an embedded youtube iFrame.
 * Typically to jump to various points in a video. The links themselves
 * are the full links to the point in the video in Youtube, in case JS is disabled,
 * and the event not caught.
 * usage example:
 * <a class="js-video-link" href="https://youtu.be/MlMnz0Omosk?start=395&autoplay=1">How to apply online</a>
 */
module.exports = function() {

  var $videoIframe = $('#video-iframe');
  if ($($videoIframe).length) {
    $('.js-video-link').click(function(e) {
      e.preventDefault();
      var iframeUrl = $(this).attr('href').replace(/.*\//, 'https://www.youtube.com/embed/');
      if (iframeUrl) {
        $videoIframe.attr('src', iframeUrl);
      }
    });
  }

};
