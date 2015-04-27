<?php

require_once "classCopyPublicList.php";
require_once "classDbTestMain.php";
require_once "classDbTestList.php";
require_once "classDbFunctionsEditorGetVocs.php";
require_once 'classAccountManager.php';


class classCopyPublicList_test extends classDbTestMain {

	function __construct() {
		parent::__construct();
		$this->class_db_functions = new classDbFunctions();
		$this->class_db_functions_editor_get_vocs = new classDbFunctionsEditorGetVocs();
		$this->class_db_checker = new classDbChecker;
		$this->class_db_test_list = new classDbTestList;
		$this->account_manager = new classAccountManager();
		$this->class_copy_public_list = new classCopyPublicList();
		$this->tree = new tree();
	}
	public function test() {
		$this->copyList();
		$this->checkIfCopyPublicListSuceeded();
		$this->checkIfCopiedVocsExist();
		$this->checkCopiedListDescription();
		$this->deleteCopiedVocs();
		$this->deleteTestListCopied();
	}

	public function copyList() {
		$list_id = $this->class_db_test_list->list_id;
		$this->assertTrue( $this->account_manager->login( "Admin", "asdfasdf" ), 'Login Suceed' );
		$this->tree->setRoot( "user" );
		$returned_array = $this->class_copy_public_list->copyList($list_id);
		$returned_id = $returned_array['list_id'];
		$this->copied_list_id = $returned_id;
	}
	public function checkIfCopyPublicListSuceeded()
	{
		$this->assertGreaterThan(100, $this->copied_list_id, 'created list id should been returned');
	}
	public function checkCopiedListDescription()
	{
		$list_id = $this->class_db_test_list->list_id;
		$data['table'] = $this->trainer_info->tree_data_table->name;
		$data['key'] = $this->trainer_info->tree_data_table->id;
		$data['value'] = $this->copied_list_id;
		$json_data = $this->class_db_functions->selectFrom($data);
		$object_array = json_decode($json_data);
		$this->assertSame("test_list", $object_array[0]->nm, 'copied list should have correct description');

	}
	public function checkIfCopiedVocsExist()
	{
		$list_id = $this->copied_list_id;
		$given_array = $this->class_db_functions_editor_get_vocs->getObjectArray($list_id);
		$expected_array = $this->class_db_test_list->complete_array;
		$this->assertSame(count($given_array), count($expected_array), 'voc_to_be_copied should have correct amount');
		for ($i=0; $i < count($given_array); $i++) {
		$this->assertSame($given_array[$i]->question, $expected_array[$i]->question, 'question'.$i);
		$this->assertSame($given_array[$i]->answer, $expected_array[$i]->answer, 'answer'.$i);
		}
		$this->assertSame($given_array[0]->voc_id, $given_array[1]->voc_id, 'multi answer correct');
	}
	public function deleteTestListCopied() {
		$this->tree->rm( $this->copied_list_id );
	}
	public function deleteCopiedVocs() {
		$data['table'] = $this->trainer_info->voc_table->name;
		$data['key'] = $this->trainer_info->voc_table->list_id_row;
		$data['key_value'] = $this->copied_list_id;
		$this->class_db_functions->deleteRow( $data );
	}
}
