<?php

require_once "classDbTestMain.php";
require_once "classDbTestList.php";
require_once "ajax_server.php";
require_once "classDbFunctions.php";
require_once "classTrainerFunctions.php";

class classTrainerUpdateVocRatingWrong_test extends classDbTestMain {

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
		$this->updateVocRatingAnswerWrong();
	}

	public function resetTestValues() {
		$this->class_db_test_list->resetTestValues();
	}

	public function updateVocRatingAnswerWrong() {
		$this->updateWrong();
		$expected = $this->setExpectedValuesWrong($this->array_id_0);
		$given_object = $this->selectFromWrong($this->answer_id_0);
		$this->checkWrong( $expected, $given_object );
		$expected = $this->setExpectedValuesWrong($this->array_id_1);
		$given_object = $this->selectFromWrong($this->answer_id_1);
		$this->checkWrong( $expected, $given_object );
	}
	public function updateWrong() {
		$data['data']['ok'] = [0, 0];
		$data['data']['answer_id'][0] = $this->answer_id_0;
		$data['data']['answer_id'][1] = $this->answer_id_1;
		$db_answer = $this->ajax_server->classTrainerUpdateVocRating( $data );
		$decoded_answer = json_decode($db_answer);
		$this->assertSame( $decoded_answer->status, "update.ok", 'check status' );
	}
	public function selectFromWrong($answer_id) {
		$data['table'] = $this->trainer_info->voc_user_data_table->name;
		$data['key'] = $this->trainer_info->voc_user_data_table->id;
		$data['value'] = $answer_id;
		$given_object = json_decode( $this->class_db_functions->selectFrom( $data ) );
		return $given_object;
	}
	public function setExpectedValuesWrong($array_id) {
		$voc_object = $this->class_db_test_list->user_data_array[$array_id];
		$expected['right'] = $voc_object->right;
		$expected['wrong'] = $voc_object->wrong+1;
		$expected['rating'] = $voc_object->rating*-0.1-1.1;
		return $expected;
	}

	public function checkWrong( $expected, $given_object ) {
		$this->assertSame( (string)$expected['right'], $given_object[0]->right, 'right' );
		$this->assertSame( (string)$expected['wrong'], $given_object[0]->wrong, 'wrong' );
		$this->assertSame( (string)$expected['rating'], $given_object[0]->rating, 'rating' );

	}

}
