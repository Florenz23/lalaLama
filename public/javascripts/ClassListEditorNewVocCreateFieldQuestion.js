function ClassListEditorNewVocCreateFieldQuestion() {}

ClassListEditorNewVocCreateFieldQuestion.prototype.createQuestionField = function() {
    HtmlIdsAndClasses.call(this);
    this.createQuestionMainDiv();
    this.createQuestionDiv();
    this.createQuestionInput();
};

ClassListEditorNewVocCreateFieldQuestion.prototype.createQuestionMainDiv = function() {
    var html = "";
    html += "<div id='" + this.question_main_div_id_prefix + 0 + "'";
    html += "class='" + this.question_main_div_class + "'>";
    html += "</div>";
    $("#" + this.voc_div_id_prefix + 0).append(html);
};

ClassListEditorNewVocCreateFieldQuestion.prototype.createQuestionDiv = function() {
    var html = "";
    html += "<div id='" + this.question_div_id_prefix + 0 + "'";
    html += "class='" + this.question_div_class + "'>";
    html += "</div>";
    $("#" + this.question_main_div_id_prefix + 0).append(html);
};

ClassListEditorNewVocCreateFieldQuestion.prototype.createQuestionInput = function() {
    var value = this.new_question_value;
    var html = "";
    html += " <form class='" + this.voc_form_class + "'>";
    html += "<textarea";
    html += " id='" + this.new_voc_question_input_id + "'";
    html += " class='" + this.new_voc_question_input_class + "'>";
    html += value;
    html += "</textarea>";
    html += "  </form>";
    $("#" + this.question_div_id_prefix + 0).append(html);
};