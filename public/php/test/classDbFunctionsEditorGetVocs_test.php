<?php


require_once "classDbTestMain.php";
require_once "classDbFunctions.php";
require_once "classDbTestList.php";
require_once "classDbFunctionsEditorGetVocs.php";

class classDbFunctionsEditorGetVocs_test extends classDbTestMain {

	function __construct() {
		parent::__construct();
		$this->class_db_functions = new classDbFunctions();
		$this->class_db_test_list = new classDbTestList();
		$this->class_db_functions_editor_get_vocs = new classDbFunctionsEditorGetVocs();

	}
	public function test() {
		$this->resetTestList();
		$this->getVocsEditor();
	}
	public function resetTestList() {
		$this->class_db_test_list->resetTestValues();
	}

	public function getVocsEditor()
	{
		$list_id = $this->class_db_test_list->list_id;
		$given_array = $this->class_db_functions_editor_get_vocs->getObjectArray($list_id);
		$expected_array = $this->class_db_test_list->complete_array;
		$this->assertSame($given_array[0]->question, $expected_array[0]->question, 'question');
		$this->assertSame($given_array[3]->answer, $expected_array[3]->answer, 'answer');
		$this->assertSame($given_array[5]->list_id, $expected_array[5]->list_id, 'list_id');
	}
}