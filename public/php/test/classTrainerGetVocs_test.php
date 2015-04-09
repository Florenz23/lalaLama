<?php

require_once "classDbTestMain.php";
require_once "classDbTestList.php";
require_once "ajax_server.php";
require_once "classDbFunctions.php";
require_once "classTrainerFunctions.php";

class classTrainerGetVocs_test extends classDbTestMain {

	function __construct() {
		parent::__construct();
		$this->class_db_functions = new classDbFunctions;
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
		$multi_array = $this->class_db_test_list->multi_array;
		return $multi_array;
	}
	public function setGivenArray()
	{
		$list_id = $this->class_db_test_list->multi_array[0]['list_id'][0];
		$data['data']['list_id'] = 4941;
		$returned_array = $this->ajax_server->classTrainerGetVocs($data);
		$returned_array = json_decode($returned_array);
		return $returned_array;
	}
	public function checkArray($expected,$given)
	{
		$this->assertSame($expected[0]['answer_id'], $given[0]->answer_id, 'answer_id');
		$this->assertSame($expected[0]['right'], $given[0]->right, 'right');
		$this->assertSame($expected[0]['wrong'], $given[0]->wrong, 'wrong');
		$this->assertSame($expected[0]['rating'], $given[0]->rating, 'rating');
	}


}
