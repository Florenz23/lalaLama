function Ajax() {

    // body...

}

Ajax.prototype.insertValues = function() {

    var value_obj = {
        "id": "NULL",
        "question": "zwei",
        "answer": "four"
    };
    var ajax = $.ajax({
        async: false,
        type: 'POST',
        url: "ajax.php",
        dataType: 'json',
        data: {
            "operation": "insertValues",
            "db": "test",
            "table": "test_table",
            "values": value_obj
        },
        success: function(data) {}
    });

    return ajax.responseText;

};


var ajax = new Ajax();
ajax.insertValues();