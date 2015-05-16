ClassListEditorAnswerEdit.prototype = $.extend({},
    ClassListEditorSetAnswerId.prototype
);

function ClassListEditorAnswerEdit() {

    HtmlIdsAndClasses.call(this);
    ClassTrainerInfo.call(this);
    this.class_ajax = new ClassAjax();
    this.answer_counter = 0;
    this.div_height_setter = new ClassDivHeightSetter();    this.list_id = "not_set";
    this.voc_id = "not_set";
    this.answer_id = "not_set";
    this.img_path = "../../../public/img/";

}

ClassListEditorAnswerEdit.prototype.addListener = function() {

    this.addNewAnswerFieldListener();
    this.addDeleteAnswerListener();
    this.addSetAnswerIdListener();

};

ClassListEditorAnswerEdit.prototype.addNewAnswerFieldListener = function() {
    var answer_add_button_class = this.answer_add_button_class;
    var class_new_voc = this;
    $('.' + answer_add_button_class).unbind('click');
    $("." + answer_add_button_class).click(function() {
        class_new_voc.addNewAnswerField();
    });
};


ClassListEditorAnswerEdit.prototype.addSaveNewAnswerListener = function() {

    var new_answer_id = this.new_answer_prefix + this.answer_input_id_prefix + 1;
    var class_answer_edit = this;
    var typingTimer;
    var doneTypingInterval = 1000;
    $('#' + new_answer_id).unbind('keydown');
    $('#' + new_answer_id).keydown(function(event) {
        if (event.which == 9) {
            event.preventDefault();
            class_answer_edit.saveNewAnswer();
            return;
        }
    });

};

ClassListEditorAnswerEdit.prototype.saveNewAnswer = function(last_insert_answer) {
    if (last_insert_answer == this.new_answer_value || last_insert_answer === "") {
        return this.deleteAnswerDiv();
    }
    var voc_obj = this.createValueObj();
    var answer = voc_obj.answer;
    var answer_id = this.saveNewAnswerInDb();
    var db_test_list = new ClassDbTestList();
    var display_list = new ClassDisplayList();
    if (answer_id && answer_id > 0) {
        this.cleanInputField();
        this.createSavedAnswerInput(answer_id, answer);
        this.createSavedAnswerDeleteButton(answer_id);
        this.addDeleteNewAnswerDivListener();
        //this.addNewAnswerField();
    }
    return answer_id;

};
ClassListEditorAnswerEdit.prototype.saveNewAnswerInDb = function() {

    var operation = "classListEditorSaveNewVocAnswer";
    var answer_obj = this.createValueObj();
    var returned_insert_id = this.class_ajax.masterAjaxFunction(operation, answer_obj);
    return returned_insert_id;

};

ClassListEditorAnswerEdit.prototype.createValueObj = function() {
    var answer = this.getAnswerValue();
    var voc_id = this.voc_id;
    var value_obj = {
        voc_id: voc_id,
        answer: answer
    };
    return value_obj;
};


ClassListEditorAnswerEdit.prototype.addNewAnswerField = function() {
    this.answer_counter++;
    var voc_id = this.voc_id;
    var html = "";
    var answer_main_div_id = this.answer_main_div_id_prefix + voc_id;
    html += this.createNewAnswerHtml();
    $("#" + answer_main_div_id).append(html);
    this.createNewAnswerDeleteButton();
    this.div_height_setter.setMainDivHeightByVocId(voc_id);
    this.selectNewAnswer();
    this.addDeleteNewAnswerDivListener();
    this.addSaveNewAnswerListener();
    this.addSetAnswerIdListener();
    this.addDeleteNewAnswerDivOnBlurListener();
};



ClassListEditorAnswerEdit.prototype.createNewAnswerHtml = function() {
    var answer_nr = this.answer_counter;
    var new_answer_prefix = this.new_answer_prefix;
    var html = "";
    html += "<div id='" + this.answer_div_id_prefix + answer_nr + "'";
    html += "class='" + this.answer_div_class + "'>";
    html += " <form class='" + this.voc_form_class + "'>";
    html += "<textarea";
    html += " id='" + new_answer_prefix + this.answer_input_id_prefix + answer_nr + "'";
    html += " class='" + this.new_answer_prefix + this.answer_input_class + "'>";
    html += this.new_answer_value;
    html += "</textarea>";
    html += "</form>";
    html += "</div>";
    return html;
};
ClassListEditorAnswerEdit.prototype.createSavedAnswerInput = function(answer_id, answer_value) {
    var answer_main_div_id = this.answer_main_div_id_prefix + this.voc_id;
    var html = "";
    html += "<div id='" + this.answer_div_id_prefix + answer_id + "'";
    html += "class='" + this.answer_div_class + "'>";
    html += " <form class='" + this.voc_form_class + "'>";
    html += "<textarea";
    html += " id='" + this.answer_input_id_prefix + answer_id + "'";
    html += " class='" + this.answer_input_class + "'>";
    html += answer_value;
    html += "</textarea>";
    html += "</form>";
    html += "</div>";
    $("#" + answer_main_div_id).append(html);
};
ClassListEditorAnswerEdit.prototype.createSavedAnswerDeleteButton = function(answer_nr) {
    var html = "";
    var img = "minus.jpg";
    html += "<img ";
    html += " id='" + this.answer_delete_button_id_prefix + answer_nr + "'";
    html += " class='" + this.answer_delete_button_class + "'";
    html += " src ='" + this.img_path + img + "'";
    html += " />";
    $("#" + this.answer_div_id_prefix + answer_nr).append(html);
};

ClassListEditorAnswerEdit.prototype.addDeleteAnswerListener = function() {
    var answer_delete_button_class = this.answer_delete_button_class;
    var class_new_voc = this;
    $('.' + answer_delete_button_class).unbind('click');
    $("." + answer_delete_button_class).click(function() {
        class_new_voc.deleteAnswer();
    });
};

ClassListEditorAnswerEdit.prototype.addDeleteAnswerListener = function() {
    var answer_delete_button_class = this.answer_delete_button_class;
    var class_new_voc = this;
    $('.' + answer_delete_button_class).unbind('click');
    $("." + answer_delete_button_class).click(function() {
        class_new_voc.deleteAnswer();
    });
};

ClassListEditorAnswerEdit.prototype.addDeleteNewAnswerDivListener = function() {
    var answer_delete_button_class = this.answer_delete_button_class;
    var class_new_voc = this;
    $('.' + answer_delete_button_class).unbind('click');
    $("." + answer_delete_button_class).click(function() {
        class_new_voc.deleteAnswerDiv();
        class_new_voc.deleteAnswerOfDb();
    });
};

ClassListEditorAnswerEdit.prototype.addDeleteNewAnswerDivOnBlurListener = function() {
    var new_answer_prefix = this.new_answer_prefix;
    var answer_id = this.answer_input_id_prefix;
    var answer_input_class = new_answer_prefix + this.answer_input_class;
    var class_new_voc = this;
    $("." + answer_input_class).blur(function() {
        var input_value = this.value;
        class_new_voc.answer_id = 1;
        class_new_voc.saveNewAnswer(input_value);
    });
};

ClassListEditorAnswerEdit.prototype.createNewAnswerDeleteButton = function() {
    var html = "";
    var answer_nr = this.answer_counter;
    var img = "minus.jpg";
    html += "<img ";
    html += " id='" + this.answer_delete_button_id_prefix + answer_nr + "'";
    html += " class='" + this.answer_delete_button_class + "'";
    html += " src ='" + this.img_path + img + "'";
    html += " />";
    $("#" + this.answer_div_id_prefix + answer_nr).append(html);
};


ClassListEditorAnswerEdit.prototype.deleteAnswerDiv = function() {
    var voc_id = this.voc_id;
    var answer_div_id = this.answer_div_id_prefix + this.answer_id;
    $("#" + answer_div_id).remove();
    this.div_height_setter.setMainDivHeightByVocId(voc_id);
    this.answer_counter = 0;
};


ClassListEditorAnswerEdit.prototype.cleanInputField = function() {

    var answer_div_to_be_deleted = this.answer_div_id_prefix + 1;
    this.answer_counter = 0;
    $("#" + answer_div_to_be_deleted).remove();
};


ClassListEditorAnswerEdit.prototype.getAnswerValue = function() {

    return $("#" + this.new_answer_prefix + this.answer_input_id_prefix + 1).val();

};
ClassListEditorAnswerEdit.prototype.deleteAnswer = function() {
    this.deleteAnswerDiv();
    this.deleteAnswerOfDb();
};
ClassListEditorAnswerEdit.prototype.selectNewAnswer = function() {
    var new_input_id = this.new_answer_prefix + this.answer_input_id_prefix + 1;
    $("#" + new_input_id).select();
};
ClassListEditorAnswerEdit.prototype.deleteAnswerOfDb = function() {
    var operation = "classListEditorDeleteAnswer";
    var answer_id = this.answer_id;
    var data = {
        answer_id_to_be_deleted: answer_id
    };
    return this.class_ajax.masterAjaxFunction(operation, data);
};