function Voc(voc_obj) {
    this.id = voc_obj.voc_id;
    this.answer_id = voc_obj.answer_id;
    this.question = voc_obj.question;
    this.answer = voc_obj.answer;
    this.right = voc_obj.right;
    this.wrong = voc_obj.wrong;
    this.rating = voc_obj.rating;
    this.importance = voc_obj.importance;
    this.img = "NULL";

    this.multi_choice = voc_obj.multi_choice;
    this.createDoneArray();
    this.createOkayArray();
    this.adjustArrayLength();
    this.correctRatings();
    this.arrangeImportance();

}

Voc.prototype.arrangeImportance = function() {

    var importance_arr = [];
    if (this.importance.length != this.answer.length) {
        for (i = 0; i < this.answer.length; i++) {
            importance_arr.push(importance);
        }
        this.importance = importance_arr;
    }
    this.maximportance = this.importance.max();
};

Voc.prototype.adjustArrayLength = function() {

    if (!this.checkDataArrays()) {

        right_arr = [];
        wrong_arr = [];
        rating_arr = [];
        for (i = 0; i < this.answer.length; i++) {
            rating_arr.push(0);
            right_arr.push(0);
            wrong_arr.push(0);
        }
        this.rating = rating_arr;
        this.right = right_arr;
        this.wrong = wrong_arr;
    }
};

Voc.prototype.checkDataArrays = function(array) {

    if (!this.check_value(this.right)) {
        return false;
    }
    if (!this.check_value(this.wrong)) {
        return false;
    }
    if (!this.check_value(this.rating)) {
        return false;
    }

    return true;

};

Voc.prototype.correctRatings = function() {

    this.correctArrayValue(this.right);
    this.correctArrayValue(this.wrong);
    this.correctArrayValue(this.rating);

};

Voc.prototype.correctArrayValue = function(array) {

    for (var i = array.length - 1; i >= 0; i--) {
        array[i] = parseFloat(array[i], 10);
        if (!this.check_value(array[i])) {
            array[i] = 0;
        }
    }
    return array;
};

Voc.prototype.check_value = function(value) {

    if (value === null) {
        return false;
    }
    if (value === 0) {
        return false;
    }
    if (value === "") {
        return false;
    }
    if (value === "null") {
        return false;
    }
    if (value === "NULL") {
        return false;
    }
    if (value === undefined) {
        return false;
    }
    return true;
};

Voc.prototype.createOkayArray = function() {
    this.okarray = [];
    for (var i = 0; i < this.answer.length; i++) {
        this.okarray.push(-2);
    }
    this.ok = this.okarray;
};
Voc.prototype.createDoneArray = function() {
    this.done = [];
    for (var i = 0; i < this.answer.length; i++) {
        this.done.push(-2);
    }
    this.ok = this.done;
};

Voc.prototype.correct = function(i) {
    /*for (var i = 0; i < this.answer.length; i++ )
      {if (answer === this.answer[i]) {break;}}*/
    // macht aus den String-Werten Integers
    this.right[i] = parseFloat(this.right[i], 10);
    this.right[i] = this.right[i] + 1;
    if (this.ok[i] == -2) {
        this.done[i] = 0;
    } else {
        this.done[i]++;
    }
    this.ok[i] = 1;
};
Voc.prototype.incorrect = function(i) {
    this.wrong[i] = parseFloat(this.wrong[i], 10);
    this.wrong[i] = this.wrong[i] + 1;
    if (this.done[i] > -2) {
        this.done[i]--;
    }
    this.ok[i] = 0;
};


Voc.prototype.toString = function() {
    return "Voc ID = " + this.id +
        "\n Question = " + this.question +
        "\n Answer = " + this.answer +
        "\n Right = " + this.right +
        "\n Wrong = " + this.wrong +
        "\n Rating = " + this.rating +
        "\n Ok = " + this.ok;
};
