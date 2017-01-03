require('jquery');

/**
 * Smooth Scroll
 * Smooth scroll makes the page automatically scroll to page content 
 * when anchor links are cliked rather then a jerky jump to the content.
 * 
 * With javascript disabled the page will simply jump to the content,
 * but javascript users will get the smoother experience.
 * 
 * Example:
 * <a data-smooth-scroll href="#heading></a>
 */

module.exports = function () {
    $('[data-smooth-scroll]').on('click', function() {
        var $el = $(this.hash);
        var top = $el.offset().top;
        var offset = $el.data('data-smooth-scroll-offset');
        
        if ($el.length) {
            $('html, body').animate({
                scrollTop: (offset) ? top - parseInt(offset) : top
            }, 500);
        }
    });
};