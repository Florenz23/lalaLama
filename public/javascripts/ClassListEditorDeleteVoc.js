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

ClassListEditorDeleteVoc.prototype.deleteVoc = function() {
    this.deleteVocDiv();
    this.deleteVocOfDb();
};

ClassListEditorDeleteVoc.prototype.deleteVocDiv = function() {
    var voc_div_id = this.voc_div_id_prefix + this.voc_id;
    $("#" + voc_div_id).remove();
};
ClassListEditorDeleteVoc.prototype.deleteVocOfDb = function() {
    var voc_id = this.voc_id;
    var operation = "classListEditorDeleteVoc";
    var data = {
        voc_id_to_be_deleted: voc_id
    };
    return this.class_ajax.masterAjaxFunction(operation, data);
};