function ClassTrainerMultiChoice(poolnode, vocllist) {

    this.poolnode = poolnode;
    this.vocllist = vocllist;

}


ClassTrainerMultiChoice.prototype.checkMultiChoice = function() {

    var nanswers = this.poolnode.data.answer.length;
    var user_choice = [];
    var choice, textfield;
    // Get the users choices out of the hidden textareas
    for (var i = 0; i < nanswers; i++) {
        textfield = "choice" + i;
        choice = $("#" + textfield).val();
        user_choice.push(choice);
    }

    // compare the users choices with the correct answer:
    var correct_choice = this.poolnode.data.multi_choice;
    var iscorrect = 1;
    for (i = 0; i < nanswers; i++) {
        if (user_choice[i] != correct_choice[i]) {
            iscorrect = 0;
        }
        if (correct_choice[i] == 1) {
            $("#" + i).css("background-color", '#00A000');
            if (user_choice[i] === 0) {

                $("#" + i).style.border = '2px solid #F00000';
            }
        } else {
            if (user_choice[i] === 0) {
                $("#" + i).css("background-color", '#eee');
            } else {
                $("#" + i).css("background-color", '#F00000');
            }
        }
    }
    if (iscorrect) {
        for (i = 0; i < nanswers; i++) {
            this.poolnode.data.correct(i);
        }
        if ((this.poolnode.data.rating[0] <= -1) && (this.vocpool.length > 1)) // If one of the current ratings is <0 the voc comes back to the list
        {
            this.vocllist.insertAfter(this.vocllist.skip(this.node, this.skipn), new LinkedList.Node(this.poolnode.data));
        }
        this.calculateRating();
        this.updatepool();
    } else {
        for (i = 0; i < nanswers; i++) {
            this.poolnode.data.incorrect(i);
        }
        this.calculateRating();
    }
    this.step = 2;


};