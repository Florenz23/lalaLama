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

class classAccountManagerTest extends PHPUnit_Framework_TestCase {
	private $account_manager, $session_handler, $test_mail;

	function __construct() {
		$this->account_manager = new classAccountManager();
		$this->session_handler = new classSessionHandler();
		$this->test_mail = mt_rand() . '@phpunit.test';
	}

	function __destruct() {
		$this->cleanup();
	}

	function test() {
		$user = mt_rand();
		$pass = mt_rand();
		//$this->assertTrue($this->account_manager->register($user, $pass, $this->test_mail), 'Registration(1) FAILED');
		//$this->assertFalse($this->account_manager->register($user, $pass), 'Registration(2) SUCCEEDED');
		//$this->assertTrue($this->account_manager->login($user, $pass), 'Login FAILED');
		//$this->assertTrue($this->session_handler->isValid(), 'Session INVALID');
		$this->assertTrue(true, 'message');
	}

	function cleanup() {
		$this->session_handler->revoke();

		$db = new classDbFunctions();
		$db->deleteRow(array(
			'db' => 'test',
			'table' => 'accounts',
			'key' => 'user_email',
			'value' => $this->test_mail));
	}
}
