function readTextFile(file) {
    var json_output = false;
    $.ajax({
        async: false,
        type: 'POST',
        url: file,
        dataType: 'json',
        success: function(data) {
            json_output = data;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var output = jqXHR.responseText;
            console.log(output);
        }
    });
    return json_output;
}

var data = readTextFile("/trainer/units/myUnit00/spec/json_files/listObject.txt");
console.log(data);