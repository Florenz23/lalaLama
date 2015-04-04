<?php

require_once "classDbTestMain.php";
require_once "classDbTestList.php";
require_once "ajax_server.php";
require_once "classDbFunctions.php";

class classTrainerUpdateVocRating_test extends classDbTestMain {

	function __construct() {
		parent::__construct();
		$this->class_db_functions = new classDbFunctions;
		$this->class_db_test_list = new classDbTestList;
		$this->ajax_server = new ajax_server;

	}

	public function test() {
		$this->resetTestValues();
		$this->check();
	}

	public function resetTestValues()
	{
		$this->class_db_test_list->resetTestValues();
	}

	public function check()
	{
		$this->assertTrue(false, 'message');
	}
}