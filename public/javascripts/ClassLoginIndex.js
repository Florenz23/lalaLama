function ClassLoginIndex() {
    ClassLogin.call(this);

}


ClassLoginIndex.prototype = new ClassLogin();


ClassLoginIndex.prototype.addListeners = function() {
    var class_login = this;
    $("#" + this.login_button_id).click(function() {
        class_login.logIn();
    });
    this.addSelectListener();
};

ClassLoginIndex.prototype.logIn = function() {
    var class_login = this;
    var json_output = false;
    $.get("public/php/test/classAccountManager.php", {
            action: 'login',
            username: this.getUsername(),
            password: this.getPassword()
        },
        function(data, status) {
            if (status == "success") {
                if (data == 'login.ok') {
                    class_login.loginSucessAction();
                } else {
                    class_login.displayWrongPasswordMessage();
                }
            }
        });
};

ClassLoginIndex.prototype.goToFinder = function() {
    window.location.href = "finder";
};