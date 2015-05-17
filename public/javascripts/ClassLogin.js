function ClassLogin() {
    this.div_name = "login_div";
    this.trainer_info = new ClassTrainerInfo();
    this.registration_table = this.trainer_info.registration_table.name;
    this.username_textfield_id = "username_login";
    this.password_textfield_id = "password_login";
    this.login_button_id = "login_button";
    this.login_button_value = "Anmelden";
    this.logout_button_value = "Abmelden";
    this.logout_button_id = "logout_button";
    this.info_div = "info";
    this.class_ajax = new ClassAjax();
    this.class_cookie = new ClassCookie();
    this.cookie_name = "lamapacos_user";
    this.cookie_time = 1;

}

function addListenersLogin() {
    var login = new ClassLogin();
    login.addLoginButtonListener();
}

ClassLogin.prototype.start = function() {
    this.checkIfUserIsStillLoggedIn();
};

ClassLogin.prototype.setUpHTMLFixture = function() {
    fixture = readFixtures("login_fixture.html");
    fixture = createFixtureString(fixture);
    setFixtures(fixture);
};


ClassLogin.prototype.addLoginButtonListener = function() {
    var class_login = this;
    $("#" + this.login_button_id).click(function() {
        class_login.logIn();
    });
    this.addSelectListener();
};
ClassLogin.prototype.addSelectListener = function() {
    $("#" + this.username_textfield_id).click(function() {
        this.select();
    });
    $("#" + this.password_textfield_id).click(function() {
        this.select();
    });
};

ClassLogin.prototype.addLogoutButtonListener = function() {
    var class_login = this;
    $("#" + this.logout_button_id).click(function() {
        class_login.logOut();
    });
};

ClassLogin.prototype.displayLogOut = function() {
    var html_code = '<button id="' + this.logout_button_id + '" type="button">' + this.logout_button_value + '</button>';
    $("#" + this.div_name).html(html_code);
    this.addLogoutButtonListener();
};
ClassLogin.prototype.displayLogIn = function() {
    var html_code = "";
    html_code += '<h1>Anmeldung</h1>';
    html_code += '<p>Benutzername';
    html_code += ' <input type="text" id="' + this.username_textfield_id + '" value="">';
    html_code += ' </p>';
    html_code += ' <p>Passwort';
    html_code += '    <input type="text" id="' + this.password_textfield_id + '" value="">';
    html_code += ' </p>';
    html_code += '<button id="' + this.login_button_id + '" type="button">' + this.login_button_value + '</button>';
    html_code += ' <div id="' + this.info_div + '">hello</div>';
    $("#" + this.div_name).html(html_code);
    this.addLoginButtonListener();
};
ClassLogin.prototype.displayLogInHeader = function() {
    var html_code = "";
    html_code += ' <div class="info_div" id="' + this.info_div + '">Info:</div>';
    html_code += '<div class="login_buttons">';
    html_code += '<input type="text" id="' + this.username_textfield_id + '" value="Benutzername">';
    html_code += '<input type="text" id="' + this.password_textfield_id + '" value="Passwort">';
    html_code += '<button id="' + this.login_button_id + '" type="button">' + this.login_button_value + '</button>';
    html_code += '</div>';
    $("#" + this.div_name).html(html_code);
    this.addLoginButtonListener();
};
ClassLogin.prototype.displayRegistrationLink = function() {
    var div_name = "link_div";
    var html_code = "";
    html_code += "<a href='../../../index.php'>Registrieren </a>";
    $("#" + div_name).html(html_code);

};

ClassLogin.prototype.logIn = function() {
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
ClassLogin.prototype.loginSucessAction = function() {
    this.goToFinder();
};

// in den child klassen
ClassLogin.prototype.goToFinder = function() {
    window.location.href = "moin";
};
ClassLogin.prototype.goToIndex = function() {
    window.location.href = "../../../welcome";
};
ClassLogin.prototype.displayWrongPasswordMessage = function() {
    var display = "";
    display += "Dein Benutzername oder Kennwort ist wohl nicht richtig.";
    $("#" + this.info_div).html(display);
};

ClassLogin.prototype.getLoginValues = function() {

    var login_value_obj = {
        user_name: this.getUsername(),
        user_password: this.getPassword()
    };
    return login_value_obj;

};
ClassLogin.prototype.getUsername = function() {

    return $("#" + this.username_textfield_id).val();

};
ClassLogin.prototype.getPassword = function() {

    return $("#" + this.password_textfield_id).val();

};
ClassLogin.prototype.checkUserIdentity = function() {
    var registration_table = this.trainer_info.registration_table;
    var login_values = this.getLoginValues();
    var data = {
        table: registration_table.name,
        key: registration_table.user_name,
        value: login_values.user_name
    };
    var user_values = this.class_ajax.selectFrom(data);
    if (!user_values) {
        return false;
    }
    if (user_values[0].user_password == login_values.user_password) {
        return user_values[0];
    }
    return false;

};

ClassLogin.prototype.checkIfUserIsStillLoggedIn = function() {
    var class_login = this;
    $.post("public/php/test/classSessionHandler.php", {
            action: 'status'
        },
        function(data, status) {
            if (status == "success") {
                if (data == 'logged.in') {
                    class_login.displayLogOut();
                    class_login.iniTree();
                } else {
                    class_login.goToIndex();
                }
            }
        });
};

ClassLogin.prototype.iniTree = function() {

    var tree_public = new ClassTreePublic();
    var tree_user = new ClassTreeUser();
    var menu_buttons = new TreeMenuButtons();
    var login = new ClassLogin();
    $(function() {
        $(window).resize(function() {
            var h = Math.max($(window).height() - 0, 420);
            $('#container, #data, #finder, #data .content').height(h).filter('.default').css('lineHeight', h + 'px');
        }).resize();
        tree_public.iniTree();
        tree_user.iniTree();
        menu_buttons.start();
    });

};


ClassLogin.prototype.logOut = function() {
    $.post("public/php/test/classSessionHandler.php", {
            action: 'logout'
        },
        function(data, status) {
            if (status == "success") {
                var class_login = new ClassLogin();
                if (data == 'logged.out') {
                    class_login.goToIndex();
                }
            }
        });
};


ClassLogin.prototype.reloadPage = function() {
    location.reload();
};