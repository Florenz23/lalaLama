function ClassListEditorNewVocCreateFieldAnswer() {

    HtmlIdsAndClasses.call(this);
    this.img_path = "public/img/";

}

ClassListEditorNewVocCreateFieldAnswer.prototype.createAnswerField = function() {
    this.createAnswerMainDiv();
    this.createAnswerDiv();
    this.createAnswerInput();
    this.createNewAnswerDeleteButton();
};

ClassListEditorNewVocCreateFieldAnswer.prototype.createAnswerMainDiv = function() {
    var html = "";
    html += "<div id='" + this.answer_main_div_id_prefix + 0 + "'";
    html += "class='" + this.answer_main_div_class + "'>";
    html += "</div>";
    $("#" + this.voc_div_id_prefix + 0).append(html);
};

ClassListEditorNewVocCreateFieldAnswer.prototype.createAnswerDiv = function() {
    var html = "";
    html += "<div id='" + this.new_voc_answer_div_option + "'";
    html += "class='" + this.answer_div_class + "'>";
    html += "</div>";
    $("#" + this.answer_main_div_id_prefix + 0).append(html);
};

ClassListEditorNewVocCreateFieldAnswer.prototype.createAnswerInput = function() {
    var value = this.new_answer_value;
    var html = "";
    html += " <form class='" + this.voc_form_class + "'>";
    html += "<textarea";
    html += " id='" + this.new_voc_answer_input_option + "'";
    html += " class='" + this.new_voc_answer_input_class_option + "'>";
    html += value;
    html += " </textarea>";
    html += "  </form>";
    $("#" + this.new_voc_answer_div_option).append(html);
};
ClassListEditorNewVocCreateFieldAnswer.prototype.createNewAnswerDeleteButton = function() {
    var html = "";
    var img = "minus.jpg";
    html += "<img ";
    html += " id='" + this.new_answer_delete_button_id_prefix + 0 + "'";
    html += " class='" + this.new_answer_delete_button_class + "'";
    html += " src ='" + this.img_path + img + "'";
    html += " />";
    $("#" + this.new_voc_answer_div_option).append(html);
};