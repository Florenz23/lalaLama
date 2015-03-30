<?php

require_once "classDbTestList.php";

class ajax_server_test {
	protected $db_test_list;
	function __construct() {
		$this->db_test_list = new classDbTestList;
	}

	public function resetVocList() {
		$this->db_test_list->resetTestValues();
	}
}


$ajax_test_functions = new ajax_server_test();
if (isset($_REQUEST["operation"]) && strpos($_REQUEST["operation"], "_") !== 0 && method_exists($ajax_test_functions, $_REQUEST["operation"])) {

	echo $ajax_test_functions->{$_REQUEST["operation"]}($_REQUEST);
	die();
}