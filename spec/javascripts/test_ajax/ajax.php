<?php

$ajax = new Ajax();
if ($_REQUEST["operation"] && strpos($_REQUEST["operation"], "_") !== 0 && method_exists($ajax, $_REQUEST["operation"])) {

	echo $ajax->{ $_REQUEST["operation"]}($_REQUEST);
	die();

}

/**
 *
 */
class Ajax {

	function __construct() {
		# code...
	}

	function insertValues($data) {

		$query = "INSERT INTO `" . $data['db'] . "`.`" . $data['table'] . "` (";
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
		echo $data['values'][0]['question'];
	}
}