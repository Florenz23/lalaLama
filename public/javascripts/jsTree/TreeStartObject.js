function TreeStructObject(lft, rgt, lvl, pid, pos) {

    this.id = 0;
    this.lft = lft;
    this.rgt = rgt;
    this.lvl = lvl;
    this.pid = pid;
    this.pos = pos;
    this.user_id = "not_set";
}

function TreeDataObject(nm, type) {
    this.id = 0;
    this.nm = nm;
    this.type = type;
}

function TreeStartObject() {
    this.ajax_file_path = "/trainer/units/myUnit00//public/php/test/tree_server.php";
    this.class_ajax = new ClassAjax();
    this.trainer_info = new ClassTrainerInfo();
    this.db_table = this.trainer_info.navigation_table_struct.name;
    this.user_id = "not_set";
    this.obj_struct_0 = new TreeStructObject("1", "2", "0", "0", "1", "root", "");
    this.obj_struct_1 = new TreeStructObject("8", "9", "1", "1", "1", "MeineGruppen", "drive");
    this.obj_struct_2 = new TreeStructObject("2", "7", "1", "1", "0", "MeinLamapacos", "drive");
    this.obj_struct_3 = new TreeStructObject("3", "6", "2", "2", "0", "Startordner", "folder");
    this.obj_struct_4 = new TreeStructObject("4", "5", "3", "3", "0", "Startliste", "list");

    this.obj_data_0 = new TreeDataObject("root", "root");
    this.obj_data_1 = new TreeDataObject("MeineGruppen", "drive");
    this.obj_data_2 = new TreeDataObject("MeinLamapacos", "drive");
    this.obj_data_3 = new TreeDataObject("Startordner", "folder");
    this.obj_data_4 = new TreeDataObject("Startliste", "list");

}


TreeStartObject.prototype.addListIds = function() {

    this.obj_0.list_id = "1";
    this.obj_1.list_id = "2";
    this.obj_2.list_id = "3";
    this.obj_3.list_id = "4";
    this.obj_4.list_id = "7";

};
TreeStartObject.prototype.createArray = function() {
    var object_array = [];
    object_array = [this.obj_struct_0, this.obj_struct_1, this.obj_struct_2, this.obj_struct_3, this.obj_struct_4];
    return object_array;
};
TreeStartObject.prototype.createStartTreeFixedIds = function() {
    var table = this.db_table;
    this.addListIds();
    this.class_ajax.insertValues(table, this.obj_0);
    this.class_ajax.insertValues(table, this.obj_1);
    this.class_ajax.insertValues(table, this.obj_2);
    this.class_ajax.insertValues(table, this.obj_3);
    this.class_ajax.insertValues(table, this.obj_4);
};
TreeStartObject.prototype.deleteStartTreeEntries = function() {
    var id;
    var table = this.db_table;
    var navigation_table_id_row = this.trainer_info.navigation_table_struct.id;
    this.addListIds();
    id = this.obj_0.list_id;
    this.class_ajax.deleteRow(table, navigation_table_id_row, id);
    id = this.obj_1.list_id;
    this.class_ajax.deleteRow(table, navigation_table_id_row, id);
    id = this.obj_2.list_id;
    this.class_ajax.deleteRow(table, navigation_table_id_row, id);
    id = this.obj_3.list_id;
    this.class_ajax.deleteRow(table, navigation_table_id_row, id);
    id = this.obj_4.list_id;
    this.class_ajax.deleteRow(table, navigation_table_id_row, id);
};
TreeStartObject.prototype.deleteStartTreeEntriesByUserId = function(user_id) {
    var table = this.db_table;
    var navigation_table_id_row = this.trainer_info.navigation_table_struct.user_id;
    this.class_ajax.deleteRow(table, navigation_table_id_row, user_id);
};
TreeStartObject.prototype.createListIdArray = function() {
    var list_id_array = [];
    list_id_arr = [this.obj_struct_0, this.obj_struct_1, this.obj_struct_2, this.obj_struct_3, this.obj_struct_4];
    return list_id_arr;
};

TreeStartObject.prototype.createStartTree = function(user_id) {
    this.user_id = String(user_id);
    var id_string = this.makeDbEntries();
    this.addRealIdsToObject(id_string);
    this.setParentIds();
    var id_array = this.createListIdArray();
    return id_array;
};

TreeStartObject.prototype.makeDbEntries = function() {

    var obj_id_0 = this.createRoot();
    var obj_id_1 = this.ajaxCreate(obj_id_0, 0, "MeineGruppen");
    var obj_id_2 = this.ajaxCreate(obj_id_0, 0, "MeinLamapacos");
    var obj_id_3 = this.ajaxCreate(obj_id_2, 0, "Startordner");
    var obj_id_4 = this.ajaxCreate(obj_id_3, 0, "Startliste");
    this.ajaxRename(obj_id_1, "MeineGruppen", "drive");
    this.ajaxRename(obj_id_2, "MeinLamapacos", "drive");
    this.ajaxRename(obj_id_3, "Startordner", "folder");
    this.ajaxRename(obj_id_4, "Startliste", "list");
    var id_array = [obj_id_0, obj_id_1, obj_id_2, obj_id_3, obj_id_4];
    return id_array;

};

TreeStartObject.prototype.addRealIdsToObject = function(id_array) {

    this.obj_struct_0.id = String(id_array[0]);
    this.obj_struct_1.id = String(id_array[1]);
    this.obj_struct_2.id = String(id_array[2]);
    this.obj_struct_3.id = String(id_array[3]);
    this.obj_struct_4.id = String(id_array[4]);

};

TreeStartObject.prototype.setParentIds = function() {

    this.obj_struct_1.pid = this.obj_struct_0.id;
    this.obj_struct_2.pid = this.obj_struct_0.id;
    this.obj_struct_3.pid = this.obj_struct_2.id;
    this.obj_struct_4.pid = this.obj_struct_3.id;

    this.obj_struct_0.rgt = "10";

};

TreeStartObject.prototype.ajaxCreate = function(id, position, description) {
    var ajax = $.ajax({
        async: false,
        type: 'GET',
        url: this.ajax_file_path + "?operation=create_node",
        dataType: 'json',
        data: {
            'id': parseInt(id, 10),
            'position': position,
            'text': description,
            'user_id': this.user_id,
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var output = jqXHR.responseText;
            console.log(output);
        }
    });
    return ajax.responseJSON.id;
};
TreeStartObject.prototype.ajaxRename = function(id, description, type) {
    $.get(this.ajax_file_path + '?operation=rename_node', {
        'id': parseInt(id, 10),
        'text': description,
        'type': type,
        'user_id': this.user_id,
    }).fail(function(xhr, status, error) {
        console.log(id, xhr.responseText);
    });
};
TreeStartObject.prototype.createRoot = function() {
    var table_struct = this.trainer_info.navigation_table_struct.name;
    var table_data = this.trainer_info.navigation_table_data.name;
    var root_obj_struct_table = this.obj_struct_0;
    var root_obj_data_table = this.obj_data_0;
    root_obj_struct_table.user_id = this.user_id;
    var returned_struct_root_id = this.class_ajax.insertValues(table_struct, root_obj_struct_table);
    root_obj_data_table.id = returned_struct_root_id;
    var returned_data_root_id = this.class_ajax.insertValues(table_data, root_obj_data_table);
    returned_struct_root_id = parseInt(returned_struct_root_id, 10);
    return returned_struct_root_id;
};