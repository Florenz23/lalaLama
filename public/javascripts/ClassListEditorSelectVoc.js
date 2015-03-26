ClassListEditorSelectVoc.prototype = new ClassListEditor();

function ClassListEditorSelectVoc() {

    this.input_background_color = "white";
    this.input_background_color_selected = "azure";
}

ClassListEditorSelectVoc.prototype.addListenerSelectVoc = function() {

    class_select_voc = this;
    $("." + this.voc_div_class).click(function() {
        class_select_voc.changeBackgroundColor(this);
    });

};


ClassListEditorSelectVoc.prototype.changeBackgroundColor = function(html_object) {

    var html_id = html_object.id;
    var voc_nr = this.voc_id;
    var bgc_normal = this.input_background_color;
    var bgc_selected = this.input_background_color_selected;
    var class_id = this.input_class_prefix + voc_nr;
    var input_question_id = this.question_input_id_prefix + voc_nr;
    console.log(input_question_id);
    var input_answer_id = this.answer_input_id_prefix + voc_nr;
    $("#" + this.list_div_id + " input").not(bgc_selected).css("background-color", this.input_background_color);
    $("#" + input_question_id).css("background-color", bgc_selected);
    $("#" + input_answer_id).css("background-color", bgc_selected);

};