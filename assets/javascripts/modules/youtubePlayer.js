/* eslint-env jquery */
/* global YT */

require('jquery')

/**
 * Embed a Youtube iframe in the page, replacing a div with the js-youtube-player class.
 * Attributes required for player parameters:
 *
 *  id: required to render the iframe, value does not make a difference.
 *  data-video-id: the id of the Youtube video to play.
 *  data-ga-play-event: Google Analytics event to fire when video is played, should be in category:event:label format. omit if no GA event required.
 *
 *  Multiple players may be rendered on a page.
 *
 * Usage example:

    <div class='youtube-player-container'>
       <div id='tax-help' class='js-youtube-player' data-video-id='MlMnz0Omosk' data-ga-play-event='tax-return-help:Click:play'></div>
    </div>

 * Links decorated with js-youtube-skip class will make the player seek ahead to the time given and start.
 * data-player-id is required to identify which player is to be controlled.
 * Usage example:

  <a class='js-youtube-skip' href='#' data-player-id="tax-help" data-skip-time='120'>Two minutes later</a>

 */

var $youtubePlayerElems
var $playerChangeLinks
var YoutubePlayers

/**
 * Called by Youtube script to create players on page. Needs to be set on the root object
 */
window.onYouTubeIframeAPIReady = function () {
  $youtubePlayerElems.each(function () {
    var elementId = $(this).attr('id')

    YoutubePlayers[elementId].player = new YT.Player(
      elementId, {
        videoId: YoutubePlayers[elementId].params.videoId,
        events: {
          'onStateChange': onPlayerStateChange
        }
      })
  })
}

/**
 * Event values provided by data-ga-play-event attribute on player containing element.
 * @param event
 */
var onPlayerStateChange = function (event) {
  var playerId = event.target.getIframe().id
  var youtubePlayer = YoutubePlayers[playerId]

  if (youtubePlayer && !youtubePlayer.started && event.data === YT.PlayerState.PLAYING) {
    youtubePlayer.started = true
  }
}

/**
 * Find all players on page and initialise them from the data attribute values
 */
var initialisePlayers = function () {
  var elementId
  var player

  YoutubePlayers = {}

  $youtubePlayerElems.each(function (index, elem) {
    elementId = $(this).attr('id')
    player = YoutubePlayers[elementId] = {}

    player.started = false
    player.params = {
      elementId: elementId,
      videoId: $(this).data('video-id') || '',
      gaEvent: $(this).data('ga-play-event') || ''
    }
  })
}

/**
 * Brings in JS API script from Youtube.
 */
var addYouTubeAPIScript = function () {
  var tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  var firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
}

/**
 * handle click events for jump links
 */
var addListeners = function () {
  $playerChangeLinks.click(function (event) {
    event.preventDefault()
    var time = $(this).data('skip-time')
    var videoId = $(this).data('video-id')
    var playerId = $(this).data('player-id')
    var youtubePlayer = YoutubePlayers[playerId]
    youtubePlayer.started = true
    if (youtubePlayer.player) {
      if (videoId) {
        youtubePlayer.player.loadVideoById({'videoId': videoId})
      }
      if (time) {
        youtubePlayer.player.seekTo(time)
      }
      youtubePlayer.player.playVideo()
    }
  })
}

/**
 * if players present on page, initialise and bring in API script
 */
var init = function () {
  $youtubePlayerElems = $('.js-youtube-player')
  $playerChangeLinks = $('.js-youtube-link')

  if ($youtubePlayerElems.length) {
    initialisePlayers()
    addYouTubeAPIScript()
    addListeners()
  }
}

module.exports = function () {
  return {
    init: init
  }
}
