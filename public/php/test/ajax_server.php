<?php

require_once "classTrainerInfo.php";
require_once "classDbFunctions.php";

class ajax_server {
	protected $trainer_info;
	protected $db_functions;
	function __construct() {
		$this->trainer_info = new classTrainerInfo;
		$this->db_functions = new classDbFunctions;
	}

	public function classListEditorDeleteVoc($received_data) {
		$data['table'] = $this->trainer_info->voc_table->name;
		$data['key'] = $this->trainer_info->voc_table->id;
		$data['value'] = $received_data['voc_id_to_be_deleted'];
		if ($this->db_functions->deleteRow($data)) {
			$data['table'] = $this->trainer_info->answer_table->name;
			$check_result = $this->db_functions->deleteRow($data);
			if ($check_result) {
				return $check_result;
			}
		}
	}
}


$ajax_functions = new ajax_server();
if (isset($_REQUEST["operation"]) && strpos($_REQUEST["operation"], "_") !== 0 && method_exists($ajax_functions, $_REQUEST["operation"])) {

	echo $ajax_functions->{$_REQUEST["operation"]}($_REQUEST);
	die();
}