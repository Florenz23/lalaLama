function Registration() {
    this.trainer_info = new ClassTrainerInfo();
    this.tree_start = new TreeStartObject();
    this.username_textfield_id = "username_registration";
    this.email_textfield_id = "email_registration";
    this.password_textfield_id = "password_registration";
    this.repeat_password_textfield_id = "password_registration_repeat";
    this.register_button_id = "submit_registration";
    this.register_input_class = "registration_input";
    this.info_div = "info_registration";
    this.class_ajax = new ClassAjax();
}

function addListeners() {
    registration = new Registration();
    login = new ClassLoginIndex();
    login.addListeners();
    registration.addUsernameListener();
    registration.addEmailListener();
    registration.addPasswordListener();
    registration.addRepeatPasswordListener();
    registration.addRegisterButtonnListener();
}

Registration.prototype.addFocusListener = function() {
    var registration = this;
    $('.' + this.register_input_class).click(function() {
        var clickedItem = $(this).attr('id');
        console.log(clickedItem);
        $("#" + clickedItem).select();
    });
};
Registration.prototype.addUsernameListener = function() {

    $('#' + this.username_textfield_id).click(function() {
        this.select();
    });
    $('#' + this.username_textfield_id).focus(function() {
        this.select();
    });
    $('#' + this.username_textfield_id).keydown(function() {
        $(this).css('color', 'black');
    });
};
Registration.prototype.addEmailListener = function() {

    $('#' + this.email_textfield_id).click(function() {
        this.select();
    });
    $('#' + this.email_textfield_id).focus(function() {
        this.select();
    });
    $('#' + this.email_textfield_id).keydown(function() {
        $(this).css('color', 'black');
    });
};
Registration.prototype.addPasswordListener = function() {

    $('#' + this.password_textfield_id).click(function() {
        $(this).css('color', 'black');
        $(this).prop("type", "password");
        $(this).val("");
        this.select();
    });
    $('#' + this.password_textfield_id).focus(function() {
        $(this).css('color', 'black');
        $(this).prop("type", "password");
        $(this).val("");
        this.select();
    });
};
Registration.prototype.addRepeatPasswordListener = function() {

    $('#' + this.repeat_password_textfield_id).click(function() {
        $(this).css('color', 'black');
        $(this).prop("type", "password");
        $(this).val("");
        this.select();
    });
    $('#' + this.repeat_password_textfield_id).focus(function() {
        $(this).css('color', 'black');
        $(this).prop("type", "password");
        $(this).val("");
        this.select();
    });
};

Registration.prototype.addRegisterButtonnListener = function() {
    var registration = this;
    $('#' + this.register_button_id).click(function() {
        registration.register();
    });
};

Registration.prototype.register = function() {
    var registration = this;
    if (this.checkPasswords()) {
        $.post("public/php/test/classAccountManager.php", {
                action: 'register',
                username: this.getUsername(),
                email: this.getEmail(),
                password: this.getPassword(),
                password_repeat: this.getRepeatPassword()
            },
            function(data, status) {
                var registration = new Registration();
                if (status == "success" && registration.checkUserAvailiblity(data)) {
                    registration.displayWelcomeMessage();
                    registration.addLinkButtonListener();
                }
            });
    }
};
Registration.prototype.checkUserAvailiblity = function(ajax_answer) {

    if (ajax_answer == "user_valid:false") {
        $("#" + this.info_div).html("Dein Benutzername ist leider schon vergeben.");
        return false;
    }
    return true;
};

Registration.prototype.createStartTree = function() {
    return this.tree_start.createStartTree(0);
};

Registration.prototype.goToLogin = function() {
    window.location.href = "spec/javascripts/fixtures/tree_list_fixture.html";
};
Registration.prototype.displayWelcomeMessage = function() {
    var html = "";
    html += "Willkommen, du hast dich erfolgreich registriert";
    html += "<input type ='button' value='Dann mal los!' id = 'link_button'>";
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
    console.log(password);
    var repeat_password = this.getRepeatPassword();
    if (password.length < 6) {
        $("#" + this.info_div).html("Dein Passwort ist zu kurz, es muss mindestens 6 Zeichen lang sein.");
        return false;
    }
    if (password == repeat_password) return true;
    $("#" + this.info_div).html("Die Passwörter stimmen nicht überein, bitte korrigiere sie.");
    return false;
};