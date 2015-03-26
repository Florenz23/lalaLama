function ClassCookie() {}

ClassCookie.prototype.checkIfCookieExists = function(cookiename) {

    if (document.cookie.indexOf(cookiename) >= 0) {
        return true;
    }
    return false;
};

ClassCookie.prototype.createCookie = function(cookiename, cookievalue, days_to_expire) {

    var expires;
    if (days_to_expire) {
        var date = new Date();
        date.setTime(date.getTime() + (days_to_expire * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else
        expires = "";
    document.cookie = cookiename + "=" + cookievalue + expires + "; path=/";

};
ClassCookie.prototype.readCookieValue = function(name) {

    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return false;

};
ClassCookie.prototype.eraseCookie = function(cookiename) {

    this.createCookie(cookiename, "", -1);

};