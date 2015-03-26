function ClassListEditorUpdateQuestion() {

    HtmlIdsAndClasses.call(this);
    this.trainer_info = new ClassTrainerInfo();
    this.class_ajax = new ClassAjax();
    this.voc_id = "not_set";
    this.input_background_color_changed = "#FF9999";
    this.background_color_question_updated = "azure";

}

ClassListEditorUpdateQuestion.prototype.addListener = function() {

    this.createKeypressIniciator();


};
ClassListEditorUpdateQuestion.prototype.createKeypressIniciator = function() {

    var class_update_voc = this;
    $("." + this.voc_div_class).click(function() {
        class_update_voc.addKeypressListener();
        class_update_voc.addChangeBackgroundListener();
    });

};
ClassListEditorUpdateQuestion.prototype.addKeypressListener = function() {

    this.createKeypressListener();

};
ClassListEditorUpdateQuestion.prototype.addChangeBackgroundListener = function() {

    this.createChangeBackgroundColorListener();

};

ClassListEditorUpdateQuestion.prototype.createChangeBackgroundColorListener = function() {

    var question_input_id = this.question_input_id_prefix + this.voc_id;
    var class_update_voc = this;
    $('#' + question_input_id).keypress(function() {
        class_update_voc.changeBackgroundcolorToNotUpdated();
    });

};
ClassListEditorUpdateQuestion.prototype.createKeypressListener = function() {

    var question_input_id = this.question_input_id_prefix + this.voc_id;
    var class_update_voc = this;
    var typingTimer;
    var doneTypingInterval = 1000;
    // $('#' + question_input_id).keypress(function() {
    //     setTimeout(function() {
    //         class_update_voc.UpdateQuestion();
    //     }, doneTypingInterval);
    // });
    $('#' + question_input_id).keypress(function() {
        clearTimeout(typingTimer);
        if ($('#' + question_input_id).val) {
            typingTimer = setTimeout(function() {
                class_update_voc.updateQuestion();
            }, doneTypingInterval);
        }
    });

};

ClassListEditorUpdateQuestion.prototype.updateQuestion = function() {
    this.saveUpdatedQuestionValue();
    this.changeBackgroundcolorToUpdated();
    this.unfocusQuestionInputField();
};

ClassListEditorUpdateQuestion.prototype.unfocusQuestionInputField = function() {

    var field_id = this.question_input_id_prefix + this.voc_id;
    $("#" + field_id).blur();

};

ClassListEditorUpdateQuestion.prototype.saveUpdatedQuestionValue = function() {

    var updated_value = this.getQuestionValue();
    var id = this.voc_id;
    var id_row = this.trainer_info.voc_table.id;
    var key = this.trainer_info.voc_table.question_row;
    var table = this.trainer_info.voc_table.name;
    var value_obj = {
        table: table,
        primary: id_row,
        primary_value: id,
        key: key,
        key_value: updated_value,
    };
    this.class_ajax.updateValue(value_obj);

};
ClassListEditorUpdateQuestion.prototype.getQuestionValue = function() {
    var question_input_id = this.question_input_id_prefix + this.voc_id;
    return $("#" + question_input_id).val();

};

ClassListEditorUpdateQuestion.prototype.changeBackgroundcolorToNotUpdated = function() {
    var question_input_id = this.question_input_id_prefix + this.voc_id;
    $("#" + question_input_id).css("background-color", this.input_background_color_changed);
};
ClassListEditorUpdateQuestion.prototype.changeBackgroundcolorToUpdated = function() {
    var question_input_id = this.question_input_id_prefix + this.voc_id;
    $("#" + question_input_id).css("background-color", this.background_color_question_updated);
};