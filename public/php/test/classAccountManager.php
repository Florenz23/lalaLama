<?php
/**
 * Created by PhpStorm.
 * User: Julian
 * Date: 17.03.2015
 * Time: 15:23
 */
require_once 'classDbFunctions.php';
require_once 'classSessionHandler.php';
require_once 'classStartTree.php';
require_once 'classTrainerInfo.php';

if ( isset( $_REQUEST['action'] ) ) {
	account_manager_execute();
}

function account_manager_execute() {
	$account = new classAccountManager();

	if ( $_REQUEST['action'] == 'register' ) {
		if ( $_REQUEST['password'] == $_REQUEST['password_repeat'] ) {
			$account->register( $_REQUEST['username'], $_REQUEST['password'], $_REQUEST['email'] );
		}
	} else if ( $_REQUEST['action'] == 'login' ) {
			if ( $account->login( $_REQUEST['username'], $_REQUEST['password'] ) ) {
				echo 'login.ok';
			} else {
				echo 'login.failed.';
			}

		}
}

class classAccountManager {
	private $user, $email, $password;
	private $salt, $hash;

	public $warning;

	function __construct() {}

	function __destruct() {
		if ( strlen( $this->warning ) > 0 ) {
			echo $this->warning;
		}

	}

	public function login( $user, $password ) {
		$this->user = $user;
		$this->password = $password;

		if ( $this->validateInput() ) {
			return $this->checkLogin();
		} else {
			return false;
		}

	}

	public function register( $user, $password, $email = '' ) {
		$this->user = $user;
		$this->email = $email;
		$this->password = $password;

		if ( $this->validateInput() ) {
			$root_id = $this->registerAccount();
			return $root_id;
		} else {
			return false;
		}

	}

	private function validateInput() {
		if ( !filter_var( $this->email, FILTER_VALIDATE_EMAIL ) ) {
			$this->email = '';
		}

		if ( strlen( $this->password ) < 6 ) {
			$this->warning = 'invalid password length';
			return false;
		}
		if ( strlen( $this->user ) < 4 ) {
			$this->warning = 'invalid user length';
			return false;
		}
		return true;
	}

	private function createSalt() {
		$this->salt = hash( 'sha1', mt_rand() );
	}

	private function createHash() {
		if ( strlen( $this->salt ) == 0 ) {
			$this->createSalt();
		}

		$salt_crumbs = str_split( $this->salt, 8 );
		$password_crumbs = str_split( $this->password, strlen( $this->password ) / 2 );

		$this->hash = hash( 'sha256', $salt_crumbs[3] . $password_crumbs[1] . $salt_crumbs[0] . $password_crumbs[0] . $salt_crumbs[4] );
	}

	private function checkAvailability() {
		$trainer_info = new classTrainerInfo();
		$db = new classDbFunctions();
		$data = array(
			'db' => $trainer_info->db,
			'table' => $trainer_info->registration_table->name,
			'key' =>$trainer_info->registration_table->user_name_row,
			'value' => $this->user,
		);
		if ( $db->selectFrom( $data ) == false ) {
			return true;
		}

		return false;
	}

	private function checkLogin() {
		$trainer_info = new classTrainerInfo();
		$db = new classDbFunctions();
		$data = array(
			'db' => $trainer_info->db,
			'table' => $trainer_info->registration_table->name,
			'key' =>$trainer_info->registration_table->user_name_row,
			'value' => $this->user,
		);

		if ( $result = $db->selectFrom( $data ) ) {
			$result = json_decode( $result );
			$this->salt = $result[0]->password_salt;
			$this->createHash();

			if ( $this->hash == $result[0]->password_hash ) {
				$session = new classSessionHandler();
				$session->validate();
				$session->setUserId( $result[0]->user_id );
				$session->setUserRoot( $result[0]->user_root );

				return true;
			}
		}
		return false;
	}

	private function registerAccount() {
		$trainer_info = new classTrainerInfo();
		if ( $this->checkAvailability() ) {
			$this->createHash();
			$db = new classDbFunctions();
			$data = array(
				'db' => $trainer_info->db,
				'table' => $trainer_info->registration_table->name,
				'values' => array(
					'user_name' => $this->user,
					'user_email' => $this->email,
					'password_hash' => $this->hash,
					'password_salt' => $this->salt,
				),
			);
			$db_answer = $db->insertValues( $data );
			if ( $db_answer ) {
				$root_id = $this->createStartTree();
				$this->insertRoot( $db_answer, $root_id );
				return $root_id;
			}
		}
		return false;
	}
	public function createStartTree() {
		$class_start_tree = new classStartTree();
		$returned_id_array = $class_start_tree->createStartTree();
		$root_id = $returned_id_array[0];
		return $root_id;
	}
	public function insertRoot( $user_id, $root_id ) {
		$trainer_info = new classTrainerInfo();
		$db = new classDbFunctions();
		$data['table'] = $trainer_info->registration_table->name;
		$data['primary'] = $trainer_info->registration_table->id;
		$data['primary_value'] = $user_id;
		$data['key'] = $trainer_info->registration_table->user_root_row;
		$data['key_value'] = $root_id;
		$db->updateValue( $data );
	}
}
