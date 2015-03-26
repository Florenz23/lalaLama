ClassListEditorUpdateAnswer.prototype = $.extend({},
    ClassListEditorSetAnswerId.prototype
);

function ClassListEditorUpdateAnswer() {

    HtmlIdsAndClasses.call(this);
    this.trainer_info = new ClassTrainerInfo();
    this.class_ajax = new ClassAjax();
    this.input_background_color_changed = "#FF9999";
    this.background_color_answer_updated = "azure";

}

ClassListEditorUpdateAnswer.prototype.addListener = function() {

    this.createKeypressIniciator();
    this.addSetAnswerIdListener();


};
ClassListEditorUpdateAnswer.prototype.createKeypressIniciator = function() {

    var class_update_answer = this;
    $("." + this.answer_div_class).click(function() {
        class_update_answer.addKeypressListener();
        class_update_answer.addChangeBackgroundListener();
    });

};
ClassListEditorUpdateAnswer.prototype.addKeypressListener = function() {

    this.createKeypressListener();

};
ClassListEditorUpdateAnswer.prototype.addChangeBackgroundListener = function() {

    this.createChangeBackgroundColorListener();

};

ClassListEditorUpdateAnswer.prototype.createChangeBackgroundColorListener = function() {

    var answer_input_id = this.answer_input_id_prefix + this.answer_id;
    var class_update_answer = this;
    $('#' + answer_input_id).keypress(function() {
        class_update_answer.changeBackgroundcolorToNotUpdated();
    });

};
ClassListEditorUpdateAnswer.prototype.createKeypressListener = function() {

    var answer_input_id = this.answer_input_id_prefix + this.answer_id;
    var class_update_answer = this;
    var typingTimer;
    var doneTypingInterval = 1000;
    // $('#' + answer_input_id).keypress(function() {
    //     setTimeout(function() {
    //         class_update_answer.UpdateAnswer();
    //     }, doneTypingInterval);
    // });
    $('#' + answer_input_id).keypress(function() {
        clearTimeout(typingTimer);
        if ($('#' + answer_input_id).val) {
            typingTimer = setTimeout(function() {
                class_update_answer.updateAnswer();
            }, doneTypingInterval);
        }
    });

};

ClassListEditorUpdateAnswer.prototype.updateAnswer = function() {
    this.saveUpdatedAnswerValue();
    this.changeBackgroundcolorToUpdated();
    this.unfocusAnswerInputField();
};

ClassListEditorUpdateAnswer.prototype.unfocusAnswerInputField = function() {

    var field_id = this.answer_input_id_prefix + this.answer_id;
    $("#" + field_id).blur();

};

ClassListEditorUpdateAnswer.prototype.saveUpdatedAnswerValue = function() {

    var updated_value = this.getAnswerValue();
    var id = this.answer_id;
    var id_row = this.trainer_info.answer_table.id;
    var key = this.trainer_info.answer_table.answer_row;
    var table = this.trainer_info.answer_table.name;
    var value_obj = {
        table: table,
        primary: id_row,
        primary_value: id,
        key: key,
        key_value: updated_value,
    };
    this.class_ajax.updateValue(value_obj);

};
ClassListEditorUpdateAnswer.prototype.getAnswerValue = function() {
    var answer_input_id = this.answer_input_id_prefix + this.answer_id;
    return $("#" + answer_input_id).val();

};

ClassListEditorUpdateAnswer.prototype.changeBackgroundcolorToNotUpdated = function() {
    var answer_input_id = this.answer_input_id_prefix + this.answer_id;
    $("#" + answer_input_id).css("background-color", this.input_background_color_changed);
};
ClassListEditorUpdateAnswer.prototype.changeBackgroundcolorToUpdated = function() {
    var answer_input_id = this.answer_input_id_prefix + this.answer_id;
    $("#" + answer_input_id).css("background-color", this.background_color_answer_updated);
};