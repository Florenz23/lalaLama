ClassListEditorSaveNewVoc.prototype = $.extend({},
    ClassListEditorSetAnswerId.prototype
);

function ClassListEditorSaveNewVoc() {

    HtmlIdsAndClasses.call(this);
    ClassTrainerInfo.call(this);
    this.class_ajax = new ClassAjax();
    this.answer_counter = 0;
    this.div_height_setter = new ClassDivHeightSetter();
    this.done_typing_interval = 1000;
    this.answer_id = "not_set";
    this.list_id = "not_set";
    this.voc_id = "not_set";
    this.img_path = "../../../public/img/";

}
ClassListEditorSaveNewVoc.prototype.saveNewVoc = function() {
    var returned_question_id = this.saveQuestionInDb();
    var returned_answer_array = this.saveMultiAnswersInDb();
    var value_obj = {
        question_id: returned_question_id,
        answer_id_array: returned_answer_array
    };
    this.displayList();
    this.selectNewQuestion();
    return value_obj;
};

ClassListEditorSaveNewVoc.prototype.displayList = function() {
    var class_display_list = new ClassDisplayList();
    class_display_list.displayList(this.list_id);
};




ClassListEditorSaveNewVoc.prototype.saveQuestionInDb = function() {
    var operation = "classListEditorSaveNewVocQuestion";
    var table = this.voc_table.name;
    var question_obj = this.createQuestionObj();
    var returned_insert_id = this.class_ajax.masterAjaxFunction(operation, question_obj);
    this.voc_id = returned_insert_id;
    if (!returned_insert_id && returned_insert_id <= 0) {
        return false;
    }
    this.returned_insert_id = returned_insert_id;
    return returned_insert_id;
};

ClassListEditorSaveNewVoc.prototype.createQuestionObj = function() {
    var question = this.getQuestionValue();
    var list_id = this.list_id;
    var value_obj = {
        list_id: list_id,
        question: question
    };
    return value_obj;
};

ClassListEditorSaveNewVoc.prototype.getQuestionValue = function() {

    var question_input_id = this.new_voc_question_input_id;
    var question_value = $("#" + question_input_id).val();
    return question_value;

};


ClassListEditorSaveNewVoc.prototype.saveMultiAnswersInDb = function() {
    var operation = "classListEditorSaveNewVocAnswer";
    var answer_id_array = [];
    var answer_id;
    var answer_obj;
    var table = this.answer_table.name;
    var answer_obj_array = this.createAnswerValueObjArray();
    for (var i = 0; i < answer_obj_array.length; i++) {
        answer_obj = answer_obj_array[i];
        answer_id = this.saveAnswerInDb(operation, answer_obj);
        answer_id_array[i] = answer_id;
        if (!answer_id) {
            return false;
        }
    }
    return answer_id_array;

};

ClassListEditorSaveNewVoc.prototype.saveAnswerInDb = function(operation, answer_obj) {

    var returned_insert_id = this.class_ajax.masterAjaxFunction(operation, answer_obj);
    if (!returned_insert_id && returned_insert_id <= 0) {
        return false;
    }
    return returned_insert_id;

};


ClassListEditorSaveNewVoc.prototype.createAnswerValueObjArray = function() {
    var value_obj_array = [];
    var answer_array = this.getAnswerArray();
    for (var i = 0; i < answer_array.length; i++) {
        var voc_id = this.voc_id;
        var value_obj = {
            voc_id: voc_id,
            answer: answer_array[i]
        };
        value_obj_array[i] = value_obj;
    }
    return value_obj_array;
};


ClassListEditorSaveNewVoc.prototype.getAnswerArray = function() {
    var answer_input_class = this.new_answer_input_class;
    var answer_array = [];
    var answer_value;
    var i = 0;
    $('.' + answer_input_class).each(function(e) {
        input_id = $(this).attr("id");
        if (typeof(input_id) != "undefined") {
            answer_value = $("#" + input_id).val();
            if (answer_value !== "") {
                answer_array[i] = answer_value;
            }
        }
        i++;
    });
    var option_field_value = $("#" + this.new_voc_answer_input_option).val();
    answer_array[i] = option_field_value;
    return answer_array;
};


ClassListEditorSaveNewVoc.prototype.saveNewAnswer = function() {
    this.createSavedAnswerInput();
    this.createSavedAnswerDeleteButton();
    this.addDeleteNewAnswerDivListener();
    this.cleanInputField();
    this.addNewAnswerField();
    this.addSaveNewVocListener();
};


ClassListEditorSaveNewVoc.prototype.addNewAnswerField = function() {
    this.answer_counter++;
    this.displayNewAnswerField();
    this.createNewAnswerDeleteButton();
    this.div_height_setter.setMainDivHeightByVocId(this.voc_id);
    this.selectNewAddedAnswer();
    this.addDeleteNewAnswerDivListener();
    this.addSaveNewAnswerListener();
    this.addSetAnswerIdListener();
};



ClassListEditorSaveNewVoc.prototype.displayNewAnswerField = function() {
    var voc_id = this.voc_id;
    var answer_main_div_id = this.answer_main_div_id_prefix + voc_id;
    var answer_nr = this.answer_counter;
    var html = "";
    html += "<div id='" + this.new_voc_answer_div_option + "'";
    html += "class='" + this.answer_div_class + "'>";
    html += " <form class='" + this.voc_form_class + "'>";
    html += "<input type='text'";
    html += " id='" + this.new_voc_answer_input_option + "'";
    html += " class='" + this.new_voc_answer_input_class_option + "'";
    html += " value='" + this.new_answer_value + "'";
    html += " />";
    html += "  </form>";
    html += "</div>";
    $("#" + answer_main_div_id).append(html);
};



ClassListEditorSaveNewVoc.prototype.selectNewQuestion = function() {

    var question_input = this.new_voc_question_input_id;
    $("#" + question_input).select();

};
ClassListEditorSaveNewVoc.prototype.selectNewAnswer = function() {

    var answer_input = this.new_voc_answer_input_option;
    $("#" + answer_input).select();

};


ClassListEditorSaveNewVoc.prototype.createNewAnswerDeleteButton = function() {
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


ClassListEditorSaveNewVoc.prototype.deleteAnswerDiv = function() {
    var voc_id = this.voc_id;
    var answer_div_id = this.answer_div_id_prefix + this.answer_id;
    $("#" + answer_div_id).remove();
    this.div_height_setter.setMainDivHeightByVocId(voc_id);
};


ClassListEditorSaveNewVoc.prototype.cleanInputField = function() {
    var answer_div_to_be_deleted = this.new_voc_answer_div_option;
    $("#" + answer_div_to_be_deleted).remove();
};

ClassListEditorSaveNewVoc.prototype.getAnswerValue = function() {

    return $("#" + this.new_voc_answer_input_option).val();

};
ClassListEditorSaveNewVoc.prototype.createSavedAnswerInput = function() {
    var answer_main_div_id = this.answer_main_div_id_prefix + this.voc_id;
    var answer_nr = this.answer_counter;
    var answer_value = this.getAnswerValue();
    var html = "";
    html += "<div id='" + this.answer_div_id_prefix + answer_nr + "'";
    html += "class='" + this.answer_div_class + "'>";
    html += " <form class='" + this.voc_form_class + "'>";
    html += "<input type='text'";
    html += " id='" + this.new_answer_input_id_prefix + answer_nr + "'";
    html += " class='" + this.new_answer_input_class + "'";
    html += " value='" + answer_value + "'";
    html += " />";
    html += "  </form>";
    html += "</div>";
    $("#" + answer_main_div_id).append(html);
};
ClassListEditorSaveNewVoc.prototype.createSavedAnswerDeleteButton = function() {
    var answer_nr = this.answer_counter;
    var html = "";
    var img = "minus.jpg";
    html += "<img ";
    html += " id='" + this.new_answer_delete_button_id_prefix + answer_nr + "'";
    html += " class='" + this.answer_delete_button_class + "'";
    html += " src ='" + this.img_path + img + "'";
    html += " />";
    $("#" + this.answer_div_id_prefix + answer_nr).append(html);
};
ClassListEditorSaveNewVoc.prototype.deleteAnswer = function() {
    this.deleteAnswerDiv();
};
ClassListEditorSaveNewVoc.prototype.selectNewAddedAnswer = function() {
    var answer_option_id = this.new_voc_answer_input_option;
    $("#" + answer_option_id).select();
};

ClassListEditorSaveNewVoc.prototype.addListener = function() {

    this.addNewAnswerFieldListener();
    this.addDeleteAnswerListener();
    this.addSetAnswerIdListener();
    this.addSaveNewAnswerListener();
    this.addSelectListener();
    this.addSaveNewVocListener();

};

ClassListEditorSaveNewVoc.prototype.addSaveNewVocListener = function() {
    var input_answer_option_id = this.new_voc_answer_input_option;
    var class_save_new_voc = this;
    $("#" + input_answer_option_id).keypress(function(event) {
        if (event.which == 13) {}
    });
};

ClassListEditorSaveNewVoc.prototype.addNewAnswerFieldListener = function() {
    var answer_add_button_class = this.new_answer_add_button_class;
    var class_new_voc = this;
    $("." + answer_add_button_class).click(function() {
        class_new_voc.saveNewAnswer();
    });
};
ClassListEditorSaveNewVoc.prototype.addSelectListener = function() {
    var question_input = this.new_voc_question_input_id;
    var answer_input = this.new_voc_answer_input_option;
    var class_new_voc = this;
    $("#" + question_input).click(function() {
        class_new_voc.selectNewQuestion();
    });
    $("#" + answer_input).click(function() {
        class_new_voc.selectNewAnswer();
    });
};
ClassListEditorSaveNewVoc.prototype.addDeleteAnswerListener = function() {
    var answer_delete_button_class = this.answer_delete_button_class;
    var class_new_voc = this;
    $("." + answer_delete_button_class).click(function() {
        class_new_voc.deleteAnswer();
    });
};

ClassListEditorSaveNewVoc.prototype.addSaveNewAnswerListener = function() {
    var answer_nr = this.answer_counter;
    var answer_option_id = this.new_voc_answer_input_option;
    var class_answer_edit = this;
    var typingTimer;
    var doneTypingInterval = this.done_typing_interval;
    var class_save_new_voc = this;
    $('#' + answer_option_id).keydown(function(event) {
        if (event.which == 9) {
            event.preventDefault();
            clearTimeout(typingTimer);
            class_answer_edit.saveNewAnswer();
            return;
        }
        if (event.which == 13) {
            event.preventDefault();
            clearTimeout(typingTimer);
            class_save_new_voc.saveNewVoc();
            return;
        }

        // clearTimeout(typingTimer);
        // if ($('#' + answer_option_id).val) {
        //     typingTimer = setTimeout(function() {
        //         class_answer_edit.saveNewAnswer();
        //     }, doneTypingInterval);
        // }


    });

};

ClassListEditorSaveNewVoc.prototype.addDeleteAnswerListener = function() {
    var answer_delete_button_class = this.answer_delete_button_class;
    var class_new_voc = this;
    $("." + answer_delete_button_class).click(function() {
        class_new_voc.deleteAnswer();
    });
};

ClassListEditorSaveNewVoc.prototype.addDeleteNewAnswerDivListener = function() {
    var answer_delete_button_class = this.answer_delete_button_class;
    var class_new_voc = this;
    $("." + answer_delete_button_class).click(function() {
        class_new_voc.deleteAnswerDiv();
    });
};