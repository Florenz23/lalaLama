<?php
require_once "classStartTree.php";

class classStartTreeTest extends classDbTestMain {
	private $start_tree_result, $select_struct_result, $select_data_result;

	function __construct() {
		parent::__construct();
		$this->db = new classDbFunctions;
		$this->db_checker = new classDbChecker;
		$this->start_tree = new classStartTree;
	}
	public function test() {
		$this->checkArrayLength();
		$this->checkStruct();
		$this->checkData();
		$this->deleteCreatedStructValues();
		$this->deleteCreatedDataValues();
	}
	public function checkArrayLength() {
		$this->setStartTree();
		$expected_array_length = 6;
		$given_array = $this->start_tree_result;
		$this->assertSame($expected_array_length, count($given_array), 'array_length');
	}

	public function setStartTree() {
		$this->start_tree_result = $this->start_tree->createStartTree();
	}
	public function checkStruct() {
		$this->setSelectStructResult();
		$i = 0;
		foreach ($this->start_tree_result as $key) {
			$this->checkStructLft($i);
			$this->checkStructRgt($i);
			$this->checkStructRootId($i);
			$i++;
		}
		$this->checkStructRootPid();
	}

	public function setSelectStructResult() {
		$data['table'] = $this->trainer_info->tree_struct_table->name;
		$data['key'] = $this->trainer_info->tree_struct_table->root_id_row;
		$data['primary'] = $this->trainer_info->tree_struct_table->id;
		$data['value'] = $this->start_tree_result[0];
		$this->select_struct_result = $this->db->selectFrom($data);
		$this->select_struct_result = json_decode($this->select_struct_result);
	}
	public function checkStructLft($i) {
		$given_value = $this->start_tree->obj_array_struct[$i]->lft;
		$expected_value = $this->select_struct_result[$i]->lft;
		$this->assertSame($expected_value, $given_value, 'lft');
	}
	public function checkStructRgt($i) {
		$given_value = $this->start_tree->obj_array_struct[$i]->rgt;
		$expected_value = $this->select_struct_result[$i]->rgt;
		$this->assertSame($expected_value, $given_value, 'rgt');
	}
	public function checkStructRootId($i) {
		$given_value = $this->select_struct_result[$i]->root_id;
		$expected_value = (string) $this->start_tree_result[0];
		$this->assertSame($expected_value, $given_value, 'root_id');
	}
	public function checkStructRootPid() {
		$given_value = $this->select_struct_result[0]->pid;
		$expected_value = "0";
		$this->assertSame($expected_value, $given_value, 'pid');
		$given_value = $this->select_struct_result[1]->pid;
		$expected_value = (string) $this->start_tree_result[0];
		$this->assertSame($expected_value, $given_value, 'pid');
		$given_value = $this->select_struct_result[2]->pid;
		$expected_value = (string) $this->start_tree_result[0];
		$this->assertSame($expected_value, $given_value, 'pid');
		$given_value = $this->select_struct_result[3]->pid;
		$expected_value = (string) $this->start_tree_result[0];
		$this->assertSame($expected_value, $given_value, 'pid');
	}

	public function checkData() {
		$i = 0;
		foreach ($this->start_tree_result as $key) {
			$this->setSelectDataResult($i);
			$this->checkNm($i);
			$this->checkType($i);
			$i++;
		}

	}
	public function setSelectDataResult($i) {
		$data['table'] = $this->trainer_info->tree_data_table->name;
		$data['key'] = $this->trainer_info->tree_data_table->id;
		$data['primary'] = $this->trainer_info->tree_data_table->id;
		$data['value'] = $this->start_tree_result[$i];
		$this->select_data_result = $this->db->selectFrom($data);
		$this->select_data_result = json_decode($this->select_data_result);
	}
	public function checkNm($i) {
		$given_value = $this->start_tree->obj_array_data[$i]->nm;
		$expected_value = $this->select_data_result[0]->nm;
		$this->assertSame($expected_value, $given_value, 'nm');
	}
	public function checkType($i) {
		$given_value = $this->start_tree->obj_array_data[$i]->type;
		$expected_value = $this->select_data_result[0]->type;
		$this->assertSame($expected_value, $given_value, 'type');
	}

	public function deleteCreatedStructValues() {
		$data['table'] = $this->trainer_info->tree_struct_table->name;
		$data['key'] = $this->trainer_info->tree_struct_table->id;
		$i = 0;
		foreach ($this->start_tree_result as $key) {
			$data['key_value'] = $this->start_tree_result[$i];
			$this->db->deleteRow($data);
			$i++;
		}
	}
	public function deleteCreatedDataValues() {
		$data['table'] = $this->trainer_info->tree_data_table->name;
		$data['key'] = $this->trainer_info->tree_data_table->id;
		$i = 0;
		foreach ($this->start_tree_result as $key) {
			$data['key_value'] = $this->start_tree_result[$i];
			$this->db->deleteRow($data);
			$i++;
		}
	}

}