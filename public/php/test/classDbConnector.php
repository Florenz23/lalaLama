<?php
require_once "classTrainerInfo.php";

class classDbConnector extends classTrainerInfo {

	function __construct() {

		parent::__construct();
		$this->mysqli = new mysqli( $this->host, $this->user, $this->pass, $this->db );
		if ( mysqli_connect_error() ) {
			die( 'Connect Error (' . mysqli_connect_errno() . ') '
				. mysqli_connect_error() );
		}

	}

	function query( $query ) {
		$result = $this->mysqli->query( $query );

		if ( $result === false && $error = mysqli_error( $this->mysqli ) ) {
			return array( false, $error . " Query: " . $query );
		};

		if ( gettype( $result ) == 'object' ) {
			return array( true, $result );
		}
		else { return array( true, null ); }
	}

	function checkQuery( $query ) {
		$query_answer = $this->query( $query );

		if ( $this -> mysqli -> insert_id != 0 ) {
			return $this -> mysqli -> insert_id;
		}
		else if ( $query_answer[0] == false ) {
				print_r( $query_answer[1] );
				return false;
			}
		else if ( $query_answer[0] == true ) {
				if ( $query_answer[1] != null ) {
					return $query_answer[1];
				}
			}
		return true;
	}

}
