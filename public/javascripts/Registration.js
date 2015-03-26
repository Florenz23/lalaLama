function Registration() {
    this.trainer_info = new ClassTrainerInfo();
    this.tree_start = new TreeStartObject();
    this.username_textfield_id = "username";
    this.email_textfield_id = "email";
    this.password_textfield_id = "password";
    this.repeat_password_textfield_id = "password_repeat";
    this.register_button_id = "submit";
    this.info_div = "info";
    this.class_ajax = new ClassAjax();
}

function addListeners() {
    var registration = new Registration();
    registration.addListener();
}

Registration.prototype.addListener = function() {
    var registration = this;
    $('#' + this.register_button_id).click(function() {
        registration.register();
    });
};

Registration.prototype.register = function() {
    if (this.checkPasswords()) {
        $.post("../../../public/php/test/classAccountManager.php", {
                action: 'register',
                username: this.getUsername(),
                email: this.getEmail(),
                password: this.getPassword(),
                password_repeat: this.getRepeatPassword()
            },
            function(data, status) {
                if (status == "success") {
                    var registration = new Registration();
                    registration.displayWelcomeMessage();
                    registration.addLinkButtonListener();
                }
            });
    }
};

Registration.prototype.createStartTree = function() {
    return this.tree_start.createStartTree(0);
};

Registration.prototype.goToLogin = function() {
    window.location.href = "login_fixture.html";
};

Registration.prototype.displayWelcomeMessage = function() {
    var html = "";
    html += "Willkommen, du hast dich erfolgreich registriert<br>";
    html += "<input type ='button' value='zum login' id = 'link_button'>";
    $("#" + this.info_div).html(html);
};
Registration.prototype.addLinkButtonListener = function() {

    var registration = this;
    $("#link_button").click(function() {
        registration.goToLogin();
    });

};

Registration.prototype.getUsername = function() {
    return $("#" + this.username_textfield_id).val();
};

Registration.prototype.getEmail = function() {
    return $("#" + this.email_textfield_id).val();
};

Registration.prototype.getPassword = function() {
    return $("#" + this.password_textfield_id).val();
};

Registration.prototype.getRepeatPassword = function() {
    return $("#" + this.repeat_password_textfield_id).val();
};

Registration.prototype.checkPasswords = function() {
    var password = this.getPassword();
    var repeat_password = this.getRepeatPassword();
    if (password == repeat_password) return true;
    $("#" + this.info_div).html("Die Passwörter stimmen nicht überein, bitte korrigiere sie.");
    return false;
};