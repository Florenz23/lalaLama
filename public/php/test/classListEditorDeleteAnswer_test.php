<?php

require_once "classDbTestList.php";
require_once "ajax_server.php";
require_once "classDbFunctions.php";

class classListEditorDeleteAnswer_test extends classDbTestMain {

	function __construct() {
		parent::__construct();
		$this->class_db_functions = new classDbFunctions;
		$this->class_db_test_list = new classDbTestList;
		$this->ajax_server = new ajax_server;
		$this->to_be_deleted_answer_id = $this->class_db_test_list->answer_array[0]->answer_id;

	}
	public function test() {
		$this->resetTestValues();
		$this->setVocUserDataTableData();
		$this->setAnswerTableData();
		$this->valuesShouldStillExist();
		$this->deleteAnswer();
		$this->valuesShouldBeDeleted();
	}

	public function resetTestValues() {
		$this->class_db_test_list->resetTestValues();
	}


	public function setAnswerTableData() {
		$this->data_answer['table'] = $this->trainer_info->answer_table->name;
		$this->data_answer['primary'] = $this->trainer_info->answer_table->id;
		$this->data_answer['primary_value'] = $this->to_be_deleted_answer_id;
	}

	public function setVocUserDataTableData() {
		$this->data_voc_user_data['table'] = $this->trainer_info->voc_user_data_table->name;
		$this->data_voc_user_data['primary'] = $this->trainer_info->voc_user_data_table->id;
		$this->data_voc_user_data['primary_value'] = $this->to_be_deleted_answer_id;
	}
	public function valuesShouldStillExist() {
		$this->assertTrue( $this->class_db_functions->checkIfValueExistsById( $this->data_answer ), 'answer values should exist' );
		$this->assertTrue( $this->class_db_functions->checkIfValueExistsById( $this->data_voc_user_data ), 'voc_user_data values should exist' );
	}

	public function deleteAnswer() {
		$send_data['data']['answer_id_to_be_deleted'] = $this->to_be_deleted_answer_id;
		$check_result = $this->ajax_server->classListEditorDeleteAnswer( $send_data );
		$this->assertSame( $check_result, '{"status":"deleted.ok"}', 'message' );
	}

	public function valuesShouldBeDeleted() {
		$this->assertFalse( $this->class_db_functions->checkIfValueExistsById( $this->data_answer ), 'answer values should be deleted' );
		$this->assertFalse( $this->class_db_functions->checkIfValueExistsById( $this->data_voc_user_data ), 'voc_user_data values should be deleted' );
	}

}
