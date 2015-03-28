<?php

require_once "classDbTestList.php";

class classTrainerFunctionsTest extends classDbTestMain {

	function __construct() {
		parent::__construct();
		$this->db_test_list = new classDbTestList;
		$this->db_test_list_value_array = $this->db_test_list->value_array;
		$this->db_functions = new classDbFunctions;
		$this->trainer_functions = new classTrainerFunctions;
		$this->multi_array[0]['voc_id'] = "10";
		$this->multi_array[0]['list_id'] = "7";
		$this->multi_array[0]['question'] = "Pronomen";
		$this->multi_array[0]['answer'] = ["ich", "du", "er"];
		$this->multi_array[0]['answer_id'] = ["7", "8", "9"];
		$this->multi_array[0]['right'] = ["0", "0", "0"];
		$this->multi_array[0]['wrong'] = ["0", "0", "0"];
		$this->multi_array[0]['rating'] = ["-1", "-1", "-1"];
		$this->multi_array[0]['multi_choice'] = ["0", "0", "0"];
		$this->multi_array[0]['img_id'] = ["0", "0", "0"];

		$this->importance_array[0]['imp'] = [0, 0, 000];
		$this->importance_array[1]['imp'] = [3, 3, 333];
		$this->importance_array[2]['imp'] = [4, 4, 444];
		$this->importance_array[3]['imp'] = [1, 1, 111];
		$this->importance_array[4]['imp'] = [2, 2, 222];

		$this->importance_array_ordered[0]['imp'] = [4, 4, 444];
		$this->importance_array_ordered[1]['imp'] = [3, 3, 333];
		$this->importance_array_ordered[2]['imp'] = [2, 2, 222];
		$this->importance_array_ordered[3]['imp'] = [1, 1, 111];
		$this->importance_array_ordered[4]['imp'] = [0, 0, 000];
	}
	public function test() {
		$this->trainerUpdateVocRating();
		$this->trainerReSetVoc();
		$this->getVocs();
		$this->orderByImportance();
		$this->create3dArray();
		$this->lastAccess();
		$this->getVocs_and_Importance();
		$this->calculateImportance();
	}
	public function trainerUpdateVocRating() {
		$this->db_test_list->resetTestValues();
		$this->data['answer_id'] = [7, 8, 9];
		$this->data['right'] = [1, 1, 1];
		$this->data['wrong'] = [1, 1, 1];
		$this->data['rating'] = [1, 1, 1];
		$this->data['ok'] = [1];
		$this->data_check['db'] = $this->trainer_info->db;
		$this->data_check['table'] = $this->trainer_info->voc_user_data_table->name;
		$this->data_check['primary'] = $this->trainer_info->voc_user_data_table->id;
		$this->data_check['primary_value'] = $this->data['answer_id'][0];
		$this->data_check['key'] = $this->trainer_info->voc_user_data_table->right_row;
		$this->trainer_functions->trainerUpdateVocRating($this->data);
		$given_value = $this->trainer_functions->getValue($this->data_check);
		$expected_value = "1";
		$expected_row = $this->db_test_array[0];
		$this->assertSame($given_value, $expected_value, "check first rating");
	}

	public function trainerReSetVoc() {
		$this->db_test_list->resetTestValues();
		$this->data['answer_id'] = [7, 8, 9];
		$this->data['right'] = [1, 1, 1];
		$this->data['wrong'] = [1, 1, 1];
		$this->data['rating'] = [1, 1, 1];
		$this->data['ok'] = [1];
		$this->data_check['db'] = $this->trainer_info->db;
		$this->data_check['table'] = $this->trainer_info->voc_user_data_table->name;
		$this->data_check['primary'] = $this->trainer_info->voc_user_data_table->id;
		$this->data_check['primary_value'] = $this->data['answer_id'][0];
		$this->data_check['key'] = $this->trainer_info->voc_user_data_table->right_row;
		$this->trainer_functions->trainerReSetVoc($this->data);
		$given_value = $this->trainer_functions->getValue($this->data_check);
		$expected_value = "0";
		$this->assertSame($given_value, $expected_value, "check first right");
	}

	public function getVocs() {
		$this->db_test_list->resetTestValues();
		$this->data['db'] = $this->trainer_info->db;
		$this->data['key'] = $this->trainer_info->voc_table->list_id_row;
		$this->data['key_value'] = "7";
		$row_array = $this->trainer_functions->getVocArray($this->data);
		$i = 0;
		foreach ($row_array as $key) {
			$given_row = $row_array[$i];
			$expected_row = $this->db_test_list_value_array[$i]->complete;
			$this->assertSame($given_row['voc_id'], $expected_row->voc_id, "voc_id");
			$this->assertSame($given_row['answer_id'], $expected_row->answer_id, "answer_id");
			$this->assertSame($given_row['question'], $expected_row->question, "question");
			$this->assertSame($given_row['right'], $expected_row->right, "right");
			$this->assertSame($given_row['wrong'], $expected_row->wrong, "wrong");
			$this->assertSame($given_row['rating'], $expected_row->rating, "rating");
			$this->assertSame($given_row['multi_choice'], $expected_row->multi_choice, "multi_choice");
			$this->assertSame($given_row['img_id'], $expected_row->img_id, "img_id");
			$this->assertSame($given_row['voc_id'], $expected_row->voc_id, "voc_id");
			$this->assertSame($given_row['voc_id'], $expected_row->voc_id, "voc_id");
			$i++;
		}
	}

	public function orderByImportance() {
		$array_before = $this->importance_array;
		$array_after = $this->trainer_functions->sortMultiArrayByIndex("imp", $array_before);
		$expected_arr = $this->importance_array_ordered;
		$this->assertSame($array_after, $expected_arr, "array should be ordered by highest importance");
	}
	public function create3dArray() {
		$this->db_test_list->resetTestValues();
		$list_id = 7;
		$data['db'] = "test";
		$data['table_1'] = "vocs";
		$data['table_2'] = "answer_table";
		$data['join_row_1'] = "voc_id";
		$data['join_row_2'] = "voc_id";
		$data['key'] = "list_id";
		$data['key_value'] = $list_id;
		$manipulated_array = $this->trainer_functions->getVocs($data);
		$expected_arr = $this->db_test_list->multi_array[0];
		$given_arr = $manipulated_array[0];
		$this->assertSame($given_arr['question'], $expected_arr['question'], "question");
		$this->assertSame($given_arr['answer'], $expected_arr['answer'], "answer");
		$this->assertSame($given_arr['rating'], $expected_arr['rating'], "rating");
	}
	public function lastAccess() {
		$list_id = 7;
		$data['db'] = "test";
		$data['table_1'] = "vocs";
		$data['table_2'] = "answer_table";
		$data['join_row_1'] = "voc_id";
		$data['join_row_2'] = "voc_id";
		$data['key'] = "list_id";
		$data['key_value'] = $list_id;
		$expected_arr = [0];
		$manipulated_array = $this->trainer_functions->selectJoinTableTrainer($data);
		$manipulated_array = $manipulated_array[0];
		$manipulated_array_last_acess = $manipulated_array['last_access'];
		$this->assertNotSame($manipulated_array_last_acess, $expected_arr, "Create3dArray");
	}
	public function getVocs_and_Importance() {
		$list_id = 7;
		$data['db'] = "test";
		$data['table_1'] = "vocs";
		$data['table_2'] = "answer_table";
		$data['join_row_1'] = "voc_id";
		$data['join_row_2'] = "voc_id";
		$data['key'] = "list_id";
		$data['key_value'] = $list_id;
		$expected_arr = [0, 0, 0];
		$manipulated_array = $this->trainer_functions->getVocs($data);
		$manipulated_array = $manipulated_array[1];
		$manipulated_array_importance = $manipulated_array['importance'];
		$this->assertNotSame($manipulated_array_importance, $expected_arr, "check importance");
	}
	public function calculateImportance() {
		$this->multi_array[0]['rating'] = [5, -1.1, -1.1];
		$timestamp = 1422178621;
		$ten_days = 60 * 60 * 24 * 10;
		$timestamp_10_days_ago = $timestamp - $ten_days;
		$this->multi_array[0]['last_access'] = [$timestamp, $timestamp, $timestamp_10_days_ago];
		$returned_importance = $this->trainer_functions->calculateImportance($this->multi_array);
		$returned_importance = $returned_importance[0]['importance'];
		$this->assertGreaterThan($returned_importance[0], $returned_importance[1], "wrong answered variable is more importand then correct answered");
		$this->assertGreaterThan($returned_importance[1], $returned_importance[2], "wrong answerd long time ago more importand wrong ansered just asked");
	}

}