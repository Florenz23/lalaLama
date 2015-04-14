describe("ClassListEditorNewVocCreateFieldQuestion***", function() {
    var class_display_list = new ClassDisplayList();
    var class_db_test_list = new ClassDbTestList();
    var test_voc_array = class_db_test_list.complete_array;
    beforeEach(function() {
        class_display_list.setUpHTMLFixture();
        spyOn(class_display_list, "getJsonData").and.callFake(function() {
            return test_voc_array;
        });
        class_display_list.displayList(test_voc_array[0].list_id);
    });

    describe("question_main_div", function() {
        var div_id = class_display_list.voc_div_id_prefix + 0;
        var question_main_div_id = class_display_list.question_main_div_id_prefix + 0;
        var question_main_div_class = class_display_list.question_main_div_class;
        it("mother_div should exist", function() {
            expect("#" + "list_div").toExist();
            expect("#" + class_display_list.voc_div_id_prefix + 0).toExist();
        });
        it("question_main_divs should exist", function() {
            expect("#" + question_main_div_id).toExist();
        });
        it("question_main_div should be in correct div", function() {
            expect("#" + div_id + " #" + question_main_div_id).toExist();
        });
        it("question_main_div should have the correct class", function() {
            expect("#" + question_main_div_id + "." + question_main_div_class).toExist();
        });
    });
    describe("question_div", function() {
        var div_id = class_display_list.voc_div_id_prefix + 0;
        var question_div_id = class_display_list.question_div_id_prefix + 0;
        var question_div_class = class_display_list.question_div_class;
        it("question_divs should exist", function() {
            expect("#" + question_div_id).toExist();
        });
        it("question_div should be in correct div", function() {
            expect("#" + div_id + " #" + question_div_id).toExist();
        });
        it("question_div should have the correct class", function() {
            expect("#" + question_div_id + "." + question_div_class).toExist();
        });
    });
    describe("question_input", function() {
        var question_div_id = class_display_list.question_div_id_prefix + 0;
        var question_input_id = class_display_list.new_voc_question_input_id;
        var question_input_class = class_display_list.new_voc_question_input_class;
        var question_input_value = class_display_list.new_question_value;
        it("question_inputs should exist", function() {
            expect("#" + question_input_id).toExist();
        });
        it("question_input should be in correct div", function() {
            expect("#" + question_div_id + " #" + question_input_id).toExist();
        });
        it("question_input should have the correct class", function() {
            expect("#" + question_input_id + "." + question_input_class).toExist();
        });
        it("question should have the correct value", function() {
            expect("#" + question_input_id).toHaveValue(question_input_value);
        });
    });
});