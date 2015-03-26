<?php

class TrainerInfo {

	function __construct() {

		$this->host = "localhost";
		$this->user = "root";
		$this->pass = "";

		$this->db = "test";

		$this->test_table['name'] = "test_table";

		$this->registration_table['name'] = "accounts";
		$this->registration_table['id'] = "user_id";
		$this->registration_table['root_row'] = "user_root";
		$this->registration_table['user_name_row'] = "user_name";

		$this->voc_table['name'] = "vocs";
		$this->voc_table['id'] = "voc_id";
		$this->voc_table['list_row'] = "list_id";
		$this->voc_table['question_row'] = "question";

		$this->answer_table['name'] = "answer_table";
		$this->answer_table['id'] = "answer_id";
		$this->answer_table['voc_id'] = "voc_id";
		$this->answer_table['answer_row'] = "answer";
		$this->answer_table['multi_choice_row'] = "multi_choice";
		$this->answer_table['img_id_row'] = "img_id";

		$this->voc_user_data_table['name'] = "voc_user_data";
		$this->voc_user_data_table['id'] = "answer_id";
		$this->voc_user_data_table['right_row'] = "right";
		$this->voc_user_data_table['wrong_row'] = "wrong";
		$this->voc_user_data_table['rating_row'] = "rating";
		$this->voc_user_data_table['last_access_row'] = "last_access";

		$this->tree_struct_table['name'] = "tree_struct";
		$this->tree_struct_table['id'] = "id";
		$this->tree_struct_table['left_row'] = "lft";
		$this->tree_struct_table['right_row'] = "rgt";
		$this->tree_struct_table['level_row'] = "lvl";
		$this->tree_struct_table['parent_id_row'] = "pid";
		$this->tree_struct_table['position_row'] = "pos";
		$this->tree_struct_table['root_id_row'] = "root_id";

		$this->tree_data_table['name'] = "tree_data";
		$this->tree_data_table['id'] = "id";
		$this->tree_data_table['description_row'] = "nm";
		$this->tree_data_table['type_row'] = "type";

	}

}