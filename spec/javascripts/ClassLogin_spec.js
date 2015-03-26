describe("ClassLogin:", function() {
    var class_login = new ClassLogin();
    var class_ajax = new ClassAjax();
    var class_cookie = new ClassCookie();
    var registration_data_table = "registration";
    var user_id;
    var user_name = "peter25";
    var user_password = "asdf123";
    var info_div_name = "info_div";
    class_ajax.setAjaxPhpFile("trainer/units/myUnit00/public/php/test/classDbFunctions.php");
    class_ajax.setDatabase("test");
    var spyEvent;
    beforeEach(function() {
        class_login.setUpHTMLFixture();
        class_login.addLoginButtonListener();
    });

    describe("displayLogIn:", function() {
        beforeEach(function() {
            class_login.displayLogIn();
            $("#" + class_login.username_textfield_id).val(user_name);
            $("#" + class_login.password_textfield_id).val(user_password);
        });
        it("should be defined", function() {
            expect(class_login.displayLogIn).toBeDefined();
        });
        it("'login_div' should exist", function() {
            expect("#" + class_login.div_name).toExist();
        });
        it("'info_div' should exist", function() {
            expect("#" + class_login.info_div).toExist();
        });

        it("username_textield exists", function() {
            expect("#" + class_login.div_name + " input" + "#" + class_login.username_textfield_id).toExist();
        });
        it("username_textield has correct value", function() {
            expect("#" + class_login.username_textfield_id).toHaveValue(user_name);
        });
        it("password_textield exists", function() {
            expect("#" + class_login.div_name + " input" + "#" + class_login.password_textfield_id).toExist();
        });
        it("password_textield has correct value", function() {
            expect("#" + class_login.password_textfield_id).toHaveValue(user_password);
        });
        describe("Check login button:", function() {
            it("check if it is there and has value:", function() {
                expect("#" + class_login.div_name + " button" + "#" + class_login.login_button_id).toExist();
                expect("#" + class_login.login_button_id).toContainText(class_login.login_button_value);
            });
            it("check if click calls login function", function() {
                spyOn(class_login, "logIn");
                $("#" + class_login.login_button_id).trigger("click");
                expect(class_login.logIn).toHaveBeenCalled();
            });
        });
    });

    describe("logIn:", function() {

        beforeEach(function() {
            class_login.displayLogIn();
            $("#" + class_login.username_textfield_id).val(user_name);
            $("#" + class_login.password_textfield_id).val(user_password);
        });

        describe("check getLoginValues function", function() {
            it("getLoginValues should be defined", function() {
                expect(class_login.getLoginValues).toBeDefined();
            });
            it("check Values of Object", function() {
                login_values = class_login.getLoginValues();
                expect(login_values.user_name).toBe(user_name);
                expect(login_values.user_password).toBe(user_password);
            });
        });
        describe("checkUserIdentity", function() {
            it("should be defined", function() {
                expect(class_login.checkUserIdentity).toBeDefined();
            });
            it("should return true", function() {
                $("#" + class_login.username_textfield_id).val(user_name);
                $("#" + class_login.password_textfield_id).val(user_password);
                expect(class_login.checkUserIdentity()).toBeTruthy();
            });
            it("should be false", function() {
                $("#" + class_login.username_textfield_id).val(user_name + "1");
                $("#" + class_login.password_textfield_id).val(user_password + "1");
                expect(class_login.checkUserIdentity()).toBe(false);

            });
        });
        describe("displayLogOut:", function() {
            it("should be defined", function() {
                expect(class_login.displayLogOut).toBeDefined();
            });
            it("lovin_div should exist", function() {
                expect("#" + class_login.div_name).toExist();
            });
            it("lokout-button should be displayed", function() {
                class_login.displayLogOut();
                expect("#" + class_login.div_name + " button" + "#" + class_login.logout_button_id).toExist();
            });
            it("logout_button should have value 'Logout'", function() {
                class_login.displayLogOut();
                expect("#" + class_login.logout_button_id).toContainText(class_login.logout_button_value);
            });
            it("check if click calls logOut function", function() {
                class_login.displayLogOut();
                spyOn(class_login, "logOut");
                $("#" + class_login.logout_button_id).trigger("click");
                expect(class_login.logOut).toHaveBeenCalled();
            });
        });
        describe("check identity result and cookie set:", function() {

            it("should be defined", function() {
                expect(class_login.logIn).toBeDefined();
            });
            it("info_div should have text 'Dein Benutzername oder Kennwort ist leider nicht richtig'", function() {
                $("#" + class_login.username_textfield_id).val(user_name + "1");
                $("#" + class_login.password_textfield_id).val(user_password + "1");
                spyOn(class_login, "reloadPage");
                class_login.logIn();
                expect($("#" + class_login.info_div)).toContainText(class_login.wrong_user_input_text);
            });
            it("the cookie for the user should been set", function() {
                class_cookie.eraseCookie(class_login.cookie_name);
                $("#" + class_login.username_textfield_id).val(user_name);
                $("#" + class_login.password_textfield_id).val(user_password);
                spyOn(class_login, "reloadPage");
                class_login.logIn();
                expect(class_cookie.checkIfCookieExists(class_login.cookie_name)).toBe(true);
            });
        });
    });

    describe("logOut", function() {
        it("should be defined", function() {
            expect(class_login.logOut).toBeDefined();
        });
        it("logOut should have been called", function() {
            spyOn(class_login, "displayLogInHeader");
            spyOn(class_login, "reloadPage");
            class_login.logOut();
            expect(class_login.displayLogInHeader).toHaveBeenCalled();
        });
        it("cookie should be deleted", function() {
            expect(class_cookie.checkIfCookieExists(class_login.cookie_name)).toBe(false);
        });
    });

    describe("checkIfUserIsStillLoggedIn:", function() {
        it("should be defined", function() {
            expect(class_login.checkIfUserIsStillLoggedIn).toBeDefined();
        });
        it("should return false", function() {
            class_cookie.eraseCookie(class_login.cookie_name);
            expect(class_login.checkIfUserIsStillLoggedIn()).toBe(false);
        });
        it("should return true", function() {
            class_cookie.createCookie(class_login.cookie_name, "peter23", 1);
            expect(class_login.checkIfUserIsStillLoggedIn()).toBe(true);
            class_cookie.eraseCookie(class_login.cookie_name);
        });
    });


});