

DivDoesNotExistException.prototype = new Error();
function DivDoesNotExistException(div_id) {

    this.name = "DivDoesNotExist";
    this.message = "Div with id: '" + div_id + "' does not exist";

}

