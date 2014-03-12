GOVUK.setCookie = function (name, value, duration) {
    var expires = '';
    if (duration) {
        var date = new Date();
        date.setTime(date.getTime() + (duration * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
};
GOVUK.getCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};
// TODO: remove this if it isn't being used
GOVUK.eraseCookie = function (name) {
    GOVUK.setCookie(name, "", -1);
};