/* eslint-env jasmine, jquery */
/* global loadFixtures */

require('jquery')

var govuk = require('../../javascripts/modules/GOVUK_helpers.js')

describe('Given I have a notice banner on the page', function () {
  var $jsHiddenClass = 'js-hidden'
  var fixtureFile = 'notice-banner-fixture.html'
  var cookieDataValue = 'suppress_for_all_services'
  var cookieName = 'mdtpurr'
  var noticeBannerJavascript
  var $cookieData
  var $noticeBanner
  var $closeBannerLink

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/test/specs/fixtures/'
    loadFixtures(fixtureFile)

    noticeBannerJavascript = require('../../javascripts/modules/noticeBanner.js')
  })

  afterEach(function () {
    $cookieData = govuk.setCookie(cookieName, '', -1)
  })

  describe('loading the page with cookie set and not clicking the close link', function () {
    beforeEach(function () {
      loadFixtures(fixtureFile)
      $noticeBanner = $('#notice-banner')
      govuk.setCookie(cookieName, cookieDataValue, 999)
      $cookieData = govuk.getCookie(cookieName)
      noticeBannerJavascript()
    })

    it('the cookie should have a value', function () {
      expect($cookieData).toBe(cookieDataValue)
    })

    it('the banner should not be visible', function () {
      expect($noticeBanner).toHaveClass($jsHiddenClass)
    })
  })

  describe('loading the page without the cookie set and not clicking the close link', function () {
    beforeEach(function () {
      loadFixtures(fixtureFile)
      noticeBannerJavascript()
      $noticeBanner = $('#notice-banner')
    })

    it('the cookie should be null', function () {
      $cookieData = govuk.getCookie(cookieName)
      expect($cookieData).toBe(null)
    })

    it('the banner should be visible', function () {
      expect($noticeBanner).not.toHaveClass($jsHiddenClass)
    })
  })

  describe('loading the page without a cookie and clicking the close link', function () {
    beforeEach(function () {
      loadFixtures(fixtureFile)
      noticeBannerJavascript()
      $closeBannerLink = $('.notice-banner__close')
      $closeBannerLink.click()
      $noticeBanner = $('#notice-banner')
    })

    it('the cookie data should have the value surpress_for_all_services', function () {
      $cookieData = govuk.getCookie(cookieName)
      expect($cookieData).toBe(cookieDataValue)
    })

    it('the banner should not be visible', function () {
      expect($noticeBanner).toHaveClass($jsHiddenClass)
    })
  })
})
