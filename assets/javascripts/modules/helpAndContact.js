require('jquery');

module.exports = function() {

  var contactHmrc = '/contact-hmrc',
    baseUrlRegex = new RegExp(contactHmrc + '.*'),
    subpathRegex = new RegExp('.*' + contactHmrc + '/'),
    onHelpHomeRegex = new RegExp('.*' + contactHmrc + '/?$'),

    supportsHistoryApi = function() {
      return !!(window.history && history.pushState);
    },

    onHelpPage = function() {
      return window.location.pathname.indexOf(contactHmrc) > -1;
    },

    isHelpHome = function(url) {
      return onHelpHomeRegex.test(url);
    },

    addMobileViewClass = function() {
      $('.help__wrapper').addClass('help-item--selected');
    },

    removeMobileViewClass = function() {
      $('.help__wrapper').removeClass('help-item--selected');
    },

    getBaseUrl = function() {
      return window.location.href.replace(baseUrlRegex, '');
    },

    getSubpage = function(url) {
      if (isHelpHome(url)) {
        return "";
      } else {
        var helpSubPath = url.replace(subpathRegex, '');
        if (helpSubPath.charAt(helpSubPath.length - 1) === '/') {
          return helpSubPath.substring(0, helpSubPath.length - 2);
        } else {
          return helpSubPath;
        }
      }
    },

    applyDetailsPolyfill = function() {
      window.dispatchEvent(new Event('reapplyDetails'));
    },

    updateSelectedMenuItem = function(selected) {
      $('.side-nav li').removeClass('side-nav__list--selected');
      $('.side-nav li a').trigger('blur'); // lose yellow highlight on focused element
      if (selected) {
        var selectedLi = $('.side-nav a[href*=' + selected + ']').closest('li');
        selectedLi.addClass('side-nav__list--selected');
      }
    },

    updateHistory = function(selected) {
      var newUrl = getBaseUrl() + contactHmrc + '/' + selected;
      history.pushState(null, null, newUrl);
    },

    updateHelpContent = function(subpage) {
      var $contentPane = $('.help-content');
      if (subpage) {
        var ajaxUrl = '/business-account/contact-hmrc/partial/' + subpage;
        $contentPane.load(ajaxUrl, function(response, status, xhr) {
          if (status === 'error') {
            location.reload();
          } else {
            updateSelectedMenuItem(subpage);
            addMobileViewClass();
            initYoutubeLinks();
            applyDetailsPolyfill();
          }
        });
      } else {
        $contentPane.empty();
        updateSelectedMenuItem('');
        removeMobileViewClass();
      }
    },

    initYoutubeLinks = function() {
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

      // 'Jump links' to timed points in embedded YouTube video replace the iframe contents
      initYoutubeLinks();

      // Allow Ajax help menu sub page switching
      if (supportsHistoryApi()) {

        $('.side-nav__link').click(function(event) {
          event.preventDefault();
          var subpage = getSubpage($(this).attr('href'));
          updateHelpContent(subpage);
          updateHistory(subpage);
        });

        window.addEventListener('popstate', function(event) {
          if (onHelpPage()) {
            var subpage = getSubpage(event.target.location.pathname);
            updateHelpContent(subpage);
          }
        });
      }
    };

  return {
    init: init
  };
};
