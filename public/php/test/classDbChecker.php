<?php

require_once "classDbConnector.php";

class classDbChecker extends classDbConnector {

	function __construct() {

		parent::__construct();

	}

	function checkIfTableExists($data) {
		$query = "SHOW TABLES IN `" . $this->db . "` LIKE '" . $data['table'] . "'";
		$query_answer = $this->query($query);
		if ($query_answer[0]) {

			if ($query_answer[1]->num_rows == 1) {
				return true;
			}
			return false;
		}
		echo $query_answer[1];
		return $query_answer[1];
	}

	function checkIfValueExists($data) {
		$query = "select * from `" . $this->db . "`.`" . $data['table'] . "`";
		$query .= " WHERE `" . $data['table'] . "`.`" . $data['primary'] . "` = '" . $data['primary_value'] . "'";
		$query .= " AND `" . $data['table'] . "`.`" . $data['key'] . "` = '" . $data['key_value'] . "'  ;";
		$query_answer = $this->query($query);
		if ($query_answer[0]) {
			if ($this->mysqli->affected_rows >= 1) {
				return true;
			}
			return false;
		}
		echo $query_answer[1];
		return $query_answer[1];
	}
	function checkIfValueExistsById($data) {
		$query = "select * from `" . $this->db . "`.`" . $data['table'] . "`";
		$query .= " WHERE `" . $data['table'] . "`.`" . $data['primary'] . "` = '" . $data['primary_value'] . "';";
		$query_answer = $this->query($query);
		if ($query_answer[0]) {
			if ($this->mysqli->affected_rows >= 1) {
				return true;
			}
			return false;
		}
		echo $query_answer[1];
		return $query_answer[1];
	}

	function createTestTable($data) {
		$query = "CREATE TABLE IF NOT EXISTS `" . $this->db . "`.`test_table` (
				`id` int( 11 ) NOT NULL AUTO_INCREMENT,
				`question` text NOT NULL ,
				`answer` text NOT NULL ,
				PRIMARY KEY ( `id` )
				) ENGINE = MYISAM DEFAULT CHARSET = latin1;";

		return $this->checkQuery($query);
	}

	function insertValuesIntoTestTable($data) {
		$query = "INSERT INTO `" . $this->db . "`.`test_table` (
				`id` ,
				`question` ,
				`answer`
				)
				VALUES (
				1 , 'eins', 'one'
				),(
				2 , 'eins', 'two'
				),(
				3 , 'eins', 'three'
				);";

		return $this->checkQuery($query);

	}

}

// $db_checker = new classDbChecker();
// if ($_REQUEST["operation"] && strpos($_REQUEST["operation"], "_") !== 0 && method_exists($db_checker, $_REQUEST["operation"])) {

// 	echo $db_checker->{$_REQUEST["operation"]}($_REQUEST);
// 	die();

// }
