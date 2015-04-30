<?php
require_once dirname( __FILE__ ) . '/class.db.php';
require_once dirname( __FILE__ ) . '/class.tree.php';
if ( isset( $_GET['operation'] ) ) {
	$fs = new tree();
	if (isset($_GET['root'])){
		$fs->setRoot($_GET['root']);
	}
	try {
		$rslt = null;
		switch ( $_GET['operation'] ) {
		case 'get_node':
			$node = isset( $_GET['id'] ) && $_GET['id'] !== '#' ? (int) $_GET['id'] : 0;
			print_r($fs);
			$temp = $fs->get_children( $node );
			$rslt = array();
			foreach ( $temp as $v ) {
				$rslt[] = array( 'id' => $v['id'], 'text' => $v['nm'], 'children' => ( $v['rgt'] - $v['lft'] > 1 ), 'type' => $v['type'] );
			}
			break;
		default:
			throw new Exception( 'Unsupported operation: ' . $_GET['operation'] );
			break;
		}
		header( 'Content-Type: application/json; charset=utf-8' );
		echo json_encode( $rslt );
	} catch ( Exception $e ) {
		// header( $_SERVER["SERVER_PROTOCOL"] . ' 500 Server Error' );
		// header( 'Status:  500 Server Error' );
		// echo $e->getMessage();
	}
	die();
}
?>
