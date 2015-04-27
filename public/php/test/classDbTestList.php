<?php

// Dies ist ein Test.

require_once "classTrainerFunctions.php";
require_once "classFileHandler.php";
require_once "classTrainerInfo.php";

class vocObject {
	function __construct($voc_id, $list_id, $question) {
		$this->voc_id = $voc_id;
		$this->list_id = $list_id;
		$this->question = $question;
	}
}

class answerObject {
	function __construct($answer_id, $voc_id, $answer, $multi_choice, $img_id) {
		$this->answer_id = $answer_id;
		$this->voc_id = $voc_id;
		$this->answer = $answer;
		$this->multi_choice = $multi_choice;
		$this->img_id = $img_id;
	}
}

class userDataObject {
	function __construct($answer_id, $user_id, $right, $wrong, $rating) {
		$this->answer_id = $answer_id;
		$this->user_id = $user_id;
		$this->right = $right;
		$this->wrong = $wrong;
		$this->rating = $rating;
	}
}
class vocAnswerObject {
	function __construct($voc_id, $list_id, $question, $answer_id, $answer, $multi_choice, $img_id ) {
		$this->voc_id = $voc_id;
		$this->list_id = $list_id;
		$this->question = $question;
		$this->answer_id = $answer_id;
		$this->answer = $answer;
		$this->multi_choice = $multi_choice;
		$this->img_id = $img_id;
	}
}

class completeVocObject {
	function __construct($voc_id, $list_id, $question, $answer_id, $answer, $multi_choice, $img_id, $user_id, $right, $wrong, $rating, $last_access) {
		$this->voc_id = $voc_id;
		$this->list_id = $list_id;
		$this->question = $question;
		$this->answer_id = $answer_id;
		$this->answer = $answer;
		$this->multi_choice = $multi_choice;
		$this->img_id = $img_id;
		$this->user_id = $user_id;
		$this->right = $right;
		$this->wrong = $wrong;
		$this->rating = $rating;
		$this->last_access = 0;
	}
}

class completeObject {
	function __construct($voc_id, $list_id, $question, $answer_id, $answer, $multi_choice, $img_id, $user_id, $right, $wrong, $rating, $last_access) {

		$this->voc = new vocObject($voc_id, $list_id, $question);
		$this->answer = new answerObject($answer_id, $voc_id, $answer, $multi_choice, $img_id);
		$this->user_data = new userDataObject($answer_id, $user_id, $right, $wrong, $rating);
		$this->complete = new completeVocObject($voc_id, $list_id, $question, $answer_id, $answer, $multi_choice, $img_id, $user_id, $right, $wrong, $rating, $last_access);
	}
}

class completeObjectArrays {

	function __construct($voc_array, $answer_array, $user_data_array, $complete_array) {
		$this->voc_array = $voc_array;
		$this->answer_array = $answer_array;
		$this->user_data_array = $user_data_array;
		$this->complete_array = $complete_array;
	}
}
class classDbTestList {

	    public $voc_array ;
		public $answer_array ;
		public $user_data_array ;
		public $complete_array ;
		public $multi_array ;
		public $list_id ;

	function __construct() {
		$this->trainer_functions = new classTrainerFunctions;
		$this->trainer_info = new classTrainerInfo();
		$this->list_id = "7";
		$this->createObjects();
		$this->createSingleArrays();
		$this->createCompleteArray();
		$this->updateJsonFile();
		$this->create3dArray();
		$this->createSingleArrays();
	}
	public function createObjects() {
		$this->value_array = [];
		$this->value_array[] = new completeObject("10", $this->list_id, "Pron", "7", "ich", "0", "0", "111", "0", "0", "-1", 0);
		$this->value_array[] = new completeObject("10", $this->list_id, "Pron", "8", "du", "0", "0", "111", "0", "0", "-1", 0);
		$this->value_array[] = new completeObject("10", $this->list_id, "Pron", "9", "er", "0", "0", "111", "0", "0", "-1", 0);
		$this->value_array[] = new completeObject("11", $this->list_id, "eins", "10", "one", "0", "0", "111", "0", "0", "-1", 0);
		$this->value_array[] = new completeObject("12", $this->list_id, "zwei", "11", "two", "0", "0", "111", "0", "0", "-1", 0);
		$this->value_array[] = new completeObject("13", $this->list_id, "drei", "12", "three", "0", "0", "111", "0", "0", "-1", 0);
		$this->value_array[] = new completeObject("14", $this->list_id, "vier", "13", "four", "0", "0", "111", "0", "0", "-1", 0);
		$this->value_array[] = new completeObject("15", $this->list_id, "fünf", "14", "five", "0", "0", "111", "0", "0", "3", 0);
	}

	public function createSingleArrays() {
		$this->voc_array = [];
		$this->answer_array = [];
		$this->user_data_array = [];
		$this->complete_array = [];
		$i = 0;
		$array = $this->value_array;
		foreach ($array as $key) {
			$this->voc_array[] = $array[$i]->voc;
			$this->answer_array[] = $array[$i]->answer;
			$this->user_data_array[] = $array[$i]->user_data;
			$this->complete_array[] = $array[$i]->complete;
			$i++;
		}
	}
	public function createCompleteArray() {
		$vocs = $this->voc_array;
		$answer = $this->answer_array;
		$user_data = $this->user_data_array;
		$voc_answer = $this->user_data_array;
		$complete_array = $this->complete_array;
		$this->single_arrays = new completeObjectArrays($vocs, $answer, $user_data, $complete_array);

	}

	public function create3dArray() {
		$array = $this->value_array;
		$i = 0;
		foreach ($array as $key) {
			$array[$i] = (array) $array[$i]->complete;
			$i++;
		}
		$this->multi_array = $this->trainer_functions->create3dArray($array);
	}
	public function updateJsonFile() {
		$file_handler = new classFileHandler;
		$json_array = json_encode($this->single_arrays);
		$path = "/Library/WebServer/Documents/trainer/units/myUnit00/spec/json_files/listObject.txt";
		$file_handler->writeIntoFile($path, $json_array);
	}

	public function resetTestValues() {
		$data['db'] = $this->trainer_info->db;

		$data['table'] = $this->trainer_info->voc_table->name;
		$data['key'] = $this->trainer_info->voc_table->id;
		$array = $this->value_array;
		for ($i=2; $i < count($this->value_array); $i++) {
			$data = $this->setDataVocTable($i, $array);
			$this->dbActionDelete($data);
			$this->dbActionInsert($data);
		}
		$i = 0;
		foreach ($array as $key) {
			$data = $this->setDataAnswerTable($i, $array);
			$this->dbActionInsert($data);
			$data = $this->setDataVocUserDataTable($i, $array);
			$this->dbActionInsert($data);
			$i++;
		}
	}
	public function setDataVocTable($i, $array) {
		$data['table'] = $this->trainer_info->voc_table->name;
		$data['key'] = $this->trainer_info->voc_table->id;
		$data['key_value'] = $array[$i]->complete->voc_id;
		$data['values'] = (array) $array[$i]->voc;
		return $data;
	}
	public function setDataAnswerTable($i, $array) {
		$data['table'] = $this->trainer_info->answer_table->name;
		$data['key'] = $this->trainer_info->answer_table->id;
		$data['key_value'] = $array[$i]->complete->answer_id;
		$data['values'] = (array) $array[$i]->answer;
		return $data;
	}
	public function setDataVocUserDataTable($i, $array) {
		$data['table'] = $this->trainer_info->voc_user_data_table->name;
		$data['key'] = $this->trainer_info->voc_user_data_table->id;
		$data['key_value'] = $array[$i]->complete->answer_id;
		$data['values'] = (array) $array[$i]->user_data;
		return $data;
	}
	public function dbActionDelete($data) {
		return $this->trainer_functions->deleteRow($data);
	}
	public function dbActionInsert($data) {
		return $this->trainer_functions->insertValues($data);
	}

}