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

  function captureCopyEvents(){
    var codeBlocks = document.querySelectorAll('code')
    for (var i = 0, n = codeBlocks.length; i < n; i++){
      codeBlocks[i].addEventListener('copy', function(){
        ga('send', 'event', 'markup', 'copy', document.location.pathname)
      })
    }
  }

  function scaleExampleHeight() {
    var scaleWrappers = Array.from(document.querySelectorAll('.scale-wrapper'))
    scaleWrappers.forEach(function(el){
      el.style.height = el.querySelector('.scale').clientHeight / 2 + 'px'
    })
  }

  var detailsElement = Array.from(document.getElementsByTagName('details'));

  detailsElement.forEach(function(el){
    el.addEventListener('click', function(){
      setTimeout(function(){
        scaleExampleHeight()
      },100)
    })
  })

  window.addEventListener('resize', function () {
    scaleExampleHeight()
  })

  scaleExampleHeight()
  preventClickOnExample()
  captureCopyEvents()
  hljs.initHighlightingOnLoad()
})()
