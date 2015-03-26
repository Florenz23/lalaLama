function ClassAjax() {
    ClassTrainerInfo.call(this);
    this.ajax_php_file = "/trainer/units/myUnit00/public/php/test/classDbFunctions.php";
    this.trainer_php_file = "/trainer/units/myUnit00/public/php/test/classTrainerFunctions.php";
}

ClassAjax.prototype.setDatabase = function(new_database) {

    this.db = new_database;

};
ClassAjax.prototype.setAjaxPhpFile = function(new_ajax_php_file) {

    this.ajax_php_file = new_ajax_php_file;

};

ClassAjax.prototype.checkIfTableExists = function(table_name) {

    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: this.ajax_php_file,
        dataType: 'json',
        data: {
            "operation": "checkIfTableExists",
            "db": this.db,
            "table": table_name
        },
        success: function(data) {}
    });

    return ajax.responseText;

};
ClassAjax.prototype.createTestTable = function() {
    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: this.ajax_php_file,
        dataType: 'json',
        data: {
            "operation": "createTestTable",
            "db": this.db
        },
        success: function(data) {}
    });
    return ajax.responseText;

};
ClassAjax.prototype.insertValuesIntoTestTable = function() {
    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: this.ajax_php_file,
        dataType: 'json',
        data: {
            "operation": "insertValuesIntoTestTable",
            "db": this.db
        },
        success: function(data) {}
    });
    return ajax.responseText;
};
ClassAjax.prototype.deleteTable = function(table_name) {
    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: this.ajax_php_file,
        dataType: 'json',
        data: {
            "operation": "deleteTable",
            "db": this.db,
            "table": table_name
        },
        success: function(data) {}
    });
    return ajax.responseText;

};
ClassAjax.prototype.countRows = function(table_name) {
    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: this.ajax_php_file,
        dataType: 'json',
        data: {
            "operation": "countRows",
            "db": this.db,
            "table": table_name
        },
        success: function(data) {}
    });
    return ajax.responseText;
};
ClassAjax.prototype.emptyTable = function(table_name) {
    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: this.ajax_php_file,
        dataType: 'json',
        data: {
            "operation": "emptyTable",
            "db": this.db,
            "table": table_name
        },
        success: function(data) {}
    });
    return ajax.responseText;

};
ClassAjax.prototype.insertValues = function(table, value_obj) {

    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: this.ajax_php_file,
        dataType: 'json',
        data: {
            "operation": "insertValues",
            "db": this.db,
            "table": table,
            "values": value_obj
        },
        success: function(data) {},
        error: function(jqXHR, textStatus, errorThrown) {
            var output = jqXHR.responseText;
            console.log(output);
        }
    });

    return ajax.responseText;

};

ClassAjax.prototype.updateValue = function(data_obj) {
    data_obj.operation = "updateValue";
    data_obj.db = this.db;
    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: this.ajax_php_file,
        dataType: 'json',
        data: data_obj,
        success: function(data) {},
        error: function(jqXHR, textStatus, errorThrown) {
            var output = jqXHR.responseText;
            console.log(output);
        }
    });

    return ajax.responseText;
};


ClassAjax.prototype.checkIfValueExists = function(data_obj) {
    data_obj.operation = "checkIfValueExists";
    data_obj.db = this.db;
    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: this.ajax_php_file,
        dataType: 'json',
        data: data_obj,

        success: function(data) {}
    });
    return ajax.responseText;
};
ClassAjax.prototype.checkIfValueExistsById = function(data_obj) {
    data_obj.operation = "checkIfValueExistsById";
    data_obj.db = this.db;
    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: this.ajax_php_file,
        dataType: 'json',
        data: data_obj,

        success: function(data) {}
    });
    return ajax.responseText;
};

ClassAjax.prototype.selectJoinTable = function(data_obj) {
    var json_output = false;

    data_obj.operation = "selectJoinTable";
    data_obj.db = this.db;
    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: this.ajax_php_file,
        dataType: 'json',
        data: data_obj,

        success: function(data) {
            json_output = data;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var output = jqXHR.responseText;
            console.log("selectFrom error : possibly nothing to select or :" + output);
        }
    });
    if (!json_output) {
        return false;
    }
    return json_output;

};

ClassAjax.prototype.getVocsEncoded = function(data_obj) {
    var json_output = false;
    data_obj.operation = "getVocsEncoded";
    data_obj.db = this.db;
    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: this.trainer_php_file,
        dataType: 'json',
        data: data_obj,

        success: function(data) {
            json_output = data;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var output = jqXHR.responseText;
            console.log("selectFrom error : possibly nothing to select or :" + output);
        }
    });
    if (!json_output) {
        return false;
    }
    return json_output;
};
ClassAjax.prototype.trainerUpdateVocRating = function(data_obj) {
    data_obj.operation = "trainerUpdateVocRating";
    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: this.trainer_php_file,
        dataType: 'json',
        data: data_obj,

        success: function(data) {}
    });
    var returned_json = ajax.responseText;
    if (returned_json === "") {
        return false;
    }
    var returned_obj = jQuery.parseJSON(returned_json);
    if (returned_obj.status == "mysql_error") {
        console.log("mysql_error:" + returned_json);
    }
    return returned_obj;
};



// condition: select all where ... = condition
ClassAjax.prototype.selectFrom = function(data_obj) {
    var json_output = false;
    data_obj = this.checkPrimary(data_obj);
    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: this.ajax_php_file,
        dataType: 'json',
        data: {
            "operation": "selectFrom",
            "db": this.db,
            "table": data_obj.table,
            "key": data_obj.key,
            "value": data_obj.value,
            "primary": data_obj.primary
        },
        success: function(data) {
            json_output = data;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var output = jqXHR.responseText;
            console.log("selectFrom error : possibly nothing to select or :" + output);
        }
    });
    if (!json_output) {
        return false;
    }
    return json_output;
};

ClassAjax.prototype.checkPrimary = function(data_obj) {
    if (!data_obj) {
        return;
    }
    if (!data_obj.primary) {
        data_obj.primary = null;
    }
    return data_obj;
};
ClassAjax.prototype.getValue = function(obj) {
    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: this.ajax_php_file,
        dataType: 'json',
        data: {
            "operation": "getValue",
            "db": this.db,
            "table": obj.table,
            "primary": obj.primary,
            "primary_value": obj.primary_value,
            "key": obj.key
        },
        success: function(data) {}
    });
    var returned_json = ajax.responseText;
    if (returned_json === "") {
        return false;
    }
    if (returned_json.indexOf('<b>Warning</b>') >= 0) {
        if (returned_json != "<b>Warning</b>") {
            console.log("php_error:" + returned_json);
        }
        return false;
    }
    return returned_json;
};

ClassAjax.prototype.deleteRow = function(table, key, value) {
    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: this.ajax_php_file,
        dataType: 'json',
        data: {
            "operation": "deleteRow",
            "db": this.db,
            "table": table,
            "key": key,
            "value": value
        },
        success: function(data) {}
    });
    return ajax.responseText;
};