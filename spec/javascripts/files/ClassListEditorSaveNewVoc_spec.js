describe("ClassListEditorSaveNewVoc***", function() {
    var class_trainer_info = new ClassTrainerInfo();
    var class_ajax = new ClassAjax();
    var class_list_editor = new ClassListEditor();
    var class_display_list = new ClassDisplayList();
    var class_div_height_setter = new ClassDivHeightSetter();
    var class_list_editor_save_new_voc = class_display_list.class_list_editor.save_new_voc;
    var class_db_test_list = new ClassDbTestList();
    var list_id_to_be_tested = class_db_test_list.complete_array[0].list_id;
    var test_value_json_array_from_db = class_display_list.getJsonData(list_id_to_be_tested);
    beforeEach(function() {
        class_list_editor.setUpHTMLFixture();
        spyOn(class_display_list, "getJsonData").and.callFake(function() {
            return class_db_test_list.complete_array;
        });
        class_display_list.displayList(list_id_to_be_tested);
    });

    describe('db part: ', function() {
        var returned_id;
        describe('saveQuestionInDb', function() {
            it('should be defined', function() {
                expect(class_list_editor_save_new_voc.saveQuestionInDb).toBeDefined();
            });
            it('voc should be inserted', function() {
                spyOn(class_list_editor_save_new_voc, "createQuestionObj").and.callFake(function() {
                    var obj = {
                        list_id: 12,
                        question: "jo"
                    };
                    return obj;
                });
                returned_id = class_list_editor_save_new_voc.saveQuestionInDb();
                expect(returned_id).toBeGreaterThan("1");
            });
            it('voc should be deleted again', function() {
                var table = class_trainer_info.voc_table.name;
                var key = class_trainer_info.voc_table.id;
                var value = returned_id;
                class_ajax.deleteRow(table, key, value);
            });
        });
        describe('saveMultiAnswersInDb', function() {
            var answer_id_array;
            it('should be defined', function() {
                expect(class_list_editor_save_new_voc.saveMultiAnswersInDb).toBeDefined();
            });
            it('save multi answers', function() {
                spyOn(class_list_editor_save_new_voc, "createAnswerValueObjArray").and.callFake(function() {
                    var obj_array = [];
                    var obj = {
                        voc_id: class_list_editor_save_new_voc.voc_id,
                        answer: "moin"
                    };
                    obj_array[0] = obj;
                    obj_array[1] = obj;
                    obj_array[2] = obj;
                    return obj_array;
                });
                expect(class_list_editor_save_new_voc.voc_id).not.toBe("not_set");
                answer_id_array = class_list_editor_save_new_voc.saveMultiAnswersInDb();
                expect(answer_id_array.length).toBe(3);
                expect(answer_id_array[0]).toBeGreaterThan("1");
            });
            it('answers should be deleted again', function() {
                var table = class_trainer_info.answer_table.name;
                var key = class_trainer_info.answer_table.id;
                var value = answer_id_array[0];
                class_ajax.deleteRow(table, key, value);
                value = answer_id_array[1];
                class_ajax.deleteRow(table, key, value);
                value = answer_id_array[2];
                class_ajax.deleteRow(table, key, value);
            });
        });
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
                expect("#" + answer_input_option_id).toExist();
                // expect("#" + answer_input_option_id).toBeFocused();
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
                spyOn(class_list_editor_save_new_voc, "saveNewAnswer").and.callThrough();
                $("#" + answer_input_option_id).trigger({
                    type: 'keydown',
                    which: 9
                });
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
                var delete_img_class = class_display_list.new_voc_answer_delete_button_class;
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
            // expect("#" + question_input_id).toBeFocused();
        });
        it("klick should select answer_field", function() {
            $("#" + answer_input_id).trigger("click");
            // expect("#" + answer_input_id).toBeFocused();
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
        var new_answer_value_2 = "moin_2";
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
        it("answer_array longer than 1 should be correct", function() {
            var add_button_id = class_display_list.new_answer_add_button_id_prefix + 0;
            $("#" + add_button_id).trigger("click");
            $("#" + answer_input_option_id).val(new_answer_value_2);
            var answer_array = class_list_editor_save_new_voc.getAnswerArray();
            var expcted_answer_array = [new_answer_value_1, new_answer_value_2];
            expect(answer_array).toEqual(expcted_answer_array);
        });
        it("list_id should be delivered", function() {
            var list_id = class_list_editor_save_new_voc.list_id;
            var expected_list_id = class_db_test_list.complete_array[0].list_id;
            expect(list_id).toBe(expected_list_id);
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

        it("answer_array should be correct", function() {
            var answer_array = class_list_editor_save_new_voc.getAnswerArray();
            var expcted_answer_array = [new_answer_value_1, new_answer_value_2, "Neue Antwort"];
            expect(answer_array).toEqual(expcted_answer_array);
        });
        it("list_id should be delivered", function() {
            var list_id = class_list_editor_save_new_voc.list_id;
            var expected_list_id = class_db_test_list.complete_array[0].list_id;
            expect(list_id).toBe(expected_list_id);
        });
    });
    describe('after the save should the new voc displayed correctly', function() {
        var voc_div_id = class_display_list.voc_div_id_prefix + 0;
        var add_button_id = class_display_list.new_answer_add_button_id_prefix + 0;
        var answer_input_option_id = class_display_list.new_voc_answer_input_option;
        var new_voc_question_input_id = class_display_list.new_voc_question_input_id;
        var new_voc_answer_input_id_1 = class_display_list.new_answer_input_id_prefix + 0;
        var new_voc_answer_input_id_2 = class_display_list.new_answer_input_id_prefix + 1;
        var question_value = "moin";
        var new_answer_value_1 = "moin_1";
        var new_answer_value_2 = "moin_2";
        beforeEach(function() {
            $("#" + voc_div_id).trigger("mouseover");
            class_list_editor_save_new_voc.answer_counter = 0;
            $("#" + new_voc_question_input_id).val(question_value);
            $("#" + answer_input_option_id).val(new_answer_value_1);
            $("#" + add_button_id).trigger("click");
            $("#" + answer_input_option_id).val(new_answer_value_2);
            spyOn(class_list_editor_save_new_voc, "saveDataInDb").and.callFake(function() {
                var object = {
                    question_id: "1",
                    answer_id_array: ["1", "2", "3"]
                };
                return object;
            });
            returned_id_array = class_list_editor_save_new_voc.saveNewVoc();
            returned_question_id = returned_id_array.question_id;
            returned_answer_id_array = returned_id_array.answer_id_array;
            question_input_id = class_display_list.question_input_id_prefix + returned_question_id;
            answer_input_id_0 = class_display_list.answer_input_id_prefix + returned_answer_id_array[0];
            answer_input_id_1 = class_display_list.answer_input_id_prefix + returned_answer_id_array[1];
        });
        it('there should be a returned question id', function() {
            expect(returned_question_id).toBe("1");

        });
        it('answer_id_array should been delivered correctly', function() {
            expect(returned_answer_id_array[0]).toBe("1");
            expect(returned_answer_id_array[1]).toBe("2");

        });
        it('new input fields should be displayed after the safe', function() {

            expect("#" + question_input_id).toExist();
            expect("#" + answer_input_id_0).toExist();
            expect("#" + answer_input_id_1).toExist();
        });
        it('the buttons should exist', function() {
            expect("#" + class_display_list.voc_delete_button_id_prefix + returned_question_id).toExist();
            expect("#" + class_display_list.answer_add_button_id_prefix + returned_question_id).toExist();
            expect("#" + class_display_list.answer_delete_button_id_prefix + returned_answer_id_array[1]).toExist();

        });
        it('new input fields should have the correct values after safe', function() {
            expect("#" + question_input_id).toHaveValue(question_value);
            expect("#" + answer_input_id_0).toHaveValue(new_answer_value_1);
            expect("#" + answer_input_id_1).toHaveValue(new_answer_value_2);
        });
    });
});