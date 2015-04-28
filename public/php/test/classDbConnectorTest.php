<?php

require_once "classDbTestMain.php";

class classDbConnectorTest extends classDbTestMain {

	function __construct() {

		parent::__construct();
		$this->db = new classDbConnector;

	}
	public function test()
	{
		$this->isDefined();
		$this->query();
		$this->printServer();
	}

	public function isDefined() {
		$this->assertEquals("localhost", $this->trainer_info->host);
		$this->assertEquals("test", $this->trainer_info->db);
	}

	public function query() {
		$this->assertFalse($this->db->query("asdfasf")[0], 'sql_fehelr');
		$this->assertTrue($this->db->query("select * from`test`. `test_table`;")[0], 'ok');
	}
	public function printServer()
	{
		print_r($_SERVER);
	}

}