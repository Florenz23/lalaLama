describe("ClassDisplayList***", function() {
    var class_ajax = new ClassAjax();
    var class_display_list = new ClassDisplayList();
    var class_db_test_list = new ClassDbTestList();
    var class_div_height_setter = new ClassDivHeightSetter();
    var test_value_json_array_from_db_0;
    var list_id_to_be_tested_1 = class_db_test_list.value_obj_1.list_id;
    var list_id_to_be_tested_2 = class_db_test_list.value_obj_2.list_id;
    var test_value_json_array_from_db_1;
    beforeEach(function() {
        class_display_list.setUpHTMLFixture();
        class_display_list.addListener();
    });

    describe("Preperation for the test:", function() {
        describe("prepare the database for the test", function() {
            it("test values should be inserted into the database", function() {
                expect(class_db_test_list.refreshTestListValues()).toBeTruthy();
            });
            it("values of list 7 should be read of the db", function() {
                test_value_json_array_from_db_0 = class_display_list.getJsonData(list_id_to_be_tested_1);
                expect(test_value_json_array_from_db_0).toBeTruthy();
            });
            it("values of list 8 should be read of the db", function() {
                test_value_json_array_from_db_1 = class_display_list.getJsonData(list_id_to_be_tested_2);
                expect(test_value_json_array_from_db_1).toBeTruthy();
            });
        });

    });

    describe("displayList:", function() {
        var list_id_to_be_tested;
        var id_voc_to_be_tested_0;
        var id_voc_to_be_tested_1;
        beforeEach(function() {
            spyOn(class_display_list, "getJsonData").and.callFake(function() {
                return class_db_test_list.value_array;
            });
            class_display_list.displayList(list_id_to_be_tested_1);
        });
        describe("functionality", function() {
            it("class_display_list should be defined", function() {
                expect(class_display_list).toBeDefined();
            });
        });
        describe("check the results of the first test_list:", function() {
            var id_voc_to_be_tested_0 = class_db_test_list.value_obj_1.voc_id;
            var id_voc_to_be_tested_1 = class_db_test_list.value_obj_2.voc_id;

            var question_field_id_0 = class_display_list.input_question_id_prefix + id_voc_to_be_tested_0;
            var question_field_id_1 = class_display_list.input_question_id_prefix + id_voc_to_be_tested_1;
            var delete_button_id_0 = class_display_list.delete_button_id_prefix + id_voc_to_be_tested_0;
            var delete_button_id_1 = class_display_list.delete_button_id_prefix + id_voc_to_be_tested_1;
            var div_id_1 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_0;
            var div_id_2 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_1;
            var question_input_class = class_display_list.input_class_question;
            var div_id_voc_0 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_0;
            var div_id_voc_1 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_1;
            describe("voc_dif", function() {
                describe("div", function() {
                    var voc_div_id_0 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_0;
                    var voc_div_id_1 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_1;
                    var voc_div_class = class_display_list.voc_div_class;

                    it("voc_divs should exist", function() {
                        expect("#" + voc_div_id_0).toExist();
                        expect("#" + voc_div_id_1).toExist();
                    });
                    it("voc div should have the correct class", function() {
                        expect("#" + voc_div_id_0 + "." + voc_div_class).toExist();
                        expect("#" + voc_div_id_1 + "." + voc_div_class).toExist();
                    });
                });
                describe("voc_delete_button", function() {
                    var div_id_1 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_0;
                    var div_id_2 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_1;
                    var voc_delete_button_id_0 = class_display_list.voc_delete_button_id_prefix + id_voc_to_be_tested_0;
                    var voc_delete_button_id_1 = class_display_list.voc_delete_button_id_prefix + id_voc_to_be_tested_1;
                    var voc_delete_button_class = class_display_list.voc_delete_button_class;
                    var voc_delete_button_value = class_display_list.voc_delete_button_value;

                    it("voc_delete_buttons should exist", function() {
                        expect("#" + voc_delete_button_id_0).toExist();
                        expect("#" + voc_delete_button_id_1).toExist();
                    });
                    it("voc delete_button should have the correct class", function() {
                        expect("#" + voc_delete_button_id_0 + "." + voc_delete_button_class).toExist();
                        expect("#" + voc_delete_button_id_1 + "." + voc_delete_button_class).toExist();
                    });
                    it("voc_delete_button should be in correct div", function() {
                        expect("#" + div_id_1 + " #" + voc_delete_button_id_0).toExist();
                        expect("#" + div_id_2 + " #" + voc_delete_button_id_1).toExist();
                    });
                });
                describe("answer_add_button", function() {
                    var div_id_1 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_0;
                    var div_id_2 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_1;
                    var answer_add_button_id_0 = class_display_list.answer_add_button_id_prefix + id_voc_to_be_tested_0;
                    var answer_add_button_id_1 = class_display_list.answer_add_button_id_prefix + id_voc_to_be_tested_1;
                    var answer_add_button_class = class_display_list.answer_add_button_class;
                    var answer_add_button_value = class_display_list.answer_add_button_value;

                    it("answer_add_buttons should exist", function() {
                        expect("#" + answer_add_button_id_0).toExist();
                        expect("#" + answer_add_button_id_1).toExist();
                    });
                    it("answer add_button should have the correct class", function() {
                        expect("#" + answer_add_button_id_0 + "." + answer_add_button_class).toExist();
                        expect("#" + answer_add_button_id_1 + "." + answer_add_button_class).toExist();
                    });
                    it("answer_add_button should be in correct div", function() {
                        expect("#" + div_id_1 + " #" + answer_add_button_id_0).toExist();
                        expect("#" + div_id_2 + " #" + answer_add_button_id_1).toExist();
                    });
                });

            });
            describe("question", function() {
                describe("question_main_div", function() {
                    var div_id_1 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_0;
                    var div_id_2 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_1;
                    var question_main_div_id_0 = class_display_list.question_main_div_id_prefix + id_voc_to_be_tested_0;
                    var question_main_div_id_1 = class_display_list.question_main_div_id_prefix + id_voc_to_be_tested_1;
                    var question_main_div_class = class_display_list.question_main_div_class;
                    it("question_main_divs should exist", function() {
                        expect("#" + question_main_div_id_0).toExist();
                        expect("#" + question_main_div_id_1).toExist();
                    });
                    it("question_main_div should be in correct div", function() {
                        expect("#" + div_id_1 + " #" + question_main_div_id_0).toExist();
                        expect("#" + div_id_2 + " #" + question_main_div_id_1).toExist();
                    });
                    it("question_main_div should have the correct class", function() {
                        expect("#" + question_main_div_id_0 + "." + question_main_div_class).toExist();
                        expect("#" + question_main_div_id_1 + "." + question_main_div_class).toExist();
                    });
                });
                describe("question_div", function() {
                    var div_id_1 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_0;
                    var div_id_2 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_1;
                    var question_div_id_0 = class_display_list.question_div_id_prefix + id_voc_to_be_tested_0;
                    var question_div_id_1 = class_display_list.question_div_id_prefix + id_voc_to_be_tested_1;
                    var question_div_class = class_display_list.question_div_class;
                    it("question_divs should exist", function() {
                        expect("#" + question_div_id_0).toExist();
                        expect("#" + question_div_id_1).toExist();
                    });
                    it("question_div should be in correct div", function() {
                        expect("#" + div_id_1 + " #" + question_div_id_0).toExist();
                        expect("#" + div_id_2 + " #" + question_div_id_1).toExist();
                    });
                    it("question_div should have the correct class", function() {
                        expect("#" + question_div_id_0 + "." + question_div_class).toExist();
                        expect("#" + question_div_id_1 + "." + question_div_class).toExist();
                    });
                });
                describe("question_input", function() {
                    var question_div_id_0 = class_display_list.question_div_id_prefix + id_voc_to_be_tested_0;
                    var question_div_id_1 = class_display_list.question_div_id_prefix + id_voc_to_be_tested_1;
                    var question_input_id_0 = class_display_list.question_input_id_prefix + id_voc_to_be_tested_0;
                    var question_input_id_1 = class_display_list.question_input_id_prefix + id_voc_to_be_tested_1;
                    var question_input_class = class_display_list.question_input_class;
                    var question_input_value_1 = class_db_test_list.value_obj_1.question;
                    var question_input_value_2 = class_db_test_list.value_obj_2.question;
                    it("question_inputs should exist", function() {
                        expect("#" + question_input_id_0).toExist();
                        expect("#" + question_input_id_1).toExist();
                    });
                    it("question_input should be in correct div", function() {
                        expect("#" + question_div_id_0 + " #" + question_input_id_0).toExist();
                        expect("#" + question_div_id_1 + " #" + question_input_id_1).toExist();
                    });
                    it("question_input should have the correct class", function() {
                        expect("#" + question_input_id_0 + "." + question_input_class).toExist();
                        expect("#" + question_input_id_1 + "." + question_input_class).toExist();
                    });
                    it("question should have the correct value", function() {
                        expect("#" + question_input_id_0).toHaveValue(question_input_value_1);
                        expect("#" + question_input_id_1).toHaveValue(question_input_value_2);
                    });
                });

            });
            describe("answer", function() {
                describe("answer_main_div", function() {
                    var div_id_1 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_0;
                    var div_id_2 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_1;
                    var answer_main_div_id_0 = class_display_list.answer_main_div_id_prefix + id_voc_to_be_tested_0;
                    var answer_main_div_id_1 = class_display_list.answer_main_div_id_prefix + id_voc_to_be_tested_1;
                    var answer_main_div_class = class_display_list.answer_main_div_class;
                    it("answer_main_divs should exist", function() {
                        expect("#" + answer_main_div_id_0).toExist();
                        expect("#" + answer_main_div_id_1).toExist();
                    });
                    it("answer_main_div should be in correct div", function() {
                        expect("#" + div_id_1 + " #" + answer_main_div_id_0).toExist();
                        expect("#" + div_id_2 + " #" + answer_main_div_id_1).toExist();
                    });
                    it("answer_main_div should have the correct class", function() {
                        expect("#" + answer_main_div_id_0 + "." + answer_main_div_class).toExist();
                        expect("#" + answer_main_div_id_1 + "." + answer_main_div_class).toExist();
                    });
                });
                describe("answer_div", function() {
                    var voc_div_id_1 = class_display_list.voc_div_id_prefix + class_db_test_list.value_obj_1.voc_id;
                    var voc_div_id_2 = class_display_list.voc_div_id_prefix + class_db_test_list.value_obj_2.voc_id;
                    var answer_div_id_1 = class_display_list.answer_div_id_prefix + class_db_test_list.answer_obj_1.answer_id;
                    var answer_div_id_2 = class_display_list.answer_div_id_prefix + class_db_test_list.answer_obj_2.answer_id;
                    var answer_div_id_3 = class_display_list.answer_div_id_prefix + class_db_test_list.answer_obj_3.answer_id;
                    var answer_div_id_4 = class_display_list.answer_div_id_prefix + class_db_test_list.answer_obj_4.answer_id;
                    var answer_div_class = class_display_list.answer_div_class;
                    it("answer_divs should exist", function() {
                        expect("#" + answer_div_id_1).toExist();
                        expect("#" + answer_div_id_2).toExist();
                        expect("#" + answer_div_id_3).toExist();
                        expect("#" + answer_div_id_4).toExist();
                    });
                    it("answer_div should be in correct div", function() {
                        expect("#" + voc_div_id_1 + " #" + answer_div_id_1).toExist();
                        expect("#" + voc_div_id_1 + " #" + answer_div_id_2).toExist();
                        expect("#" + voc_div_id_1 + " #" + answer_div_id_3).toExist();
                        expect("#" + voc_div_id_2 + " #" + answer_div_id_4).toExist();
                    });
                    it("answer_div should have the correct class", function() {
                        expect("#" + answer_div_id_1 + "." + answer_div_class).toExist();
                        expect("#" + answer_div_id_2 + "." + answer_div_class).toExist();
                        expect("#" + answer_div_id_3 + "." + answer_div_class).toExist();
                        expect("#" + answer_div_id_4 + "." + answer_div_class).toExist();
                    });
                });
                describe("answer_input", function() {
                    var answer_div_id_1 = class_display_list.answer_div_id_prefix + class_db_test_list.answer_obj_1.answer_id;
                    var answer_div_id_2 = class_display_list.answer_div_id_prefix + class_db_test_list.answer_obj_2.answer_id;
                    var answer_div_id_3 = class_display_list.answer_div_id_prefix + class_db_test_list.answer_obj_3.answer_id;
                    var answer_div_id_4 = class_display_list.answer_div_id_prefix + class_db_test_list.answer_obj_4.answer_id;
                    var answer_input_id_1 = class_display_list.answer_input_id_prefix + class_db_test_list.answer_obj_1.answer_id;
                    var answer_input_id_2 = class_display_list.answer_input_id_prefix + class_db_test_list.answer_obj_2.answer_id;
                    var answer_input_id_3 = class_display_list.answer_input_id_prefix + class_db_test_list.answer_obj_3.answer_id;
                    var answer_input_id_4 = class_display_list.answer_input_id_prefix + class_db_test_list.answer_obj_4.answer_id;
                    var answer_input_class = class_display_list.answer_input_class;
                    var answer_input_value_1 = class_db_test_list.answer_obj_1.answer;
                    var answer_input_value_2 = class_db_test_list.answer_obj_2.answer;
                    var answer_input_value_3 = class_db_test_list.answer_obj_3.answer;
                    var answer_input_value_4 = class_db_test_list.answer_obj_4.answer;
                    it("answer_divs should exist", function() {
                        expect("#" + answer_input_id_1).toExist();
                        expect("#" + answer_input_id_2).toExist();
                        expect("#" + answer_input_id_3).toExist();
                        expect("#" + answer_input_id_4).toExist();
                    });
                    it("answer_input should be in correct div", function() {
                        expect("#" + answer_div_id_1 + " #" + answer_input_id_1).toExist();
                        expect("#" + answer_div_id_2 + " #" + answer_input_id_2).toExist();
                        expect("#" + answer_div_id_3 + " #" + answer_input_id_3).toExist();
                        expect("#" + answer_div_id_4 + " #" + answer_input_id_4).toExist();
                    });
                    it("answer_input should have the correct class", function() {
                        expect("#" + answer_input_id_1 + "." + answer_input_class).toExist();
                        expect("#" + answer_input_id_2 + "." + answer_input_class).toExist();
                        expect("#" + answer_input_id_3 + "." + answer_input_class).toExist();
                        expect("#" + answer_input_id_4 + "." + answer_input_class).toExist();
                    });
                    it("answer_input should have the correct value", function() {
                        expect("#" + answer_input_id_1).toHaveValue(answer_input_value_1);
                        expect("#" + answer_input_id_2).toHaveValue(answer_input_value_2);
                        expect("#" + answer_input_id_3).toHaveValue(answer_input_value_3);
                        expect("#" + answer_input_id_4).toHaveValue(answer_input_value_4);
                    });
                });
                describe("answer_delete_button", function() {
                    var answer_div_id_1 = class_display_list.answer_div_id_prefix + class_db_test_list.answer_obj_1.answer_id;
                    var answer_div_id_2 = class_display_list.answer_div_id_prefix + class_db_test_list.answer_obj_2.answer_id;
                    var answer_div_id_3 = class_display_list.answer_div_id_prefix + class_db_test_list.answer_obj_3.answer_id;
                    var answer_div_id_4 = class_display_list.answer_div_id_prefix + class_db_test_list.answer_obj_4.answer_id;
                    var answer_delete_button_id_1 = class_display_list.answer_delete_button_id_prefix + class_db_test_list.answer_obj_1.answer_id;
                    var answer_delete_button_id_2 = class_display_list.answer_delete_button_id_prefix + class_db_test_list.answer_obj_2.answer_id;
                    var answer_delete_button_id_3 = class_display_list.answer_delete_button_id_prefix + class_db_test_list.answer_obj_3.answer_id;
                    var answer_delete_button_id_4 = class_display_list.answer_delete_button_id_prefix + class_db_test_list.answer_obj_4.answer_id;
                    var answer_delete_button_class = class_display_list.answer_delete_button_class;
                    var answer_delete_button_value = class_display_list.answer_delete_button_value;
                    it("answer_divs should exist", function() {
                        expect("#" + answer_delete_button_id_1).toExist();
                        expect("#" + answer_delete_button_id_2).toExist();
                        expect("#" + answer_delete_button_id_3).toExist();
                        expect("#" + answer_delete_button_id_4).toExist();
                    });
                    it("answer_delete_button should be in correct div", function() {
                        expect("#" + answer_div_id_1 + " #" + answer_delete_button_id_1).toExist();
                        expect("#" + answer_div_id_2 + " #" + answer_delete_button_id_2).toExist();
                        expect("#" + answer_div_id_3 + " #" + answer_delete_button_id_3).toExist();
                        expect("#" + answer_div_id_4 + " #" + answer_delete_button_id_4).toExist();
                    });
                    it("answer_delete_button should have the correct class", function() {
                        expect("#" + answer_delete_button_id_1 + "." + answer_delete_button_class).toExist();
                        expect("#" + answer_delete_button_id_2 + "." + answer_delete_button_class).toExist();
                        expect("#" + answer_delete_button_id_3 + "." + answer_delete_button_class).toExist();
                        expect("#" + answer_delete_button_id_4 + "." + answer_delete_button_class).toExist();
                    });
                });

            });
            describe("voc_menu", function() {
                describe("voc_menu_div", function() {
                    var div_id_1 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_0;
                    var div_id_2 = class_display_list.voc_div_id_prefix + id_voc_to_be_tested_1;
                    var voc_menu_div_id_0 = class_display_list.voc_menu_div_id_prefix + id_voc_to_be_tested_0;
                    var voc_menu_div_id_1 = class_display_list.voc_menu_div_id_prefix + id_voc_to_be_tested_1;
                    var voc_menu_div_class = class_display_list.voc_menu_div_class;
                    it("voc_menu_divs should exist", function() {
                        expect("#" + voc_menu_div_id_0).toExist();
                        expect("#" + voc_menu_div_id_1).toExist();
                    });
                    it("voc_menu_div should be in correct div", function() {
                        expect("#" + div_id_1 + " #" + voc_menu_div_id_0).toExist();
                        expect("#" + div_id_2 + " #" + voc_menu_div_id_1).toExist();
                    });
                    it("voc_menu_div should have the correct class", function() {
                        expect("#" + voc_menu_div_id_0 + "." + voc_menu_div_class).toExist();
                        expect("#" + voc_menu_div_id_1 + "." + voc_menu_div_class).toExist();
                    });
                });

            });
            describe("check div height of main divs", function() {
                var voc_nr = id_voc_to_be_tested_0;
                var voc_div_id = "#" + class_display_list.voc_div_id_prefix + voc_nr;
                var question_main_div_id = voc_div_id + " ." + class_display_list.question_main_div_class;
                var answer_main_div_id = voc_div_id + " ." + class_display_list.answer_main_div_class;
                var voc_menu_div_id = voc_div_id + " ." + class_display_list.voc_menu_div_class;
                it("should behave...", function() {
                    var max_div_height = class_div_height_setter.getHighestDivValue(voc_nr) - 40;
                    var question_main_div_height = $(question_main_div_id).height();
                    var answer_main_div_height = $(answer_main_div_id).height();
                    var voc_menu_div_height = $(voc_menu_div_id).height();

                    expect(question_main_div_height).toBe(max_div_height);
                    expect(answer_main_div_height).toBe(max_div_height);
                    expect(voc_menu_div_height).toBe(max_div_height);
                });
            });
        });
    });
    describe('learnList', function() {
        var learn_button_id = "learn_button_id";
        it('should be defined', function() {
            expect(class_display_list.learnList).toBeDefined();
        });
        it('button should exist', function() {
            expect("#" + learn_button_id).toExist();
        });
        it('click on learn button should work', function() {
            class_display_list.addListener();
            spyOn(class_display_list, "learnList");
            $("#" + learn_button_id).trigger("click");
            expect(class_display_list.learnList).toHaveBeenCalled();
        });
    });
});