define(['jquery'], function($) {
  return function(hash) {
    if ($(hash).length === 1) {
      if ($(hash).css("top") === "auto" || "0") {
        $(window).scrollTop($(hash).offset().top - $("#global-header").height());
      }
    }
  };
});
