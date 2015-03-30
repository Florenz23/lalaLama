<?php

require_once "classDbTestList.php";
require_once "ajax_server.php";
require_once "classDbFunctions.php";

class classListEditorDeleteVoc_test extends classDbTestMain {

	function __construct() {
		parent::__construct();
		$this->class_db_functions = new classDbFunctions;
		$this->class_db_test_list = new classDbTestList;
		$this->ajax_server = new ajax_server;
		$this->to_be_deleted_voc_id = $this->class_db_test_list->voc_array[0]->voc_id;

	}
	public function test() {
		$this->setVocTableData();
		$this->setAnswerTableData();
		$this->valuesShouldStillExist();
		$this->deleteVoc();
		$this->valuesShouldBeDeleted();
	}

	public function setVocTableData() {
		$this->data_voc['table'] = $this->trainer_info->voc_table->name;
		$this->data_voc['primary'] = $this->trainer_info->voc_table->id;
		$this->data_voc['primary_value'] = $this->to_be_deleted_voc_id;
	}

	public function setAnswerTableData() {
		$this->data_answer['table'] = $this->trainer_info->answer_table->name;
		$this->data_answer['primary'] = $this->trainer_info->answer_table->voc_id_row;
		$this->data_answer['primary_value'] = $this->to_be_deleted_voc_id;
	}
	public function valuesShouldStillExist() {
		$this->assertTrue($this->class_db_functions->checkIfValueExistsById($this->data_voc), 'voc values should exist');
		$this->assertTrue($this->class_db_functions->checkIfValueExistsById($this->data_answer), 'answer values should exist');
	}

	public function deleteVoc() {
		$send_data['voc_id_to_be_deleted'] = $this->to_be_deleted_voc_id;
		$check_result = $this->ajax_server->classListEditorDeleteVoc($send_data);
		$this->assertSame($check_result, "deleted.ok", 'message');
	}

	public function valuesShouldBeDeleted() {
		$this->assertFalse($this->class_db_functions->checkIfValueExistsById($this->data_voc), 'voc values should be deleted');
		$this->assertFalse($this->class_db_functions->checkIfValueExistsById($this->data_answer), 'answer values should be deleted');
	}

}