function ClassTrainer() {
    HtmlIdsAndClassesTrainer.call(this);
    this.vocpool = new LinkedList.Circular();
    this.vocllist = new LinkedList.Circular();
    this.trainer_display_check = new ClassTrainerDisplayCheck();
    this.trainer_display = new ClassTrainerDisplay();
    this.correctanswers = [];
    this.skipn = 5;
    this.still = 0;
    this.vocs_loaded = false;
    this.poolsize = 5;
    this.poolsize_max = 8;
    this.poolsize_min = 2;
    this.step = 0;
    this.poolnode = "not_set";
    this.ismulti = "not_set";
    this.node = "not_set";
    this.vocs_to_learn = "not_set";
    this.mastered_vocs = 0;
    this.probable_answer = "not_set";

    this.list_is_finished = false;
}

ClassTrainer.prototype.setUpHTMLFixture = function() {
    fixture = readFixtures("trainer.html");
    fixture = createFixtureString(fixture);
    setFixtures(fixture);
};

ClassTrainer.prototype.display = function() {

    this.trainer_display.display();

};

ClassTrainer.prototype.addListener = function() {

    this.addCheckAnswerListener();
    this.addCorrectAnswerListener();
    this.addDecreasePoolsizeListener();
    this.addIncreasePoolsizeListener();

};

ClassTrainer.prototype.addDecreasePoolsizeListener = function() {
    var trainer = this;
    $("#" + this.decrease_poolsize).click(function(event) {
        trainer.decreasePoolsize();
    });
};
ClassTrainer.prototype.addIncreasePoolsizeListener = function() {
    var trainer = this;
    $("#" + this.increase_poolsize).click(function(event) {
        trainer.increasePoolsize();
    });
};

ClassTrainer.prototype.addCorrectAnswerListener = function() {
    var trainer = this;
    $("#" + this.answer_check_button_id).click(function(event) {
        trainer.check();
    });
};
ClassTrainer.prototype.addCheckAnswerListener = function() {
    var trainer = this;
    $("#" + this.answer_accept_button_id).click(function(event) {
        trainer.correct_answer();
    });
};

ClassTrainer.prototype.addAnwerTextareaListener = function() {
    var trainer = this;
    $("#" + this.answer_textarea_id).keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            event.preventDefault();
            trainer.check();
        }
    });

};

$.urlParam = function(name) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!results) {
        return false;
    }
    return results[1] || 0;
};

$('textarea').bind('keypress', function(e) {
    if ((e.keyCode || e.which) == 13) {
        //$(this).parents('form').submit();
        e.preventDefault();
    }
});

ClassTrainer.prototype.stripSpaces = function(string) {

    var nstring = string.replace(/^\s+/g, "");
    nstring = nstring.replace(/\s+$/g, "");

    return nstring;

};


ClassTrainer.prototype.sortfunction = function(a, b) {
    //Compare "a" and "b" in some fashion, and return -1, 0, or 1
    return (b.maximportance - a.maximportance);
};

ClassTrainer.prototype.sort_importance = function() {
    var temp = this.vocllist.toArray();
    temp.sort(this.sortfunction);
    this.vocllist = LinkedList.Circular.fromArray(temp);
};
ClassTrainer.prototype.displayCheckValues = function() {
    this.trainer_display_check.displayCheckValues(this.vocpool, this.vocllist);
};



ClassTrainer.prototype.updatequestion = function() {

    // überprüft ob der user noch eingeloggt ist
    //check_login();
    $('#correct_answers').html("");
    $("#accept_button").attr("value", "");
    $("#check_button").attr("value", "Überprüfen");

    this.trainer_display.displayQuestion(this.poolnode.data.question);

    var image = ""; //paste image
    $('#picture').html(image);
    //alert(poolnode.data.img);
    if (this.poolnode.data.img != "NULL") {
        image += "<br><p><img src='/Xoon/Trainer/upl_img/" + this.poolnode.data.img + "' alt='Question picture'></p>";
        $('#picture').html(image);
    }

    // paste answerfield or multi choice divs
    var nanswers = this.poolnode.data.answer.length;
    this.ismulti = 0;
    for (var i = 0; i < nanswers; i++) {
        if (this.poolnode.data.multi_choice[i] == 1) {
            this.ismulti = 1;
        }
    }

    display = "";
    if (!this.ismulti) {
        this.trainer_display.displayAnswerField();
        this.addAnwerTextareaListener();
        this.still = 0;
        this.setfocus();
        this.correctanswers = [];
        this.check_importance();
    } else {
        $('#acceptdiv').html("");
        $('#correct_answers').html("");

        var pasted_choices = [];
        var random;

        //for (i=0; i<nanswers; i++)
        do {
            random = Math.floor(Math.random() * nanswers);
            if (!pasted_choices.in_array(random)) {
                display += "<div id='" + random + "' class = 'multiplechoice' onClick='Javascript: set_multi_choice(" + random + ")'>";
                display += this.poolnode.data.answer[random];
                display += "<input type='hidden' value ='0' name='choice" + random + "' id='choice" + random + "'>";
                display += "</div>";
                pasted_choices.push(random);
            }
            $('#userinput').html(display);
        } while (pasted_choices.length < nanswers);
    }
    this.displayCheckValues();
};

ClassTrainer.prototype.set_multi_choice = function(i) {
    var textfield = "choice" + i;
    if ($("#" + textfield).val() === 0) {
        $("#" + textfield).val(1);
        $("#" + i).css("background-color", 'lavender');
    } else {
        $("#" + textfield).val(0);
        $("#" + i).css("background-color", '#eee');
    }
};

ClassTrainer.prototype.setfocus = function() {
    $("#answer").prop("readonly", false);
    $("#answer").select();
    $("#answer").val("");
};

ClassTrainer.prototype.jumpToNextVoc = function() {
    if (this.vocpool.length > 0) {
        this.poolnode = this.poolnode.next;
        this.updatequestion();
    } else {
        this.step = 4; // so that nothing happens after pushing the Check/Accept button
        this.list_is_finished = true;
        $("#" + this.answer_textarea_id).val("Geeeeeil, diese Liste ist beendet!");
        $("#" + this.answer_textarea_id).css({
            color: "red"
        });
        $("#" + this.answer_textarea_id).prop("readonly", true);
    }
};

ClassTrainer.prototype.updatepool = function() {
    if (this.node != this.vocllist.last) // if vocllist is not finished yet
    {
        this.node = this.node.next;
        this.poolnode.data = this.node.data;
    } else {
        var help = this.poolnode.prev;
        this.vocpool.remove(this.poolnode);
        this.poolnode = help;
    }
};
ClassTrainer.prototype.updateLeftVocsDisplay = function() {

    this.mastered_vocs++;
    this.trainer_display.updateLeftVocsDisplay(this.mastered_vocs);

};

ClassTrainer.prototype.calculateRating = function() {
    var operation = "classTrainerUpdateVocRating";
    var class_ajax = new ClassAjax();
    var voc_data = this.poolnode.data;
    var data = {
        answer_id: voc_data.answer_id,
        ok: voc_data.ok,
    };
    var new_ratings = class_ajax.masterAjaxFunction(operation, data);
    new_ratings = new_ratings.rating_array;
    for (var i = 0; i < new_ratings.length; i++) {
        new_ratings[i] = parseFloat(new_ratings, 10);
    }
    this.vocllist.update_rating(voc_data.id, new_ratings);
    return new_ratings;
};

ClassTrainer.prototype.loadData = function() {

    var list_id = this.getUrlParameter("list_arr");
    var json_data = this.getEncodedArray(list_id);
    voclist = json_data;
    if (voclist === false) {
        return false;
    }
    for (var i = 0; i < voclist.length; i++) {
        if (!this.checkkIfAllArrayValuesAreNotNull(voclist[i].importance)) {
            var voc_to_make_object_of = voclist[i];
            var vocab = new Voc(voc_to_make_object_of);
            this.vocllist.append(new LinkedList.Node(vocab));
        }
    }
    this.setVocsToLearn();
    this.displayVocsToLearn();
    if (this.vocllist.length < 1) {
        this.list_is_finished = true;
        return false;
    }
    this.sort_importance();
    var help = 0;
    for (this.node = this.vocllist.first;
        ((help === 0 || this.node != this.vocllist.first) && this.vocpool.length < this.poolsize); this.node = this.node.next) {
        this.vocpool.append(new LinkedList.Node(this.node.data));
        help = 1;
    }
    this.node = this.node.prev;
    this.poolnode = this.vocpool.first;
    this.displayCheckValues();
    this.updatequestion();
    this.vocs_loaded = true;
    this.step = 1;
    return true;
};

ClassTrainer.prototype.setVocsToLearn = function() {

    this.vocs_to_learn = this.vocllist.length;

};

ClassTrainer.prototype.displayVocsToLearn = function() {

    var vocs = this.vocs_to_learn;
    this.trainer_display.displayVocsToLearn(vocs);

};



ClassTrainer.prototype.checkkIfAllArrayValuesAreNotNull = function(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] >= 0) {
            return false;
        }
    }
    return true;
};

ClassTrainer.prototype.getEncodedArray = function(list_id) {
    var operation = "classTrainerGetVocs";
    var class_ajax = new ClassAjax();
    var voclist;
    if (!list_id) {
        list_id = 7;
    }
    var send_obj = {
        list_id: list_id
    };
    var json_data = class_ajax.masterAjaxFunction(operation, send_obj);
    return json_data;
};

ClassTrainer.prototype.already_answered = function(n) {
    var already = 0;
    for (var i = 0; i < this.correctanswers.length; i++) {
        if (this.correctanswers[i] == n) {
            already = 1;
        }
    }
    return already;
};

ClassTrainer.prototype.check_importance = function() {
    // Sorts out the answers with negative importance and outputs them
    var display = "";
    var i;
    var nanswers = this.poolnode.data.answer.length;
    var type = 1;
    this.correctanswers = [];
    for (i = 0; i < nanswers; i++) {
        if (this.poolnode.data.importance[i] < 0) {
            this.correctanswers.push(i);
            display += this.poolnode.data.answer[i];
            display += "<br>";
        }
        // Checking if the voc is a new one (-2), a still-in-the-pool one (0), or a back-from-the-list one (1)
        if (this.poolnode.data.ok[i] === 0) {
            type = 0;
        }
        if (this.poolnode.data.ok[i] == -2) {
            type = -2;
        }
        if (this.poolnode.data.ok[i] == 1) {
            type = 5;
        }
    }

    if (type === 0) // If the voc is a still-in-the-pool, the answers that were answered correctly in the first place are sorted out and outputted
    {
        for (i = 0; i < nanswers; i++) {
            if (this.poolnode.data.ok[i] >= 1) {
                this.correctanswers.push(i);
                display += this.poolnode.data.answer[i];
                display += "<br>";
                this.poolnode.data.ok[i] = 2; // so that it doesnt get a new rating
            }
        }
    }
    if (type == 1) {
        for (i = 0; i < nanswers; i++) {
            if (this.poolnode.data.rating[i] > 0) {
                this.correctanswers.push(i);
                display += this.poolnode.data.answer[i];
                display += "<br>";
                this.poolnode.data.ok[i] = 2; // so that it doesnt get a new rating
            }
        }
    }
    if (type == 5) {
        this.updateLeftVocsDisplay();
    }

    $('#correct_answers').append(display);

};

ClassTrainer.prototype.check_old = function() {
    var nanswers = 0;
    var correct = 0;
    var i = 0;
    var answers = [];
    var display = "";
    var display_answers = "";
    var uanswer_temp = $("#answer").val();
    var uanswer = uanswer_temp.replace(/\n/g, "");
    // doppelte Leerzeichen entfernen
    uanswer = uanswer.replace(/\s+/g, " ");
    // Leerzeichen am Anfang und Ende entfernen
    uanswer = this.stripSpaces(uanswer);
    nanswers = this.poolnode.data.answer.length;
    answers = this.poolnode.data.answer;

    for (i = 0; i < nanswers; i++) // Check if the answer is correct
    {
        if ((uanswer == this.stripSpaces(answers[i])) && (!this.already_answered(i))) {
            this.poolnode.data.correct(i);
            this.correctanswers.push(i);
            var answer = this.poolnode.data.answer[i];
            if (nanswers != 1) {
                this.trainer_display.displayCorrectAnswerInAnswerBox(answer);
            }
            if (this.correctanswers.length == nanswers) // If the number of answers left is 0
            {
                this.question_finished();
                var smallerzero = 0;
                for (i = 0; i < this.poolnode.data.answer.length; i++) {
                    if (this.poolnode.data.rating[i] <= -1) {
                        smallerzero = 1;
                    }
                }
                if (smallerzero && (this.vocpool.length > 1)) // If one of the current ratings is <0 the voc comes back to the list
                {
                    this.vocllist.insertAfter(this.vocllist.skip(this.node, this.skipn), new LinkedList.Node(this.poolnode.data));
                }
                this.calculateRating();
                var allcorrect = 1;
                for (i = 0; i < nanswers; i++) {
                    if (this.poolnode.data.ok[i] === 0) {
                        allcorrect = 0;
                    }
                }

                if (allcorrect) {
                    this.updatepool();
                }
                this.jumpToNextVoc();
                correct = 1;

                break;
            } else // if the number of answers left is >0
            {
                if ((nanswers - this.correctanswers.length) == 1) {
                    display = ("Correct, 1 answer remaining.");
                } else {
                    display = ("Correct, " + (nanswers - this.correctanswers.length) + " answers remaining.");
                }
                $('#communication').html(display);
                this.still = 1;
                correct = 1;
                this.setfocus();
                break;
            }

        }
        if ((uanswer == answers[i]) && (this.already_answered(i))) {
            display = ("This answer was already given");
            $('#communication').html(display);
            this.setfocus();
            correct = 1;
            break;
        }

    }
    if (correct === 0) // if the user's answer was incorrect
    {
        this.step = 2;
        if (nanswers == 1) // if there is only one answer
        {
            this.poolnode.data.ok[0] = 0;
            this.question_finished();
        } else // if there are multiple answers
        {
            this.correct_answer();
        }
    }
};

ClassTrainer.prototype.check_multi = function() {
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
ClassTrainer.prototype.incorrect_answer = function() {
    var display = "";
    var display_answers = "";
    var answers = [];
    answers = this.poolnode.data.answer;
    var nanswers = this.poolnode.data.answer.length;

    if (this.step == 2) // if all answers left are wrong
    {
        for (var i = 0; i < nanswers; i++) {
            if (!this.already_answered(i)) {
                this.poolnode.data.incorrect(i);
            }
        }
        if (nanswers == 1) {
            this.trainer_display.displayCommendSingleAnswerWrong(this.poolnode.data.question);
        }

        this.calculateRating();
        this.jumpToNextVoc();
    } else {
        if (this.step == 3) // if the probable answer is wrong
        {
            this.poolnode.data.incorrect(this.probable_answer);
            this.correctanswers.push(this.probable_answer);
            var probable_answer = answers[this.probable_answer];
            this.trainer_display.displayWrongAnswerInAnswerBox(probable_answer);

            if (this.correctanswers.length == answers.length) {
                this.question_finished();
                this.calculateRating();
                this.jumpToNextVoc();
            } else {
                display = ("Type in the next answer");
                $('#communication').html(display);
            }
        }
    }

    this.step = 1;
};

ClassTrainer.prototype.question_finished = function() {
    var display;
    var nanswers = this.poolnode.data.answer.length;
    var outputstring = "";
    uanswer = $("#answer").val();
    var given_answer = this.poolnode.data.answer[0];

    if (nanswers == 1) // One answer
    {
        if (this.poolnode.data.ok[0] == 1) {
            outputstring += this.trainer_display.userInputCorrectAnswerSingle(given_answer);
        } else {
            outputstring += this.trainer_display.userInputWrongAnswerSingle(given_answer);
        }

    } else // multiple answers
    {

        this.trainer_display.displayMultiAnswerSummary(outputstring, nanswers, this.poolnode.data);

    }
    display = outputstring;

    $('#communication').html(display);
};

ClassTrainer.prototype.levenshtein = function(s1, s2) {
    // http://kevin.vanzonneveld.net
    // +            original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // +            bugfixed by: Onno Marsman
    // +             revised by: Andrea Giammarchi (http://webreflection.blogspot.com)
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // + reimplemented by: Alexander M Beedie
    // *                example 1: levenshtein('Kevin van Zonneveld', 'Kevin van Sommeveld');
    // *                returns 1: 3
    if (s1 == s2) {
        return 0;
    }

    var s1_len = s1.length;
    var s2_len = s2.length;
    if (s1_len === 0) {
        return s2_len;
    }
    if (s2_len === 0) {
        return s1_len;
    }

    // BEGIN STATIC
    var split = false;
    try {
        split = !('0')[0];
    } catch (e) {
        split = true; // Earlier IE may not support access by string index
    }
    // END STATIC
    if (split) {
        s1 = s1.split('');
        s2 = s2.split('');
    }

    var v0 = new Array(s1_len + 1);
    var v1 = new Array(s1_len + 1);

    var s1_idx = 0,
        s2_idx = 0,
        cost = 0;
    for (s1_idx = 0; s1_idx < s1_len + 1; s1_idx++) {
        v0[s1_idx] = s1_idx;
    }
    var char_s1 = '',
        char_s2 = '';
    for (s2_idx = 1; s2_idx <= s2_len; s2_idx++) {
        v1[0] = s2_idx;
        char_s2 = s2[s2_idx - 1];

        for (s1_idx = 0; s1_idx < s1_len; s1_idx++) {
            char_s1 = s1[s1_idx];
            cost = (char_s1 == char_s2) ? 0 : 1;
            var m_min = v0[s1_idx + 1] + 1;
            var b = v1[s1_idx] + 1;
            var c = v0[s1_idx] + cost;
            if (b < m_min) {
                m_min = b;
            }
            if (c < m_min) {
                m_min = c;
            }
            v1[s1_idx + 1] = m_min;
        }
        var v_tmp = v0;
        v0 = v1;
        v1 = v_tmp;
    }
    return v0[s1_len];
};

ClassTrainer.prototype.stringcompare = function(input, control) {

    input = input.toLowerCase(); // make the strings lowercase
    control = control.toLowerCase();

    inputarray = input.split(' ');
    controlarray = control.split(' ');

    // Kick everything out that is not alphanumeric:
    for (var i = 0; i < inputarray.length; i++) {
        inputarray[i] = inputarray[i].replace(/\W/g, "");
    }

    for (i = 0; i < controlarray.length; i++) {
        controlarray[i] = controlarray[i].replace(/\W/g, "");
    }

    //var levenstein = levenshtein(input, control);

    var distance = inputarray.length;
    var used = [];

    for (i = 0; i < inputarray.length; i++) {
        for (var j = 0; j < controlarray.length; j++) {
            if (used.in_array(j)) {
                continue;
            }

            if (this.levenshtein(inputarray[i], controlarray[j]) <= 2) {
                distance = distance - 1;
                used.push(j);
            }
        }
    }

    return distance;

};

ClassTrainer.prototype.correct_answer = function() {

    if (this.step == 4) {
        return;
    }
    var uanswer, nanswers;
    var answers = [];
    var display = "";
    var smallerzero = 0;
    uanswer = $("#answer").val();
    nanswers = this.poolnode.data.answer.length;
    answers = this.poolnode.data.answer;

    if (this.step == 1) return; // falls noch nichts eingegeben wurde kann auch nichts accepted werden
    if (this.step == 3) // Falls nach falscher Eingabe [accept] gedrückt wurde (multiple answers)
    {
        this.step = 1;
        $("#answer").val(answers[this.probable_answer]);
        this.check_old();
        return;
    }
    this.step = 1;

    if (nanswers == 1) // Falls nach falscher Eingabe accept gedrückt wurde (eine Antwort)
    {
        this.poolnode.data.correct(0);
        display += "'" + uanswer + "' was accepted as an answer for the question '" + this.poolnode.data.question + "'.";
        $('#communication').html(display);
        if (this.poolnode.data.rating[0] <= -1) {
            smallerzero = 1;
        }
        if (smallerzero && (this.vocpool.length > 1)) // If one of the current ratings is <0 the voc comes back to the list
        {
            this.vocllist.insertAfter(this.vocllist.skip(this.node, this.skipn), new LinkedList.Node(this.poolnode.data));
        }
        this.calculateRating();
        this.updatepool();
        this.jumpToNextVoc();
        return;
    }

    // Wird nach falscher Eingabe wird bei mehreren Antwortmöglichkeiten ausgeführt (step = 2)
    var distances = [];
    for (var i = 0; i < nanswers; i++) {
        if (this.already_answered(i)) {
            distances.push(100000);
            continue;
        }
        distances.push(this.stringcompare(uanswer, answers[i]));
    }

    this.probable_answer = distances.minat();
    var user_given_wrong_answer = answers[this.probable_answer];
    this.trainer_display.userInputWrongAnswerMulti(user_given_wrong_answer);
    $("#answer").prop("readonly", true);
    this.step = 3;
};


ClassTrainer.prototype.check = function() {

    this.display();
    this.addListener();

    //alert(step);
    if (this.vocs_loaded === true) {
        if (this.ismulti) {
            var display = "";
            $('#communication').html(display);

            switch (this.step) {
                case 1:
                    this.check_multi();
                    break;

                case 2:
                    this.step = 1;
                    this.jumpToNextVoc();
                    break;
            }
        } else {
            switch (this.step) {
                case 1:
                    this.check_old();
                    break;

                case 2:
                    this.incorrect_answer();
                    break;

                case 3:
                    this.still = 1;
                    this.incorrect_answer();
                    this.setfocus();
                    break;
            }
        }

    }

    if (this.vocs_loaded === false) {
        if (!this.loadData()) {
            $("#" + this.answer_textarea_id).val("Du kannst doch schon alle Voks dieser Liste...");
        }
    }

    if (this.step === 0) {
        this.step = 1;
    }
};

ClassTrainer.prototype.decreasePoolsize = function() {
    if (this.poolsize == this.poolsize_min) {
        return;
    }
    this.poolsize--;
    this.displayPoolsize();

};
ClassTrainer.prototype.increasePoolsize = function() {

    if (this.poolsize == this.poolsize_max) {
        return;
    }
    this.poolsize++;
    this.displayPoolsize();

};
ClassTrainer.prototype.displayPoolsize = function() {
    var poolsize = this.poolsize;
    this.trainer_display.displayPoolsize(poolsize);
};

ClassTrainer.prototype.getUrlParameter = function(sParam) {

    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }

};