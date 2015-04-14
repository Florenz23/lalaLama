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

ClassListEditorUpdateAnswer.prototype.updateAnswer = function() {
    if (this.updateAnswerInDb()) {
        this.changeBackgroundcolorToUpdated();
        this.unfocusAnswerInputField();
        return;
    }
    alert("Fehler beim Update");
};

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
    $('#' + answer_input_id).unbind('keypress');
    $('#' + answer_input_id).keypress(function() {
        clearTimeout(typingTimer);
        if ($('#' + answer_input_id).val) {
            typingTimer = setTimeout(function() {
                class_update_answer.updateAnswer();
            }, doneTypingInterval);
        }
    });

};


ClassListEditorUpdateAnswer.prototype.unfocusAnswerInputField = function() {

    var field_id = this.answer_input_id_prefix + this.answer_id;
    $("#" + field_id).blur();

};

ClassListEditorUpdateAnswer.prototype.updateAnswerInDb = function() {
    var operation = "classListEditorUpdateAnswer";
    var updated_value = this.getAnswerValue();
    var id = this.answer_id;
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