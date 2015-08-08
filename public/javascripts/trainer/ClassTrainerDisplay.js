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
ClassTrainerDisplay.prototype.disableAcceptButton = function() {

    $("#accept_button").attr("value", "");
    $('#accept_button').unbind('click');
};


ClassTrainerDisplay.prototype.displayAnswerField = function() {

    var display = "";
    display += "<textarea  name='answer' style='' id='answer' ";
    display += "class='answer' ";
    display += "></textarea>";
    $('#userinput').html(display);
};

ClassTrainerDisplay.prototype.resetAnswerField = function() {

    $("#answer").val("");
    $("#answer").css("background-color", "e6e6fa");

};
ClassTrainerDisplay.prototype.resetCommunicationField = function() {

    $("#communication").html("");

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

ClassTrainerDisplay.prototype.displayUserCorrectAnswerSingle = function(correct_answer) {
    var display = correct_answer;
    $('#communication').html(display);
};

ClassTrainerDisplay.prototype.displaySuggestedAnswerInAnswerField = function(user_given_wrong_answer) {

    var display = "";
    display = ("Meintest du '" + user_given_wrong_answer + "'?");
    $('#communication').html(display);

};

ClassTrainerDisplay.prototype.changeBackgroundColorAnswerFieldWrongAnswer = function() {

    $("textarea.answer").css("background-color", "FF9C4A");

};
ClassTrainerDisplay.prototype.changeBackgroundColorAnswerFieldToNeutral = function() {

    $("textarea.answer").css("background-color", "e6e6fa");

};

ClassTrainerDisplay.prototype.setAnswerFieldToReadOnly = function(parameter) {

    $("#answer").prop("readonly", true);

};

ClassTrainerDisplay.prototype.changeButtonValueWrongAnswer = function() {
    $("#accept_button").attr("value", "Antwort annehmen");
    $("#check_button").attr("value", "Ok");

};


ClassTrainerDisplay.prototype.tellUserNumberOfRemainingAnswers = function(number_of_remaining_answers) {

    var display = ("Verbleibende Antworten: " + number_of_remaining_answers);
    $('#communication').html(display);


};

ClassTrainerDisplay.prototype.displayTheSuggestedAnswer = function(probable_answer) {
    $("#answer").val(probable_answer);


};
ClassTrainerDisplay.prototype.displayAnswersThatDontHaveToBeAnsweredAgain = function(answer) {

    var output = "";
    output += "<p style = 'color:green'>" + answer + "</p>";
    output += "<br>";
    return output;

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