<?php

require_once "classDbTestList.php";
require_once "ajax_server.php";
require_once "classDbFunctions.php";

class classListEditorUpdateAnswer_test extends classDbTestMain {

	function __construct() {
		parent::__construct();
		$this->class_db_functions = new classDbFunctions;
		$this->class_db_test_list = new classDbTestList;
		$this->ajax_server = new ajax_server;
		$this->to_be_updated_answer_id = $this->class_db_test_list->answer_array[0]->answer_id;
		$this->updated_value = "moin";

	}

	public function test() {
		$this->resetTestValues();
		$this->setData();
		$this->valueShouldNotBeenUpdated();
		$this->updateValue();
		$this->valueShouldBeenUpdated();
	}

	public function resetTestValues()
	{
		$this->class_db_test_list->resetTestValues();
	}

	public function setData()
	{
		$data['table'] = $this->trainer_info->answer_table->name;
		$data['primary'] = $this->trainer_info->answer_table->id;
		$data['primary_value'] = $this->to_be_updated_answer_id;
		$data['key'] = $this->trainer_info->answer_table->answer_row;
		$data['key_value'] = $this->updated_value;
		$this->data = $data;
	}
	public function valueShouldNotBeenUpdated()
	{
		$this->assertFalse( $this->class_db_functions->checkIfValueExists( $this->data ), 'value should not be updated' );
	}

	public function updateValue()
	{
		$update_data['data']['id'] = $this->to_be_updated_answer_id;
		$update_data['data']['new_value'] = $this->updated_value;
		$this->ajax_server->classListEditorUpdateAnswer( $update_data );
	}

	public function valueShouldBeenUpdated() {
		$this->assertTrue( $this->class_db_functions->checkIfValueExists( $this->data ), 'value should be updated' );
	}

}
