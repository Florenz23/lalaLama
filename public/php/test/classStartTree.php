<?php

require_once 'classDbFunctions.php';
require_once 'classTrainerInfo.php';

class treeStructObject {

	function __construct($lft, $rgt, $lvl, $pos) {
		$this->id = 0;
		$this->lft = $lft;
		$this->rgt = $rgt;
		$this->lvl = $lvl;
		$this->pid = 0;
		$this->pos = $pos;
		$this->root_id = 0;
	}
}

class treeDataObject {
	function __construct($nm, $type) {
		$this->id = 0;
		$this->nm = $nm;
		$this->type = $type;
	}
}

class classStartTree {

	function __construct() {

	 $this->class_trainer_info = new classTrainerInfo();
	 $this->class_db_functions = new classDbFunctions();

		 $this->obj_array_struct = array();
		 $this->obj_array_struct[] = new treeStructObject("1", "12", "0", "0");
		 $this->obj_array_struct[] = new treeStructObject("2", "3", "1", "0");
		 $this->obj_array_struct[] = new treeStructObject("4", "5", "1", "1");
		 $this->obj_array_struct[] = new treeStructObject("6", "11", "1", "2");
		 $this->obj_array_struct[] = new treeStructObject("7", "10", "2", "0");
		 $this->obj_array_struct[] = new treeStructObject("8", "9", "3", "0");

		 $this->obj_array_data = array();
		 $this->obj_array_data[] = new treeDataObject("root", "root");
		 $this->obj_array_data[] = new treeDataObject("ÖffentlicheListen", "public");
		 $this->obj_array_data[] = new treeDataObject("MeineGruppen", "groups");
		 $this->obj_array_data[] = new treeDataObject("MeineListen", "mylama");
		 $this->obj_array_data[] = new treeDataObject("Startordner", "folder");
		 $this->obj_array_data[] = new treeDataObject("Startliste", "list");

	}
	public function createStartTree()  {
		$returned_array = array();
		$data['table'] = $this->class_trainer_info->tree_struct_table->name;
		$data['values'] = $this->obj_array_struct[0];
		$returned_array[] = $this->class_db_functions->insertValues($data);

		$data['values'] = $this->obj_array_struct[1];
		$data['values']->root_id = $returned_array[0];
		$data['values']->pid = $returned_array[0];
		$returned_array[] = $this->class_db_functions->insertValues($data);

		$data['values'] = $this->obj_array_struct[2];
		$data['values']->root_id = $returned_array[0];
		$data['values']->pid = $returned_array[0];
		$returned_array[] = $this->class_db_functions->insertValues($data);

		$data['values'] = $this->obj_array_struct[3];
		$data['values']->root_id = $returned_array[0];
		$data['values']->pid = $returned_array[0];
		$returned_array[] = $this->class_db_functions->insertValues($data);

		$data['values'] = $this->obj_array_struct[4];
		$data['values']->root_id = $returned_array[0];
		$data['values']->pid = $returned_array[3];
		$returned_array[] = $this->class_db_functions->insertValues($data);

		$data['values'] = $this->obj_array_struct[5];
		$data['values']->root_id = $returned_array[0];
		$data['values']->pid = $returned_array[4];
		$returned_array[] = $this->class_db_functions->insertValues($data);

		$data['key'] = $this->class_trainer_info->tree_struct_table->root_id_row;
		$data['key_value'] = $returned_array[0];
		$data['primary'] = $this->class_trainer_info->tree_struct_table->id;
		$data['primary_value'] = $returned_array[0];
		$this->class_db_functions->updateValue($data);

		$this->setDataIds($returned_array);
		$this->insertData();
		return $returned_array;
	}
	public function setDataIds($returned_array) {
		$i = 0;
		foreach ($this->obj_array_struct as $key) {
			$this->obj_array_data[$i]->id = $returned_array[$i];
			$i++;
		}
	}
	public function insertData() {
		$returned_array = array();
		$data['table'] = $this->class_trainer_info->tree_data_table->name;
		$i = 0;
		foreach ($this->obj_array_data as $key) {
			$data['values'] = $this->obj_array_data[$i];
			$returned_array[] = $this->class_db_functions->insertValues($data);
			$i++;
		}
	}

}

?>