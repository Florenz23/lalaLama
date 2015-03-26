describe("Registration:", function() {
    var registration = new Registration();
    var class_ajax = new ClassAjax();
    var class_cookie = new ClassCookie();
    var trainer_info = new ClassTrainerInfo();
    var table = "registration";
    var user_id = "1";
    var user_name = "peter23";
    var user_password = "asdf123";
    var info_div_name = "info_div";
    class_ajax.setAjaxPhpFile("trainer/units/myUnit00/public/php/test/classDbFunctions.php");
    class_ajax.setDatabase("test");
    var spyEvent;
    beforeEach(function() {
        registration.setUpHTMLFixture();
        registration.addListener();
    });

    describe('workflow', function() {
        describe("Check Inputfields:", function() {
            it("check username_textield if it is there and has value:", function() {
                expect("input#" + registration.username_textfield_id).toExist();
                expect("#" + registration.username_textfield_id).toHaveValue(user_name);
            });
            it("check password_text field if it is there and has value:", function() {
                expect("input#" + registration.password_textfield_id).toExist();
                expect("#" + registration.password_textfield_id).toHaveValue(user_password);
            });
            it("check repeat_password_textfield if it is there and has value:", function() {
                expect("input#" + registration.repeat_password_textfield_id).toExist();
                expect("#" + registration.repeat_password_textfield_id).toHaveValue(user_password);
            });
        });
        describe("Check register button:", function() {
            it("check if it is there and has value:", function() {
                expect("button#" + registration.register_button_id).toExist();
                expect("#" + registration.register_button_id).toContainText("Continue Registration");
            });
            it("check if function saveRegistration exists", function() {
                expect(registration.saveRegistration).toBeDefined();
            });
            it("check if click calls saveRegistration", function() {
                spyOn(registration, "saveRegistration");
                $('#' + registration.register_button_id).trigger("click");
                expect(registration.saveRegistration).toHaveBeenCalled();
            });
        });
        describe("check createRegistrationObject function", function() {
            it("createRegistrationObject should be defined", function() {
                expect(registration.createRegistrationObject).toBeDefined();
            });
            it("check Values of Object", function() {
                registration_object = registration.createRegistrationObject();
                expect(registration_object.user_name).toBe(user_name);
                expect(registration_object.user_password).toBe(user_password);
            });
        });
        describe("check info div:", function() {
            it("it should exist", function() {
                expect("div#" + info_div_name).toExist();
            });
            it("it should contain text 'hello'", function() {
                expect("div#" + info_div_name).toContainText("hello");
            });
        });
        describe("checkPasswords:", function() {
            it("should be defined", function() {
                expect(registration.checkPasswords).toBeDefined();
            });
            it("should return true", function() {
                expect(registration.checkPasswords()).toBeTruthy();
            });
            it("it should return false", function() {
                $("#" + registration.password_textfield_id).val(user_password);
                $("#" + registration.repeat_password_textfield_id).val(user_password + "2");
                expect(registration.checkPasswords()).toBeFalsy();
                $("#" + registration.repeat_password_textfield_id).val(user_password);
            });
            it("error message", function() {
                $("#" + registration.repeat_password_textfield_id).val("moin");
                expect(registration.saveRegistration()).toBeFalsy();
                expect("#info_div").toContainText("Die Passwörter stimmen nicht überein, bitte korrigiere sie.");
                $("#" + registration.repeat_password_textfield_id).val(user_password);
            });
        });


        describe("input getter", function() {
            beforeEach(function() {
                $("#" + registration.username_textfield_id).val(user_name);
                $("#" + registration.password_textfield_id).val(user_password);
                $("#" + registration.repeat_password_textfield_id).val(user_password);
            });
            it("getUsername should be defined", function() {
                expect(registration.getUsername).toBeDefined();
            });
            it("getUsername should return 'peter123'", function() {
                expect(registration.getUsername()).toBe(user_name);
            });
            it("getPassword should be defined", function() {
                expect(registration.getPassword).toBeDefined();
            });
            it("getPassword should return 'asdf123", function() {
                expect(registration.getPassword()).toBe(user_password);
            });
            it("getRepeatPassword should be defined", function() {
                expect(registration.getRepeatPassword).toBeDefined();
            });
            it("getRepeatPassword should return 'asdf123'", function() {
                expect(registration.getRepeatPassword()).toBe(user_password);
            });
        });
        describe('messages', function() {
            it("welcome", function() {
                registration.displayWelcomeMessage();
                expect("#" + info_div_name).toContainText("Willkommen, du hast dich erfolgreich registriert");
            });
        });

    });

    describe('db part', function() {
        describe("registration table:", function() {
            var table = trainer_info.registration_table.name;
            var returned_id_obj;
            it("saveRegistration be defined", function() {
                expect(registration.saveRegistration).toBeDefined();
            });
            it('expect cookie which will be deleted again to exist', function() {
                class_cookie.createCookie(registration.cookie_name, "moin");
                var cookie_check = class_cookie.checkIfCookieExists(registration.cookie_name);
                expect(cookie_check).toBeTruthy();
            });
            it("db entry", function() {
                spyOn(registration, "createStartTree");
                spyOn(registration, "goToLogin");
                returned_id_obj = registration.saveRegistration();
                returned_insert_id = returned_id_obj.registration_id;
                var data = {
                    table: table,
                    primary: trainer_info.registration_table.id,
                    primary_value: returned_insert_id,
                    key: trainer_info.registration_table.user_name,
                    key_value: user_name
                };
                expect(class_ajax.checkIfValueExists(data)).toBe('1');
                data = {
                    table: table,
                    primary: trainer_info.registration_table.id,
                    primary_value: returned_insert_id,
                    key: trainer_info.registration_table.user_password,
                    key_value: user_password
                };
                expect(class_ajax.checkIfValueExists(data)).toBe('1');
            });
            it('user_id should been set', function() {
                expect(registration.user_id).toBe(returned_insert_id);
            });
            it('cookie should not exist', function() {
                var cookie_check = class_cookie.checkIfCookieExists(registration.cookie_name);
                expect(cookie_check).toBeFalsy();
            });
            it('refresh', function() {
                var table = trainer_info.registration_table.name;
                var returned_insert_id = returned_id_obj.registration_id;
                var delete_check = class_ajax.deleteRow(table, trainer_info.registration_table.id, returned_insert_id);
                expect(delete_check).toBe('1');
            });
            describe("check double entry:", function() {
                beforeEach(function() {
                    spyOn($, "ajax").and.callFake(function() {
                        ajax = {
                            "responseText": 'Duplicate entry "peter" for key "id"'
                        };
                        return ajax;
                    });
                });
                it("should be defined", function() {
                    expect(registration.checkDoubleEntry).toBeDefined();
                });
                it("should be false and info div should display'Sorry, Benutzer schon vergeben' should be displayed", function() {
                    expect(registration.checkDoubleEntry()).toBe(false);
                    expect("#" + info_div_name).toContainText("Sorry, Benutzer schon vergeben!");
                });

            });
        });
        // describe('tree', function() {
        //     var navigation_table = trainer_info.navigation_table_struct.name;
        //     var returned_navigation_values;
        //     var returned_id_obj;
        //     var returned_id_array;
        //     var user_id_to_test;
        //     it('createStartTree should be defined', function() {
        //         expect(registration.createStartTree).toBeDefined();
        //     });
        //     it('first entry', function() {
        //         spyOn(registration, "goToLogin");
        //         returned_id_obj = registration.saveRegistration();
        //         user_id_to_test = returned_id_obj.registration_id;
        //         var data = {
        //             table: navigation_table,
        //             key: trainer_info.navigation_table.user_id,
        //             value: returned_id_obj.registration_id,
        //             primary: trainer_info.navigation_table.id
        //         };
        //         returned_id_array = returned_id_obj.tree_id_array;
        //         returned_navigation_values = class_ajax.selectFrom(data);
        //         expect(returned_navigation_values).toBeDefined();
        //     });
        //     it('first id', function() {
        //         expect(returned_navigation_values[0].user_id).toBe(user_id_to_test);
        //         expect(returned_navigation_values[0].list_id).toBe(returned_id_array[0]);
        //     });
        //     it('parent ids', function() {
        //         expect(returned_navigation_values[1].parent_id).toBe(returned_id_array[0]);
        //         expect(returned_navigation_values[2].parent_id).toBe(returned_id_array[0]);
        //         expect(returned_navigation_values[3].parent_id).toBe(returned_navigation_values[2].list_id);
        //         expect(returned_navigation_values[4].parent_id).toBe(returned_navigation_values[3].list_id);
        //     });
        //     it('delete tree entries', function() {
        //         var navigation_table_id = trainer_info.navigation_table.id;
        //         var returned_insert_id = returned_id_array[0];
        //         expect(registration.class_ajax.deleteRow(navigation_table, navigation_table_id, returned_insert_id)).toBe('1');
        //         returned_insert_id = returned_id_array[1];
        //         expect(registration.class_ajax.deleteRow(navigation_table, navigation_table_id, returned_insert_id)).toBe('1');
        //         returned_insert_id = returned_id_array[2];
        //         expect(registration.class_ajax.deleteRow(navigation_table, navigation_table_id, returned_insert_id)).toBe('1');
        //         returned_insert_id = returned_id_array[3];
        //         expect(registration.class_ajax.deleteRow(navigation_table, navigation_table_id, returned_insert_id)).toBe('1');
        //         returned_insert_id = returned_id_array[4];
        //         expect(registration.class_ajax.deleteRow(navigation_table, navigation_table_id, returned_insert_id)).toBe('1');
        //     });
        //     it('delete registration entry', function() {
        //         var registration_table = trainer_info.registration_table.name;
        //         var registration_key_row = trainer_info.registration_table.id;
        //         var registration_id = returned_id_obj.registration_id;
        //         var delete_check = class_ajax.deleteRow(registration_table, registration_key_row, registration_id);
        //         expect(delete_check).toBe('1');
        //     });
        // });


    });

});