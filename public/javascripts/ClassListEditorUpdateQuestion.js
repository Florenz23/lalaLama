function ClassListEditorUpdateQuestion() {

    HtmlIdsAndClasses.call(this);
    this.trainer_info = new ClassTrainerInfo();
    this.class_ajax = new ClassAjax();
    this.voc_id = "not_set";
    this.input_background_color_changed = "#FF9999";
    this.background_color_question_updated = "azure";

}

ClassListEditorUpdateQuestion.prototype.updateQuestion = function() {
    var ajax_answer = this.updateQuestionInDb();
    if (ajax_answer) {
        this.changeBackgroundcolorToUpdated();
        this.unfocusQuestionInputField();
        return true;
    }
    alert("Fehler beim Update");
};

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
    $('#' + question_input_id).unbind('keypress');
    $('#' + question_input_id).keypress(function() {
        clearTimeout(typingTimer);
        if ($('#' + question_input_id).val) {
            typingTimer = setTimeout(function() {
                class_update_voc.updateQuestion();
            }, doneTypingInterval);
        }
    });

};


ClassListEditorUpdateQuestion.prototype.unfocusQuestionInputField = function() {

    var field_id = this.question_input_id_prefix + this.voc_id;
    $("#" + field_id).blur();

};

ClassListEditorUpdateQuestion.prototype.updateQuestionInDb = function() {
    var operation = "classListEditorUpdateQuestion";
    var updated_value = this.getQuestionValue();
    var id = this.voc_id;
    var id_row = this.trainer_info.voc_table.id;
    var key = this.trainer_info.voc_table.question_row;
    var table = this.trainer_info.voc_table.name;
    var value_obj = {
        id: id,
        new_value: updated_value,
    };
    var ajax_answer = this.class_ajax.masterAjaxFunction(operation, value_obj);
    if (ajax_answer.status == "updated.ok") {
        return true;
    }
    return false;
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