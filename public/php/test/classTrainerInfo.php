<?php

class vocTable {
	function __construct() {
		$this->name = "vocs";
		$this->id = "voc_id";
		$this->list_id_row = "list_id";
		$this->question_row = "question";
	}
}

class answerTable {
	function __construct() {
		$this->name = "answer_table";
		$this->id = "answer_id";
		$this->voc_id_row = "voc_id";
		$this->answer_row = "answer";
		$this->multi_choice_row = "multi_choice";
		$this->img_id_row = "img_id";
	}
}
class vocUserDataTable {
	function __construct() {
		$this->name = "voc_user_data";
		$this->id = "answer_id";
		$this->right_row = "right";
		$this->wrong_row = "wrong";
		$this->rating_row = "rating";
		$this->last_access_row = "last_access";
	}
}
class treeStructTable {
	function __construct() {
		$this->name = "tree_struct";
		$this->id = "id";
		$this->left_row = "lft";
		$this->right_row = "rgt";
		$this->level_row = "lvl";
		$this->parent_id_row = "pid";
		$this->position_row = "pos";
		$this->root_id_row = "root_id";
	}
}
class treeDataTable {
	function __construct() {
		$this->name = "tree_data";
		$this->id = "id";
		$this->description_row = "nm";
		$this->type_row = "type";
	}
}
class registrationTable {
	function __construct() {
		$this->name = "accounts";
		$this->id = "user_id";
		$this->user_name_row = "user_name";
		$this->user_email_row = "user_email";
		$this->user_root_row = "user_root";
	}
}

class classTrainerInfo {

	function __construct() {
		$this->setDatabase();
		$this->test_table["name"] = "test_table";
		$this->registration_table = new registrationTable;
		$this->voc_table = new vocTable;
		$this->answer_table = new answerTable;
		$this->voc_user_data_table = new vocUserDataTable;
		$this->tree_struct_table = new treeStructTable;
		$this->tree_data_table = new treeDataTable;
		$this->tree_data_table = new treeDataTable;
	}
	public function setDatabase() {
		$server_address = $_SERVER['REMOTE_ADDR'];
		if ( isset( $server_address ) ) {
			if ( $server_address == "::1" ) {
				$this->host = "localhost";
				$this->user = "root";
				$this->pass = "";
				$this->db = "test";
				return;
			}
			if ( $server_address == "127.0.0.1" ) {
				$this->host = "localhost";
				$this->user = "root";
				$this->pass = "";
				$this->db = "test";
				return;
			}
			// $this->host = "db.planet-school.de";
			// $this->user = "m8282-2";
			// $this->pass = "aexohjee";
			// $this->db = "m8282-2";

			$this->host = "lalalama.de.mysql";
			$this->user = "lalalama_de";
			$this->pass = "bThUGSPG";
			$this->db = "lalalama_de";
			return;
		}
		$this->host = "localhost";
		$this->user = "root";
		$this->pass = "";
		$this->db = "test";
	}

}
