<?php

require_once "classDbTestMain.php";
require_once "classDbTestList.php";
require_once "ajax_server.php";
require_once "classDbFunctions.php";

class classDisplayListGetVocs_test extends classDbTestMain {

	function __construct() {
		parent::__construct();
		$this->class_trainer_functions = new classTrainerFunctions;
		$this->class_db_test_list = new classDbTestList;
		$this->ajax_server = new ajax_server;
	}
	public function test() {
		$this->resetTestValues();
		$expected = $this->setExpectedArray();
		$given = $this->setGivenArray();
		$this->checkArray($expected,$given);
	}
	public function resetTestValues() {
		$this->class_db_test_list->resetTestValues();
	}
	public function setExpectedArray()
	{
		$multi_array = $this->class_db_test_list->complete_array;
		return $multi_array;
	}
	public function setGivenArray()
	{
		$list_id = $this->class_db_test_list->complete_array[0]->list_id;
		$data['data']['list_id'] = $list_id;
		$returned_array = $this->ajax_server->classDisplayListGetVocs($data);
		$returned_array = json_decode($returned_array);
		return $returned_array;
	}
	public function checkArray($expected,$given)
	{
		$this->assertSame($expected[7]->answer_id, $given[0]->answer_id, 'answer_id');
		$this->assertSame($expected[7]->question, $given[0]->question, 'question');
		$this->assertSame($expected[7]->answer, $given[0]->answer, 'answer');
		$this->assertSame($expected[7]->voc_id, $given[0]->voc_id, 'voc_id');
	}


}
