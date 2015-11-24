require('jquery');
var GOVUK = require('stageprompt');

/**
 * Embed a Youtube iframe in the page, replacing a div with the js-youtube-player class.
 * Attributes required for player parameters:
 *
 *  id: required to render the iframe, value does not make a difference.
 *  data-video-id: the id of the Youtube video to play.
 *  data-video-height: player height, defaults to 350.
 *  data-video-width: player width, defaults to 100%.
 *  data-ga-play-event: Google Analytics event to fire when video is played, should be in category:event:label format. omit if no GA event required.
 *
 * Usage example:
 *
 *   <div class='youtube-player-container'>
 *      <div id='youtube-player' class='js-youtube-player'
 *      data-video-id='MlMnz0Omosk' data-video-height='315' data-video-width='100%' data-ga-play-event='tax-return-help:Click:play'></div>
 *   </div>
 */

module.exports = function() {

  var YoutubePlayer = YoutubePlayer || {};
  YoutubePlayer.player = {};
  YoutubePlayer.started = false;

  $('.js-youtube-player').each(function() {
      YoutubePlayer.params = {
        elementId: $(this).attr('id'),
        videoId: $(this).data('video-id') || '',
        height: $(this).data('video-height') || '350',
        width: $(this).data('video-width') || '100%',
        gaEvent: $(this).data('ga-play-event') || ''
      };

      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  );

  /**
   * Links decorated with js-youtube-skip class will make the player seek ahead to the time given and start.
   * Usage example:
   * <a class='js-youtube-skip' href='#' data-skip-time='120'>Two minutes later</a>
   */
  $('.js-youtube-skip').click(function(event) {
    event.preventDefault();
    var time = $(this).data('skip-time');
    YoutubePlayer.started = true;
    YoutubePlayer.player.seekTo(time);
    YoutubePlayer.player.playVideo();
  });

  /**
   * Creates player on page. Needs to be set on the root object
   */
  window.onYouTubeIframeAPIReady = function() {
    YoutubePlayer.player = new YT.Player(YoutubePlayer.params.elementId, {
      width: YoutubePlayer.params.width,
      height: YoutubePlayer.params.height,
      videoId: YoutubePlayer.params.videoId,
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  };

  /**
   * Fires Google Analytics event via GDS Stageprompt library.
   * Event values provided by data-ga-play-event attribute on player containing element.
   * @param event
   */
  function onPlayerStateChange(event) {
    if (!YoutubePlayer.started && event.data === YT.PlayerState.PLAYING) {
      YoutubePlayer.started = true;
      var gaEventFields = YoutubePlayer.params.gaEvent.split(':');
      if (gaEventFields.length === 3) {
        GOVUK.performance.sendGoogleAnalyticsEvent(gaEventFields[0], gaEventFields[1], gaEventFields[2]);
      }
    }
  }

};