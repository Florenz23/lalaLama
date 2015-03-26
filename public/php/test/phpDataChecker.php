<?php

$data_checker = new phpDataChecker();
if ($_REQUEST["operation"] && strpos($_REQUEST["operation"], "_") !== 0 && method_exists($data_checker, $_REQUEST["operation"])) {

	echo $data_checker->{ $_REQUEST["operation"]}($_REQUEST);
	die();

}

/**
 * Checks if the ajax data fits the expected ones
 */
class phpDataChecker {

	function __construct() {

	}
	function checkRegistrationData($data) {
		return false;
	}
}