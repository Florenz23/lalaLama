ddescribe("ClassListEditorDeleteAnswer***", function() {
    var class_trainer_info = new ClassTrainerInfo();
    var class_ajax = new ClassAjax();
    var class_list_editor = new ClassListEditor();
    var class_display_list = new ClassDisplayList();
    var class_div_height_setter = new ClassDivHeightSetter();
    var class_list_editor_answer_edit = class_display_list.class_list_editor.answer_edit;
    var class_db_test_list = new ClassDbTestList();
    var list_id_to_be_tested = class_db_test_list.complete_array[0].list_id;
    beforeEach(function() {
        class_list_editor.setUpHTMLFixture();
        class_db_test_list.createListObjects();
        spyOn(class_display_list, "getJsonData").and.callFake(function() {
            return class_db_test_list.complete_array;
        });
        class_display_list.displayList(list_id_to_be_tested);
    });

    describe("deleteAnswer", function() {
        describe("div", function() {
            var voc_id = 9;
            var answer_div_id = class_display_list.answer_div_id_prefix + voc_id;
            var answer_delete_button_id = class_display_list.answer_delete_button_id_prefix + voc_id;
            it("should be defined", function() {
                expect(class_list_editor_answer_edit.deleteAnswerDiv).toBeDefined();
            });
            it("should been called", function() {
                spyOn(class_list_editor_answer_edit, "deleteAnswerDiv");
                $("#" + answer_div_id).trigger("mouseover");
                $("#" + answer_delete_button_id).trigger("click");
                expect(class_list_editor_answer_edit.deleteAnswerDiv).toHaveBeenCalled();
            });
            it("answer should been deleted", function() {
                var delete_button_id = class_display_list.answer_delete_button_id_prefix + voc_id;
                class_display_list.answer_counter = 0;
                expect("#" + delete_button_id).toExist();
                expect("#" + answer_div_id).toExist();
                $("#" + answer_div_id).trigger("mouseover");
                $("#" + delete_button_id).trigger("click");
                expect("#" + answer_div_id).not.toExist();
            });
        });
        describe("db", function() {
            it("should be defined", function() {
                expect(class_display_list.class_list_editor.answer_edit.deleteAnswerOfDb).toBeDefined();
            });
            it('reset db_test_list', function() {
                var operation = "resetVocList";
                class_ajax.masterAjaxTest(operation);
            });
            it('delete Voc should work', function() {
                var answer_id = class_db_test_list.complete_array[0].answer_id;
                class_list_editor_answer_edit.answer_id = answer_id;
                var check_value = class_list_editor_answer_edit.deleteAnswerOfDb();
                expect(check_value.status).toBe("deleted.ok");
            });
        });
    });
});