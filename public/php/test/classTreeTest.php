<?php
// wird benötigt für die Tests
require_once "tree_server.php";

class classTreeTest extends classDbTestMain {

	function __construct() {
		parent::__construct();
		$this->db = new classDbFunctions;
		$this->db_checker = new classDbChecker;
		$this->tree = new tree(db::get('mysqli://root@127.0.0.1/test'), array('structure_table' => 'tree_struct', 'data_table' => 'tree_data', 'data' => array('nm', 'type')));
	}
	public function test() {
		//$returned_value = $this->tree->rn(1139, $data);
		// $returned_value = $this->tree->mk(1, 0, $data);
		// $returned_value = $this->tree->rm(1074);
		// $returned_value = $this->tree->mv(1109, 1, 0);
		// $this->assertTrue(true, 'returned_id should been set');
		//$this->assertEquals(expected, actual, 'message');
		$this->getNode();
	}
	public function getNode() {
		$root_id = 2418;
		$this->tree->root_id = $root_id;
		$this->tree->user_id = $root_id;
		$node = $this->tree->get_children("#");
		$this->assertTrue(true, 'check');

	}
}