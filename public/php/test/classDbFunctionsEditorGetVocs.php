<?php

require_once "classDbFunctions.php";
require_once "classTrainerInfo.php";

class classDbFunctionsEditorGetVocs
{

	function __construct()
	{
		$this->class_trainer_info = new classTrainerInfo();
		$this->class_db_functions = new classDbFunctions();
	}
	public function getObjectArray($list_id)
	{
		$this->loadVocs($list_id);
		$this->setArray();
		return $this->object_array;
	}
	public function getJsonString($list_id)
	{
		$this->loadVocs($list_id);
		return $this->json_string;

	}
	public function loadVocs($list_id)
	{
		$this->setListId($list_id);
		$this->setData();
		$this->setQuery();
		$this->setJsonString();

	}
	public function setListId($list_id)
	{
		$this->list_id = $list_id;
	}
	public function setData()
	{
		$data['db'] = $this->class_trainer_info->db;
		$data['voc_table'] = $this->class_trainer_info->voc_table->name;
		$data['answer_table'] = $this->class_trainer_info->answer_table->name;
		$data['voc_id_row'] = $this->class_trainer_info->voc_table->id;
		$data['answer_id_row'] = $this->class_trainer_info->answer_table->id;
		$data['list_id_row'] = $this->class_trainer_info->voc_table->list_id_row;
		$data['list_id_value'] = $this->list_id;
		$this->query_data = $data;
	}
	public function setQuery()
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
	public function setJsonString()
	{
 		$query = $this->query;
		$this->json_string = $this->class_db_functions->selectFromWithQuery($query);
	}
	public function setArray()
	{
		$json_string = $this->json_string;
		$object_array = json_decode($json_string);
		$this->object_array = $object_array;
	}
}