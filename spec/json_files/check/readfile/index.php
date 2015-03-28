<html>

<head>
	    <meta charset='utf-8'>

    <title></title>
    <script type="text/javascript" src="files/jquery.js"></script>
    <script type="text/javascript" src="files/read.js"></script>
</head>

<body>
    <?php

/**
 *
 */
class Moin {

	function __construct() {
		$this->peter = "jo";
		$this->peter2 = "jo2";
	}
}
$var = new Moin();
$var = [$var, $var];
$var = json_encode($var);

$path = "/Library/WebServer/Documents/trainer/units/myUnit00/spec/json_files/listObject.txt";
$text = '[ { "voc": { "voc_id": "10", "question": "Pron", "list_id": "7" }, "answer": { "answer_id": "7", "voc_id": "10", "answer": "ich", "multi_choice": "0" }, "user_data": { "answer_id": "7", "right": "0", "wrong": "0", "rating": "-1" }, "complete": { "voc_id": "10", "question": "Pron", "list_id": "7", "answer_id": "7", "answer": "ich", "multi_choice": "0", "right": "0", "wrong": "0", "rating": "-1" } }, { "voc": { "voc_id": "10", "question": "Pron", "list_id": "7" }, "answer": { "answer_id": "8", "voc_id": "10", "answer": "du", "multi_choice": "0" }, "user_data": { "answer_id": "8", "right": "0", "wrong": "0", "rating": "-1" }, "complete": { "voc_id": "10", "question": "Pron", "list_id": "7", "answer_id": "8", "answer": "du", "multi_choice": "0", "right": "0", "wrong": "0", "rating": "-1" } }, { "voc": { "voc_id": "10", "question": "Pron", "list_id": "7" }, "answer": { "answer_id": "9", "voc_id": "10", "answer": "er", "multi_choice": "0" }, "user_data": { "answer_id": "9", "right": "0", "wrong": "0", "rating": "-1" }, "complete": { "voc_id": "10", "question": "Pron", "list_id": "7", "answer_id": "9", "answer": "er", "multi_choice": "0", "right": "0", "wrong": "0", "rating": "-1" } }, { "voc": { "voc_id": "11", "question": "eins", "list_id": "7" }, "answer": { "answer_id": "10", "voc_id": "11", "answer": "one", "multi_choice": "0" }, "user_data": { "answer_id": "10", "right": "0", "wrong": "0", "rating": "-1" }, "complete": { "voc_id": "11", "question": "eins", "list_id": "7", "answer_id": "10", "answer": "one", "multi_choice": "0", "right": "0", "wrong": "0", "rating": "-1" } }, { "voc": { "voc_id": "12", "question": "zwei", "list_id": "7" }, "answer": { "answer_id": "11", "voc_id": "12", "answer": "two", "multi_choice": "0" }, "user_data": { "answer_id": "11", "right": "0", "wrong": "0", "rating": "-1" }, "complete": { "voc_id": "12", "question": "zwei", "list_id": "7", "answer_id": "11", "answer": "two", "multi_choice": "0", "right": "0", "wrong": "0", "rating": "-1" } }, { "voc": { "voc_id": "13", "question": "drei", "list_id": "7" }, "answer": { "answer_id": "12", "voc_id": "13", "answer": "three", "multi_choice": "0" }, "user_data": { "answer_id": "12", "right": "0", "wrong": "0", "rating": "-1" }, "complete": { "voc_id": "13", "question": "drei", "list_id": "7", "answer_id": "12", "answer": "three", "multi_choice": "0", "right": "0", "wrong": "0", "rating": "-1" } }, { "voc": { "voc_id": "14", "question": "vier", "list_id": "7" }, "answer": { "answer_id": "13", "voc_id": "14", "answer": "four", "multi_choice": "0" }, "user_data": { "answer_id": "13", "right": "0", "wrong": "0", "rating": "-1" }, "complete": { "voc_id": "14", "question": "vier", "list_id": "7", "answer_id": "13", "answer": "four", "multi_choice": "0", "right": "0", "wrong": "0", "rating": "-1" } }, { "voc": { "voc_id": "15", "question": "fünf", "list_id": "7" }, "answer": { "answer_id": "14", "voc_id": "15", "answer": "five", "multi_choice": "0" }, "user_data": { "answer_id": "14", "right": "0", "wrong": "0", "rating": "-1" }, "complete": { "voc_id": "15", "question": "fünf", "list_id": "7", "answer_id": "14", "answer": "five", "multi_choice": "0", "right": "0", "wrong": "0", "rating": "-1" } } ]';
//$text = $var;

$myfile = fopen($path, "w") or die("Unable to open file!");
fwrite($myfile, $text);
fclose($myfile);

$myfile = fopen($path, "r") or die("Unable to open file!");
$json = fread($myfile, filesize($path));
echo $json . "<br><br>";
$json = json_decode($json);
echo $json[0]->voc->voc_id;
fclose($myfile);
?>
</body>

</html>