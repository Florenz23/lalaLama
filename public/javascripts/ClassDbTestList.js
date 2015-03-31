function ClassDbTestList() {

    this.createListObjects();
}


ClassDbTestList.prototype.createListObjects = function() {

    var all_list_objects = this.getTestListObject();
    this.voc_array = all_list_objects.voc_array;
    this.answer_array = all_list_objects.answer_array;
    this.user_data_array = all_list_objects.user_data_array;
    this.complete_array = all_list_objects.complete_array;

};

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