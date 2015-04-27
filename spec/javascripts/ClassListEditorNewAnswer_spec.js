//checkt ClassListEditorAnswerEdit
ddescribe("ClassListEditorNewAnswer***", function() {
    var class_trainer_info = new ClassTrainerInfo();
    var class_ajax = new ClassAjax();
    var class_list_editor = new ClassListEditor();
    var class_display_list = new ClassDisplayList();
    var class_div_height_setter = new ClassDivHeightSetter();
    var class_list_editor_answer_edit = class_display_list.class_list_editor.answer_edit;
    var class_db_test_list = new ClassDbTestList();
    var list_id_to_be_tested = class_db_test_list.complete_array[0].list_id;
    var test_value_json_array_from_db = class_db_test_list.complete_array;
    beforeEach(function() {
        class_list_editor.setUpHTMLFixture();
        class_db_test_list.createListObjects();
        spyOn(class_display_list, "getJsonData").and.callFake(function() {
            return class_db_test_list.complete_array;
        });
        class_display_list.displayList(list_id_to_be_tested);
    });
    describe('db part: ', function() {
        describe('saveMultiAnswersInDb', function() {
            var answer_id_array;
            it('should be defined', function() {
                expect(class_list_editor_answer_edit.saveNewAnswerInDb).toBeDefined();
            });
            it('save multi answers', function() {
                class_list_editor_answer_edit.voc_id = class_db_test_list.complete_array[0].voc_id;
                spyOn(class_list_editor_answer_edit, "createValueObj").and.callFake(function() {
                    var obj = {
                        voc_id: class_list_editor_answer_edit.voc_id,
                        answer: "test_answer"
                    };
                    return obj;
                });
                expect(class_list_editor_answer_edit.voc_id).not.toBe("not_set");
                answer_id = class_list_editor_answer_edit.saveNewAnswerInDb();
                expect(answer_id).toBeGreaterThan("1");
            });
            it('answers should be deleted again', function() {
                var table = class_trainer_info.answer_table.name;
                var key = class_trainer_info.answer_table.id;
                var value = answer_id;
                class_ajax.deleteRow(table, key, value);
            });
        });
    });

    describe("addNewAnswer", function() {
        describe("check list", function() {
            var voc_id = 10;
            it("should   been called", function() {
                spyOn(class_list_editor_answer_edit, "addNewAnswerField");
                $("#" + class_display_list.answer_add_button_id_prefix + voc_id).trigger("click");
                expect(class_list_editor_answer_edit.addNewAnswerField).toHaveBeenCalled();
            });

            it("answer should been added", function() {
                var prefix = class_list_editor_answer_edit.new_answer_prefix;
                var answer_input_id = prefix + class_display_list.answer_input_id_prefix + 1;
                var add_button_id = class_display_list.answer_add_button_id_prefix + voc_id;
                class_list_editor_answer_edit.answer_counter = 0;
                expect("#" + add_button_id).toExist();
                expect("#" + answer_input_id).not.toExist();
                $("#" + add_button_id).trigger("mouseover");
                $("#" + add_button_id).trigger("click");
                expect("#" + answer_input_id).toExist();
            });

        });
        describe("saveNewAnswer", function() {
            var new_answer_id = parseInt(class_db_test_list.complete_array[6].answer_id, 10) + 1;
            var voc_nr = class_db_test_list.complete_array[1].voc_id;
            var div_id = class_display_list.voc_div_id_prefix + class_db_test_list.complete_array[0].voc_id;
            var answer_input_id_1 = class_list_editor.answer_input_id_prefix + class_db_test_list.complete_array[3].answer_id;
            var answer_input_id_2 = class_list_editor.answer_input_id_prefix + new_answer_id;
            var prefix = class_list_editor_answer_edit.new_answer_prefix;
            var new_answer_input_id = prefix + class_display_list.answer_input_id_prefix + 1;
            var add_button_id = class_display_list.answer_add_button_id_prefix + voc_nr;
            var new_answer_value = "test";

            describe("step 1 ", function() {
                it("save_new_answer should be defined", function() {
                    expect(class_list_editor_answer_edit.saveNewAnswer).toBeDefined();
                });
                it("new_answer_input should exist", function() {
                    expect("#" + answer_input_id_1).toExist();
                });
            });

            describe("step 2", function() {
                beforeEach(function() {
                    class_list_editor_answer_edit.answer_counter = 0;
                    $("#" + add_button_id).trigger("mouseover");
                    $("#" + add_button_id).trigger("click");
                    $("#" + new_answer_input_id).val(new_answer_value);
                });
                it("elements should exist", function() {
                    expect("#" + add_button_id).toExist();
                    expect("#" + new_answer_input_id).toExist();
                });
                it("value of new input should have changed", function() {
                    expect("#" + new_answer_input_id).toHaveValue(new_answer_value);
                });
                it("finish of user input should trigger update voc", function() {
                    jasmine.clock().install();
                    spyOn(class_list_editor_answer_edit, "saveNewAnswer");
                    $("#" + new_answer_input_id).trigger({
                        type: 'keydown',
                        which: 9
                    });
                    jasmine.clock().tick(1000);
                    expect(class_list_editor_answer_edit.saveNewAnswer).toHaveBeenCalled();
                    jasmine.clock().uninstall();
                });
                it("getAnswerValue should work", function() {
                    var get_answer_value = class_list_editor_answer_edit.getAnswerValue();
                    var expected_value = new_answer_value;
                    expect(get_answer_value).toBe(expected_value);
                });
            });
            describe("step 3", function() {
                var second_new_answer_input_id = prefix + class_display_list.answer_input_id_prefix + 2;
                var table = class_trainer_info.answer_table.name;
                var id_row_name = class_trainer_info.answer_table.id;
                var answer_id;
                var saved_value_input_id;
                beforeEach(function() {
                    class_list_editor_answer_edit.answer_counter = 0;
                    $("#" + add_button_id).trigger("mouseover");
                    $("#" + add_button_id).trigger("click");
                    $("#" + new_answer_input_id).val(new_answer_value);
                    answer_id = class_list_editor_answer_edit.saveNewAnswer();
                });
                afterEach(function() {
                    class_ajax.deleteRow(table, id_row_name, answer_id);
                });
                it("check if new value is displayed and has value", function() {
                    saved_value_input_id = class_list_editor.answer_input_id_prefix + answer_id;
                    expect("#" + saved_value_input_id).toExist();
                    expect("#" + saved_value_input_id).toHaveValue(new_answer_value);
                });
                it("new_input to insert another answer should exist", function() {
                    expect("#" + new_answer_input_id).toExist();
                });
                it("new_answer should be selected", function() {
                    expect("#" + new_answer_input_id).toBeFocused();
                });
                it("new_answer should be selected", function() {
                    expect("#" + second_new_answer_input_id).not.toExist();
                });
            });
            describe("check div height of main divs", function() {
                var voc_nr = class_db_test_list.complete_array[1].voc_id;
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
            describe("delete new_answer_field if user does not want another input", function() {
                var added_answer_div = class_list_editor.answer_div_id_prefix + 1;
                var delete_img_class = class_display_list.answer_delete_button_class;
                var delete_img_pointer = "#" + added_answer_div + " ." + delete_img_class;
                var voc_nr = 10;
                beforeEach(function() {
                    class_display_list.class_list_editor.answer_edit.voc_id = voc_nr;
                    class_list_editor_answer_edit.answer_counter = 0;
                    class_list_editor_answer_edit.addNewAnswerField();
                });
                describe("delete by button", function() {
                    it("html elements should exist", function() {
                        expect("#" + added_answer_div).toExist();
                        expect(delete_img_pointer).toExist();
                    });
                    it("setAnswerId listener should have been called", function() {
                        spyOn(class_display_list.class_list_editor.answer_edit, "setAnswerId");
                        $("#" + added_answer_div).trigger("mouseover");
                        $(delete_img_pointer).trigger("click");
                        expect(class_display_list.class_list_editor.answer_edit.setAnswerId).toHaveBeenCalled();
                    });
                    it("click on delete img should trigger function", function() {
                        spyOn(class_display_list.class_list_editor.answer_edit, "deleteAnswerDiv");
                        $("#" + added_answer_div).trigger("mouseover");
                        $(delete_img_pointer).trigger("click");
                        expect(class_display_list.class_list_editor.answer_edit.deleteAnswerDiv).toHaveBeenCalled();
                    });
                    it("click on delete img should remove div", function() {
                        var div_height_0 = class_div_height_setter.getAnswerDivHeight(voc_nr);
                        $("#" + added_answer_div).trigger("mouseover");
                        $(delete_img_pointer).trigger("click");
                        expect("#" + added_answer_div).not.toExist();
                        var div_height_1 = class_div_height_setter.getAnswerDivHeight(voc_nr);
                        expect(div_height_1).toBeLessThan(div_height_0);
                    });
                });
                describe("delete by blur", function() {
                    var prefix = class_display_list.new_answer_prefix;
                    var answer_input_class = prefix + class_display_list.answer_input_class;
                    var answer_input_id = prefix + class_display_list.answer_input_id_prefix + 1;
                    it("input field should exist", function() {
                        expect("#" + answer_input_id).toExist();
                    });
                    it("input field should be selected", function() {
                        expect("#" + answer_input_id).toBeFocused();
                    });
                    it("answer input class should be correct", function() {
                        expect("#" + answer_input_id + "." + answer_input_class).toExist();
                    });
                    it("delete Answer div should been called", function() {
                        spyOn(class_display_list.class_list_editor.answer_edit, "deleteAnswerDiv");
                        $("#" + answer_input_id).triggerHandler("blur");
                        expect(class_display_list.class_list_editor.answer_edit.deleteAnswerDiv).toHaveBeenCalled();
                    });
                    it("anwer input should been removed", function() {
                        $("#" + answer_input_id).triggerHandler("blur");
                        expect("#" + answer_input_id).not.toExist();
                    });
                });
            });
        });
    });
});