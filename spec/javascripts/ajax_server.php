<?php
require_once ("../../public/php/php_files/config.php");
require_once ("../../public/php/php_files/class._database.php");
require_once ("../../public/php/php_files/classDatabase.php");
$db = new ClassDatabase();
if ($_REQUEST["operation"] && strpos($_REQUEST["operation"], "_") !== 0 && method_exists($db, $_REQUEST["operation"])) {

	echo $db->{ $_REQUEST["operation"]}($_REQUEST);
	die();

}
