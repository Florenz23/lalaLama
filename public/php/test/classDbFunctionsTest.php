<?php

require_once "classDbTestMain.php";

class classDbFunctionsTest extends classDbTestMain {

	function __construct() {

		parent::__construct();
		$this->db = new classDbFunctions;
		$this->db_checker = new classDbChecker;
		$this->data['db'] = $this->trainer_info->db;
		$this->data['table'] = $this->trainer_info->test_table['name'];

	}
	public function test() {
		$this->prepareTestTable();
		$this->deleteTable();
		$this->countRows();
		$this->emptyTable();
		$this->createQueryInsertValues();
		$this->insertValues();
		$this->selectFrom();
		$this->deleteRow();
	}

	public function prepareTestTable() {
		$this->assertTrue( $this->db->createTestTable( $this->data ), 'create Table' );
		$this->assertTrue( $this->db->emptyTable( $this->data ), 'emptyTable' );
	}

	public function deleteTable() {
		$this->assertTrue( $this->db->deleteTable( $this->data ), 'deleteTable' );
		$this->assertFalse( $this->db->checkIfTableExists( $this->data ), 'checkIfDeleted' );
		$this->assertTrue( $this->db->createTestTable( $this->data ), 'create Table' );
	}

	public function countRows() {
		$this->assertEquals( $this->db->insertValuesIntoTestTable( $this->data ), 3, 'insert values' );
		$this->assertEquals( $this->db->countRows( $this->data ), 3, 'countRows' );
		$this->assertTrue( $this->db->emptyTable( $this->data ), 'message' );
	}
	public function emptyTable() {
		$this->assertEquals( $this->db->insertValuesIntoTestTable( $this->data ), 3, 'insert values' );
		$this->assertTrue( $this->db->emptyTable( $this->data ), 'message' );
		$this->assertEquals( $this->db->countRows( $this->data ), 0, 'countRows' );
	}
	public function createQueryInsertValues() {
		$question = "q1";
		$answer = "a1";
		$this->data['values'] = array( "question" => $question, "answer" => $answer );
		$this->assertEquals( "q1", $this->data['values']['question'], "check $data" );
		$sql = "INSERT INTO `test`.`test_table` (`question`,`answer`) VALUES ('q1','a1');";
		$this->assertEquals( $sql, $this->db->createQueryInsertValues( $this->data ), 'message' );
		$this->assertTrue( $this->db->emptyTable( $this->data ), 'message' );
	}

	public function insertValues() {
		$this->assertTrue( $this->db->emptyTable( $this->data ), 'message' );
		$question = "q1";
		$answer = "a1";
		$this->data['values'] = array( "question" => $question, "answer" => $answer );
		print_r($this->data);
		$this->assertsame( $this->db->insertvalues( $this->data ), 1, 'check if returned id is correct' );
		$this->assertsame( $this->db->insertvalues( $this->data ), 2, 'check if returned id is correct' );
		$this->data['primary'] = "id";
		$this->data['primary_value'] = "1";
		$this->data['key'] = "question";
		$this->data['key_value'] = "q1";
		$this->assertTrue( $this->db_checker->checkIfValueExists( $this->data ), "check if added value exists 1" );
		$this->data['key'] = "answer";
		$this->data['key_value'] = "a1";
		$this->assertTrue( $this->db_checker->checkIfValueExists( $this->data ), "check if added value exists 2" );

	}

	public function selectFrom() {
		$question = "q1";
		$answer = "a1";
		$this->data['values'] = array( "question" => $question, "answer" => $answer );
		$this->assertsame( $this->db->insertvalues( $this->data ), 1, 'check if returned id is correct' );
		$this->assertsame( $this->db->insertvalues( $this->data ), 2, 'check if returned id is correct' );
		$this->data['key'] = "id";
		$this->data['value'] = "1";
		$row = $this->db->selectFrom( $this->data );
		$row = json_decode( $row, true );
		$this->assertEquals( "q1", $row[0]['question'], "check Row single" );
		$this->data['key'] = "question";
		$this->data['value'] = "q1";
		$row = $this->db->selectFrom( $this->data );
		$row = json_decode( $row, true );
		$this->assertEquals( "q1", $row[0]['question'], "check Row multiple 1" );
		$this->assertEquals( "q1", $row[1]['question'], "check Row multiple 2" );
		$this->assertEquals( "a1", $row[0]['answer'], "check Row multiple 2" );
		$this->assertEquals( "a1", $row[1]['answer'], "check Row multiple 2" );
		$this->assertTrue( $this->db->emptyTable( $this->data ), 'message' );
		$this->data['key'] = "id";
		$this->data['value'] = "1";
		$select_from_answer = $this->db->selectFrom( $this->data );
		$this->assertSame( $select_from_answer, false, 'should return false if id does not exists' );
	}

	public function updateValue() {
		$question = "q1";
		$answer = "a1";
		$this->data['values'] = array( "question" => $question, "answer" => $answer );
		$this->assertsame( $this->db->insertvalues( $this->data ), 1, 'check if returned id is correct' );
		$this->data['key'] = "answer";
		$this->data['key_value'] = "moin";
		$this->data['primary'] = "id";
		$this->data['primary_value'] = "1";
		$this->assertTrue( $this->db->updateValue( $this->data ), 'update Value' );
		$this->data['primary'] = "id";
		$this->data['primary_value'] = "1";
		$this->data['key'] = "answer";
		$this->data['key_value'] = "moin";
		$this->assertTrue( $this->db_checker->checkIfValueExists( $this->data ), 'checkValue' );
		$this->assertTrue( $this->db->emptyTable( $this->data ), 'message' );
	}

	public function deleteRow() {
		$question = "q1";
		$answer = "moin";
		$this->data['values'] = array( "question" => $question, "answer" => $answer );
		$this->assertsame( $this->db->insertvalues( $this->data ), 1, 'check if returned id is correct' );
		$this->data['key'] = "id";
		$this->data['value'] = "1";
		$this->assertSame( $this->db->deleteRow( $this->data ), '{"status":"deleted.ok"}', 'deleteRow' );
		$this->data['primary'] = "id";
		$this->data['primary_value'] = "1";
		$this->data['key'] = "answer";
		$this->data['key_value'] = "moin";
		$this->assertFalse( $this->db_checker->checkIfValueExists( $this->data ), 'checkIfDeleted' );
	}
}
