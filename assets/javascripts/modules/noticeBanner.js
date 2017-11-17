/* eslint-env jquery */

require('jquery')

var govuk = require('./GOVUK_helpers.js')

module.exports = function () {
// =====================================================
// Handle the UR banner dismiss link functionality
// =====================================================
  var cookieName = 'mdtpurr'
  var noticeBanner = $('#notice-banner')
  var cookieData = govuk.getCookie(cookieName)
  var noticeBannerShow = 'notice-banner--show'
  var expiryDate = new Date()

  if (cookieData == null) {
    noticeBanner.addClass(noticeBannerShow).removeClass('js-hidden')
  }

  $('.notice-banner__close').on('click', function (e) {
    e.preventDefault()
    var oneMonthInFuture = expiryDate.setMonth(expiryDate.getMonth() + 1)
    govuk.setCookie(cookieName, 'suppress_for_all_services', oneMonthInFuture)
    noticeBanner.removeClass(noticeBannerShow).addClass('js-hidden')
  })
}
