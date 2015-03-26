describe("ClassListEditorNewVocCreateFieldAnswer***", function() {
    var class_display_list = new ClassDisplayList();
    var class_db_test_list = new ClassDbTestList();
    var test_voc_array = class_db_test_list.value_array;
    beforeEach(function() {
        class_display_list.setUpHTMLFixture();
        spyOn(class_display_list, "getJsonData").and.callFake(function() {
            return test_voc_array;
        });
        class_display_list.displayList(test_voc_array);
    });

    describe("answer_main_div", function() {
        var div_id = class_display_list.voc_div_id_prefix + 0;
        var answer_main_div_id = class_display_list.answer_main_div_id_prefix + 0;
        var answer_main_div_class = class_display_list.answer_main_div_class;
        it("answer_main_divs should exist", function() {
            expect("#" + answer_main_div_id).toExist();
        });
        it("answer_main_div should be in correct div", function() {
            expect("#" + div_id + " #" + answer_main_div_id).toExist();
        });
        it("answer_main_div should have the correct class", function() {
            expect("#" + answer_main_div_id + "." + answer_main_div_class).toExist();
        });
    });
    describe("answer_div", function() {
        var div_id = class_display_list.voc_div_id_prefix + 0;
        var answer_div_id = class_display_list.new_voc_answer_div_option;
        var answer_div_class = class_display_list.answer_div_class;
        it("answer_divs should exist", function() {
            expect("#" + answer_div_id).toExist();
        });
        it("answer_div should be in correct div", function() {
            expect("#" + div_id + " #" + answer_div_id).toExist();
        });
        it("answer_div should have the correct class", function() {
            expect("#" + answer_div_id + "." + answer_div_class).toExist();
        });
    });
    describe("answer_input", function() {
        var answer_div_id = class_display_list.new_voc_answer_div_option;
        var answer_input_id = class_display_list.new_voc_answer_input_option;
        var answer_input_class = class_display_list.new_voc_answer_input_class_option;
        var answer_input_value = class_display_list.new_answer_value;

        it("answer_inputs should exist", function() {
            expect("#" + answer_input_id).toExist();
        });
        it("answer_input should be in correct div", function() {
            expect("#" + answer_div_id + " #" + answer_input_id).toExist();
        });
        it("answer_input should have the correct class", function() {
            expect("#" + answer_input_id + "." + answer_input_class).toExist();
        });
        it("answer should have the correct value", function() {
            expect("#" + answer_input_id).toHaveValue(answer_input_value);
        });
    });
    describe("answer_delete_button", function() {
        var answer_div_id = class_display_list.new_voc_answer_div_option;
        var answer_delete_button_id = class_display_list.new_answer_delete_button_id_prefix + 0;
        var answer_delete_button_class = class_display_list.new_answer_delete_button_class;
        it("answer_delete_buttons should exist", function() {
            expect("#" + answer_delete_button_id).toExist();
        });
        it("answer_delete_button should be in correct div", function() {
            expect("#" + answer_div_id + " #" + answer_delete_button_id).toExist();
        });
        it("answer_delete_button should have the correct class", function() {
            expect("#" + answer_delete_button_id + "." + answer_delete_button_class).toExist();
        });
    });

});