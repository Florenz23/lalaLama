function ClassDisplayList() {
    HtmlIdsAndClasses.call(this);

    this.trainer_info = new ClassTrainerInfo();
    this.class_ajax = new ClassAjax();
    this.class_list_editor = new ClassListEditor();
    this.class_new_voc = new ClassListEditorNewVoc();
    this.class_div_height_setter = new ClassDivHeightSetter();
    this.list_id = "7";
    this.div_to_display_list_in_id = "list_div";

    this.voc_div_id_prefix = "voc_div_";
    this.voc_div_class = "voc_div";

    this.json_data = "";
    this.img_path = "../../../public/img/";

}

ClassDisplayList.prototype.displayList = function(list_id) {
    this.displayLearnButton();
    this.addListener();
    this.refreshDivs();
    this.list_id = list_id;
    this.class_new_voc.addNewVocField();
    var json_data = this.getJsonData(list_id);
    this.setListJson(json_data);
    this.displayListJson();
    this.class_list_editor.addListener();
    this.class_list_editor.answer_edit.list_id = this.list_id;
    this.class_list_editor.save_new_voc.list_id = this.list_id;
    this.class_div_height_setter.setDivHeight();
};

ClassDisplayList.prototype.displayLearnButton = function() {

    var display = "";
    display += "     <input class='pure-form' type='button' id='learn_button_id' value='Lernen' />";
    $("#learn_button_div").html(display);

};

ClassDisplayList.prototype.refreshDivs = function() {
    $("#new_voc_div").html("");
    $("#list_div").html("");
};


ClassDisplayList.prototype.addListener = function() {

    var class_display_list = this;
    $("#learn_button_id").click(function() {
        class_display_list.learnList();
    });

};

ClassDisplayList.prototype.learnList = function() {
    window.location.href = "trainer.html?list_arr=" + this.list_id;
};

ClassDisplayList.prototype.getJsonData = function(list_id) {
    var data_obj = {
        db: this.trainer_info.db,
        table_1: this.trainer_info.voc_table.name,
        table_2: this.trainer_info.answer_table.name,
        join_row_1: this.trainer_info.voc_table.id,
        join_row_2: this.trainer_info.answer_table.voc_id,
        key: this.trainer_info.voc_table.list_row,
        key_value: list_id
    };
    var json_data = this.class_ajax.selectJoinTable(data_obj);
    return json_data;

};

ClassDisplayList.prototype.setListJson = function(json_data) {

    this.json_data = json_data;

};

ClassDisplayList.prototype.displayListJson = function() {

    var json_data = this.json_data;
    $("#" + this.div_to_display_list_in_id).html("");
    this.createListHtml(json_data);

};

ClassDisplayList.prototype.createListHtml = function(json_data) {
    var html = "";
    var voc_delete_button_html;
    var answer_add_button_html;
    for (var i = 0; i < json_data.length; i++) {
        this.createVocDiv(i, json_data);
        this.createQuestionMain(json_data[i]);
        this.createAnswerMainDiv(json_data[i]);
        i = this.createAnswerMain(i, json_data);
        i--;
        this.createVocMenu(json_data[i]);
    }
};
ClassDisplayList.prototype.createVocDiv = function(i, json_data) {
    var id = json_data[i].voc_id;
    var html = "";
    html += "     <div class='" + this.voc_div_class + "' id='" + this.voc_div_id_prefix + id + "'>";
    html += " </div>";
    $("#" + this.div_to_display_list_in_id).append(html);
};
ClassDisplayList.prototype.createVocMenu = function(voc_obj) {
    this.createVocMenuDiv(voc_obj);
    this.createVocDeleteButton(voc_obj);
    this.createAnswerAddButton(voc_obj);
};

ClassDisplayList.prototype.createVocMenuDiv = function(voc_obj) {
    var html = "";
    html += "<div id='" + this.voc_menu_div_id_prefix + voc_obj.voc_id + "'";
    html += "class='" + this.voc_menu_div_class + "'>";
    html += " </div>";
    $("#" + this.voc_div_id_prefix + voc_obj.voc_id).append(html);
};

ClassDisplayList.prototype.createQuestionMain = function(voc_obj) {
    this.createQuestionMainDiv(voc_obj);
    this.createQuestionDiv(voc_obj);
    this.createQuestionInput(voc_obj);
};

ClassDisplayList.prototype.createQuestionMainDiv = function(voc_obj) {
    var html = "";
    html += "<div id='" + this.question_main_div_id_prefix + voc_obj.voc_id + "'";
    html += "class='" + this.question_main_div_class + "'>";
    html += " </div>";
    $("#" + this.voc_div_id_prefix + voc_obj.voc_id).append(html);
};

ClassDisplayList.prototype.createQuestionDiv = function(voc_obj) {
    var html = "";
    html += "<div id='" + this.question_div_id_prefix + voc_obj.voc_id + "'";
    html += "class='" + this.question_div_class + "'>";
    html += "</div>";
    $("#" + this.question_main_div_id_prefix + voc_obj.voc_id).append(html);
};

ClassDisplayList.prototype.createQuestionInput = function(voc_obj) {
    var html = "";
    html += " <form class='" + this.voc_form_class + "'>";
    html += "<input type='text'";
    html += " id='" + this.question_input_id_prefix + voc_obj.voc_id + "'";
    html += " class='" + this.question_input_class + "'";
    html += " value='" + voc_obj.question + "'";
    html += " />";
    html += "  </form>";
    $("#" + this.question_div_id_prefix + voc_obj.voc_id).append(html);
};

ClassDisplayList.prototype.createAnswerMainDiv = function(voc_obj) {
    var html = "";
    html += "<div id='" + this.answer_main_div_id_prefix + voc_obj.voc_id + "'";
    html += "class='" + this.answer_main_div_class + "'>";
    html += " </div>";
    $("#" + this.voc_div_id_prefix + voc_obj.voc_id).append(html);
};


ClassDisplayList.prototype.createAnswerMain = function(i, json_data) {
    var id = json_data[i].voc_id;
    var recent_json_data_voc_id = json_data[i].voc_id;
    var html = "";
    while (json_data[i] && json_data[i].voc_id == recent_json_data_voc_id) {
        this.createAnswerDiv(json_data[i]);
        this.createAnswerInput(json_data[i]);
        this.createAnswerDeleteButton(json_data[i]);
        i++;
    }
    $("#" + this.voc_div_id_prefix + id).append(html);
    return i;
};

ClassDisplayList.prototype.createAnswerDiv = function(voc_obj) {
    var html = "";
    html += "<div id='" + this.answer_div_id_prefix + voc_obj.answer_id + "'";
    html += "class='" + this.answer_div_class + "'>";
    html += "</div>";
    $("#" + this.answer_main_div_id_prefix + voc_obj.voc_id).append(html);
};

ClassDisplayList.prototype.createAnswerInput = function(voc_obj) {
    var html = "";
    html += " <form class='" + this.voc_form_class + "'>";
    html += "<input type='text'";
    html += " id='" + this.answer_input_id_prefix + voc_obj.answer_id + "'";
    html += " class='" + this.answer_input_class + "'";
    html += " value='" + voc_obj.answer + "'";
    html += " />";
    html += " </form>";
    $("#" + this.answer_div_id_prefix + voc_obj.answer_id).append(html);
};

ClassDisplayList.prototype.createAnswerDeleteButton = function(voc_obj) {
    var img = "minus.jpg";
    var html = "";
    html += "<img";
    html += " id='" + this.answer_delete_button_id_prefix + voc_obj.answer_id + "'";
    html += " class='" + this.answer_delete_button_class + "'";
    html += " src='" + this.img_path + img + "'";
    html += " />";
    $("#" + this.answer_div_id_prefix + voc_obj.answer_id).append(html);
};

ClassDisplayList.prototype.createVocDeleteButton = function(voc_obj) {
    var img = "drop.png";
    var html = "";
    html += "<img";
    html += " id='" + this.voc_delete_button_id_prefix + voc_obj.voc_id + "'";
    html += " class='" + this.voc_delete_button_class + "'";
    html += " src='" + this.img_path + img + "'";
    html += " />";
    $("#" + this.voc_menu_div_id_prefix + voc_obj.voc_id).append(html);
};

ClassDisplayList.prototype.createAnswerAddButton = function(voc_obj) {
    var img = "plus.jpg";
    var html = "";
    html += "<img";
    html += " id='" + this.answer_add_button_id_prefix + voc_obj.voc_id + "'";
    html += " class='" + this.answer_add_button_class + "'";
    html += " src='" + this.img_path + img + "'";
    html += " />";
    $("#" + this.voc_menu_div_id_prefix + voc_obj.voc_id).append(html);
};

ClassDisplayList.prototype.setUpHTMLFixture = function() {
    fixture = readFixtures("tree_list_fixture.html");
    fixture = createFixtureString(fixture);
    setFixtures(fixture);
};