define(['jquery'], function ($, el) {
  return function(el) {
  	el.on('click', function(){
    	$(this).find('a')[0].click();
  	});
  };
});