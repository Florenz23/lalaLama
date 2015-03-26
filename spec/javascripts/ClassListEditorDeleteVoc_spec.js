describe("ClassListEditorDeleteVoc***", function() {
    var trainer_info = new ClassTrainerInfo();
    var class_ajax = new ClassAjax();
    var class_display_list = new ClassDisplayList();
    var class_db_test_list = new ClassDbTestList();
    var class_delete_voc = new ClassListEditorDeleteVoc();
    var json_array_1;
    var voc_id_1 = class_db_test_list.value_array[0].voc_id;
    var voc_div_id = class_display_list.voc_div_id_prefix + voc_id_1;

    var list_id_to_be_tested = class_db_test_list.value_obj_1.list_id;
    var test_value_json_array_from_db = class_display_list.getJsonData(list_id_to_be_tested);
    beforeEach(function() {
        class_display_list.setUpHTMLFixture();
        spyOn(class_display_list, "getJsonData").and.callFake(function() {
            return test_value_json_array_from_db;
        });
        class_display_list.displayList(list_id_to_be_tested);
        $("#" + voc_div_id).trigger("mouseover");
    });
    describe("preperation", function() {

        it("ClassListEditorDeleteVoc should be defined", function() {
            expect(class_delete_voc).toBeDefined();
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
                var voc_id;
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
        describe("db part", function() {
            describe("deleteVocOfDb", function() {
                var voc_table = trainer_info.voc_table.name;
                var voc_id = trainer_info.voc_table.id;
                var to_be_deleted_voc_id = class_db_test_list.value_obj_1.voc_id;
                var to_be_deleted_list_id = class_db_test_list.value_obj_1.list_id;
                it("should be defined", function() {
                    expect(class_display_list.class_list_editor.delete_voc.deleteVocOfDb).toBeDefined();
                });
                it("voc should be deleted from", function() {
                    var data = {
                        table: voc_table,
                        primary: voc_id,
                        primary_value: to_be_deleted_voc_id
                    };
                    expect(class_ajax.checkIfValueExistsById(data)).toBe("1");
                    expect(class_display_list.class_list_editor.delete_voc.deleteVocOfDb(to_be_deleted_voc_id)).toBe('1');
                    expect(class_ajax.checkIfValueExistsById(data)).toBe("");


                });
            });
            describe("clean db", function() {
                it("created Values should be deleted again", function() {
                    class_db_test_list.deleteTestValues();
                });
            });
        });

        describe("prepare db for the tests", function() {
            it("test values should be inserted into the database", function() {
                expect(class_db_test_list.refreshTestListValues()).toBeTruthy();
            });
        });
    });
});