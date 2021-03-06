<?php

require_once "classDbTestMain.php";
require_once "classDbTestList.php";
require_once "ajax_server.php";
require_once "classDbFunctions.php";
require_once "classTrainerFunctions.php";

class classTrainerUpdateVocRating_test extends classDbTestMain {

	function __construct() {
		parent::__construct();
		$this->class_db_functions = new classDbFunctions;
		$this->class_trainer_functions = new classTrainerFunctions;
		$this->class_db_test_list = new classDbTestList;
		$this->ajax_server = new ajax_server;
		$this->answer_id_0 = 1;
		$this->answer_id_1 = 2;
	}

	public function test() {
		$this->resetTestValues();
		$this->checkGetRatingFromDb();
		$this->deleteValuesAgain();
		$this->checkIfAnswerExistsInVocUserDataTable();
		$this->updateVocRatingAnswerCorrect();
	}

	public function resetTestValues() {
		$this->class_db_test_list->resetTestValues();
	}

	public function checkIfAnswerExistsInVocUserDataTable() {
		$voc_id_to_test = 3;
		$check_answer = $this->class_trainer_functions->checkIfAnswerExistsInVocUserDataTable( $voc_id_to_test );
		$this->assertFalse( $check_answer, 'non existing answer should return false' );
		$voc_id_to_test = 7;
		$check_answer = $this->class_trainer_functions->checkIfAnswerExistsInVocUserDataTable( $voc_id_to_test );
		$this->assertTrue( $check_answer, 'existing answer should return true' );
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
		$decoded_answer = json_decode($db_answer);
		$this->assertSame( $decoded_answer->status, "update.ok", 'check status' );
	}
	public function selectFromCorrect($answer_id) {
		$data['table'] = $this->trainer_info->voc_user_data_table->name;
		$data['key'] = $this->trainer_info->voc_user_data_table->id;
		$data['value'] = $answer_id;
		$given_object = json_decode( $this->class_db_functions->selectFrom( $data ) );
		return $given_object;
	}
	public function setExpectedValuesCorrect() {
		$expected['right'] = 1;
		$expected['wrong'] = 0;
		$expected['rating'] = 0;
		return $expected;
	}
	public function checkCorrect( $expected, $given_object ) {
		$this->assertSame( (string)$expected['right'], $given_object[0]->right, 'right' );
		$this->assertSame( (string)$expected['wrong'], $given_object[0]->wrong, 'wrong' );
		$this->assertSame( (string)$expected['rating'], $given_object[0]->rating, 'rating' );
	}
	public function deleteValuesAgain()
	{
		$data['table'] = $this->trainer_info->voc_user_data_table->name;
		$data['key'] = $this->trainer_info->voc_user_data_table->id;
		$data['key_value'] = $this->answer_id_0;
		$this->class_db_functions->deleteRow($data);
		$data['key_value'] = $this->answer_id_1;
		$this->class_db_functions->deleteRow($data);
	}
	public function checkGetRatingFromDb()
	{
		$answer_id = $this->class_db_test_list->user_data_array[5]->answer_id;
		$expected_rating = $this->class_db_test_list->user_data_array[5]->rating;
		$given_rating = $this->class_trainer_functions->getUpdatedRatingValue($answer_id);
		$this->assertSame($expected_rating, $given_rating, 'getRating');
	}
}
