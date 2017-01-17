/* eslint-env jquery */

/**
 * Attorney Banner
 *
 * Uses the sticky-header to create a fixed position banner that persists through the users viewport
 *
 * Usage:
 *
 *  attorney_banner should be called in your main template after your service info
 *  with parameters to match these:- @(name: Option[String], returnLinkUrl : String, returnLinkText: String)
 *  https://github.com/hmrc/play-ui/blob/master/src/main/twirl/uk/gov/hmrc/play/views/layouts/attorney_banner.scala.html
 *
 *  Example from the tai-frontend:
 *  https://www.github.com/hmrc/tai-frontend/blob/master/app/views/main.scala.html#L47
 *
 *  @actingAttorneyBanner = {
 *      @actingAttorney.map {actingAttorneyValue =>
 *        @includes.attorney_banner(actingAttorneyValue.name, config.ApplicationConfig.citizenSwitchOffUrl, "back to trusted helpers")
 *      }
 *  }
 *
 *
 **/
require('jquery')

var sticky = require('./sticky-header.js')

module.exports = function (el) {
  if ($('.attorneyBanner').length === 0) {
    return
  }

  sticky({
    el: '.attorneyBanner',
    className: 'stickyBanner'
  })
}
