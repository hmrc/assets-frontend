(function () {
  'use strict'

  function preventClickOnExample() {
    var anchors = document.querySelectorAll('.example a')

    for (var i = 0, n = anchors.length; i < n; i++) {
      anchors[i].addEventListener('click', function (e) {
        e.preventDefault();
      })
    }
  }

  function scaleExampleHeight() {
    var scaleWrapper = document.querySelectorAll('.scale-wrapper')

    for (var i = 0, n = scaleWrapper.length; i < n; i++) {
      scaleWrapper[i].style.height = scaleWrapper[i].querySelector('.scale').offsetHeight / 2 + 'px'
    }
  }

  window.addEventListener('resize', function () {
    scaleExampleHeight()
  })

  scaleExampleHeight()
  preventClickOnExample()
  hljs.initHighlightingOnLoad()
})()
