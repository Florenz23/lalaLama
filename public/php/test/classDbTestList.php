<?php

require_once "classTrainerFunctions.php";
require_once "classFileHandler.php";
require_once "classTrainerInfo.php";

class VocObject {
	function __construct($voc_id, $list_id, $question) {
		$this->voc_id = $voc_id;
		$this->list_id = $list_id;
		$this->question = $question;
	}
}

class AnswerObject {
	function __construct($answer_id, $voc_id, $answer, $multi_choice, $img_id) {
		$this->answer_id = $answer_id;
		$this->voc_id = $voc_id;
		$this->answer = $answer;
		$this->multi_choice = $multi_choice;
		$this->img_id = $img_id;
	}
}

class UserDataObject {
	function __construct($answer_id, $user_id, $right, $wrong, $rating) {
		$this->answer_id = $answer_id;
		$this->user_id = $user_id;
		$this->right = $right;
		$this->wrong = $wrong;
		$this->rating = $rating;
	}
}

class CompleteVocObject {
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

class CompleteObject {
	function __construct($voc_id, $list_id, $question, $answer_id, $answer, $multi_choice, $img_id, $user_id, $right, $wrong, $rating, $last_access) {
		$this->voc = new VocObject($voc_id, $list_id, $question);
		$this->answer = new AnswerObject($answer_id, $voc_id, $answer, $multi_choice, $img_id);
		$this->user_data = new UserDataObject($answer_id, $user_id, $right, $wrong, $rating);
		$this->complete = new CompleteVocObject($voc_id, $list_id, $question, $answer_id, $answer, $multi_choice, $img_id, $user_id, $right, $wrong, $rating, $last_access);
	}
}
class classDbTestList {

	function __construct() {
		$this->trainer_functions = new classTrainerFunctions;
		$this->trainer_info = new classTrainerInfo();
		$this->value_array = [];
		$this->value_array[] = new CompleteObject("10", "7", "Pron", "7", "ich", "0", "0", "111", "0", "0", "-1", 0);
		$this->value_array[] = new CompleteObject("10", "7", "Pron", "8", "du", "0", "0", "111", "0", "0", "-1", 0);
		$this->value_array[] = new CompleteObject("10", "7", "Pron", "9", "er", "0", "0", "111", "0", "0", "-1", 0);
		$this->value_array[] = new CompleteObject("11", "7", "eins", "10", "one", "0", "0", "111", "0", "0", "-1", 0);
		$this->value_array[] = new CompleteObject("12", "7", "zwei", "11", "two", "0", "0", "111", "0", "0", "-1", 0);
		$this->value_array[] = new CompleteObject("13", "7", "drei", "12", "three", "0", "0", "111", "0", "0", "-1", 0);
		$this->value_array[] = new CompleteObject("14", "7", "vier", "13", "four", "0", "0", "111", "0", "0", "-1", 0);
		$this->value_array[] = new CompleteObject("15", "7", "fünf", "14", "five", "0", "0", "111", "0", "0", "-1", 0);
		$this->updateJsonFile();
		$this->create3dArray();
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
		$json_array = json_encode($this->value_array);
		$path = "/Library/WebServer/Documents/trainer/units/myUnit00/spec/json_files/listObject.txt";
		$file_handler->writeIntoFile($path, $json_array);
	}

	public function resetTestValues() {
		$data['db'] = $this->trainer_info->db;

		$data['table'] = $this->trainer_info->voc_table->name;
		$data['key'] = $this->trainer_info->voc_table->id;
		$array = $this->value_array;
		$i = 0;
		foreach ($array as $key) {
			$data = $this->resetVocTable($i, $array);
			$this->dbAction($data);
			$data = $this->resetAnswerTable($i, $array);
			$this->dbAction($data);
			$data = $this->resetVocUserDataTable($i, $array);
			$this->dbAction($data);
			$i++;
		}
	}
	public function resetVocTable($i, $array) {
		$data['table'] = $this->trainer_info->voc_table->name;
		$data['key'] = $this->trainer_info->voc_table->id;
		$data['value'] = $array[$i]->complete->voc_id;
		$data['values'] = (array) $array[$i]->voc;
		return $data;
	}
	public function resetAnswerTable($i, $array) {
		$data['table'] = $this->trainer_info->answer_table->name;
		$data['key'] = $this->trainer_info->answer_table->id;
		$data['value'] = $array[$i]->complete->answer_id;
		$data['values'] = (array) $array[$i]->answer;
		return $data;
	}
	public function resetVocUserDataTable($i, $array) {
		$data['table'] = $this->trainer_info->voc_user_data_table->name;
		$data['key'] = $this->trainer_info->voc_user_data_table->id;
		$data['value'] = $array[$i]->complete->answer_id;
		$data['values'] = (array) $array[$i]->user_data;
		return $data;
	}
	public function dbAction($data) {
		$this->trainer_functions->deleteRow($data);
		$this->trainer_functions->insertValues($data);
	}

}