describe("ClassListEditorSaveNewVoc***", function() {
    var class_trainer_info = new ClassTrainerInfo();
    var class_ajax = new ClassAjax();
    var class_list_editor = new ClassListEditor();
    var class_display_list = new ClassDisplayList();
    var class_div_height_setter = new ClassDivHeightSetter();
    var class_list_editor_save_new_voc = class_display_list.class_list_editor.save_new_voc;
    var class_db_test_list = new ClassDbTestList();
    var list_id_to_be_tested = class_db_test_list.value_obj_1.list_id;
    var test_value_json_array_from_db = class_display_list.getJsonData(list_id_to_be_tested);
    beforeEach(function() {
        class_list_editor.setUpHTMLFixture();
        spyOn(class_display_list, "getJsonData").and.callFake(function() {
            return test_value_json_array_from_db;
        });
        class_display_list.displayList(list_id_to_be_tested);
    });


    it("test values should be inserted into the database", function() {
        expect(class_db_test_list.refreshTestListValues()).toBeTruthy();
    });


    describe("addNewAnswer", function() {
        describe("stpep 1", function() {
            var voc_div_id = class_display_list.voc_div_id_prefix + 0;
            var add_button_id = class_display_list.new_answer_add_button_id_prefix + 0;
            var answer_input_option_id = class_display_list.new_voc_answer_input_option;
            var answer_input_id = class_display_list.new_answer_input_id_prefix + 0;
            it("add button should exist", function() {
                expect("#" + add_button_id).toExist();
            });
            it("should been called", function() {
                spyOn(class_list_editor_save_new_voc, "saveNewAnswer");
                $("#" + add_button_id).trigger("click");
                expect(class_list_editor_save_new_voc.saveNewAnswer).toHaveBeenCalled();
            });
            it("add button should exist", function() {
                expect("#" + add_button_id).toExist();
            });
            it("answer_input_option should exist", function() {
                expect("#" + answer_input_option_id).toExist();
            });
            it("answer_input should not exist yet", function() {
                expect("#" + answer_input_id).not.toExist();
            });
            it("answer should been added", function() {
                class_list_editor_save_new_voc.answer_counter = 0;
                $("#" + voc_div_id).trigger("mouseover");
                $("#" + add_button_id).trigger("click");
                expect("#" + answer_input_id).toExist();
                expect("#" + answer_input_option_id).toBeFocused();
            });

        });
        describe("step 2", function() {
            var voc_div_id = class_display_list.voc_div_id_prefix + 0;
            var add_button_id = class_display_list.new_answer_add_button_id_prefix + 0;
            var answer_input_option_id = class_display_list.new_voc_answer_input_option;
            var answer_delete_button_id_1 = class_display_list.new_answer_delete_button_id_prefix + 0;
            var answer_delete_button_id_2 = class_display_list.new_answer_delete_button_id_prefix + 1;
            var answer_input_id_1 = class_display_list.new_answer_input_id_prefix + 0;
            var answer_input_id_2 = class_display_list.new_answer_input_id_prefix + 1;
            var new_answer_value_1 = "moin_1";
            var new_answer_value_2 = "moin_2";
            var done_typing_interval = class_list_editor_save_new_voc.done_typing_interval;
            var voc_info;
            var answer_info;
            beforeEach(function() {
                $("#" + voc_div_id).trigger("mouseover");
                class_list_editor_save_new_voc.answer_counter = 0;
                $("#" + answer_input_option_id).val(new_answer_value_1);
                $("#" + add_button_id).trigger("click");
                $("#" + answer_input_option_id).val(new_answer_value_2);
                // jasmine.clock().install();
                spyOn(class_list_editor_save_new_voc, "saveNewAnswer").and.callThrough();
                $("#" + answer_input_option_id).trigger({
                    type: 'keydown',
                    which: 9
                });
                // jasmine.clock().tick(done_typing_interval);
                // jasmine.clock().uninstall();
            });

            it("add_button should exist", function() {
                expect("#" + add_button_id).toExist();
            });

            it("save_new_answer should be defined", function() {
                expect(class_list_editor_save_new_voc.saveNewAnswer).toBeDefined();
            });
            it("save_new_answer should been called", function() {
                expect(class_list_editor_save_new_voc.saveNewAnswer).toHaveBeenCalled();
            });
            it("answer_delete_buttons should exist", function() {
                expect("#" + answer_delete_button_id_1).toExist();
                expect("#" + answer_delete_button_id_2).toExist();
            });
            it("answer_input_elements should exist", function() {
                expect("#" + answer_input_option_id).toExist();
                expect("#" + answer_input_id_1).toExist();
                expect("#" + answer_input_id_2).toExist();
            });

            it("value of new input should have changed", function() {
                expect("#" + answer_input_id_1).toHaveValue(new_answer_value_1);
                expect("#" + answer_input_id_2).toHaveValue(new_answer_value_2);
            });
            describe("delete new_answer_field if user does not want another input", function() {
                var added_answer_div = class_list_editor.answer_div_id_prefix + 0;
                var delete_img_class = class_display_list.answer_delete_button_class;
                var delete_img_pointer = "#" + added_answer_div + " ." + delete_img_class;
                var voc_nr = 0;
                beforeEach(function() {
                    class_list_editor_save_new_voc.voc_id = voc_nr;
                    class_list_editor_save_new_voc.addNewAnswerField();
                });
                describe("delete by button", function() {
                    it("html elements should exist", function() {
                        expect("#" + added_answer_div).toExist();
                        expect(delete_img_pointer).toExist();
                    });
                    it("setAnswerId listener should have been called", function() {
                        spyOn(class_list_editor_save_new_voc, "setAnswerId");
                        $("#" + added_answer_div).trigger("mouseover");
                        $(delete_img_pointer).trigger("click");
                        expect(class_list_editor_save_new_voc.setAnswerId).toHaveBeenCalled();
                    });
                    it("click on delete img should trigger function", function() {
                        spyOn(class_list_editor_save_new_voc, "deleteAnswerDiv");
                        $("#" + added_answer_div).trigger("mouseover");
                        $(delete_img_pointer).trigger("click");
                        expect(class_list_editor_save_new_voc.deleteAnswerDiv).toHaveBeenCalled();
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
            });
        });
    });
    describe("Input Field selection", function() {
        var question_input_id = class_display_list.new_voc_question_input_id;
        var answer_input_id = class_display_list.new_voc_answer_input_option;
        it("klick should select question_field", function() {
            $("#" + question_input_id).trigger("click");
            expect("#" + question_input_id).toBeFocused();
        });
        it("klick should select answer_field", function() {
            $("#" + answer_input_id).trigger("click");
            expect("#" + answer_input_id).toBeFocused();
        });
    });
    describe("saveNewVoc single input", function() {
        var voc_div_id = class_display_list.voc_div_id_prefix + 0;
        var add_button_id = class_display_list.new_answer_add_button_id_prefix + 0;
        var answer_input_option_id = class_display_list.new_voc_answer_input_option;
        var question_input_id = class_display_list.new_voc_question_input_id;
        var answer_input_id_1 = class_display_list.new_answer_input_id_prefix + 0;
        var question_value = "moin";
        var new_answer_value_1 = "moin_1";
        var returned_id_array;
        var returned_question_id;
        var returned_answer_id_array;
        var returned_answer_id_1;
        beforeEach(function() {
            $("#" + voc_div_id).trigger("mouseover");
            class_list_editor_save_new_voc.answer_counter = 0;
            $("#" + question_input_id).val(question_value);
            $("#" + answer_input_option_id).val(new_answer_value_1);

        });
        it("answer_input_elements should exist", function() {
            expect("#" + question_input_id).toExist();
            expect("#" + answer_input_option_id).toExist();
        });

        it("value of new input should have changed", function() {
            expect("#" + question_input_id).toHaveValue(question_value);
            expect("#" + answer_input_option_id).toHaveValue(new_answer_value_1);
        });

        it("answer_array should be correct", function() {
            var answer_array = class_list_editor_save_new_voc.getAnswerArray();
            var expcted_answer_array = [new_answer_value_1];
            expect(answer_array).toEqual(expcted_answer_array);
        });
        it("list_id should be delivered", function() {
            var list_id = class_list_editor_save_new_voc.list_id;
            var expected_list_id = class_db_test_list.value_obj_1.list_id;
            expect(list_id).toBe(expected_list_id);
        });
        it("check returned_question_id", function() {
            returned_id_array = class_list_editor_save_new_voc.saveNewVoc();
            returned_question_id = returned_id_array.question_id;
            expect(returned_question_id).toBeTruthy();
        });

        it("check returned_answer_id_array", function() {
            returned_answer_id_array = returned_id_array.answer_id_array;
            returned_answer_id_1 = returned_answer_id_array[0];
            expect(returned_answer_id_1).toBeTruthy();
        });
        it("check question db answer entry", function() {
            voc_info = class_trainer_info.voc_table;
            var data = {
                table: voc_info.name,
                primary: voc_info.id,
                primary_value: returned_question_id,
                key: voc_info.question_row,
                key_value: question_value
            };
            expect(class_ajax.checkIfValueExists(data)).toBe('1');
        });

        it("check first db answer entry", function() {
            answer_info = class_trainer_info.answer_table;
            var data = {
                table: answer_info.name,
                primary: answer_info.id,
                primary_value: returned_answer_id_1,
                key: answer_info.answer_row,
                key_value: new_answer_value_1
            };
            expect(class_ajax.checkIfValueExists(data)).toBe('1');
        });
        it("delete values again", function() {
            var voc_table = voc_info.name;
            var answer_table = answer_info.name;
            var voc_table_row = voc_info.id;
            var answer_table_row = answer_info.id;
            var delete_question_answer = class_ajax.deleteRow(voc_table, voc_table_row, returned_question_id);
            var delete_answer_answer_1 = class_ajax.deleteRow(answer_table, answer_table_row, returned_answer_id_1);
            expect(delete_question_answer).toBe('1');
            expect(delete_answer_answer_1).toBe('1');
        });
    });

    describe("saveNewVoc multiple input", function() {
        var voc_div_id = class_display_list.voc_div_id_prefix + 0;
        var add_button_id = class_display_list.new_answer_add_button_id_prefix + 0;
        var answer_input_option_id = class_display_list.new_voc_answer_input_option;
        var answer_delete_button_id_1 = class_display_list.new_answer_delete_button_id_prefix + 0;
        var answer_delete_button_id_2 = class_display_list.new_answer_delete_button_id_prefix + 1;
        var question_input_id = class_display_list.new_voc_question_input_id;
        var answer_input_id_1 = class_display_list.new_answer_input_id_prefix + 0;
        var answer_input_id_2 = class_display_list.new_answer_input_id_prefix + 1;
        var question_value = "moin";
        var new_answer_value_1 = "moin_1";
        var new_answer_value_2 = "moin_2";
        var returned_id_array;
        var returned_question_id;
        var returned_answer_id_array;
        var returned_answer_id_1;
        var returned_answer_id_2;
        beforeEach(function() {
            $("#" + voc_div_id).trigger("mouseover");
            class_list_editor_save_new_voc.answer_counter = 0;
            $("#" + question_input_id).val(question_value);
            $("#" + answer_input_option_id).val(new_answer_value_1);
            $("#" + add_button_id).trigger("click");
            $("#" + answer_input_option_id).val(new_answer_value_2);
            class_list_editor_save_new_voc.saveNewAnswer();
            // $("#" + answer_input_option_id).trigger({
            //     type: 'keypress',
            //     which: '13',
            // });

        });
        it("answer_input_elements should exist", function() {
            expect("#" + question_input_id).toExist();
            expect("#" + answer_input_option_id).toExist();
            expect("#" + answer_input_id_1).toExist();
            expect("#" + answer_input_id_2).toExist();
        });

        it("value of new input should have changed", function() {
            expect("#" + question_input_id).toHaveValue(question_value);
            expect("#" + answer_input_id_1).toHaveValue(new_answer_value_1);
            expect("#" + answer_input_id_2).toHaveValue(new_answer_value_2);
        });

        // it("saveNewVoc should have been called", function() {
        //     expect(class_list_editor_save_new_voc.saveNewVoc).toHaveBeenCalled();
        // });

        it("answer_array should be correct", function() {
            var answer_array = class_list_editor_save_new_voc.getAnswerArray();
            var expcted_answer_array = [new_answer_value_1, new_answer_value_2];
            expect(answer_array).toEqual(expcted_answer_array);
        });
        it("list_id should be delivered", function() {
            var list_id = class_list_editor_save_new_voc.list_id;
            var expected_list_id = class_db_test_list.value_obj_1.list_id;
            expect(list_id).toBe(expected_list_id);
        });
        it("check returned_question_id", function() {
            returned_id_array = class_list_editor_save_new_voc.saveNewVoc();
            returned_question_id = returned_id_array.question_id;
            expect(returned_question_id).toBeTruthy();
        });

        it("check returned_answer_id_array", function() {
            returned_answer_id_array = returned_id_array.answer_id_array;
            returned_answer_id_1 = returned_answer_id_array[0];
            returned_answer_id_2 = returned_answer_id_array[1];
            expect(returned_answer_id_1).toBeTruthy();
            expect(returned_answer_id_2).toBeTruthy();
        });
        it("check question db answer entry", function() {
            voc_info = class_trainer_info.voc_table;
            var data = {
                table: voc_info.name,
                primary: voc_info.id,
                primary_value: returned_question_id,
                key: voc_info.question_row,
                key_value: question_value
            };
            expect(class_ajax.checkIfValueExists(data)).toBe('1');
        });

        it("check first db answer entry", function() {
            answer_info = class_trainer_info.answer_table;
            var data = {
                table: answer_info.name,
                primary: answer_info.id,
                primary_value: returned_answer_id_1,
                key: answer_info.answer_row,
                key_value: new_answer_value_1
            };
            expect(class_ajax.checkIfValueExists(data)).toBe('1');
        });
        it("check second db question entry", function() {
            var data = {
                table: answer_info.name,
                primary: answer_info.id,
                primary_value: returned_answer_id_2,
                key: answer_info.answer_row,
                key_value: new_answer_value_2
            };
            expect(class_ajax.checkIfValueExists(data)).toBe('1');
        });
        it("delete values again", function() {
            var voc_table = voc_info.name;
            var answer_table = answer_info.name;
            var voc_table_row = voc_info.id;
            var answer_table_row = answer_info.id;
            var delete_question_answer = class_ajax.deleteRow(voc_table, voc_table_row, returned_question_id);
            var delete_answer_answer_1 = class_ajax.deleteRow(answer_table, answer_table_row, returned_answer_id_1);
            var delete_answer_answer_2 = class_ajax.deleteRow(answer_table, answer_table_row, returned_answer_id_2);
            expect(delete_question_answer).toBe('1');
            expect(delete_answer_answer_1).toBe('1');
            expect(delete_answer_answer_2).toBe('1');
        });
    });
});