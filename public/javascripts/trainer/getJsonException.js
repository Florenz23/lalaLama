JsonDataNullException.prototype = new Error();
function JsonDataNullException() {

    this.name = "JSON_NULL";
    this.message = "Die Datenbankabfrage ergibt NULL";

}

JsonObjectHasNotBeenCreatedException.prototype = new Error();
function JsonObjectHasNotBeenCreatedException() {

    this.name = "No_JSON_Data";
    this.message = "Das Json_objekt wurde nicht erstellt";

}

PhpErrorException.prototype = new Error();
function PhpErrorException(php_exception) {

    this.name = php_exception.error;
    this.message = php_exception.message;

}


MySqlErrorException.prototype = new Error();
function MySqlErrorException(mysql_error_message, php_request) {

    this.name = php_request;
    this.message = mysql_error_message;
}

AjaxErrorException.prototype = new Error();
function AjaxErrorException() {

    this.name = "";
    this.message = "Ajax file not found or php error, check ajax_request!";

}