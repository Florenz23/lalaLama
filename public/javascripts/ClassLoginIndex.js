function ClassLoginIndex() {
    ClassLogin.call(this);

}


ClassLoginIndex.prototype = new ClassLogin();

ClassLoginIndex.prototype.addListeners = function() {

    this.addButtonListener();
    this.addLoginPasswordFieldListener();

};


ClassLoginIndex.prototype.addButtonListener = function() {
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

ClassLoginIndex.prototype.addLoginPasswordFieldListener = function() {
    var class_login = this;
    $("#" + this.password_textfield_id).keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            event.preventDefault();
            class_login.logIn();
        }
    });
};

ClassLoginIndex.prototype.goToFinder = function() {
    window.location.href = "finder";
};