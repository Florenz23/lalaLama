<?php

require_once "classTrainerInfo.php";
require_once "classDbFunctions.php";
require_once "classTrainerFunctions.php";
require_once "classCopyPublicList.php";

class ajax_server {
	protected $trainer_info;
	protected $db_functions;
	function __construct() {
		$this->trainer_info = new classTrainerInfo;
		$this->db_functions = new classDbFunctions;
		$this->trainer_functions = new classTrainerFunctions;
		$this->copy_public_lists = new classCopyPublicList;
	}

	public function classListEditorDeleteVoc( $data ) {
		$data['table'] = $this->trainer_info->voc_table->name;
		$data['key'] = $this->trainer_info->voc_table->id;
		$data['key_value'] = $data['data']['voc_id_to_be_deleted'];
		if ( $this->db_functions->deleteRow( $data ) ) {
			$data['table'] = $this->trainer_info->answer_table->name;
			$check_result = $this->db_functions->deleteRow( $data );
			if ( $check_result ) {
				return $check_result;
			}
		}
	}
	public function classListEditorDeleteAnswer( $data ) {
		$data['table'] = $this->trainer_info->answer_table->name;
		$data['key'] = $this->trainer_info->answer_table->id;
		$data['key_value'] = $data['data']['answer_id_to_be_deleted'];
		if ( $this->db_functions->deleteRow( $data ) ) {
			$data['table'] = $this->trainer_info->voc_user_data_table->name;
			$check_result = $this->db_functions->deleteRow( $data );
			if ( $check_result ) {
				return $check_result;
			}
		}
	}
	public function classListEditorUpdateQuestion( $data ) {
		$send_data['table'] = $this->trainer_info->voc_table->name;
		$send_data['key'] = $this->trainer_info->voc_table->question_row;
		$send_data['key_value'] = $data['data']['new_value'];
		$send_data['primary'] = $this->trainer_info->voc_table->id;
		$send_data['primary_value'] = $data['data']['id'];
		$check_result = $this->db_functions->updateValue( $send_data );
		return $check_result;
	}
	public function classListEditorUpdateAnswer( $data ) {
		$send_data['table'] = $this->trainer_info->answer_table->name;
		$send_data['key'] = $this->trainer_info->answer_table->answer_row;
		$send_data['key_value'] = $data['data']['new_value'];
		$send_data['primary'] = $this->trainer_info->answer_table->id;
		$send_data['primary_value'] = $data['data']['id'];
		$check_result = $this->db_functions->updateValue( $send_data );
		return $check_result;
	}
	public function classListEditorSaveNewVocQuestion( $data ) {
		$send_data['table'] = $this->trainer_info->voc_table->name;
		$send_data['values']['question'] = $data['data']['question'];
		$send_data['values']['list_id'] = $data['data']['list_id'];
		$check_result = $this->db_functions->insertValues( $send_data );
		return $check_result;
	}
	public function classListEditorSaveNewVocAnswer( $data ) {
		$send_data['table'] = $this->trainer_info->answer_table->name;
		$send_data['values']['answer'] = $data['data']['answer'];
		$send_data['values']['voc_id'] = $data['data']['voc_id'];
		$check_result = $this->db_functions->insertValues( $send_data );
		return $check_result;
	}
	public function classTrainerUpdateVocRating( $data ) {
		$send_data['table'] = $this->trainer_info->voc_user_data_table->name;
		$send_data['key'] = $this->trainer_info->voc_user_data_table->id;
		$send_data['right_row'] = $this->trainer_info->voc_user_data_table->right_row;
		$send_data['wrong_row'] = $this->trainer_info->voc_user_data_table->wrong_row;
		$send_data['rating_row'] = $this->trainer_info->voc_user_data_table->rating_row;
		$send_data['answer_id'] = $data['data']['answer_id'];
		$send_data['ok'] = $data['data']['ok'];
		$check_result = $this->trainer_functions->updateVocRating( $send_data, 0 );
		return $check_result;
	}
	public function classTrainerGetVocs($data)
	{
		$send_data['voc_table'] = $this->trainer_info->voc_table->name;
		$send_data['answer_table'] = $this->trainer_info->answer_table->name;
		$send_data['voc_user_data_table'] = $this->trainer_info->voc_user_data_table->name;
		$send_data['voc_id_row'] = $this->trainer_info->voc_table->id;
		$send_data['answer_id_row'] = $this->trainer_info->answer_table->id;
		$send_data['list_id_row'] = $this->trainer_info->voc_table->list_id_row;
		$send_data['list_id_value'] = $data['data']['list_id'];
		$threeDArray= $this->trainer_functions->getVocsEncoded($send_data);
		return $threeDArray;
	}
	public function classDisplayListGetVocs($data)
	{
		$send_data['voc_table'] = $this->trainer_info->voc_table->name;
		$send_data['answer_table'] = $this->trainer_info->answer_table->name;
		$send_data['voc_id_row'] = $this->trainer_info->voc_table->id;
		$send_data['answer_id_row'] = $this->trainer_info->answer_table->id;
		$send_data['list_id_row'] = $this->trainer_info->voc_table->list_id_row;
		$send_data['list_id_value'] = $data['data']['list_id'];
		$threeDArray= $this->db_functions->listGetVocs($send_data);
		return $threeDArray;
	}
	public function classCopyPublicList($data)
	{
		$list_id = $data['data']['list_id'];
		$returned_array = $this->copy_public_lists->copyList($list_id);
		$download_id = $returned_array['download_id'];
		return $download_id;
	}
}
$ajax_functions = new ajax_server();
if ( isset( $_REQUEST["operation"] ) && strpos( $_REQUEST["operation"], "_" ) !== 0 && method_exists( $ajax_functions, $_REQUEST["operation"] ) ) {

	print_r ($ajax_functions->{$_REQUEST["operation"]}( $_REQUEST ));
	die();
}
