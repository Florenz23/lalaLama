<?php

require_once "classDbTestList.php";
require_once "ajax_server.php";
require_once "classDbFunctions.php";

class classListEditorSaveNewVoc_test extends classDbTestMain {

	function __construct() {
		parent::__construct();
		$this->class_db_functions = new classDbFunctions;
		$this->class_db_test_list = new classDbTestList;
		$this->ajax_server = new ajax_server;
		$this->to_be_updated_answer_id = $this->class_db_test_list->answer_array[0]->answer_id;
		$this->list_id = 5;
		$this->question_value = "question";
		$this->answer_value = "answer";

	}

	public function test() {
			$this->insertQuestion();
		$this->insertAnswer();
		$this->setDataQuestionCheck();
		$this->setDataAnswerCheck();
		$this->checkEntryShouldBeTrue();
		$this->deleteQuestion();
		$this->deleteAnswer();
	}

	public function insertQuestion() {
		$data['data']['question'] = $this->question_value;
		$data['data']['list_id'] = $this->list_id;
		$new_voc_id = $this->ajax_server->classListEditorSaveNewVocQuestion( $data );
		$this->new_voc_id = $new_voc_id;
	}
	public function insertAnswer() {
		$data['data']['answer'] = $this->answer_value;
		$data['data']['voc_id'] = $this->new_voc_id;
		$new_answer_id = $this->ajax_server->classListEditorSaveNewVocAnswer( $data );
		$this->new_answer_id = $new_answer_id;
	}


	public function setDataQuestionCheck() {
		$data['table'] = $this->trainer_info->voc_table->name;
		$data['primary'] = $this->trainer_info->voc_table->id;
		$data['primary_value'] = $this->new_voc_id;
		$data['key'] = $this->trainer_info->voc_table->question_row;
		$data['key_value'] = $this->question_value;
		$this->question_data = $data;
	}
	public function setDataAnswerCheck() {
		$data['table'] = $this->trainer_info->answer_table->name;
		$data['primary'] = $this->trainer_info->answer_table->id;
		$data['primary_value'] = $this->new_answer_id;
		$data['key'] = $this->trainer_info->answer_table->answer_row;
		$data['key_value'] = $this->answer_value;
		$this->answer_data = $data;
	}

	public function checkEntryShouldBeTrue() {
		$check_result_0 = $this->class_db_functions->checkIfValueExists( $this->question_data );
		$check_result_1 = $this->class_db_functions->checkIfValueExists( $this->answer_data );
		$this->assertSame( $check_result_0,true, 'question values should been inserted ' );
		$this->assertSame( $check_result_1,true, 'answer values should been inserted' );
	}
	public function deleteQuestion() {
		$data['table'] = $this->trainer_info->voc_table->name;
		$data['key'] = $this->trainer_info->voc_table->id;
		$data['key_value'] = $this->new_voc_id;
		$query_anser = $this->class_db_functions->deleteRow( $data );
		$this->assertSame( $query_anser, '{"status":"deleted.ok"}' , 'delete ok' );

	}
	public function deleteAnswer() {
		$data['table'] = $this->trainer_info->answer_table->name;
		$data['key'] = $this->trainer_info->answer_table->id;
		$data['key_value'] = $this->new_answer_id;
		$query_anser = $this->class_db_functions->deleteRow( $data );
		$this->assertSame( $query_anser, '{"status":"deleted.ok"}' , 'delete ok' );
	}

}
