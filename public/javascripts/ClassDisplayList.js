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
    this.img_path = "public/img/";

}

ClassDisplayList.prototype.displayList = function(list_id) {
    this.displayLearnButton();
    this.addLearnButtonListener();
    this.startList(list_id);
};
ClassDisplayList.prototype.displayListPublic = function(list_id, description) {
    this.displayCopyListButton();
    this.addCopyButtonListener(list_id, description);
    this.startList(list_id);
};
ClassDisplayList.prototype.startList = function(list_id) {

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
ClassDisplayList.prototype.displayCopyListButton = function() {

    var display = "";
    display += "<input";
    display += " class='pure-form'";
    display += " id='copy_button_id'";
    display += " type='button'";
    display += " title='Kopiert die Liste in den Ordner Downloads in MeineListen'";
    display += " value='Kopieren'";
    display += "/>";
    $("#learn_button_div").html(display);

};

ClassDisplayList.prototype.displayLearnButton = function() {

    var display = "";
    display += "<input";
    display += " class='pure-form'";
    display += " id='learn_button_id'";
    display += " type='button'";
    display += " title='Lerne diese Liste im Trainer'";
    display += " value='Lernen'";
    display += "/>";
    $("#learn_button_div").html(display);

};

ClassDisplayList.prototype.refreshDivs = function() {
    $("#new_voc_div").html("");
    $("#list_div").html("");
};


ClassDisplayList.prototype.addListener = function() {

    this.addLearnButtonListener();

};
ClassDisplayList.prototype.addLearnButtonListener = function() {
    var class_display_list = this;
    $("#learn_button_id").unbind('click');
    $("#learn_button_id").click(function() {
        class_display_list.learnList();
    });
};
ClassDisplayList.prototype.addCopyButtonListener = function(list_id, description) {
    var class_display_list = this;
    $("#copy_button_id").unbind('click');
    $("#copy_button_id").click(function() {
        class_display_list.copyList(list_id, description);
    });
};
ClassDisplayList.prototype.copyList = function(list_id, description) {
    var operation = "classCopyPublicList";
    var data = {
        list_id: list_id,
        description: description
    };
    var node_id = this.class_ajax.masterAjaxFunction(operation, data);
    console.log(node_id);
    $("#finder_user").jstree("refresh_node", $('#' + node_id));
    $("#finder_user").jstree("open_node", $('#' + node_id));
};


ClassDisplayList.prototype.learnList = function() {
    window.location.href = "trainer?list_arr=" + this.list_id;
};

ClassDisplayList.prototype.getJsonData = function(list_id) {
    var ajax = new ClassAjax();
    var operation = "classDisplayListGetVocs";
    var data_obj = {
        list_id: list_id,
    };
    var json_data = ajax.masterAjaxFunction(operation, data_obj);
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
    html += "<textarea";
    html += " id='" + this.question_input_id_prefix + voc_obj.voc_id + "'";
    html += " class='" + this.question_input_class + "'>";
    html += voc_obj.question;
    html += " </textarea>";
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
    var check_first = false;
    while (json_data[i] && json_data[i].voc_id == recent_json_data_voc_id) {
        this.createAnswerDiv(json_data[i]);
        this.createAnswerInput(json_data[i]);
        if (check_first) {
            this.createAnswerDeleteButton(json_data[i]);
        }
        i++;
        check_first = true;
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
    html += "<textarea ";
    html += " id='" + this.answer_input_id_prefix + voc_obj.answer_id + "'";
    html += " class='" + this.answer_input_class + "'>";
    html += voc_obj.answer;
    html += " </textarea>";
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