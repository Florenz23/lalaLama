<?php

require_once "classDbChecker.php";

class classDbFunctions extends classDbChecker {

	function __construct() {

		parent::__construct();

	}

	function deleteTable($data) {
		$query = "DROP TABLE `" . $this->db . "`.`" . $data['table'] . "`;";
		return $this->checkQuery($query);
	}

	function countRows($data) {
		$query = "SELECT COUNT(*) FROM `" . $this->db . "`.`" . $data['table'] . "`;";
		$query_answer = $this->query($query);
		$result = $query_answer[1];
		$result = $result->fetch_row();
		return $result[0];

	}

	function emptyTable($data) {
		$query = "TRUNCATE TABLE `" . $this->db . "`.`" . $data['table'] . "`;";
		return $this->checkQuery($query);
	}

	function insertValues($data) {
		$query = $this->createQueryInsertValues($data);
		return $this->checkQuery($query);

	}
	function createQueryInsertValues($data) {
		//table,values
		$query = "INSERT INTO `" . $this->db . "`.`" . $data['table'] . "` (";
		foreach ($data['values'] as $key => $value) {
			$query .= "`" . $key . "`,";
		}
		$query = rtrim($query, ",");
		$query .= ") VALUES (";
		foreach ($data['values'] as $key => $value) {
			$query .= "'" . $value . "',";
		}
		$query = rtrim($query, ",");
		$query .= ");";
		return $query;
	}

	function selectFrom($data) {
		//table,key,value,(primary)
		$query = "SELECT * FROM `" . $this->db . "`.`" . $data['table']
		. "` WHERE `" . $data['table'] . "`. `" . $data['key'] . "` = '" . $data['value'] . "'";
		if (isset($data['primary'])) {
			$query .= " ORDER BY `" . $data['table'] . "`.`" . $data['primary'] . "`ASC";
		}
		$query .= ";";
		$query_answer = $this->query($query);
		if ($query_answer[0]) {
			$result = $query_answer[1];
			$rows = array();
			while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
				$rows[] = $row;
			}
			if (count($rows) == 0) {
				return false;
			}
			return json_encode($rows);
		}
		return $query_answer[1];
	}
	function getValue($data) {
		$query = "SELECT `" . $data['table'] . "`.`" . $data['key'] . "` FROM `" . $this->db . "`.`" . $data['table'] . "` WHERE `" . $data['table'] . "`. `" . $data['primary'] . "` = '" . $data['primary_value'] . "';";
		$query_answer = $this->query($query);
		if ($query_answer[0]) {
			$result = $query_answer[1];
			$row = $result->fetch_row();
			if ($row[0] || $row[0] == 0) {
				return $row[0];
			}
			return false;
		}
		return $query_answer[1];
	}

	function deleteRow($data) {
		$query = "DELETE FROM `" . $this->db . "`.`" . $data['table']
		. "` WHERE `" . $data['table'] . "`. `" . $data['key']
		. "` = '" . $data['value'] . "'";
		return $this->checkQuery($query);

	}

	function updateValue($data) {

		$query = "UPDATE `" . $this->db . "`.`" . $data['table'] . "` SET \n"
		. " `" . $data['key'] . "` = '" . $data['key_value']
		. "' WHERE \n" . " `" . $data['table'] . "`.`"
		. $data['primary'] . "` =\n" . " '" . $data['primary_value'] . "';";
		return $this->checkQuery($query);

	}
	function selectJoinTable($data) {
		$query = "SELECT *\n"
		. " FROM\n"
		. "`" . $this->db . "` .`" . $data['table_1'] . "` v\n"
		. "LEFT JOIN\n"
		. " `" . $this->db . "`.`" . $data['table_2'] . "` a ON "
		. "(v.`" . $data['join_row_1'] . "` = a.`" . $data['join_row_2'] . "`)"
		. " where v.`" . $data['key'] . "` = '" . $data['key_value'] . "'ORDER BY v.`" . $data['join_row_1'] . "` DESC;";
		$query_answer = $this->query($query);
		if ($query_answer[0]) {
			$result = $query_answer[1];
			$rows = array();
			while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
				$rows[] = $row;
			}
			if (count($rows) == 0) {
				return false;
			}
			return json_encode($rows);
		}
		return $query_answer[1];
	}
	function selectJoinTableTrainer($data) {
		$query = "SELECT *\n"
		. " FROM\n"
		. "`" . $this->db . "` .`" . $data['table_1'] . "` v\n"
		. "LEFT JOIN\n"
		. " `" . $this->db . "`.`" . $data['table_2'] . "` a ON "
		. "(v.`" . $data['join_row_1'] . "` = a.`" . $data['join_row_2'] . "`)"
		. "LEFT JOIN `" . $this->db . "`.`voc_user_data` u ON (a.answer_id = u.answer_id)  "
		. " where v.`" . $data['key'] . "` = '" . $data['key_value']
		. "'ORDER BY v.`" . $data['join_row_1'] . "`DESC;";
		$query_answer = $this->query($query);
		if ($query_answer[0]) {
			$result = $query_answer[1];
			$rows = array();
			while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
				$rows[] = $row;
			}
			if (count($rows) == 0) {
				return false;
			}
			return $rows;
		}

		return $query_answer[1];
	}
}

$db_functions = new classDbFunctions();
if (isset($_REQUEST["operation"]) && strpos($_REQUEST["operation"], "_") !== 0 && method_exists($db_functions, $_REQUEST["operation"])) {

	echo $db_functions->{$_REQUEST["operation"]}($_REQUEST);
	die();
}

// SELECT *
//  FROM
//   vocs v
// LEFT JOIN
//   answer_table a ON (v.voc_id = a.voc_id) where v.list_id = 7;