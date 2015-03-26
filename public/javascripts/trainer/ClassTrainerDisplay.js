function ClassTrainerDisplay() {

    HtmlIdsAndClassesTrainer.call(this);

}

ClassTrainerDisplay.prototype.display = function() {

    this.displayAcceptAnswerButton();
    this.displayCheckAnswerButton();

};



ClassTrainerDisplay.prototype.displayQuestion = function(question) {

    $('#question').html(question);

};


ClassTrainerDisplay.prototype.displayAnswerField = function() {

    var display = "";
    display += "<textarea  name='answer' style='' id='answer' ";
    display += "class='answer' ";
    display += "></textarea>";
    $('#userinput').html(display);
};

ClassTrainerDisplay.prototype.displayAcceptAnswerButton = function() {

    var display = "";
    display = "<input type='button' value='' class='accept' id = 'accept_button' >";
    $('#acceptdiv').html(display);

};

ClassTrainerDisplay.prototype.displayCheckAnswerButton = function() {

    var display = "";
    display += "  <input type='button' value='Überprüfen' class='check' id = 'check_button' >";
    $('#checkdiv').html(display);

};

ClassTrainerDisplay.prototype.userInputWrongAnswerMulti = function(user_given_wrong_answer) {
    this.changeButtonValueWrongAnswer();
    var display = "";
    $("#answer").css("background-color", "F00000");
    $("#answer").prop("readonly", true);
    display = ("\nMeintest du '" + user_given_wrong_answer + "'?\n ");
    $('#communication').html(display);

};

ClassTrainerDisplay.prototype.userInputWrongAnswerSingle = function(given_answer) {
    this.changeButtonValueWrongAnswer();
    var display = "";
    $("#answer").css("background-color", "F00000");
    $("#answer").prop("readonly", true);
    display += "<p style = 'color:red'>" + given_answer + "</p>";
    return display;

};

ClassTrainerDisplay.prototype.changeButtonValueWrongAnswer = function() {
    $("#accept_button").attr("value", "Antwort annehmen");
    $("#check_button").attr("value", "Ok");

};

ClassTrainerDisplay.prototype.userInputCorrectAnswerSingle = function(given_answer) {

    var outputstring = "";
    outputstring += "<h2>'" + given_answer + "' is correct.</h2>";
    outputstring = "";
    return outputstring;

};

ClassTrainerDisplay.prototype.displayMultiAnswerSummary = function(outputstring, nanswers, poolnode) {

    var outputstring2 = "";
    for (i = 0; i < nanswers; i++) {
        if (poolnode.ok[i] == 1) {
            outputstring2 += "'" + poolnode.answer[i] + "'<br>";
        }
    }
    if (outputstring2 !== "") {
        outputstring += ("\nYou answered correctly:<br>");
        outputstring += outputstring2;
        outputstring += "<br>";
    }

    outputstring2 = "";
    for (i = 0; i < nanswers; i++) {
        if (poolnode.ok[i] === 0) {
            outputstring2 += "'" + poolnode.answer[i] + "'<br>";
        }
    }
    if (outputstring2 !== "") {
        outputstring += ("You missed the following answers:<br>");
        outputstring += outputstring2;
    }
    display = "";

    $('#communication').html(display);

};

ClassTrainerDisplay.prototype.displayCommendSingleAnswerWrong = function(question) {

    display = "";
    $('#communication').html(display);

};

ClassTrainerDisplay.prototype.displayCorrectAnswerInAnswerBox = function(answer) {

    var display = "";
    display += "<p style = 'color:green'>" + answer + "</p>";
    $('#correct_answers').append(display);

};


ClassTrainerDisplay.prototype.displayWrongAnswerInAnswerBox = function(probable_answer) {
    var display = "";
    display += "<p style = 'color:red'>" + probable_answer + "</p>";
    $('#correct_answers').append(display);

};
ClassTrainerDisplay.prototype.updateLeftVocsDisplay = function(number_of_vocs) {

    $("#left_vocs").html("(" + number_of_vocs + "/");

};

ClassTrainerDisplay.prototype.displayVocsToLearn = function(number_of_vocs) {

    $("#total_vocs").html(number_of_vocs + ")");
    $("#left_vocs").html("(0/");

};

ClassTrainerDisplay.prototype.displayLeftVocs = function(left_vocs) {

    $("#left_vocs").html(left_vocs);

};
ClassTrainerDisplay.prototype.displayPoolsize = function(poolsize) {
    $("#" + this.recent_poolsize_div).html(poolsize);

};