describe("ClassListEditorUpdateAnswer***", function() {
    var class_trainer_info = new ClassTrainerInfo();
    var class_ajax = new ClassAjax();
    var class_display_list = new ClassDisplayList();
    var class_db_test_list = new ClassDbTestList();
    var class_update_answer = new ClassListEditorUpdateAnswer();
    var answer_id_1 = class_db_test_list.answer_obj_1.answer_id;

    var rgb_code_color_input = "rgb(255, 255, 255)";
    var rgb_code_color_input_not_updated = "rgb(255, 153, 153)";
    var rgb_code_color_input_updated = "rgb(240, 255, 255)";


    var list_id_to_be_tested = class_db_test_list.value_obj_1.list_id;
    var test_value_json_array_from_db = class_display_list.getJsonData(list_id_to_be_tested);
    beforeEach(function() {
        class_display_list.setUpHTMLFixture();
        spyOn(class_display_list, "getJsonData").and.callFake(function() {
            return test_value_json_array_from_db;
        });
        class_display_list.displayList(list_id_to_be_tested);
        class_update_answer.old_question_value = "not_set";
        class_update_answer.answer_id = "not_set";
    });
    describe("updateAnswer***", function() {
        var answer_id = class_db_test_list.answer_obj_1.answer_id;
        var answer_div_id = class_display_list.answer_div_id_prefix + answer_id;
        var answer_field_id = class_display_list.answer_input_id_prefix + answer_id;

        describe("db part", function() {
            describe("saveUpdatedAnswerValue", function() {
                it("should be defined", function() {
                    expect(class_display_list.class_list_editor.update_answer.saveUpdatedAnswerValue).toBeDefined();
                });
                it("html elements should exist", function() {
                    expect("#" + answer_div_id).toExist();
                    expect("#" + answer_field_id).toExist();
                });
                it("should update correctly", function() {
                    $("#" + answer_div_id).trigger("mouseover");
                    $("#" + answer_field_id).val("moin");
                    var answer_info = class_trainer_info.answer_table;
                    var data = {
                        table: answer_info.name,
                        primary: answer_info.id,
                        primary_value: answer_id,
                        key: answer_info.answer_row,
                        key_value: "moin"
                    };
                    class_display_list.class_list_editor.update_answer.updateAnswer();
                    expect(class_ajax.checkIfValueExists(data)).toBe('1');
                });
            });

            it("test values should be inserted into the database", function() {
                expect(class_db_test_list.refreshTestListValues()).toBeTruthy();
            });
        });

        describe("workflow", function() {
            describe("the background color should change dependent on update status", function() {
                var question_input_color;
                it("not saved user input should turn input_field red", function() {
                    $("#" + answer_field_id).trigger("click");
                    spyOn(class_display_list.class_list_editor.update_answer, "changeBackgroundcolorToNotUpdated");
                    $("#" + answer_field_id).trigger({
                        type: 'keypress',
                    });
                    expect(class_display_list.class_list_editor.update_answer.changeBackgroundcolorToNotUpdated).toHaveBeenCalled();
                });
                it("the background color should be white again", function() {
                    $("#" + answer_field_id).trigger("click");
                    $("#" + answer_field_id).css("background-color", "yellow");
                    $("#" + answer_field_id).focus();
                    class_display_list.class_list_editor.update_answer.updateAnswer();
                    question_input_color = $("#" + answer_field_id).css("background-color");
                    expect(question_input_color).toBe(rgb_code_color_input_updated);
                    expect("#" + answer_field_id).not.toBeFocused();

                });
            });
        });
        describe("changeBackgroundcolorToNotUpdated", function() {
            it("question input should exist", function() {
                expect("#" + answer_field_id).toExist();
            });
            it("changeBackgroundcolorToNotUpdated should be defined", function() {
                expect(class_display_list.class_list_editor.update_answer.changeBackgroundcolorToNotUpdated).toBeDefined();
            });
            it("color should change", function() {
                class_display_list.class_list_editor.update_answer.answer_id = class_db_test_list.answer_obj_1.answer_id;
                class_display_list.class_list_editor.update_answer.changeBackgroundcolorToNotUpdated();
                var question_color = $("#" + answer_field_id).css("background-color");
                expect(question_color).toBe(rgb_code_color_input_not_updated);
            });
        });

        describe("getAnswerValue", function() {
            it("should been defined", function() {
                expect(class_display_list.class_list_editor.update_answer.getAnswerValue).toBeDefined();
            });
            it("getAnswerValue should return the correct value", function() {
                $("#" + answer_field_id).trigger("click");
                $("#" + answer_field_id).val("moin");
                var read_value = class_display_list.class_list_editor.update_answer.getAnswerValue();
                expect(read_value).toBe("moin");
            });

        });


        describe(" check keypress listener for question", function() {
            beforeEach(function() {
                jasmine.clock().install();
            });

            afterEach(function() {
                jasmine.clock().uninstall();
            });
            var div_id = class_display_list.class_list_editor.update_answer.answer_div_id_prefix + class_db_test_list.answer_obj_1.answer_id;
            var answer_field_id = class_display_list.class_list_editor.update_answer.answer_input_id_prefix + class_db_test_list.answer_obj_1.answer_id;
            it("answer div should exist", function() {
                expect("#" + div_id).toExist();
            });
            it("question input should exist", function() {
                expect("#" + answer_field_id).toExist();
            });
            it("finish of user input should trigger update answer", function() {
                $("#" + div_id).trigger("click");
                spyOn(class_display_list.class_list_editor.update_answer, "updateAnswer");
                $("#" + answer_field_id).trigger({
                    type: 'keypress',
                });
                jasmine.clock().tick(1000);
                expect(class_display_list.class_list_editor.update_answer.updateAnswer).toHaveBeenCalled();
            });
            it("not saved user input should turn input_field red", function() {
                $("#" + div_id).trigger("click");
                spyOn(class_display_list.class_list_editor.update_answer, "changeBackgroundcolorToNotUpdated");
                $("#" + answer_field_id).trigger({
                    type: 'keypress',
                });
                expect(class_display_list.class_list_editor.update_answer.changeBackgroundcolorToNotUpdated).toHaveBeenCalled();
            });
            it("saved user input should turn input_field azure again", function() {
                $("#" + answer_field_id).trigger("click");
                $("#" + answer_field_id).css("background-color", "red");
                class_display_list.class_list_editor.update_answer.changeBackgroundcolorToUpdated();
                var background_color = $("#" + answer_field_id).css("background-color");
                expect(background_color).toBe(rgb_code_color_input_updated);
            });
        });
    });
});