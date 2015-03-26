ClassLoginHeader.prototype = new ClassLogin();

function ClassLoginHeader() {
    ClassLogin.call(this);
}


ClassLoginHeader.prototype.loginSucessAction = function() {
    class_login.displayLogOut();
    class_login.reloadPage();
};