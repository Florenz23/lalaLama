<?php

require_once "classDbTestMain.php";
require_once "classDbTestList.php";
require_once "ajax_server.php";
require_once "classDbFunctions.php";
require_once "classTrainerFunctions.php";

class classTrainerUpdateVocRatingCorrect_test extends classDbTestMain {

	function __construct() {
		parent::__construct();
		$this->class_db_functions = new classDbFunctions;
		$this->class_trainer_functions = new classTrainerFunctions;
		$this->class_db_test_list = new classDbTestList;
		$this->ajax_server = new ajax_server;
		$this->array_id_0 = 6;
		$this->array_id_1 = 7;
		$this->answer_id_0 = $this->class_db_test_list->user_data_array[$this->array_id_0]->answer_id;
		$this->answer_id_1 = $this->class_db_test_list->user_data_array[$this->array_id_1]->answer_id;
	}

	public function test() {
		$this->resetTestValues();
		$this->updateVocRatingAnswerCorrect();
		$this->checkReturnedRatingArray();
	}

	public function resetTestValues() {
		$this->class_db_test_list->resetTestValues();
	}

	public function updateVocRatingAnswerCorrect() {
		$this->updateCorrect();
		$this->checkFirstAnswer();
		$this->checkSecondAnswer();
	}
	public function checkFirstAnswer()
	{
		$expected = $this->setExpectedValuesCorrect($this->array_id_0);
		$given_object = $this->selectFromCorrect($this->answer_id_0);
		$this->checkCorrect( $expected, $given_object );
	}
	public function checkSecondAnswer()
	{
		$expected = $this->setExpectedValuesCorrect($this->array_id_1);
		$given_object = $this->selectFromCorrect($this->answer_id_1);
		$this->checkCorrect( $expected, $given_object );
	}
	public function updateCorrect() {
		$data['data']['ok'] = [1,1];
		$data['data']['answer_id'][0] = $this->answer_id_0;
		$data['data']['answer_id'][1] = $this->answer_id_1;
		$db_answer = $this->ajax_server->classTrainerUpdateVocRating( $data );
		$db_answer = json_decode($db_answer);
		$this->assertSame( $db_answer->status, "update.ok", 'message' );
		$this->db_answer_rating_array = $db_answer->rating_array;
	}
	public function selectFromCorrect($answer_id) {
		$data['table'] = $this->trainer_info->voc_user_data_table->name;
		$data['key'] = $this->trainer_info->voc_user_data_table->id;
		$data['value'] = $answer_id;
		$given_object = json_decode( $this->class_db_functions->selectFrom( $data ) );
		return $given_object;
	}
	public function setExpectedValuesCorrect($array_id) {
		$voc_object = $this->class_db_test_list->user_data_array[$array_id];
		$expected['right'] = $voc_object->right+1;
		$expected['wrong'] = $voc_object->wrong;
		$expected['rating'] = $voc_object->rating+1;
		return $expected;
	}

	public function checkCorrect( $expected, $given_object ) {
		$this->assertSame( (string)$expected['right'], $given_object[0]->right, 'right' );
		$this->assertSame( (string)$expected['wrong'], $given_object[0]->wrong, 'wrong' );
		$this->assertSame( (string)$expected['rating'], $given_object[0]->rating, 'rating' );

	}
	public function checkReturnedRatingArray() {
		$expected_array = array();
		$expected_array[] = $this->class_db_test_list->user_data_array[$this->array_id_0]->rating+1;
		$expected_array[] = $this->class_db_test_list->user_data_array[$this->array_id_1]->rating+1;
		$given_array = $this->db_answer_rating_array;
		$this->assertSame( (string)$expected_array[0], $given_array[0], 'first_rating' );
		$this->assertSame( (string)$expected_array[1], $given_array[1], 'second_rating' );
	}

}
