function readTextFile(file) {
    $.get(file, function(data) {
        console.log(data);
        //process text file line by line
    }).fail(function(error) {
        console.log(error.responseText);
    }).done(function() {
        console.log("jojo");
    });
}

readTextFile("/spec");