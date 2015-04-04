<?php
// wird benötigt für die Tests
require_once "classDbFunctions.php";
require_once "classTrainerInfo.php";

class classDbTestMain extends \PHPUnit_Framework_TestCase {

	function __construct() {

		$this->trainer_info = new classTrainerInfo();

	}
	public function test()
	{
		$this->assertTrue(true, 'message');
	}
}