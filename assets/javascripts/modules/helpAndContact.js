require('jquery');

module.exports = function() {

  var contactHmrc = '/contact-hmrc',
    baseUrlRegex = new RegExp(contactHmrc + '.*'),

  updateSelectedMenuItem = function(selected) {
    $('.menu__list li').removeClass('menu__list-item--selected');
    var selectedLi = $('.menu__list a[href*='+selected+']').closest('li');
    selectedLi.addClass('menu__list-item--selected');
  },

  updateHistory = function(selected) {
    var baseUrl = window.location.href.replace(baseUrlRegex, '');
    var newUrl = baseUrl + contactHmrc + '/' + selected;
    history.pushState(null, null, newUrl);
  },

  updateHelpContent = function(partial) {
    var ajaxUrl = '/account/contact-hmrc/partial/'+partial;
    var $contentPane = $('.help-content');
    $contentPane.load(ajaxUrl, function(response, status, xhr) {
      updateSelectedMenuItem(partial);
      initYoutubeLinks();
      applyDetailsPolyfill();
    });
  },

  applyDetailsPolyfill = function(){
    window.dispatchEvent(new Event('reapplyDetails'));
  },

  supportsHistoryApi = function() {
    return !!(window.history && history.pushState);
  },

  initYoutubeLinks = function() {

    // 'Jump links' to timed points in embedded YouTube video replace the iframe contents
    var $videoIframe = $('#video-iframe');
    if ($($videoIframe).length) {
      $('.youtube-link').click(function(e) {
        e.preventDefault();
        var iframeUrl = $(this).attr('href').replace(/.*\//, 'https://www.youtube.com/embed/');
        if (iframeUrl) {
          $videoIframe.attr('src', iframeUrl);
        }
      });
    }
  },

  init = function() {

    // Allow Ajax help menu sub page switching
    if (supportsHistoryApi()) {

      $('.help-menu-link').click(function(e) {
        e.preventDefault();
        var partial = $(this).attr('href').replace(/.*\//, '');
        updateHelpContent(partial);
        updateHistory(partial);
      });

      window.addEventListener('popstate', function (e) {
        if (window.location.pathname.indexOf(contactHmrc) > -1) {
          var partial = e.target.location.pathname.replace(/.*\//, '');
          updateHelpContent(partial);
        }
      });
    }

    initYoutubeLinks();
  };

  return {
    init: init
  };
};
