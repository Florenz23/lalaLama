describe("ClassListEditorDeleteVoc***", function() {
    var trainer_info = new ClassTrainerInfo();
    var class_ajax = new ClassAjax();
    var class_display_list = new ClassDisplayList();
    var class_db_test_list = new ClassDbTestList();
    var class_delete_voc = new ClassListEditorDeleteVoc();
    var json_array_1;
    var voc_id_1 = class_db_test_list.voc_array[0].voc_id;
    var voc_div_id = class_display_list.voc_div_id_prefix + voc_id_1;
    var list_id_to_be_tested = class_db_test_list.voc_array[0].list_id;



    beforeEach(function() {
        class_display_list.setUpHTMLFixture();
        spyOn(class_display_list, "getJsonData").and.callFake(function() {
            return class_db_test_list.complete_array;
        });
        class_display_list.displayList(list_id_to_be_tested);
        $("#" + voc_div_id).trigger("mouseover");
    });
    describe("preperation", function() {

        it("ClassListEditorDeleteVoc should be defined", function() {
            expect(class_delete_voc).toBeDefined();
        });
        describe('db part', function() {
            it("should be defined", function() {
                expect(class_display_list.class_list_editor.delete_voc.deleteVocOfDb).toBeDefined();
            });
            it('reset db_test_list', function() {
                var operation = "resetVocList";
                class_ajax.masterAjaxTest(operation);
            });
            it('delete Voc should work', function() {
                var voc_id = class_db_test_list.complete_array[0].voc_id;
                class_delete_voc.voc_id = voc_id;
                var check_value = class_delete_voc.deleteVocOfDb();
                expect(check_value.status).toBe("deleted.ok");
            });
        });


        describe("functionality", function() {
            it("should be defined", function() {
                expect(class_display_list.class_list_editor.delete_voc.deleteVoc).toBeDefined();
            });
            it("deleteVocDiv and deleteVocOfDb should have been triggered", function() {
                spyOn(class_display_list.class_list_editor.delete_voc, "deleteVocDiv");
                spyOn(class_display_list.class_list_editor.delete_voc, "deleteVocOfDb");
                class_display_list.class_list_editor.delete_voc.deleteVoc();
                expect(class_display_list.class_list_editor.delete_voc.deleteVocDiv).toHaveBeenCalled();
                expect(class_display_list.class_list_editor.delete_voc.deleteVocOfDb).toHaveBeenCalled();
            });
        });
        describe("javascript part:", function() {
            describe("deleteVocDiv:", function() {
                it("should be defined", function() {
                    expect(class_display_list.class_list_editor.delete_voc.deleteVocDiv).toBeDefined();
                });

                it("click on delete button should trigger deleteVoc", function() {
                    spyOn(class_display_list.class_list_editor.delete_voc, "deleteVoc");
                    $("." + class_display_list.voc_delete_button_class).trigger("click");
                    expect(class_display_list.class_list_editor.delete_voc.deleteVoc).toHaveBeenCalled();

                });
                it("del_button should exist", function() {
                    expect("#" + class_display_list.voc_delete_button_id_prefix + voc_id_1).toExist();
                });
                it("deleted voc div should be removed", function() {
                    var voc_div_id_prefix = class_display_list.voc_div_id_prefix;
                    class_display_list.class_list_editor.delete_voc.deleteVocDiv(voc_id_1);
                    expect("#" + voc_div_id_prefix + voc_id_1).not.toExist();
                });
            });

        });


    });
});