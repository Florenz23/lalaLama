<?php
require_once "classTrainerInfo.php";

class classDbConnector extends TrainerInfo {

	function __construct() {

		parent::__construct();
		$this->mysqli = new mysqli($this->host, $this->user, $this->pass, $this->db);
		if (mysqli_connect_error()) {
			die('Connect Error (' . mysqli_connect_errno() . ') '
				. mysqli_connect_error());
		}

	}

	function query($query) {
		if ($result = $this->mysqli->query($query)) {
			return array(true, $result);
		}
		if ($error = mysqli_error($this->mysqli)) {
			return array(false, $error . " Query: " . $query);
		}
	}

	function checkQuery($query) {
		$query_answer = $this->query($query);
		if ($query_answer[0]) {
			$insert_id = $this->mysqli->insert_id;
			if ($insert_id != null) {
				return $insert_id;
			}
			return true;
		}
		return $query_answer[1];
	}
}