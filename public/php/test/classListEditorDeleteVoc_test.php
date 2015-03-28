<?php

require_once "classDbTestList.php";
require_once "classListEditorDeleteVoc.php";

class classListEditorDeleteVoc_test extends classDbTestMain {

	function __construct() {
		parent::__construct();
		$this->test_list = new classDbTestList;
		$this->list_editor = new classListEditorDeleteVoc;

	}
	public function test() {
		$this->assertTrue(true, 'message');
	}

	public function deleteVocOfDb() {
		$voc_table = $this->trainer_info->voc_table->name;
		$voc_id = $this->trainer_info->voc_table->id;
		$to_be_deleted_voc_id = $$this->test_list->value_array[1]->voc_id;
		$to_be_deleted_list_id = $$this->test_list->value_array[1]->list_id;
		$data['table'] = $voc_table;
		$data['primary'] = $voc_id;
		$data['primary_value'] = $to_be_deleted_voc_id;
		$this->assertSame($this->ajax->checkIfValueExistsById, "1", 'message');
		$this->list_editor->deleteVoc();
		$this->assertSame($this->ajax->checkIfValueExistsById, "0", 'message');
	}
	public function insertTestValues() {
	}

	public function refreshTestValues() {
	}

}