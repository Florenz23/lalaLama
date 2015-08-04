function ClassTrainerListener() {
    HtmlIdsAndClassesTrainer.call(this);

}

ClassTrainerListener.prototype.addListener = function() {

    this.addCheckAnswerListener();
    this.addCorrectAnswerListener();
    this.addDecreasePoolsizeListener();
    this.addIncreasePoolsizeListener();

};


ClassTrainerListener.prototype.addDecreasePoolsizeListener = function() {
    var trainer = this;
    $("#" + this.decrease_poolsize).click(function(event) {
        trainer.decreasePoolsize();
    });
};
ClassTrainerListener.prototype.addIncreasePoolsizeListener = function() {
    var trainer = this;
    $("#" + this.increase_poolsize).click(function(event) {
        trainer.increasePoolsize();
    });
};

ClassTrainerListener.prototype.addCorrectAnswerListener = function() {
    var trainer = this;
    $("#" + this.answer_check_button_id).click(function(event) {
        trainer.check();
    });
};
ClassTrainerListener.prototype.addCheckAnswerListener = function() {
    var trainer = this;
    $("#" + this.answer_accept_button_id).click(function(event) {
        trainer.correct_answer();
    });
};

ClassTrainerListener.prototype.addAnwerTextareaListener = function() {
    var trainer = this;
    $("#" + this.answer_textarea_id).keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            event.preventDefault();
            trainer.check();
        }
    });
    $("#" + this.answer_textarea_id).keydown(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '9') {
            event.preventDefault();
            trainer.correct_answer();
        }
    });

};