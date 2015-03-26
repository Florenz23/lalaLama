function stripSpaces(string) {

        var nstring = string.replace(/^\s+/g, "");
        nstring = nstring.replace(/\s+$/g, "");

        return nstring;

}
$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(!results){
        return false;
    }
    return results[1] || 0;
};

$('textarea').bind('keypress', function(e) {
    if ((e.keyCode || e.which) == 13) {
        //$(this).parents('form').submit();
        return false;
    }
});


function sortfunction(a, b) //Compare "a" and "b" in some fashion, and return -1, 0, or 1
    {
        return (b.maximportance - a.maximportance);
    }

function sort_importance() {
    temp = vocllist.toArray();
    temp.sort(sortfunction);
    vocllist = LinkedList.Circular.fromArray(temp);
}


var poolsize = 5;
var pool_size_max = 8;
var pool_size_min = 2;
var step = 0;
var poolnode;
var vocpool = new LinkedList.Circular();



function set_hidden_fields() {
    var check = "inline";
    var display = "";

    if (check != 'none') {
        display += "Voclist: <br>";
    }
    display += "<textarea name='voclist' id='voclist' cols='100' rows='10' readonly style='border: 0;display:" + check + ";'></textarea> <br><br>";

    if (check != 'none') {
        display += "Vocpool: <br>";
    }
    display += "<textarea name='vocpool' id='vocpool' cols='50' rows='10' readonly style='border: 0;display:" + check + ";'></textarea> <br><br>";
    $('#hidden_to_user').html(display);

}

set_hidden_fields();


function output() {

    help = 0;
    document.getElementById("voclist").value = "";
    document.getElementById("vocpool").value = "";
    document.getElementById("voclist").value = "Question | Importance | Right | Wrong | Rating | OK \n";
    document.getElementById("voclist").value += "--------------------------------------------------- \n";

    for (var current = vocllist.first;
        (help === 0 || current != vocllist.first); current = current.next) {
        document.getElementById("voclist").value += current.data.question + " | " + current.data.importance + " | " + current.data.right + " | " + current.data.wrong + " | " + current.data.rating + " | " + current.data.ok + " | ";
        document.getElementById("voclist").value += "\n";
        help = 1;
    }
    help = 0;
    for (current = vocpool.first;
        (help === 0 || current != vocpool.first); current = current.next) {
        document.getElementById("vocpool").value += current.data.question;
        document.getElementById("vocpool").value += "\n";
        help = 1;
    }

}

var ismulti;

function updatequestion() {
    // überprüft ob der user noch eingeloggt ist
    //check_login();

    var display = ""; // paste question
    display += poolnode.data.question;
    $('#question').html(display);

    var image = ""; //paste image
    $('#picture').html(image);
    //alert(poolnode.data.img);
    if (poolnode.data.img != "NULL") {
        image += "<br><p><img src='/Xoon/Trainer/upl_img/" + poolnode.data.img + "' alt='Question picture'></p>";
        $('#picture').html(image);
    }

    // paste answerfield or multi choice divs
    var nanswers = poolnode.data.answer.length;
    ismulti = 0;
    for (var i = 0; i < nanswers; i++) {
        if (poolnode.data.multi_choice[i] == 1) {
            ismulti = 1;
        }
    }

    display = "";
    if (!ismulti) {
        display += "<textarea  name='answer' style='' id='answer' ";
        display += "class='answer' onKeydown='Javascript: if (event.keyCode==13) check();";
        display += " if (event.keyCode==16) correct_answer();'></textarea>";
        $('#userinput').html(display);

        display = "<input type='button' value='Accept' class='accept' onClick='javascript:correct_answer();'>";
        $('#acceptdiv').html(display);

        if (nanswers > 1) {
            display = "<h1>Correct answers (you don't need to type them in again): </h1> <br>";
            $('#correct_answers').html(display);
        } else {
            $('#correct_answers').html('');
        }

        still = 0;
        setfocus();
        correctanswers = [];
        check_importance();
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
                display += poolnode.data.answer[random];
                display += "<input type='hidden' value ='0' name='choice" + random + "' id='choice" + random + "'>";
                display += "</div>";
                pasted_choices.push(random);
            }
            $('#userinput').html(display);
        } while (pasted_choices.length < nanswers);
    }


    output();

}

function set_multi_choice(i) {
    var textfield = "choice" + i;
    if (document.getElementById(textfield).value === 0) {
        document.getElementById(textfield).value = 1;
        document.getElementById(i).style.backgroundColor = 'lavender';
    } else {
        document.getElementById(textfield).value = 0;
        document.getElementById(i).style.backgroundColor = '#eee';
    }
}

function setfocus() {
    document.getElementById("answer").readOnly = false;
    document.getElementById("answer").focus();
    document.getElementById("answer").select();
    document.getElementById("answer").value = ("");
}

function proceed() {
    if (vocpool.length > 0) {
        poolnode = poolnode.next;
        updatequestion();
    } else {
        alert("This list is finished");
        step = 4; // so that nothing happens after pushing the Check/Accept button
    }
}

function updatepool() {
    if (node != vocllist.last) // if vocllist is not finished yet
    {
        node = node.next;
        poolnode.data = node.data;
    } else {
        var help = poolnode.prev;
        vocpool.remove(poolnode);
        poolnode = help;
    }

}
var skipn = 5;
var still = 0;
var correctanswers = [];

function calculate_rating() {
    var class_ajax = new ClassAjax();
    var voc_data = poolnode.data;
    var data = {
        answer_id: voc_data.answer_id,
        ok: voc_data.ok,
        right: voc_data.right,
        wrong: voc_data.wrong,
        rating: voc_data.rating
    };
    console.log(data);
    var send_obj = {
        data: data
    };

    var new_ratings = class_ajax.trainerUpdateVocRating(send_obj);
    console.log(new_ratings);

    vocllist.update_rating(voc_data.id, new_ratings);
}

var vocllist = new LinkedList.Circular();
var node;
var vocs_loaded = false;

function load_data() {
    var class_ajax = new ClassAjax();
    var trainer_info = new ClassTrainerInfo();
    var voclist;

    var list_arr = $.urlParam('list_arr');

    list_arr = list_arr.split(",");
    var list_id = list_arr[0];
    var obj = {
        list_arr: list_arr
    };
    var obj_json = JSON.stringify(obj);

    var data_obj = {
        db: trainer_info.db,
        table_1: trainer_info.voc_table.name,
        table_2: trainer_info.answer_table.name,
        join_row_1: trainer_info.voc_table.id,
        join_row_2: trainer_info.answer_table.voc_id,
        key: trainer_info.voc_table.list_row,
        key_value: list_id
    };
    var json_data = class_ajax.getVocsEncoded(data_obj);

    voclist = json_data;
    if (voclist === false) {
        return false;
    }
    for (var i = 0; i < voclist.length; i++) {
        var voc_to_make_object_of = voclist[i];
        var vocab = new Voc(voc_to_make_object_of);
        vocllist.append(new LinkedList.Node(vocab));
    }

    sort_importance();

    var help = 0;
    for (node = vocllist.first;
        ((help === 0 || node != vocllist.first) && vocpool.length < poolsize); node = node.next) {
        vocpool.append(new LinkedList.Node(node.data));
        help = 1;
    }
    node = node.prev;

    poolnode = vocpool.first;
    output();

    updatequestion();
    vocs_loaded = true;
    step = 1;
}

function already_answered(n) {
    var already = 0;
    for (var i = 0; i < correctanswers.length; i++) {
        if (correctanswers[i] == n) {
            already = 1;
        }
    }
    return already;
}

function check_importance() // Sorts out the answers with negative importance and outputs them
    {
        var display = "";
        var i;
        var nanswers = poolnode.data.answer.length;
        var type = 1;
        correctanswers = [];
        for (i = 0; i < nanswers; i++) {
            if (poolnode.data.importance[i] < 0) {
                correctanswers.push(i);
                display += poolnode.data.answer[i];
                display += "<br>";
            }
            // Checking if the voc is a new one (-2), a still-in-the-pool one (0), or a back-from-the-list one (1)
            if (poolnode.data.ok[i] === 0) {
                type = 0;
            }
            if (poolnode.data.ok[i] == -2) {
                type = -2;
            }
        }

        if (type === 0) // If the voc is a still-in-the-pool, the answers that were answered correctly in the first place are sorted out and outputted
        {
            for (i = 0; i < nanswers; i++) {
                if (poolnode.data.ok[i] >= 1) {
                    correctanswers.push(i);
                    display += poolnode.data.answer[i];
                    display += "<br>";

                    poolnode.data.ok[i] = 2; // so that it doesnt get a new rating
                }
            }
        }
        if (type == 1) {
            for (i = 0; i < nanswers; i++) {
                if (poolnode.data.rating[i] > 0) {
                    correctanswers.push(i);
                    display += poolnode.data.answer[i];
                    display += "<br>";

                    poolnode.data.ok[i] = 2; // so that it doesnt get a new rating
                }
            }
        }

        $('#correct_answers').append(display);

    }

function check_old() {
    var uanswer_temp, nanswers, correct = 0,
        i;
    var answers = [];
    var display = "";
    var display_answers = "";
    uanswer_temp = document.getElementById("answer").value;
    var uanswer = uanswer_temp.replace(/\n/g, "");
    // doppelte Leerzeichen entfernen
    uanswer = uanswer.replace(/\s+/g, " ");
    // Leerzeichen am Anfang und Ende entfernen
    uanswer = stripSpaces(uanswer);
    nanswers = poolnode.data.answer.length;
    answers = poolnode.data.answer;


    for (i = 0; i < nanswers; i++) // Check if the answer is correct
    {
        if ((uanswer == stripSpaces(answers[i])) && (!already_answered(i))) {
            poolnode.data.correct(i);
            correctanswers.push(i);
            display_answers += poolnode.data.answer[i] + "<br>";
            $('#correct_answers').append(display_answers);
            if (correctanswers.length == nanswers) // If the number of answers left is 0
            {
                question_finished();
                var smallerzero = 0;
                for (i = 0; i < poolnode.data.answer.length; i++) {
                    if (poolnode.data.rating[i] <= -1) {
                        smallerzero = 1;
                    }
                }
                if (smallerzero && (vocpool.length > 1)) // If one of the current ratings is <0 the voc comes back to the list
                {
                    vocllist.insertAfter(vocllist.skip(node, skipn), new LinkedList.Node(poolnode.data));
                }


                calculate_rating();
                var allcorrect = 1;
                for (i = 0; i < nanswers; i++) {
                    if (poolnode.data.ok[i] === 0) {
                        allcorrect = 0;
                    }
                }

                if (allcorrect) {
                    updatepool();
                }
                proceed();
                correct = 1;

                break;
            } else // if the number of answers left is >0
            {
                if ((nanswers - correctanswers.length) == 1) {
                    display = ("Correct, 1 answer remaining.");
                } else {
                    display = ("Correct, " + (nanswers - correctanswers.length) + " answers remaining.");
                }
                $('#communication').html(display);
                still = 1;
                correct = 1;
                setfocus();
                break;
            }

        }
        if ((uanswer == answers[i]) && (already_answered(i))) {
            display = ("This answer was already given");
            $('#communication').html(display);
            setfocus();
            correct = 1;
            break;
        }

    }
    if (correct === 0) // if the user's answer was incorrect
    {
        step = 2;
        if (nanswers == 1) // if there is only one answer
        {
            poolnode.data.ok[0] = 0;
            question_finished();
        } else // if there are multiple answers
        {
            correct_answer();
        }
    }
}


function check_multi() {
    var nanswers = poolnode.data.answer.length;
    var user_choice = [];
    var choice, textfield;


    // Get the users choices out of the hidden textareas
    for (var i = 0; i < nanswers; i++) {
        textfield = "choice" + i;
        choice = document.getElementById(textfield).value;
        user_choice.push(choice);
    }

    // compare the users choices with the correct answer:
    var correct_choice = poolnode.data.multi_choice;
    var iscorrect = 1;
    for (i = 0; i < nanswers; i++) {
        if (user_choice[i] != correct_choice[i]) {
            iscorrect = 0;
        }
        if (correct_choice[i] == 1) {
            document.getElementById(i).style.backgroundColor = '#00A000';
            if (user_choice[i] === 0) {

                document.getElementById(i).style.border = '2px solid #F00000';
            }
        } else {
            if (user_choice[i] === 0) {
                document.getElementById(i).style.backgroundColor = '#eee';
            } else {
                document.getElementById(i).style.backgroundColor = '#F00000';
            }
        }
    }


    if (iscorrect) {
        for (i = 0; i < nanswers; i++) {
            poolnode.data.correct(i);
        }
        if ((poolnode.data.rating[0] <= -1) && (vocpool.length > 1)) // If one of the current ratings is <0 the voc comes back to the list
        {
            vocllist.insertAfter(vocllist.skip(node, skipn), new LinkedList.Node(poolnode.data));
        }
        calculate_rating();
        updatepool();
    } else {
        for (i = 0; i < nanswers; i++) {
            poolnode.data.incorrect(i);
        }
        calculate_rating();
    }


    step = 2;
}


function incorrect_answer() {
    var display = "";
    var display_answers = "";
    var answers = [];
    answers = poolnode.data.answer;
    var nanswers = poolnode.data.answer.length;

    if (step == 2) // if all answers left are wrong
    {
        for (var i = 0; i < nanswers; i++) {
            if (!already_answered(i)) {
                poolnode.data.incorrect(i);
            }
        }
        if (nanswers == 1) {
            display += "The question '" + poolnode.data.question + "' was answered incorrectly.";
            $('#communication').html(display);
        }

        calculate_rating();
        proceed();
    } else {
        if (step == 3) // if the probable answer is wrong
        {
            poolnode.data.incorrect(probable_answer);
            correctanswers.push(probable_answer);
            display_answers += answers[probable_answer] + "<br>";
            $('#correct_answers').append(display_answers);

            if (correctanswers.length == answers.length) {
                question_finished();
                calculate_rating();
                proceed();
            } else {
                display = ("Type in the next answer");
                $('#communication').html(display);
            }
        }
    }

    step = 1;


}

function question_finished() {
    var display;
    var nanswers = poolnode.data.answer.length;
    var outputstring = ("");
    uanswer = document.getElementById("answer").value;

    if (nanswers == 1) // One answer
    {
        if (poolnode.data.ok[0] == 1) {
            outputstring += "<h2>'" + poolnode.data.answer[0] + "' is correct.</h2>";
        } else {
            document.getElementById('answer').style.backgroundColor = '#F00000';
            document.getElementById('answer').readOnly = true;

            outputstring += "<h1> Correct answer: " + poolnode.data.answer[0] + "</h1> <br> Click [Accept] to accept it as a right answer anyway or [Check] otherwise.";
        }

    } else // multiple answers
    {

        var outputstring2 = "";
        for (i = 0; i < nanswers; i++) {
            if (poolnode.data.ok[i] == 1) {
                outputstring2 += "'" + poolnode.data.answer[i] + "'<br>";
            }
        }
        if (outputstring2 !== "") {
            outputstring += ("\nYou answered correctly:<br>");
            outputstring += outputstring2;
            outputstring += "<br>";
        }

        outputstring2 = "";
        for (i = 0; i < nanswers; i++) {
            if (poolnode.data.ok[i] === 0) {
                outputstring2 += "'" + poolnode.data.answer[i] + "'<br>";
            }
        }
        if (outputstring2 !== "") {
            outputstring += ("You missed the following answers:<br>");
            outputstring += outputstring2;
        }
    }


    display = outputstring;

    $('#communication').html(display);

}


function levenshtein(s1, s2) {
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
}

function stringcompare(input, control) {

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


    //alert (inputarray);

    //var levenstein = levenshtein(input, control);

    var distance = inputarray.length;
    var used = [];

    for (i = 0; i < inputarray.length; i++) {
        for (var j = 0; j < controlarray.length; j++) {
            if (used.in_array(j)) {
                continue;
            }

            if (levenshtein(inputarray[i], controlarray[j]) <= 2) {
                distance = distance - 1;
                used.push(j);
            }
        }
    }

    return distance;

}

var probable_answer;
function correct_answer() {

    if (step == 4) {
        return;
    }

    var uanswer, nanswers;
    var answers = [];
    var display = "";
    var smallerzero = 0;
    uanswer = document.getElementById("answer").value;
    nanswers = poolnode.data.answer.length;
    answers = poolnode.data.answer;

    if (step == 1) return; // falls noch nichts eingegeben wurde kann auch nichts accepted werden
    if (step == 3) // Falls nach falscher Eingabe [accept] gedrückt wurde (multiple answers)
    {
        step = 1;
        document.getElementById("answer").value = answers[probable_answer];
        check_old();
        return;
    }
    step = 1;

    if (nanswers == 1) // Falls nach falscher Eingabe accept gedrückt wurde (eine Antwort)
    {
        poolnode.data.correct(0);
        display += "'" + uanswer + "' was accepted as an answer for the question '" + poolnode.data.question + "'.";
        $('#communication').html(display);
        if (poolnode.data.rating[0] <= -1) {
            smallerzero = 1;
        }
        if (smallerzero && (vocpool.length > 1)) // If one of the current ratings is <0 the voc comes back to the list
        {
            vocllist.insertAfter(vocllist.skip(node, skipn), new LinkedList.Node(poolnode.data));
        }
        calculate_rating();
        updatepool();
        proceed();
        return;
    }

    // Wird nach falscher Eingabe wird bei mehreren Antwortmöglichkeiten ausgeführt (step = 2)
    var distances = [];
    for (var i = 0; i < nanswers; i++) {
        if (already_answered(i)) {
            distances.push(100000);
            continue;
        }
        distances.push(stringcompare(uanswer, answers[i]));
    }

    probable_answer = distances.minat();
    display = ("\nDid you mean '" + answers[probable_answer] + "'?\n Button [Check] for no, [Accept] for yes");
    step = 3;
    $('#communication').html(display);
    document.getElementById("answer").readOnly = true;



}


function check() {

    //alert(step);
    if (vocs_loaded === true) {
        if (ismulti) {
            var display = "";
            $('#communication').html(display);

            switch (step) {
                case 1:
                    check_multi();
                    break;

                case 2:
                    step = 1;
                    proceed();
                    break;
            }
        } else {
            switch (step) {
                case 1:
                    check_old();
                    break;

                case 2:
                    incorrect_answer();
                    break;

                case 3:
                    still = 1;
                    incorrect_answer();
                    setfocus();
                    break;
            }
        }

    }

    if (vocs_loaded === false) {
        load_data();
    }

    if (step === 0) {
        step = 1;
    }


}