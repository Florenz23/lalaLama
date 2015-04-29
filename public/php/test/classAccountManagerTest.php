<?php
/**
 * Created by PhpStorm.
 * User: Julian
 * Date: 24.03.2015
 * Time: 16:41
 */

require_once 'classAccountManager.php';
require_once 'classSessionHandler.php';
require_once 'classDbFunctions.php';
require_once 'classTrainerInfo.php';

class classAccountManagerTest extends PHPUnit_Framework_TestCase {
	private $account_manager, $session_handler, $test_mail;

	function __construct() {
		$this->class_db_functions = new classDbFunctions();
		$this->account_manager = new classAccountManager();
		$this->session_handler = new classSessionHandler();
		$this->test_mail = mt_rand() . '@phpunit.test';
		$this->trainer_info = new classTrainerInfo();
	}

	function test() {
		$this->check();
		$this->cleanup();
	}

	public function check()
	{
		$user = mt_rand();
		$pass = mt_rand();
		$root_id = $this->account_manager->register( $user, $pass, $this->test_mail );
		$this->assertGreaterThan( 1000, $root_id, 'Registration(1) FAILED' );
		$this->assertFalse( $this->account_manager->register( $user, $pass ), 'Registration(2) SUCCEEDED' );
		$this->assertTrue( $this->account_manager->login( $user, $pass ), 'Login FAILED' );
		$this->assertTrue( $this->session_handler->isValid(), 'Session INVALID' );
		$this->assertTrue( true, 'message' );
		$this->root_id = $root_id;

	}

	function cleanup() {
		$this->session_handler->revoke();
		$db = new classDbFunctions();
		$data['table'] = $this->trainer_info->registration_table->name;
		$data['key'] = $this->trainer_info->registration_table->user_email_row;
		$data['key_value'] = $this->test_mail;
		$db->deleteRow( $data );
		$data['table'] = $this->trainer_info->tree_struct_table->name;
		$data['key'] = $this->trainer_info->tree_struct_table->root_id_row;
		$data['key_value'] = $this->root_id;
		$this->class_db_functions->deleteRow( $data );
	}
}
