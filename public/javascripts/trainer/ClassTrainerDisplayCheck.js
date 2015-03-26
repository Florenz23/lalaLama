function ClassTrainerDisplayCheck() {}

ClassTrainerDisplayCheck.prototype.displayCheckValues = function(vocpool, vocllist) {

    this.displayVoclist(vocpool);
    this.displayVocpool(vocllist);

};

ClassTrainerDisplayCheck.prototype.set_hidden_fields = function() {
    var check = "inline";
    var display = "";

    if (check != 'none') {
        display += "Voclist: <br>";
    }
    display += "<div id='voclist'></div>";

    if (check != 'none') {
        display += "Vocpool: <br>";
    }
    display += "<textarea name='vocpool' id='vocpool' cols='50' rows='10' readonly style='border: 0;display:" + check + ";'></textarea> <br><br>";
    $('#hidden_to_user').html(display);

};
ClassTrainerDisplayCheck.prototype.displayVocpool = function(vocpool) {
    var vocpool_value = "";
    help = 0;
    for (current = vocpool.first;
        (help === 0 || current != vocpool.first); current = current.next) {
        vocpool_value += current.data.question;
        vocpool_value += ":";
        vocpool_value += current.data.rating;
        vocpool_value += ":";
        vocpool_value += current.data.ok;
        vocpool_value += "\n";
        help = 1;
    }
    $("#vocpool").val(vocpool_value);
};

ClassTrainerDisplayCheck.prototype.displayVoclist = function(vocllist) {

    var voclist_value = "";
    help = 0;
    voclist_value += "<table>";
    voclist_value += "<tr>";
    voclist_value += "<td>";
    voclist_value += "question";
    voclist_value += "</td>";
    voclist_value += "<td>";
    voclist_value += "right";
    voclist_value += "</td>";
    voclist_value += "<td>";
    voclist_value += "ok";
    voclist_value += "</td>";
    voclist_value += "<td>";
    voclist_value += "rating";
    voclist_value += "</td>";
    voclist_value += "<td>";
    voclist_value += "importance";
    voclist_value += "</td>";
    voclist_value += "</tr>";
    for (var current = vocllist.first;
        (help === 0 || current != vocllist.first); current = current.next) {
        voclist_value += "<tr>";
        voclist_value += "<td>";
        voclist_value += current.data.question;
        voclist_value += "</td>";
        voclist_value += "<td>";
        voclist_value += current.data.right;
        voclist_value += "</td>";
        voclist_value += "<td>";
        voclist_value += current.data.ok;
        voclist_value += "</td>";
        voclist_value += "<td>";
        voclist_value += current.data.rating;
        voclist_value += "</td>";
        voclist_value += "<td>";
        voclist_value += current.data.importance;
        voclist_value += "</td>";
        voclist_value += "</tr>";
        help = 1;
    }
    voclist_value += "</table>";
    $("#voclist").html(voclist_value);

};