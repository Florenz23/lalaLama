describe("ClassListEditorSelectVoc***", function() {
    var class_display_list = new ClassDisplayList();
    var class_db_test_list = new ClassDbTestList();
    var class_select_voc = new ClassListEditorSelectVoc();
    var rgb_code_color_input = "rgb(255, 255, 255)";
    var rgb_code_color_input_selected = "rgb(240, 255, 255)";
    var voc_id_1 = class_db_test_list.value_obj_1.voc_id;
    var voc_id_2 = class_db_test_list.value_obj_2.voc_id;
    beforeEach(function() {
        class_select_voc.setUpHTMLFixture();
        spyOn(class_display_list, "getJsonData").and.callFake(function() {
            return class_db_test_list.value_array;
        });
        class_display_list.displayList(7);
        class_select_voc.addListener();
        class_select_voc.addListenerSelectVoc();
    });


    // describe("changeBackgroundColor", function() {
    //     var question_field_div_id = class_select_voc.input_question_id_prefix + voc_id_1;
    //     var answer_field_div_id = class_select_voc.input_answer_id_prefix + voc_id_1;
    //     it("should be defined", function() {
    //         expect(class_select_voc.changeBackgroundColor).toBeDefined();
    //     });
    //     it("click on voc_div should call changeBackgroundColor", function() {
    //         expect("#" + question_field_div_id).toExist();
    //         spyOn(class_select_voc, "changeBackgroundColor");
    //         $("." + class_select_voc.voc_div_class).trigger("click");
    //         expect(class_select_voc.changeBackgroundColor).toHaveBeenCalled();
    //     });
    //     it("click on div should turn div blue", function() {
    //         $("#" + question_field_div_id).trigger("click");
    //         var question_color = $("#" + question_field_div_id).css("background-color");
    //         var answer_color = $("#" + answer_field_div_id).css("background-color");
    //         expect(question_color).toBe(rgb_code_color_input_selected);
    //         expect(answer_color).toBe(rgb_code_color_input_selected);
    //     });
    //     it("click on next div should turn first one white again", function() {
    //         $("#" + question_field_div_id).trigger("click");
    //         $("#" + class_select_voc.input_question_id_prefix + voc_id_2).trigger("click");
    //         var question_color = $("#" + question_field_div_id).css("background-color");
    //         var answer_color = $("#" + answer_field_div_id).css("background-color");
    //         expect(question_color).toBe(rgb_code_color_input);
    //     });
    // });



});