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

	public function classListEditorDeleteVoc($id) {
		$data['table'] = $this->trainer_info->voc_table->name;
		$data['key'] = $this->trainer_info->voc_table->id;
		$data['value'] = $id;
		$this->db_functions->deleteRow($data);
	}
}