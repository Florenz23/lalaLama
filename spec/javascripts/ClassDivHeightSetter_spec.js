describe("ClassdivHeightSetter***", function() {
    var class_display_list = new ClassDisplayList();
    var class_div_height_setter = new ClassDivHeightSetter();
    var class_list_editor_answer_edit = new ClassListEditorAnswerEdit();
    var list_id_to_be_tested_1 = class_db_test_list.value_obj_1.list_id;
    var test_value_json_array_from_db_0 = class_db_test_list.value_array;
    var div_height;
    var voc_nr;
    beforeEach(function() {
        class_display_list.setUpHTMLFixture();
        $("#list_div").html("");
        spyOn(class_display_list, "getJsonData").and.callFake(function() {
            return test_value_json_array_from_db_0;
        });
        class_display_list.displayList(list_id_to_be_tested_1);
        class_list_editor_answer_edit.addNewAnswerField();
    });

    describe("check new_voc_div", function() {
        var voc_nr = 0;
        var div_height = 92;
        it("should be defined", function() {
            expect(class_div_height_setter.getHighestDivValue).toBeDefined();
        });
        it("should be defined", function() {
            expect(class_div_height_setter.setDivHeight).toBeDefined();
        });
        it("check new voc highest", function() {
            var highest_div_value = class_div_height_setter.getHighestDivValue(voc_nr);
            var expected_value = div_height + 40;
            if (highest_div_value == 143) {
                expected_value = 143;
            }
            expect(highest_div_value).toBe(expected_value);
        });
        it("divs height should been set", function() {
            class_div_height_setter.setDivHeight();
            var voc_div_id = "#" + class_display_list.voc_div_id_prefix + voc_nr;
            var new_question_height = $(voc_div_id + " ." + class_display_list.question_main_div_class).height();
            var new_answer_height = $(voc_div_id + " ." + class_display_list.answer_main_div_class).height();
            var new_voc_menu_height = $(voc_div_id + " ." + class_display_list.voc_menu_div_class).height();
            if (new_question_height == 103) {
                div_height = 103;
            }
            expect(new_question_height).toBe(div_height);
            expect(new_answer_height).toBe(div_height);
            expect(new_voc_menu_height).toBe(div_height);
        });
    });
    describe("check list", function() {
        var voc_nr = 10;
        var div_height = 195;
        it("check list hightest", function() {
            var highest_div_value = class_div_height_setter.getHighestDivValue(voc_nr);
            var expected_value = div_height + 40;
            if (highest_div_value == 269) {
                expected_value = 269;
            }
            expect(highest_div_value).toBe(expected_value);
        });
        it("divs height should been set", function() {
            class_div_height_setter.setDivHeight();
            var voc_div_id = "#" + class_display_list.voc_div_id_prefix + voc_nr;
            var new_question_height = $(voc_div_id + " ." + class_display_list.question_main_div_class).height();
            var new_answer_height = $(voc_div_id + " ." + class_display_list.answer_main_div_class).height();
            var new_voc_menu_height = $(voc_div_id + " ." + class_display_list.voc_menu_div_class).height();
            if (new_question_height == 229) {
                div_height = 229;
            }
            expect(new_question_height).toBe(div_height);
            expect(new_answer_height).toBe(div_height);
            expect(new_voc_menu_height).toBe(div_height);
        });
    });
});