<?php

require_once "classTrainerInfo.php";
require_once "classDbFunctions.php";

class ajax_server {
	protected $trainer_info;
	protected $db_functions;
	function __construct() {
		$this->trainer_info = new classTrainerInfo;
		$this->db_functions = new classDbFunctions;
	}

	public function classListEditorDeleteVoc( $data ) {
		$data['table'] = $this->trainer_info->voc_table->name;
		$data['key'] = $this->trainer_info->voc_table->id;
		$data['value'] = $data['data']['voc_id_to_be_deleted'];
		if ( $this->db_functions->deleteRow( $data ) ) {
			$data['table'] = $this->trainer_info->answer_table->name;
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
	public function classListEditorSaveNewVocQuestion($data)
	{
		$send_data['table'] = $this->trainer_info->voc_table->name;
		$send_data['values']['question'] = $data['data']['question'];
		$send_data['values']['list_id'] = $data['data']['list_id'];
		$check_result = $this->db_functions->insertValues( $send_data );
		return $check_result;
	}
	public function classListEditorSaveNewVocAnswer($data)
	{
		$send_data['table'] = $this->trainer_info->answer_table->name;
		$send_data['values']['answer'] = $data['data']['answer'];
		$send_data['values']['voc_id'] = $data['data']['voc_id'];
		print_r($send_data);
		$check_result = $this->db_functions->insertValues( $send_data );
		echo $check_result;
		return $check_result;
	}
}


$ajax_functions = new ajax_server();
if ( isset( $_REQUEST["operation"] ) && strpos( $_REQUEST["operation"], "_" ) !== 0 && method_exists( $ajax_functions, $_REQUEST["operation"] ) ) {

	echo $ajax_functions->{$_REQUEST["operation"]}( $_REQUEST );
	die();
}
