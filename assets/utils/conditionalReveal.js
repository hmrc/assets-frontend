var showHide = function () {
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()
}
if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", function () {
    showHide()
  })
} else {
  window.attachEvent("onload", function () {
    showHide()
  })
}
