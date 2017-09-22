/* eslint-env jquery */

/*
* Basic functionality
*
* 1. if the viewport is small, show the extra menu link (smallerHome)
* 2. if smallerHome is triggered, open the main nav (mainNav)
* 3. if mainNav is open, add `is-open` to the nav container (navAccount)
* 4. if a menu link (accountLink) is triggered, close sub-nav (subNav)
* 5. if a menu link with sub-nav (accountLinkMore) is triggered, open it
* 6. if a sub-nav is open, add `is-open` to mainNav
*
* Extra credit
*
* 1. if smallerHome is open, close it when triggered
* 2. if a menu link with sub-nav (accountMore) is open, close it when triggered
*
*/

  var navAccount = $('.account-menu')
  var linkMenuMore = $('.account-menu__link--more')
  var menuSub = $('.subnav')
  var smallerHome = $('.account-menu__link--menu')
  var mainNav = $('.account-menu__main')
  var viewportWidth = $(window).width()
  var backLink = $('.account-menu__link--back a')

  module.exports = function () {
    menuSub.attr({
      'aria-hidden': 'true',
      'tabindex': -1
    })

    linkMenuMore.attr({
      'aria-controls': $(this).hash,
      'aria-expanded': 'false'
    })

    linkMenuMore.on({
      click: function (e) {
        if (isSmall()) {
          toggleBackLink()
          toggleOthers($(this))

          $(this).toggleClass('account-menu__link--more-expanded')
        }

        $(this).attr('aria-expanded', function (index, attr) {
          return attr === 'true' ? 'false' : 'true'
        })

        $(this.hash)
        .toggleClass('js-hidden')
        .attr('aria-hidden', function (index, attr) {
          return attr === 'true' ? 'false' : 'true'
        })
        .find('a:first')
        .focus()

        e.preventDefault()
      },

      focusout: function () {
        if (!isSmall) {
          $(this.hash).data('subMenuTimer', setTimeout(function () {
            $(this.hash)
        .addClass('js-hidden')
        .attr({
          'aria-hidden': 'true',
          'aria-expanded': 'false'
        })
          }.bind(this), 0))
        }
      },

      focusin: function () {
        if (!isSmall) {
          clearTimeout($(this.hash).data('subMenuTimer'))
        }
      }
    })

    backLink.on('click', function (e) {
      toggleBackLink()

      mainNav.children().not(backLink).removeClass('js-hidden')
      linkMenuMore.removeClass('account-menu__link--more-expanded')

      menuSub.addClass('js-hidden')
      .attr({
        'aria-hidden': 'true',
        'aria-expanded': 'false'
      })

      e.preventDefault()
    })

    menuSub.on({
      focusout: function () {
        if (!isSmall()) {
          $(this).data('subMenuTimer', setTimeout(function () {
            $(this)
        .addClass('js-hidden')
        .attr({
          'aria-hidden': 'true',
          'aria-expanded': 'false'
        })
          }.bind(this), 0))
        }
      },

      focusin: function () {
        clearTimeout($(this).data('subMenuTimer'))
      }
    })

    smallerHome.on('click', function (e) {
      if (isSmall()) {
        if (mainNav.hasClass('is-open')) {
          smallerHome.attr('aria-expanded', 'false')
        .removeClass('account-home--account--is-open')
          mainNav.addClass('js-hidden')
        .removeClass('is-open')
        .attr('aria-expanded', 'false')
        } else {
          smallerHome.attr('aria-expanded', 'true')
        .addClass('account-home--account--is-open')
          mainNav.removeClass('js-hidden')
        .addClass('is-open')
        .attr('aria-expanded', 'true')
        }

        e.preventDefault()
      }
    })

    $(window).on('load resize', function () {
      viewportWidth = $(window).width()

      if (isSmall()) {
        if (!navAccount.hasClass('is-smaller')) {
          mainNav.addClass('js-hidden')
        }

        navAccount.addClass('is-smaller')
        smallerHome.attr('aria-hidden', 'false')
      .removeClass('js-hidden')
      } else {
        mainNav.removeClass('js-hidden')
        navAccount.removeClass('is-smaller')
        smallerHome.attr('aria-hidden', 'true')
      .addClass('js-hidden')
      }
    })

    function toggleBackLink () {
      backLink.parent().attr('aria-hidden', 'true').toggleClass('hidden')
    }

    function toggleOthers (e) {
      e.parent().siblings().not(backLink.parent()).toggleClass('js-hidden')
    }

    function isSmall () {
      return (viewportWidth <= 768)
    }
  }
