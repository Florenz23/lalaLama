function ClassListEditorNewVocCreateFieldVocMenu() {

    HtmlIdsAndClasses.call(this);
    this.img_path = "../../../public/img/";

}
ClassListEditorNewVocCreateFieldVocMenu.prototype.createVocMenuField = function() {

    this.createVocMenuMainDiv();
    this.createNewVocDeleteButton();
    this.createNewAnswerAddButton();

};

ClassListEditorNewVocCreateFieldVocMenu.prototype.createVocMenuMainDiv = function() {
    var html = "";
    html += "<div id='" + this.voc_menu_div_id_prefix + 0 + "'";
    html += "class='" + this.voc_menu_div_class + "'>";
    html += "</div>";
    $("#" + this.voc_div_id_prefix + 0).append(html);
};
ClassListEditorNewVocCreateFieldVocMenu.prototype.createNewAnswerAddButton = function() {
    var img = "plus.jpg";
    var html = "";
    html += "<img ";
    html += " id='" + this.new_answer_add_button_id_prefix + 0 + "'";
    html += " class='" + this.new_answer_add_button_class + "'";
    html += " src ='" + this.img_path + img + "'";
    html += " />";
    $("#" + this.voc_menu_div_id_prefix + 0).append(html);
};
ClassListEditorNewVocCreateFieldVocMenu.prototype.createNewVocDeleteButton = function() {
    var img = "drop.png";
    var html = "";
    html += "<img ";
    html += " id='" + this.new_voc_delete_button_id_prefix + 0 + "'";
    html += " class='" + this.new_voc_delete_button_class + "'";
    html += " src ='" + this.img_path + img + "'";
    html += " />";
    $("#" + this.voc_menu_div_id_prefix + 0).append(html);
};