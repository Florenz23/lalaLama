function ClassListEditorDeleteVoc() {

    HtmlIdsAndClasses.call(this);
    this.trainer_info = new ClassTrainerInfo();
    this.class_ajax = new ClassAjax();
    this.voc_id = "not_set";

}

ClassListEditorDeleteVoc.prototype.addListener = function() {
    var class_delete_voc = this;
    var delete_button_class = this.voc_delete_button_class;
    $("." + delete_button_class).click(function() {
        class_delete_voc.deleteVoc(this.id);
    });
};

ClassListEditorDeleteVoc.prototype.deleteVoc = function(delete_button_id) {
    this.deleteVocDiv();
    this.deleteVocOfDb();
};

ClassListEditorDeleteVoc.prototype.deleteVocDiv = function() {
    var voc_div_id = this.voc_div_id_prefix + this.voc_id;
    $("#" + voc_div_id).remove();
};
ClassListEditorDeleteVoc.prototype.deleteVocOfDb = function() {
    var table = this.trainer_info.voc_table.name;
    var id_row = this.trainer_info.voc_table.id;
    var voc_id = this.voc_id;
    return this.class_ajax.deleteRow(table, id_row, voc_id);
};