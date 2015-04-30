<?php

require_once "classTrainerInfo.php";
require_once "classDbFunctions.php";
require_once "classDbFunctionsEditorGetVocs.php";
require_once "class.tree.php";

class classCopyPublicList {

	public $list_id = "not_set";

	function __construct() {
		$this->trainer_info = new classTrainerInfo();
		$this->class_db_functions_editor_get_vocs = new classDbFunctionsEditorGetVocs();
		$this->class_db_functions = new classDbFunctions();
		$this->tree = new tree();

	}
	public function copyList( $list_id ) {
		$this->setListToBeCopied( $list_id );
		$this->setCopiedListDescription();
		$this->setCopiedListId();
		$this->copyVocs();
		return $this->checkReturn();
	}
	public function checkReturn() {
		if ( $this->copied_list_id > 100 ) {
			$return_array = array();
			$return_array['list_id'] = $this->copied_list_id;
			$return_array['download_id'] = $this->tree->tree_root+2;
			return $return_array;
		}
		return false;
	}
	public function setListToBeCopied( $list_id ) {
		$this->list_id_to_be_copied = $list_id;
	}
	public function setCopiedListDescription()
	{
		$data['table'] = $this->trainer_info->tree_data_table->name;
		$data['key'] = $this->trainer_info->tree_data_table->id;
		$data['value'] = $this->list_id_to_be_copied;
		$json_data = $this->class_db_functions->selectFrom($data);
		$object_array = json_decode($json_data);
		$copied_list_description = $object_array[0]->nm;
		$this->copied_list_description = $copied_list_description;

	}
	public function setCopiedListId() {
		$copied_list_id = $this->copyListToUserDownload();
		$this->copied_list_id = $copied_list_id;

	}
	public function copyListToUserDownload() {
		$this->tree->setRoot( "user" );
		$data['nm'] = $this->copied_list_description;
		$data['type'] = "list";
		$parent_id = $this->tree->tree_root+2;
		$returned_id = $this->tree->mk( $parent_id, 0, $data );
		$returned_value = $this->tree->rn( $returned_id, $data );
		return $returned_id;
	}
	public function copyVocs() {
		$this->setDataToCopie();
		$this->copyRows();
	}
	public function setDataToCopie() {
		$list_id = $this->list_id_to_be_copied;
		$data = $this->class_db_functions_editor_get_vocs->getObjectArray( $list_id );
		$this->data_to_copie = $data;
	}
	public function copyRows() {
		$data_to_copie = $this->data_to_copie;
		for ( $i = 0; $i < count( $data_to_copie ); $i++ ) {
			$this->setLastInsertVocId( $data_to_copie[$i] );
			$i = $this->copyAnswer( $i, $data_to_copie );
			$i--;
		}
	}
	public function setLastInsertVocId( $voc_object ) {
		$returned_question_id = $this->insertQuestionDataIntoDb( $voc_object->question );
		$this->last_insert_voc_id = $returned_question_id;

	}
	public function copyAnswer( $i, $data_to_copie ) {
		$recent_data_to_copie_voc_id = $data_to_copie[$i]->voc_id;
		while ( isset($data_to_copie[$i]) && $data_to_copie[$i]->voc_id == $recent_data_to_copie_voc_id ) {
			$this->insertAnswerDataIntoDb( $data_to_copie[$i] );
			$i++;
		}
		return $i;
	}
	public function insertQuestionDataIntoDb( $question ) {
		$values['question'] = $question;
		$values['list_id'] = $this->copied_list_id;
		$data['table'] = $this->trainer_info->voc_table->name;
		$data['values'] = $values;
		$returned_question_id = $this->class_db_functions->insertValues( $data );
		return $returned_question_id;
	}
	public function insertAnswerDataIntoDb( $voc_object ) {
		$values['voc_id'] = $this->last_insert_voc_id;
		$values['answer'] = $voc_object->answer;
		$values['multi_choice'] = $voc_object->multi_choice;
		$values['img_id'] = $voc_object->img_id;
		$data['table'] = $this->trainer_info->answer_table->name;
		$data['values'] = $values;
		$this->class_db_functions->insertValues( $data );
	}
}
