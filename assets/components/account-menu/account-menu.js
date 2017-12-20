/* eslint-env jquery */

/*
* Basic functionality
*
* 1. if the viewport is small, show the extra menu link (showNavLinkMobile)
* 2. if showNavLinkMobile is triggered, open the main nav (subNav)
* 3. if menusSub is open, add `is-open` to the nav container (nav)
* 4. if a menu link (accountLink) is triggered, close sub-nav (subNav)
* 5. if a menu link with sub-nav (showSubnavLink) is triggered, open it
* 6. if a sub-nav is open, add `is-open` to nav
*
* 1. if showNavLinkMobile is open, close it when triggered
* 2. if a menu link with sub-nav (showSubnavLink) is open, close it when triggered
**/

var nav = $('.account-menu')
var mainNav = $('.account-menu__main')
var subNav = $('.subnav')
var showSubnavLink = $('.account-menu__link--more')
var showNavLinkMobile = $('.account-menu__link--menu')
var viewportWidth = $(window).width()
var backLink = $('.account-menu__link--back a')

module.exports = function () {
  subNav.attr({
    'aria-hidden': 'true',
    'tabindex': -1
  })

  showSubnavLink.attr({
    'aria-controls': $(this).hash,
    'aria-expanded': 'false'
  })

  showSubnavLink.on({
    click: function (e) {
      if (isSmall()) {
        // TODO: remove redundant check - showSubnavLink appears only when subnav is not expanded
        if (!$(this).hasClass('account-menu__link--more-expanded')) {
          hideMainNavMobile($(this))
          showSubnavMobile($(this))
        }
      } else {
        if ($(this).hasClass('account-menu__link--more-expanded')) {
          hideSubnavDesktop()
        } else {
          showSubnavDesktop()
        }
      }

      e.preventDefault()
      e.stopPropagation()
    },

    focusout: function () {
      if (!isSmall()) {
        $(this.hash).data('subMenuTimer', setTimeout(0))
      }
    },

    focusin: function () {
      if (!isSmall()) {
        clearTimeout($(this.hash).data('subMenuTimer'))
      }
    }
  })

  backLink.on('click', function (e) {
    // TODO: remove redundant check - backlink appears only when subnav is open
    if (mainNav.hasClass('subnav-is-open')) {
      hideSubnavMobile()
      showMainNavMobile()
    }

    e.preventDefault()
  })

  subNav.on({
    focusout: function () {
      if (!isSmall()) {
        $(this).data('subMenuTimer', setTimeout(function () {
          hideSubnavDesktop()
        }, 0))
      }
    },

    focusin: function () {
      clearTimeout($(this).data('subMenuTimer'))
    }
  })

  showNavLinkMobile.on('click', function (e) {
    if (isSmall()) {
      if (mainNav.hasClass('subnav-is-open') || mainNav.hasClass('main-nav-is-open')) {
        hideSubnavMobile()
        hideMainNavMobile($(this))
      } else {
        showMainNavMobile()
      }

      e.preventDefault()
    }
  })

  $(window).on('load resize', function () {
    viewportWidth = $(window).width()

    if (isSmall()) {
      nav.addClass('is-smaller')
      showNavLinkMobile
        .attr('aria-hidden', 'false')
        .removeClass('js-hidden')
      hideSubnavMobile()
      hideMainNavMobile(showNavLinkMobile)
    } else {
      nav.removeClass('is-smaller')
      showNavLinkMobile
        .attr('aria-hidden', 'true')
        .addClass('js-hidden')
      mainNav
        .removeClass('main-nav-is-open')
        .removeClass('js-hidden')
      subNav.removeClass('js-hidden')
    }
  })

  function showMainNavMobile () {
    // TODO: shall we add main-nav-is-open to `nav`????
    mainNav
      .addClass('main-nav-is-open')
      .removeClass('js-hidden')
      .attr('aria-expanded', 'true')

    showNavLinkMobile
      .attr('aria-expanded', 'true')
      .addClass('account-home--account--is-open')
  }

  function hideMainNavMobile (e) {
    mainNav
      .removeClass('main-nav-is-open')
      .attr('aria-expanded', 'false')

    if (e.hasClass('account-menu__link--menu')) {
      mainNav
        .removeClass('subnav-is-open')
        .addClass('js-hidden')

      showNavLinkMobile
        .attr('aria-expanded', 'false')
        .removeClass('account-home--account--is-open')
    } else if (e.hasClass('account-menu__link--more')) {
      mainNav
        .addClass('subnav-is-open')
    }
  }

  function showSubnavMobile (e) {
    nav
      .addClass('subnav-is-open')

    mainNav
      .removeClass('main-nav-is-open')
      .addClass('subnav-is-open')

    subNav
      .addClass('subnav-reveal')
      .attr({
        'aria-hidden': 'false',
        'aria-expanded': 'true'
      })

    showSubnavLink
      .addClass('account-menu__link--more-expanded')
      .attr({
        'aria-hidden': 'false',
        'aria-expanded': 'true'
      })

    backLink.parent()
      .attr('aria-hidden', 'false')
      .removeClass('hidden')

    e.closest('li').addClass('active-subnav-parent')

    subNav.removeClass('js-hidden')

    e.parent().siblings().not(backLink.parent()).addClass('hidden')
  }

  function hideSubnavMobile () {
    nav
      .removeClass('subnav-is-open')

    mainNav
      .addClass('main-nav-is-open')
      .removeClass('subnav-is-open')

    subNav
      .removeClass('subnav-reveal')
      .attr({
        'aria-hidden': 'true',
        'aria-expanded': 'false'
      })

    showSubnavLink
      .removeClass('account-menu__link--more-expanded')
      .attr({
        'aria-hidden': 'true',
        'aria-expanded': 'false'
      })

    backLink.parent()
      .attr('aria-hidden', 'true')
      .addClass('hidden')

    showSubnavLink.closest('li').removeClass('active-subnav-parent')

    subNav.addClass('js-hidden')

    backLink.parent().siblings().not(backLink.parent()).removeClass('hidden')
    // TODO: change to
    // mainNav.children().not(backLink).removeClass('js-hidden')
  }

  function showSubnavDesktop () {
    nav
      .addClass('subnav-is-open')

    mainNav
      .addClass('subnav-is-open')

    subNav
      .addClass('subnav-reveal')
      .attr({
        'aria-hidden': 'false',
        'aria-expanded': 'true'
      })
      .focus()

    showSubnavLink
      .addClass('account-menu__link--more-expanded')
      .attr({
        'aria-hidden': 'false',
        'aria-expanded': 'true'
      })
  }

  function hideSubnavDesktop () {
    nav
      .removeClass('main-nav-is-open')
      .removeClass('subnav-is-open')

    mainNav
      .removeClass('subnav-is-open')

    subNav
      .removeClass('subnav-reveal')
      .attr({
        'aria-hidden': 'true',
        'aria-expanded': 'false'
      })

    showSubnavLink
      .removeClass('account-menu__link--more-expanded')
      .attr({
        'aria-hidden': 'true',
        'aria-expanded': 'false'
      })
  }

  function isSmall () {
    return (viewportWidth <= 768)
  }
}
