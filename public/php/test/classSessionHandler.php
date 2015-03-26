<?php
/**
 * Created by PhpStorm.
 * User: Julian
 * Date: 19.03.2015
 * Time: 16:51
 */

if (isset($_REQUEST['action'])) {
	session_handler_execute();
}

function session_handler_execute() {
	$session = new classSessionHandler();

	if ($_REQUEST['action'] == 'logout') {
		$session->revoke();
		echo 'logged.out';
	} else if ($_REQUEST['action'] == 'status') {
		echo $session->isValid() ? 'logged.in' : 'logged.out';
	}
}

class classSessionHandler {
	function __construct() {
		if (!isset($_SESSION)) {
			session_start();
		}

	}

	public function renew() {
		session_regenerate_id(false);
	}

	public function revoke() {
		session_unset();
		session_destroy();
	}

	public function setUserId($id) {
		$_SESSION['user.id'] = $id;
	}

	public function getUserId() {
		if (isset($_SESSION['user.id'])) {
			return $_SESSION['user.id'];
		} else {
			return -1;
		}

	}

	public function setUserRoot($id) {
		$_SESSION['user.root'] = $id;
	}

	public function getUserRoot() {
		if (isset($_SESSION['user.root'])) {
			return $_SESSION['user.root'];
		} else {
			return -1;
		}

	}

	public function validate() {
		$_SESSION['login.ok'] = true;
	}

	public function isValid() {
		if (isset($_SESSION['login.ok'])) {
			return $_SESSION['login.ok'];
		} else {
			return false;
		}

	}
}