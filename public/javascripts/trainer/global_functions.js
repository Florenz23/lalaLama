/**
 * (ajax_php_file,status_div,php_get,php_div,value);
 */
function getJson(ajax_php_file, status_div, get_name, get_value) {

    // um Fehler zu vermeiden muss der zu verschickende String encoded werden
    get_value = encodeURIComponent(get_value);

    var waiting = "Plese wait...";
    var done = "Completed";

    displayInDiv(status_div,waiting);
    var check = $.ajax({
        url: ajax_php_file + '?' + get_name + '=' + get_value + '&ajax=true',
        async: false,
        dataType: 'json',
        error: function(error) {
            throw new AjaxErrorException(error);
            
        },
        success: function(data) {
            if (data != null) {
                displayInDiv(status_div,done);
                json_data = data;
                return data;

            } else {
                throw new JsonDataNullException();
            }
        }

    });
    if (json_data == "null") {
        throw new JsonDataNullException();
    }
    ;
    if (json_data.error) {
        throw new PhpErrorException(json_data);
    }
    if (json_data.mysql_error) {
        throw new MySqlErrorException(json_data.mysql_error, json_data.php_request);
    }
    if (!json_data) {
        throw new JsonObjectHasNotBeenCreatedException();
    }
    return jsonStringToObject(check.responseText);
}

function jsonStringToObject(string) {

    return jQuery.parseJSON(string)

}

// überprüft ob cookie gesetzt ist
function issetCookie(name) {

    if (document.cookie.indexOf(name) >= 0) {
        return true;
    }

    return false;
}

// Cookies
/**
 * comment
 */
function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else
        expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
/**
 * comasdfment
 */
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return false;
}
/**
 * comment
 */
function eraseCookie(name) {
    createCookie(name, "", -1);
}


/**
 * überprüft ob es sich bei dem User um einen Gast handelt
 */
function isGuest() {

    if (readCookie("user") == "guest") {
        return true
    }

    return false;

}


function disp(div_id, content) {

    if ($("#" + div_id).exist()) {
        return $("#" + div_id).html(content);
    }
    alert("div " + div_id + "does not exist");
    return false;

}


function createTestVocObject(i) {

    var obj =
            {
                question: "apple" + i,
                answer: "apfel" + i,
            };

    return obj;

}

function createTestVocArray() {
    var ARRAY_LENGTH = 3;
    var voc_array = new Array();

    for (var i = 0; i < ARRAY_LENGTH; i++) {



        voc_array.push(createTestVocObject(i))

    }

    return voc_array;

}

function createTestVocLinkedList() {
    var voc_array = createTestVocArray();
    var length = voc_array.length;
    var linked_list = new ModeledLinkedList();

    for (var i = 0; i < length; i++) {

        linked_list.addElement(voc_array[i]);

    }

    return linked_list;

}


function displayInDiv(div_name, content_to_be_displayed) {

    if ($("#" + div_name).exist()) {

        $("#" + div_name).html(content_to_be_displayed);

        return true;

    }

    throw new DivDoesNotExistException(div_name);

}

function displayInDivAppend(div_name, content_to_be_displayed) {

    if ($("#" + div_name).exist()) {

        $("#" + div_name).append(content_to_be_displayed);

        return true;

    }

    throw new DivDoesNotExistException(div_name);

}

