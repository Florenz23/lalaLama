<?php


require_once "classDbTestMain.php";
require_once "classDbTestList.php";
require_once "classDbFunctions.php";
require_once "classTrainerInfo.php";

class classDbTestList_test extends classDbTestMain {

	function __construct() {
		parent::__construct();
		$this->class_db_test_list = new classDbTestList();
		$this->class_db_functions = new classDbFunctions();
		$this->class_trainer_info = new classTrainerInfo();
	}
	public function test() {
		$this->resetTestList();
		$this->setQueryData();
		$this->createQuery();
		$this->check();
	}
	public function resetTestList() {
		$this->class_db_test_list->resetTestValues();
	}
	public function setQueryData()
	{
		$data['db'] = $this->trainer_info->db;
		$data['voc_table'] = $this->trainer_info->voc_table->name;
		$data['answer_table'] = $this->trainer_info->answer_table->name;
		$data['voc_id_row'] = $this->trainer_info->voc_table->id;
		$data['answer_id_row'] = $this->trainer_info->answer_table->id;
		$data['list_id_row'] = $this->trainer_info->voc_table->list_id_row;
		$data['list_id_value'] = $this->class_db_test_list->voc_array[0]->list_id;
		$this->query_data = $data;
	}
	public function createQuery()
	{
		$data = $this->query_data;
		$query =""
		. " SELECT * "
		. " FROM `" . $data['db'] . "` .`" . $data['voc_table'] . "` v\n"
		. " LEFT JOIN `" . $data['db'] . "`.`" . $data['answer_table'] . "`"
		. " a ON (v.`" . $data['voc_id_row'] . "` = a.`" . $data['voc_id_row'] . "`)"
		. " where v.`" . $data['list_id_row'] . "` = '" . $data['list_id_value'] . "'"
		. " ORDER BY v.`" . $data['voc_id_row'] . "`ASC;";
		$this->query = $query;
	}
	public function check() {
		$query = $this->query;
		$jons_result = $this->class_db_functions->selectFromWithQuery($query);
		$object_array = json_decode($jons_result);
		$given_array = $object_array;
		$expected_array = $this->class_db_test_list->complete_array;
		for ($i=0; $i < count($expected_array); $i++) {
			$this->assertSame($expected_array[$i]->question, $given_array[$i]->question, 'question:'.$i);
			$this->assertSame($expected_array[$i]->answer, $given_array[$i]->answer, 'answer:'.$i);
			$this->assertSame($expected_array[$i]->list_id, $given_array[$i]->list_id, 'list_id:'.$i);
		}
	}
}
