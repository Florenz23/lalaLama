describe("ClassListEditorupdateQuestion***", function() {
    var class_trainer_info = new ClassTrainerInfo();
    var class_ajax = new ClassAjax();
    var class_display_list = new ClassDisplayList();
    var class_db_test_list = new ClassDbTestList();
    var class_update_voc = new ClassListEditorUpdateQuestion();
    var voc_id_1 = class_db_test_list.value_obj_1.voc_id;

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
        class_update_voc.old_question_value = "not_set";
        class_update_voc.voc_id = "not_set";
    });
    describe("updateQuestion***", function() {
        var voc_id = class_db_test_list.value_obj_1.voc_id;
        var voc_div_id = class_display_list.voc_div_id_prefix + voc_id;
        var question_field_id = class_display_list.question_input_id_prefix + voc_id;

        describe("db part", function() {
            describe("saveUpdatedQuestionValue", function() {
                it("should be defined", function() {
                    expect(class_display_list.class_list_editor.update_question.saveUpdatedQuestionValue).toBeDefined();
                });
                it("html elements should exist", function() {
                    expect("#" + voc_div_id).toExist();
                    expect("#" + question_field_id).toExist();
                });
                it("should update correctly", function() {
                    $("#" + voc_div_id).trigger("mouseover");
                    $("#" + question_field_id).val("moin");
                    var voc_info = class_trainer_info.voc_table;
                    var data = {
                        table: voc_info.name,
                        primary: voc_info.id,
                        primary_value: voc_id,
                        key: voc_info.question_row,
                        key_value: "moin"
                    };
                    class_display_list.class_list_editor.update_question.updateQuestion();
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
                    $("#" + question_field_id).trigger("click");
                    spyOn(class_display_list.class_list_editor.update_question, "changeBackgroundcolorToNotUpdated");
                    $("#" + question_field_id).trigger({
                        type: 'keypress',
                    });
                    expect(class_display_list.class_list_editor.update_question.changeBackgroundcolorToNotUpdated).toHaveBeenCalled();
                });
                it("the background color should be white again", function() {
                    $("#" + question_field_id).trigger("click");
                    $("#" + question_field_id).css("background-color", "yellow");
                    $("#" + question_field_id).focus();
                    class_display_list.class_list_editor.update_question.updateQuestion();
                    question_input_color = $("#" + question_field_id).css("background-color");
                    expect(question_input_color).toBe(rgb_code_color_input_updated);
                    expect("#" + question_field_id).not.toBeFocused();

                });
            });
        });
        describe("changeBackgroundcolorToNotUpdated", function() {
            it("question input should exist", function() {
                expect("#" + question_field_id).toExist();
            });
            it("changeBackgroundcolorToNotUpdated should be defined", function() {
                expect(class_display_list.class_list_editor.update_question.changeBackgroundcolorToNotUpdated).toBeDefined();
            });
            it("color should change", function() {
                class_display_list.class_list_editor.update_question.voc_id = class_db_test_list.value_obj_1.voc_id;
                class_display_list.class_list_editor.update_question.changeBackgroundcolorToNotUpdated();
                var question_color = $("#" + question_field_id).css("background-color");
                expect(question_color).toBe(rgb_code_color_input_not_updated);
            });
        });

        describe("getQuestionValue", function() {
            it("should been defined", function() {
                expect(class_display_list.class_list_editor.update_question.getQuestionValue).toBeDefined();
            });
            it("getQuestionValue should return the correct value", function() {
                $("#" + question_field_id).trigger("click");
                $("#" + question_field_id).val("moin");
                var read_value = class_display_list.class_list_editor.update_question.getQuestionValue();
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
            var div_id = class_display_list.class_list_editor.update_question.voc_div_id_prefix + class_db_test_list.value_obj_1.voc_id;
            var question_field_id = class_display_list.class_list_editor.update_question.question_input_id_prefix + class_db_test_list.value_obj_1.voc_id;
            it("voc div should exist", function() {
                expect("#" + div_id).toExist();
            });
            it("question input should exist", function() {
                expect("#" + question_field_id).toExist();
            });
            it("finish of user input should trigger update voc", function() {
                $("#" + div_id).trigger("click");
                spyOn(class_display_list.class_list_editor.update_question, "updateQuestion");
                $("#" + question_field_id).trigger({
                    type: 'keypress',
                });
                jasmine.clock().tick(1000);
                expect(class_display_list.class_list_editor.update_question.updateQuestion).toHaveBeenCalled();
            });
            it("not saved user input should turn input_field red", function() {
                $("#" + div_id).trigger("click");
                spyOn(class_display_list.class_list_editor.update_question, "changeBackgroundcolorToNotUpdated");
                $("#" + question_field_id).trigger({
                    type: 'keypress',
                });
                expect(class_display_list.class_list_editor.update_question.changeBackgroundcolorToNotUpdated).toHaveBeenCalled();
            });
            it("saved user input should turn input_field azure again", function() {
                $("#" + question_field_id).trigger("click");
                $("#" + question_field_id).css("background-color", "red");
                class_display_list.class_list_editor.update_question.changeBackgroundcolorToUpdated();
                var background_color = $("#" + question_field_id).css("background-color");
                expect(background_color).toBe(rgb_code_color_input_updated);
            });
        });
    });
});