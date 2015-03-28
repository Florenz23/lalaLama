function VocObject(voc_id, question, list_id) {
    this.voc_id = voc_id;
    this.question = question;
    this.list_id = list_id;
}

function AnswerObject(answer_id, voc_id, answer, multi_choice) {
    this.answer_id = answer_id;
    this.voc_id = voc_id;
    this.answer = answer;
    this.multi_choice = multi_choice;
}

function UserDataObject(answer_id, right, wrong, rating, multi_choice) {
    this.answer_id = answer_id;
    this.right = right;
    this.wrong = wrong;
    this.rating = rating;
}

function CompleteVocObject(voc_id, question, list_id, answer_id, answer, right, wrong, rating, multi_choice) {
    this.voc_id = voc_id;
    this.question = question;
    this.list_id = list_id;
    this.answer_id = answer_id;
    this.answer = answer;
    this.multi_choice = multi_choice;
    this.right = right;
    this.wrong = wrong;
    this.rating = rating;
}

function CompleteObject(voc_id, question, list_id, answer_id, answer, right, wrong, rating, multi_choice) {
    this.voc = new VocObject(voc_id, question, list_id);
    this.answer = new AnswerObject(answer_id, voc_id, answer, multi_choice);
    this.user_data = new UserDataObject(answer_id, right, wrong, rating);
    this.complete = new CompleteVocObject(voc_id, question, list_id, answer_id, answer, right, wrong, rating, multi_choice);
}



function ClassDbTestList() {

    this.class_trainer_info = new ClassTrainerInfo();
    this.class_ajax = new ClassAjax();
    this.object_array = this.getTestListObject();
    this.complete_obj_1 = new CompleteObject("10", "Pron", "7", "7", "ich", "0", "0", "-1", "0");
    this.complete_obj_2 = new CompleteObject("10", "Pron", "7", "8", "du", "0", "0", "-1", "0");
    this.complete_obj_3 = new CompleteObject("10", "Pron", "7", "9", "er", "0", "0", "-1", "0");
    this.complete_obj_4 = new CompleteObject("11", "eins", "7", "10", "one", "0", "0", "-1", "0");
    this.complete_obj_5 = new CompleteObject("12", "zwei", "7", "11", "two", "0", "0", "-1", "0");
    this.complete_obj_6 = new CompleteObject("13", "drei", "7", "12", "three", "0", "0", "-1", "0");
    this.complete_obj_7 = new CompleteObject("14", "vier", "7", "13", "four", "0", "0", "-1", "0");
    this.complete_obj_8 = new CompleteObject("15", "fünf", "7", "14", "five", "0", "0", "-1", "0");

    this.value_array = [this.complete_obj_1, this.complete_obj_2, this.complete_obj_3, this.complete_obj_4, this.complete_obj_5, this.complete_obj_6, this.complete_obj_7, this.complete_obj_8];
}
ClassDbTestList.prototype.getTestListObject = function() {
    var global_function = new ClassGlobalFunctions();
    var object = global_function.getListObject();
    return object;
};

ClassDbTestList.prototype.iniButton = function() {

    this.createButton();
    this.addButtonListener();

};

ClassDbTestList.prototype.createButton = function() {

    var html = "<input type='button' id='refresh_button' value='refresh' />";
    $("#db_test_list").html(html);

};

ClassDbTestList.prototype.addButtonListener = function() {

    var class_db_test_list = this;
    $("#refresh_button").click(function() {
        class_db_test_list.refreshList();
    });

};
ClassDbTestList.prototype.refreshList = function() {

    this.deleteTestValues();
    this.insertTestValues();

};
ClassDbTestList.prototype.insertTestValues = function() {

    var table_name = this.class_trainer_info.voc_table.name;
    var last_insert_id_1 = this.class_ajax.insertValues(table_name, this.complete_obj_1.voc);
    var last_insert_id_2 = this.class_ajax.insertValues(table_name, this.complete_obj_4.voc);
    var last_insert_id_3 = this.class_ajax.insertValues(table_name, this.complete_obj_5.voc);
    var last_insert_id_4 = this.class_ajax.insertValues(table_name, this.complete_obj_6.voc);
    var last_insert_id_5 = this.class_ajax.insertValues(table_name, this.complete_obj_7.voc);
    var last_insert_id_6 = this.class_ajax.insertValues(table_name, this.complete_obj_8.voc);


    table_name = this.class_trainer_info.answer_table.name;
    var last_insert_id_9 = this.class_ajax.insertValues(table_name, this.complete_obj_1.answer);
    var last_insert_id_10 = this.class_ajax.insertValues(table_name, this.complete_obj_2.answer);
    var last_insert_id_11 = this.class_ajax.insertValues(table_name, this.complete_obj_3.answer);
    var last_insert_id_12 = this.class_ajax.insertValues(table_name, this.complete_obj_4.answer);
    var last_insert_id_13 = this.class_ajax.insertValues(table_name, this.complete_obj_5.answer);
    var last_insert_id_14 = this.class_ajax.insertValues(table_name, this.complete_obj_6.answer);
    var last_insert_id_15 = this.class_ajax.insertValues(table_name, this.complete_obj_7.answer);
    var last_insert_id_16 = this.class_ajax.insertValues(table_name, this.complete_obj_8.answer);

    table_name = this.class_trainer_info.voc_user_data_table.name;
    var last_insert_id_17 = this.class_ajax.insertValues(table_name, this.complete_obj_1.user_data);
    var last_insert_id_18 = this.class_ajax.insertValues(table_name, this.complete_obj_2.user_data);
    var last_insert_id_19 = this.class_ajax.insertValues(table_name, this.complete_obj_3.user_data);
    var last_insert_id_20 = this.class_ajax.insertValues(table_name, this.complete_obj_4.user_data);
    var last_insert_id_21 = this.class_ajax.insertValues(table_name, this.complete_obj_5.user_data);
    var last_insert_id_22 = this.class_ajax.insertValues(table_name, this.complete_obj_6.user_data);
    var last_insert_id_23 = this.class_ajax.insertValues(table_name, this.complete_obj_7.user_data);
    var last_insert_id_24 = this.class_ajax.insertValues(table_name, this.complete_obj_8.user_data);

    if (last_insert_id_1 != this.value_array[0].voc.voc_id) {
        return false;
    }
    return [last_insert_id_1, last_insert_id_2, last_insert_id_3, last_insert_id_4];

};

ClassDbTestList.prototype.getJsonData = function(list_id) {
    var data_obj = {
        db: this.class_trainer_info.db,
        table_1: this.class_trainer_info.voc_table.name,
        table_2: this.class_trainer_info.answer_table.name,
        join_row_1: this.class_trainer_info.voc_table.id,
        join_row_2: this.class_trainer_info.answer_table.voc_id,
        key: this.class_trainer_info.voc_table.list_row,
        key_value: list_id
    };
    var json_data = this.class_ajax.selectJoinTable(data_obj);

    if (json_data.length != 8) {
        return false;
    }
    return json_data;

};

ClassDbTestList.prototype.deleteTestValues = function() {
    var table = this.class_trainer_info.voc_table.name;
    var id_row_name = this.class_trainer_info.voc_table.id;
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_1.voc.voc_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_4.voc.voc_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_5.voc.voc_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_6.voc.voc_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_7.voc.voc_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_8.voc.voc_id);

    table = this.class_trainer_info.answer_table.name;
    id_row_name = this.class_trainer_info.answer_table.id;
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_1.answer.answer_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_2.answer.answer_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_3.answer.answer_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_4.answer.answer_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_5.answer.answer_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_6.answer.answer_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_7.answer.answer_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_8.answer.answer_id);

    table = this.class_trainer_info.voc_user_data_table.name;
    id_row_name = this.class_trainer_info.voc_user_data_table.id;
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_1.user_data.answer_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_2.user_data.answer_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_3.user_data.answer_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_4.user_data.answer_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_5.user_data.answer_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_6.user_data.answer_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_7.user_data.answer_id);
    this.class_ajax.deleteRow(table, id_row_name, this.complete_obj_8.user_data.answer_id);

};

ClassDbTestList.prototype.refreshTestListValues = function() {

    this.deleteTestValues();
    return this.insertTestValues();

};