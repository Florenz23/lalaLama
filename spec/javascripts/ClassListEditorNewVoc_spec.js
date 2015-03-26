describe("ClassListEditorNewVoc***", function() {
    var trainer_info = new ClassTrainerInfo();
    var class_ajax = new ClassAjax();
    var class_new_voc = new ClassListEditorNewVoc();
    var voc_table = trainer_info.voc_table.name;
    var voc_table_id = trainer_info.voc_table.id;
    var list_id = "6";
    beforeEach(function() {
        class_new_voc.setUpHTMLFixture();
        class_new_voc.addListenerNewVoc();
        class_new_voc.addListenerNewVoc();
    });
    describe("addNewVocField:", function() {});
});