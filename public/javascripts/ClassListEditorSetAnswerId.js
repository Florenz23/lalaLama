function ClassListEditorSetAnswerId() {

    HtmlIdsAndClasses.call(this);
    this.answer_id = "not_set";

}

ClassListEditorSetAnswerId.prototype.addSetAnswerIdListener = function() {
    var class_list_editor = this;
    $("." + this.answer_div_class).mouseover(function() {
        class_list_editor.setAnswerId(this.id);
    });
};

ClassListEditorSetAnswerId.prototype.setAnswerId = function(complete_answer_id_string) {
    var answer_id = this.getAnswerIdFromAnswerDivId(complete_answer_id_string);
    this.answer_id = answer_id;
};

ClassListEditorSetAnswerId.prototype.getAnswerIdFromAnswerDivId = function(complete_answer_id_string) {
    var answer_id_string = complete_answer_id_string.toString().replace(this.answer_div_id_prefix, "");
    return parseInt(answer_id_string, 10);
};