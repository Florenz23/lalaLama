describe("ClassListEditorNewVocCreateFieldVocMenu***", function() {

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
    describe("voc_menu", function() {
        describe("voc_menu_div", function() {
            var div_id = class_display_list.voc_div_id_prefix + 0;
            var voc_menu_div_id = class_display_list.voc_menu_div_id_prefix + 0;
            var voc_menu_div_class = class_display_list.voc_menu_div_class;
            it("voc_menu_divs should exist", function() {
                expect("#" + voc_menu_div_id).toExist();
            });
            it("voc_menu_div should be in correct div", function() {
                expect("#" + div_id + " #" + voc_menu_div_id).toExist();
            });
            it("voc_menu_div should have the correct class", function() {
                expect("#" + voc_menu_div_id + "." + voc_menu_div_class).toExist();
            });
        });
        describe("answer_add_button", function() {
            var answer_div_id = class_display_list.answer_div_id_prefix + 0;
            var mother_div = class_display_list.voc_menu_div_id_prefix + 0;
            var answer_add_button_id = class_display_list.new_answer_add_button_id_prefix + 0;
            var answer_add_button_class = class_display_list.new_answer_add_button_class;
            it("answer_add_buttons should exist", function() {
                expect("#" + answer_add_button_id).toExist();
            });
            it("answer_add_button should be in correct div", function() {
                expect("#" + mother_div + " #" + answer_add_button_id).toExist();
            });
            it("answer_add_button should have the correct class", function() {
                expect("#" + answer_add_button_id + "." + answer_add_button_class).toExist();
            });
        });
        describe("new_voc_delete_button", function() {
            var answer_div_id = class_display_list.answer_div_id_prefix + 0;
            var mother_div = class_display_list.voc_menu_div_id_prefix + 0;
            var voc_delete_button_id = class_display_list.new_voc_delete_button_id_prefix + 0;
            var voc_delete_button_class = class_display_list.new_voc_delete_button_class;
            it("voc_delete_buttons should exist", function() {
                expect("#" + voc_delete_button_id).toExist();
            });
            it("answer_add_button should be in correct div", function() {
                expect("#" + mother_div + " #" + voc_delete_button_id).toExist();
            });
            it("voc_delete_button should have the correct class", function() {
                expect("#" + voc_delete_button_id + "." + voc_delete_button_class).toExist();
            });
        });
    });
});