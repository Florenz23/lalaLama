<?php
include_once "classDbTestMain.php";

class classDbCheckerTest extends classDbTestMain {

	function __construct() {

		parent::__construct();
		$this->db = new classDbFunctions;

	}

	public function test() {
		$this->prepareTestTable();
		$this->checkIfTableExists();
		$this->insertValuesIntoTestTable();
		$this->checkIfValueExists();
		$this->checkIfValueExistsById();
		$this->checkArray();
	}
	public function prepareTestTable() {
		$this->data['db'] = $this->trainer_info->db;
		$this->data['table'] = $this->trainer_info->test_table['name'];
		$this->assertTrue($this->db->createTestTable($this->data), 'create Table');
		$this->assertTrue($this->db->emptyTable($this->data), 'emptyTable');
	}

	public function checkIfTableExists() {

		$this->data['db'] = $this->trainer_info->db;
		$this->data['table'] = $this->trainer_info->test_table['name'];
		$this->assertTrue($this->db->checkIfTableExists($this->data), 'message');
		$this->data['table'] = "moin";
		$this->assertFalse($this->db->checkIfTableExists($this->data), 'message');
		$this->data['table'] = $this->trainer_info->test_table['name'];
	}

	public function insertValuesIntoTestTable() {
		$this->data['db'] = $this->trainer_info->db;
		$this->data['table'] = $this->trainer_info->test_table['name'];
		$this->assertEquals($this->db->insertValuesIntoTestTable($this->data), 3, 'message');
	}

	public function checkIfValueExists() {
		$this->data['db'] = $this->trainer_info->db;
		$this->data['table'] = $this->trainer_info->test_table['name'];

		$this->data['primary'] = "id";
		$this->data['primary_value'] = "2";
		$this->data['key'] = "answer";
		$this->data['key_value'] = "two";
		$this->assertTrue($this->db->checkIfValueExists($this->data), 'correct');
		$this->data['primary_value'] = "3";
		$this->assertFalse($this->db->checkIfValueExists($this->data), 'false');

	}

	public function checkIfValueExistsById() {
		$this->data['db'] = $this->trainer_info->db;
		$this->data['table'] = $this->trainer_info->test_table['name'];

		$this->data['primary'] = "id";
		$this->data['primary_value'] = "2";
		$this->assertTrue($this->db->checkIfValueExistsById($this->data), 'correct');
		$this->data['primary_value'] = "10";
		$this->assertFalse($this->db->checkIfValueExistsById($this->data), 'false');

	}

	public function checkArray() {

		$q1 = "q1";
		$q2 = "q2";
		$a1 = "a1";
		$a2 = "a2";
		$data['values'] = array();
		$r1 = array("question" => $q1, "answer" => $a1);
		$r2 = array("question" => $q2, "answer" => $a2);
		array_push($data['values'], $r1, $r2);
		$this->data['values'] = $data['values'];
		$this->assertEquals("q1", $this->data['values'][0]['question'], "q2");
		$this->assertEquals("a1", $this->data['values'][0]['answer'], "answer");
	}

}