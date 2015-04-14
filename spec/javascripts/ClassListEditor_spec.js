describe("ClassListEditor***", function() {
    var class_display_list = new ClassDisplayList();
    var class_db_test_list = new ClassDbTestList();
    var class_list_editor = new ClassListEditor();
    var list_id_to_be_tested_1;

    beforeEach(function() {
        class_list_editor.setUpHTMLFixture();
    });
    it("should be defined", function() {
        expect(class_list_editor).toBeDefined();
    });
    it("prepare db", function() {
        class_db_test_list.createListObjects();
    });
    describe("ListEditor interaction", function() {
        var test_voc_array = class_db_test_list.complete_array;
        var voc_nr = class_db_test_list.complete_array[0].voc_id;
        var voc_div_id = class_display_list.voc_div_id_prefix + voc_nr;
        var answer_nr = class_db_test_list.complete_array[0].answer_id;
        var answer_div_id = class_display_list.answer_div_id_prefix + answer_nr;
        beforeEach(function() {
            class_display_list.setUpHTMLFixture();
            spyOn(class_display_list, "getJsonData").and.callFake(function() {
                return test_voc_array;
            });
            class_display_list.displayList(test_voc_array[0].list_id);
            spyOn(class_display_list.class_list_editor, "setVocId").and.callThrough();
            spyOn(class_display_list.class_list_editor.answer_edit, "setAnswerId").and.callThrough();
            $("#" + voc_div_id).trigger("mouseover");
            $("#" + answer_div_id).trigger("mouseover");
        });
        describe("setVocId:", function() {
            var input_question_id = class_display_list.question_input_id_prefix + voc_nr;

            it("should be defined", function() {
                expect(class_display_list.class_list_editor.setVocId).toBeDefined();
            });
            it("voc_id should not been set", function() {
                var voc_id = new ClassListEditor().voc_id;
                expect(voc_id).toBe("not_set");
            });
            it("setVocId should been triggered by mouseover on div", function() {
                expect(class_display_list.class_list_editor.setVocId).toHaveBeenCalled();
            });
            it("getVocIdFromVocDivId should return 10", function() {
                expect(class_display_list.class_list_editor.getVocIdFromVocDivId("voc_div_10")).toBe(10);
            });
            it("class_display_list.class_list_editor.voc_id should be 10", function() {
                expect(class_display_list.class_list_editor.voc_id).toBe(10);
            });
        });
        describe("setAnswerId:", function() {
            var input_answer_id = class_display_list.question_input_id_prefix + voc_nr;

            it("should be defined", function() {
                expect(class_display_list.class_list_editor.answer_edit.setAnswerId).toBeDefined();
            });
            it("answer_id should not been set", function() {
                var answer_id = new ClassListEditorSetAnswerId().answer_id;
                expect(answer_id).toBe("not_set");
            });
            it("setAnswerId should been triggered by mouseover on div", function() {
                expect(class_display_list.class_list_editor.answer_edit.setAnswerId).toHaveBeenCalled();
            });
            it("getVocIdFromVocDivId should return 10", function() {
                expect(class_display_list.class_list_editor.answer_edit.getAnswerIdFromAnswerDivId("answer_div_7")).toBe(7);
            });
            it("class_display_list.class_list_editor.answer_edit.answer_id should be 7", function() {
                expect(class_display_list.class_list_editor.answer_edit.answer_id).toBe(7);
            });
        });


    });


});