<?php
include "../../../public/php/trainer/admin.inc.php";
include "../../../public/php/trainer/include.inc.php";
?>




<?php

// name der Tabelle in der die Ordner und Listenstruktur gespeichert ist

function edit_list($ajax_php_file, $dbname, $table_name, $is_current_vocs) {
	//echo "<br>Tabellennname:$table_name<br>";
	// erhält von Javascript die id des Pools, der angezeigt werden soll
	// table_name ist der name des Tabellenregister mit der Sammlung von Listen

// löscht einen Eintrag aus Users lists
	// wird von js-Funktion delete_row ausgeführt
	if (isset($_GET['delete_row'])) {
		$array = $_GET['delete_row'];
		$array = json_decode(stripslashes($array));
		$pool_id = $array[0];
		$row_id = $array[1];
		$sql = "DELETE FROM `$dbname` . `vocs_usr` WHERE `vocs_usr`.`id` = $row_id;";
		simplequery($sql);
		//display_edit_vocs($ajax_php_file,$dbname, $table_name,$is_current_vocs, $pool_id);
	}

// Vokabel aus Current Vocs bearbeiten
	if (isset($_GET['edit_row'])) {
		$array = $_GET['edit_row'];
		$array = json_decode(stripslashes($array));
		// Struktur des Js arrays: new Array(type,field_value,table_id,row_id);
		$type = $array[0];
		$field_value = utf8_encode($array[1]);
		$pool_id = $array[2];
		$row_id = $array[3];

		//echo $sql;
		$sql = "UPDATE `$dbname`.`$table_name` SET ";
		if ($type == "q") {
			$sql .= " `Question`";
		}
		if ($type == "a") {
			$sql .= "`Answer`";
		}

		$sql .= " = '$field_value' WHERE `$table_name`.`Id` = $row_id;";
		//echo "<br>$sql";
		$result = simplequery($sql);
		if ($result) {
			echo "Änderung erfolgreich,neuer Eintrag:<b> $field_value </b>";
		}
		//display_edit_vocs($ajax_php_file,$dbname, $table_name,$is_current_vocs, $pool_id);
	}

	// speicher die neu hinzugefügten Felder eines Pools
	if (isset($_GET['save_added_vocs'])) {
		$array = $_GET['save_added_vocs'];
		$array = json_decode(stripslashes($array));
		// Struktur des Js arrays: new Array(type,field_value,table_id,row_id);
		$sql = $array[0];
		$pool_id = $array[1];
		//simplequery($sql);
		update_voc_object_array($pool_id, $dbname, $user_id, $current_vocs);

	}

}

// Bearbeitet Beschreibung etc einer Tabelle:

if (isset($_GET['edit_description'])) {
	$array = $_GET['edit_description'];
	$array = json_decode(stripslashes($array));
	// Struktur des Js arrays: Array(table_name,row_id,description);
	$table_name = $array[0];
	$row_id = $array[1];
	$description = $array[2];

	$sql =
	"UPDATE `$dbname`.`$table_name` SET `Description` = '$description' WHERE `$table_name`.`Id` =$row_id;";
	//echo $sql;
	$result = simplequery($sql);
	if ($result) {

		// parameter der Funktion müssen indentisch sein mit den Parametern aus manage_vocs.php
		manage_list_menu($dbname, "$user_id $users_pools", "pools.inc.php");

		echo "<br><br>The pool name was changed to: <b>$description</b>";

	}

}

if (isset($_GET['edit_goal'])) {
	$array = $_GET['edit_goal'];
	$array = json_decode(stripslashes($array));
	// Struktur des Js arrays: Array(table_name,row_id,description);
	$table_name = $array[0];
	$row_id = $array[1];
	$goal = $array[2];

	$sql =
	"UPDATE `$dbname`.`$table_name` SET `Goal` = '$goal:00' WHERE `$table_name`.`Id` =$row_id;";
	//echo $sql;
	$result = simplequery($sql);
	if ($result) {

		// parameter der Funktion müssen indentisch sein mit den Parametern aus manage_vocs.php
		manage_list_menu($dbname, "$user_id $users_pools", "pools.inc.php");

		echo "<br><br>Das Lernziel wurde erfolgreich auf: <b>$goal</b> gesetzt!";

	}

}

// die Poolid muss wieder übergeben werden, damit nach dem Löschen der Zeile wieder alles angezeigt wird

if (isset($_GET['save_multi_answers'])) {

	$send_array = $_GET['save_multi_answers'];
	$send_array = json_decode(stripslashes($send_array));
	$row_id = $send_array[0];
	$answer = utf8_encode($send_array[1]);
	$right = $send_array[2];
	$wrong = $send_array[3];
	$rating = $send_array[4];
	$multi_choice = $send_array[5];

	$sql = "UPDATE `$dbname`.`vocs_usr` SET
        `answer` = '$answer',
        `right` = '$right',
        `wrong` = '$wrong',
        `rating` = '$rating' ,
        `multi_choice` = '$multi_choice'

        WHERE `vocs_usr`.`id` =$row_id;";
	simplequery($sql);

}

if (isset($_GET['add_goal'])) {

	$send_array = $_GET['add_goal'];
	$send_array = json_decode(stripslashes($send_array));
	$goal = $send_array[0];
	$pool_id = $send_array[1];

	$sql = "UPDATE `$dbname`.`$user_id $users_pools` SET `Goal` = '$goal:00' WHERE `$user_id $users_pools`.`Id` = $pool_id;";
	simplequery($sql);
	echo "<br><br>Das Lernziel wurde erfolgreich auf: <b>$goal</b> gesetzt!";

}

if (isset($_GET['remove_goal'])) {

	$pool_id = $_GET['remove_goal'];

	$sql = "UPDATE `$dbname`.`$user_id $users_pools` SET `Goal` = '0000-00-00 00:00:00' WHERE `$user_id $users_pools`.`Id` = $pool_id;";
	simplequery($sql);
	echo "<br><br>Das Lernziel wurde erfolgreich auf <b>unendlich</b> gesetzt!";

}

// speichert neue hinzugefügte Vokabeln
if (isset($_GET['save_new_vocs'])) {
	$array = $_GET['save_new_vocs'];
	$array = json_decode(stripslashes($array));
	$sql_values = utf8_encode($array[0]);
	$pool_id = $array[1];
	$sql = "INSERT INTO `$dbname`.`vocs_usr` (`pool_id`,`question`, `answer`, `right`, `wrong`, `rating`, `multi_choice`,`last_access`, `img_id`) VALUES ";
	$sql .= $sql_values;
	echo $sql .= ";";
	$sql;
	simplequery($sql);
	//liest die Vokabeln neu aus um sie wieder anzeigen zu können
	echo "  <script language ='JacaScript' type='text/javascript'>
                pool_id = $pool_id;
                display_pool();
            </script>";

}

// Skript zum hochladen einer datei, wird ausgelöst, wenn das Formular abgeschickt wird
// für eine bereits bestehende Vokabel
$upload = false;
if (isset($_FILES['edit_img']) && $_FILES['edit_img']['size'] > 0) {

	$file = $_FILES['edit_img'];
	$row_id = $_POST['hidden_img_id'];
	$div_id = $_POST['hidden_div_id'];
	// löschen des alten Bildes
	$old_img_id = $_POST['old_img_id'];
	$old_img_suffix = $_POST['old_img_suffix'];
	if ($old_img_id != "NULL") {
		$check = unlink("../upl_img/thumb_$old_img_id.$old_img_suffix");
		$check1 = unlink("../upl_img/big_$old_img_id.$old_img_suffix");
	}

	$tempname = $file['tmp_name'];
	$dateiname = $file['edit_img']['name'];
	$dateigroesse = $file['edit_img']['size'];
	$dateityp = GetImageSize($tempname);
	//liest die breite und höhe der Bilder aus und speichert sie in einem Array, [0] ist die Breite und [1] die höhe, an 3 Stelle würden alle daten ausgegeben werden
	$img_width = $dateityp[0];
	$img_height = $dateityp[1];
	if ($dateityp[2] == 1 || $dateityp[2] == 2) {
		// GIF oder JPG?
		$endung = ($dateityp[2] == 1 ? "gif" : "jpg");
		$img_id = time();
		$neuname = $img_id . ".$endung";
		$bildbreite = $dateityp[0];
		if ($bildbreite <= $breite) {
			// bild zu breit?
			if (move_uploaded_file($tempname, "../upl_img/" . $neuname)) {
				chmod("../upl_img/" . $neuname, 0666);
				$upload = true;
			} else {
				echo "<h2>Es hat leider nicht geklappt!</h2>
                    <p>Upload war leider nicht erfolgreich!</p>";
			}
		} else {
			echo "<h2>Bitte beachte:</h2>
                <p>Die Datei ist breiter als <b>$breite Pixel</b> und
                damit zu breit!</p><form><input type='button' value='Zur�ck'
                onclick='javascript:history.back()'></form>";
		}
	} else {
		echo "<h2>Bitte beachte:</h2>
            <p>Es handelt sich <b>nicht</b> um eine g�ltige GIF-
            oder JPG-Datei!</p><form><input type='button' value='Zur�ck'
            onclick='javascript:history.back()'></form>";
	}
}
if ($upload) {

	// erstellt das größere Image
	$img_thumb = "thumb_" . $neuname;
	resizeImage("../upl_img/" . $neuname, "../upl_img/$img_thumb", 50, $scale_mode = 0);
	// erstellt das kleine Image
	$img_big = "big_" . $neuname;
	resizeImage("../upl_img/" . $neuname, "../upl_img/$img_big", 400, $scale_mode = 0);
	unlink("../upl_img/$neuname");

	$img_data = "$img_id;$endung";
	$sql = "UPDATE `$dbname`.`$user_id $current_vocs` SET `Img_id` = '$img_data' WHERE `$user_id $current_vocs`.`Id` = $row_id;";
	simplequery($sql);

	echo "<img src='../upl_img/$img_thumb'>";
	echo "<img src='../img/drop.png' onClick='remove_img($div_id,$row_id,\"$img_id\",\"edit\",\"$endung\")'>";

}

// Skript zum hochladen einer datei, wird ausgelöst, wenn das Formular abgeschickt wird
// für eine neue Vokabel
$upload = false;
if (isset($_FILES['new_img']) && $_FILES['new_img']['size'] > 0) {

	$file = $_FILES['new_img'];
	$row_id = $_POST['hidden_img_id'];
	$div_id = $_POST['hidden_div_id'];
	// löschen des alten Bildes
	$old_img_id = $_POST['old_img_id'];
	$old_img_suffix = $_POST['old_img_suffix'];
	if ($old_img_id != "NULL") {
		$check = unlink("../upl_img/thumb_$old_img_id.$old_img_suffix");
		$check1 = unlink("../upl_img/big_$old_img_id.$old_img_suffix");
	}

	$tempname = $file['tmp_name'];
	$dateiname = $file['new_img']['name'];
	$dateigroesse = $file['new_img']['size'];
	$dateityp = GetImageSize($tempname);
	//liest die breite und höhe der Bilder aus und speichert sie in einem Array, [0] ist die Breite und [1] die höhe, an 3 Stelle würden alle daten ausgegeben werden
	$img_width = $dateityp[0];
	$img_height = $dateityp[1];
	if ($dateityp[2] == 1 || $dateityp[2] == 2) {
		// GIF oder JPG?
		$endung = ($dateityp[2] == 1 ? "gif" : "jpg");
		$img_id = time();
		$neuname = $img_id . ".$endung";
		$bildbreite = $dateityp[0];
		if ($bildbreite <= $breite) {
			// bild zu breit?
			if (move_uploaded_file($tempname, "../upl_img/" . $neuname)) {
				chmod("../upl_img/" . $neuname, 0666);
				$upload = true;
			} else {
				echo "<h2>Es hat leider nicht geklappt!</h2>
                    <p>Upload war leider nicht erfolgreich!</p>";
			}
		} else {
			echo "<h2>Bitte beachte:</h2>
                <p>Die Datei ist breiter als <b>$breite Pixel</b> und
                damit zu breit!</p><form><input type='button' value='Zur�ck'
                onclick='javascript:history.back()'></form>";
		}
	} else {
		echo "<h2>Bitte beachte:</h2>
            <p>Es handelt sich <b>nicht</b> um eine g�ltige GIF-
            oder JPG-Datei!</p><form><input type='button' value='Zur�ck'
            onclick='javascript:history.back()'></form>";
	}
}
if ($upload) {

	// erstellt das größere Image
	$img_thumb = "thumb_" . $neuname;
	resizeImage("../upl_img/" . $neuname, "../upl_img/$img_thumb", 50, $scale_mode = 0);
	// erstellt das kleine Image
	$img_big = "big_" . $neuname;
	resizeImage("../upl_img/" . $neuname, "../upl_img/$img_big", 400, $scale_mode = 0);
	unlink("../upl_img/$neuname");

	echo "<img src='../upl_img/$img_thumb'>";
	echo "<img src='../img/drop.png' onClick='remove_img($div_id,$row_id,\"$img_id\",\"new\",\"$endung\")'>";
	echo "<input type ='text' value='$img_id' id='h_img_id$div_id'>";
	echo "<input type ='text' value='$endung' id='h_img_suffix$div_id'>";

}

/*
$size = 0.5;

// index
$prozentindex = $size/8;
// detail
$prozentdetailbig = $size/4;
$prozentdetailsmall = $size/16;
// warenkorb
$prozentwk = $size/30;


// rechnungen
$windex = $groesse[0]*$prozentindex;
$hwindex = $groesse[1]*$prozentindex;
$wdetailbig = $groesse[0]*$prozentdetailbig;
$hdetailbig = $groesse[1]*$prozentdetailbig;
$wdetailsmall = $groesse[0]*$prozentdetailsmall;
$hdetailsmall = $groesse[1]*$prozentdetailsmall;
$hwk = $groesse[0]*$prozentwk;
$hwk = $groesse[1]*$prozentwk;

// formatierung der Imagegröße
$groesse = @GetImageSize("img/" . $row['Bild1']);
$moin = "<img src='img/$row[Bild1]'width='$windex' height='$hindex'
alt='$row[Name]'>";

 */

if (isset($_GET['edit_remove_img'])) {

	$array = $_GET['edit_remove_img'];
	$array = json_decode(stripslashes($array));
	$pool_id = $array[0];
	$img_id = $array[1];
	$img_suffix = $array[2];
	$sql = "UPDATE `$dbname`.`$user_id $current_vocs` SET `Img_id` = NULL WHERE `$user_id $current_vocs`.`Id` =$pool_id;";
	simplequery($sql);
	$check = unlink("../upl_img/thumb_$img_id.$img_suffix");
	$check1 = unlink("../upl_img/big_$img_id.$img_suffix");
	if ($check == 1 && $check1 == 1) {
		echo "Das Bild wurde erfolgreich entfernt";
	}
}

if (isset($_GET['new_remove_img'])) {

	$array = $_GET['new_remove_img'];
	$array = json_decode(stripslashes($array));
	$pool_id = $array[0];
	$img_id = $array[1];
	$img_suffix = $array[2];
	$check = unlink("../upl_img/thumb_$img_id.$img_suffix");
	$check1 = unlink("../upl_img/big_$img_id.$img_suffix");
	if ($check == 1 && $check1 == 1) {
		echo "Das Bild wurde erfolgreich entfernt";
	}

}

// löscht das Image wenn eine neue Vokabel gelöscht wird
if (isset($_GET['delete_img_file'])) {
	$array = $_GET['delete_img_file'];
	$array = json_decode(stripslashes($array));
	$img_id = $array[0];
	$img_suffix = $array[1];
	$check = unlink("../upl_img/thumb_$img_id.$img_suffix");
	$check1 = unlink("../upl_img/big_$img_id.$img_suffix");
	if ($check == 1 && $check1 == 1) {
		echo "Das Bild wurde erfolgreich entfernt";
	}
}

/* our multidimentional php array to pass back to javascript via ajax */
if (isset($_GET['read_pool'])) {
	$obj = $_GET['read_pool'];
	$obj = json_decode(stripslashes($obj));
	$dbname = $obj->dbname;
	$tablename = $obj->voc_table;
	$pool_id = $obj->pool_id;
	// $page ist menge der Vokabeln die angezeigt werden soll, für die Navigation
	// page ist standardmäßig auf 1 gesetzt
	$sql = "SELECT `id`,`question`,`answer`,`multi_choice`,`img_id` from `$dbname` . `$tablename` WHERE `$tablename` . `pool_id` = $pool_id;";
	//$sql= "SELECT `id`,`question`,`answer`,`multi_choice`,`img_id` from `$dbname` . `$table_name` WHERE `$table_name` . `pool_id` = $pool_id ORDER BY `$table_name` . `id`  LIMIT $start,$display_voc_max;";
	$voc_array_3d = create_3dArray_of_dbselection($sql);
	echo json_encode($voc_array_3d);}

//-------------------------------Anfang Baumstruktur ----------------------------------------------------->

function display_node($sql, $lft, $rgt, $lvl) {
	$result = simplequery($sql);
	$display = "<table border = '0'>";
	while ($row = mysql_fetch_assoc($result)) {

		$display .= "<tr>";
		$display .= "    <td><input type='button' value='$row[name]' style='width:100' ";
		$display .= "            onClick = 'display_node($row[lft],$row[rgt],$row[lvl],\"ajax_main_0\")'";
		$display .= "    </td>";
		$display .= "    <td><input type = 'button' value ='del' onClick = 'del_node($row[lft],$row[rgt],$row[lvl]);' ></td>";
		//$display .="    <td>$row[rgt]</td>";
		$display .= "</tr>";

	}
	$display .= "<tr>";
	$display .= "    <td><br></td>";
	$display .= "</tr>";

	$display .= "</table><br><br>";

	echo "<script language='javascript' type='text/javascript'>
           b_lft = $lft;
           b_rgt = $rgt;
           b_lvl = $lvl;
        </script>";

	echo $display;
}

// name des Ordners in dem die Struktur gespeichert ist
// Bezeichnung der Spalte in der die Beschreibung der Liste/Ordner steht
$description_row = "`Description`";

// zeigt einen node
if (isset($_GET['display_node'])) {
	$array = receive_send_arr($_GET['display_node']);
	$lft = $array[0];
	$rgt = $array[1];
	$lvl = $array[2];
	$sql = "SELECT name,lft,rgt,lvl FROM $folder_structure WHERE `lft` BETWEEN $lft AND $rgt AND `lvl` = $lvl +1;";
	display_node($sql, $lft, $rgt, $lvl);

	echo "<script language='javascript' type='text/javascript'>
           b_lft = $lft;
           b_rgt = $rgt;
           b_lvl = $lvl;
        </script>";
}

// neuen node erstellen
if (isset($_GET['create_folder'])) {
	$array = receive_send_arr($_GET['create_folder']);
	$description = $array[0];
	$lft = $array[1];
	$rgt = $array[2];
	$lvl = $array[3];
	$type = $array[4];
	$sql = "UPDATE `$dbname`.$folder_structure SET $folder_structure.`rgt` = `rgt` + 2 WHERE `rgt` >= $rgt;";
	$sql .= "UPDATE `$dbname`.$folder_structure SET $folder_structure.`lft` = `lft` + 2 WHERE `lft` > $rgt;";
	$sql .= "INSERT INTO `$dbname`.$folder_structure ($description_row,`lft`,`rgt`,`lvl`,`type`) VALUES ('$description',$rgt,$rgt+1,$lvl+1,$type);";
	multiquery($db, $sql);

}

if (isset($_GET['new_directory'])) {

	$obj = $_GET['new_directory'];
	$obj = json_decode(stripslashes($obj));
	$dbname = $obj->dbname;
	$navigation = $obj->navigation;
	$register = $obj->nav_register;
	$nav_type = $obj->nav_type;
	$obj = $obj->carry;
	$description = $obj->description;
	$lft = $obj->lft;
	$rgt = $obj->rgt;
	$lvl = $obj->lvl;
	$type = $obj->type;
	// für die mysql Operation wird aber der ursprüngliche rgt Wert benötigt, deswegen
	// rgt-1, beim schreiben in die Datenbank sieht das dann anders aus
	$sql = "INSERT INTO `$dbname`.`$register` (
            `description` ,
            `nav_type` ,
            `type` ,
            `nvocs` ,
            `creation_date`
            )
            VALUES (
            '$description' , '$type',0, '$nav_type', CURDATE( )
            );";

	simplequery($sql);
	// die id ausgelesen aus dem globalen nav register
	$pool_id = mysql_insert_id();

	$sql = "UPDATE `$dbname`.`$navigation` SET `$navigation`.`rgt` = `rgt` + 2 WHERE `rgt` >= $rgt-1;";
	$sql .= "UPDATE `$dbname`.`$navigation` SET `$navigation`.`lft` = `lft` + 2 WHERE `lft` > $rgt-1;";
	multiquery($db, $sql);

	$sql = "INSERT INTO `$dbname`.`$navigation` (`pool_id`,`ident`,`lft`,`rgt`,`lvl`) VALUES ('$pool_id',$user_id,$lft,$rgt,$lvl);";
	// id ausgelesen aus der spezifischen navigation
	simplequery($sql);
	$id = mysql_insert_id();
	// die pool_id zurück schicken
	$obj = (object) array('pool_id' => $pool_id, 'id' => $id);
	echo json_encode($obj);

}

// node löschen
if (isset($_GET['del_node'])) {
	$obj = $_GET['del_node'];
	$obj = json_decode(stripslashes($obj));
	$dbname = $obj->dbname;
	$tablename = $obj->tablename_nav;
	$description = $obj->description;
	$lft = $obj->lft;
	$rgt = $obj->rgt;
	$lvl = $obj->lvl;
	$type = $obj->type;
	$dbname = $obj->dbname;
	$sql = "DELETE FROM `$dbname`.`$tablename` WHERE `lft` = $lft;";
	$sql .= "UPDATE `$dbname`.`$tablename` SET `lft`=`lft`-1, `rgt`=`rgt`-1 , `lvl`=`lvl`-1 ";
	$sql .= "WHERE `lft` BETWEEN $lft AND $rgt;";
	$sql .= "UPDATE `$dbname`.`$tablename` SET `lft`=`lft`-2 WHERE `lft`>$rgt;";
	$sql .= "UPDATE `$dbname`.`$tablename` SET `rgt`=`rgt`-2 WHERE `rgt`>$rgt;";
	echo $sql;
	multiquery($db, $sql);
}

// ganzen baum löschen
if (isset($_GET['del_tree'])) {
	$obj = $_GET['del_tree'];
	$obj = json_decode(stripslashes($obj));
	$dbname = $obj->dbname;
	$tablename = $obj->tablename_nav;
	$description = $obj->description;
	$lft = $obj->lft;
	$rgt = $obj->rgt;
	$lvl = $obj->lvl;
	$type = $obj->type;
	$dbname = $obj->dbname;
	$sql = "DELETE FROM `$dbname`.`$tablename` WHERE `$tablename`.`lft` BETWEEN $lft AND $rgt;";
	$sql .= "UPDATE `$dbname`.`$tablename` SET `lft`=`lft`-ROUND(($lft-$lft+1)) WHERE `lft`>$rgt;";
	$sql .= "UPDATE `$dbname`.`$tablename` SET `rgt`=`rgt`-ROUND(($rgt-$lft+1)) WHERE `rgt`>$rgt;";
	//echo $sql;
	multiquery($db, $sql);

}

if (isset($_GET['del_list'])) {
	$obj = $_GET['del_list'];
	$obj = json_decode(stripslashes($obj));
	$dbname = $obj->dbname;
	$tablename_vocs = $obj->tablename_vocs;
	$tablename_nav = $obj->tablename_nav;
	$description = $obj->description;
	$lft = $obj->lft;
	$rgt = $obj->rgt;
	$lvl = $obj->lvl;
	$type = $obj->type;
	$dbname = $obj->dbname;
	$pool_id = $obj->id;
	$sql = "DELETE FROM `$dbname`.`$tablename_nav` WHERE `lft`=$lft;";
	$sql .= "UPDATE `$dbname`.`$tablename_nav` SET `lft`=`lft`-2 WHERE `lft`>$rgt;";
	$sql .= "UPDATE `$dbname`.`$tablename_nav` SET `rgt`=`rgt`-2 WHERE `rgt`>$rgt;";

	echo $sql .= "DELETE FROM `$dbname`.`$tablename_vocs` WHERE `$tablename`.`Pool` = $pool_id";
	//echo "<br>$sql<br>";
	multiquery($db, $sql);
}

// baum auf die Anfangswerte zurücksetzen
if (isset($_GET['reset_tree'])) {
	global $db;
	$sql = "TRUNCATE TABLE `$folder_structure`;";
	//$sql.= "INSERT INTO `$dbname`.$folder_structure";
	//$sql .="SELECT `name`,`lft`,`rgt`,`lvl` FROM `$dbname`.`tree_show`;";
	$sql .= "INSERT INTO `$dbname`.`$folder_structure` (`Id`, `Description`, `Start`, `Goal`, `Nvocs`, `lft`, `rgt`, `lvl`, `type`) VALUES (NULL, 'Main', NULL, NULL, '0', '1', '4', '0', '0'), (NULL, 'Startordner', NULL, NULL, '0', '2', '3', '1', '0');";
	echo $sql;
	multiquery($db, $sql);
}

if (isset($_GET['getTdata'])) {

	$obj = $_GET['getTdata'];
	$obj = json_decode(stripslashes($obj));
	$dbname = $obj->dbname;
	$navigation = $obj->navigation;
	$user_id = $obj->user_id;
	$register = $obj->nav_register;

	// die Bezeichnung $description muss gegebenenfalls auch in junctions_tree.inc.js unter get_nav geändert werden
	// ident: hier
	$sql = "SELECT `$navigation`.`id`,`$navigation`.`pool_id`,`description`,`nav_type` , `nvocs`, `lft`, `rgt`, `lvl`, `type`
            FROM `$dbname` . `$navigation`
            LEFT JOIN `$dbname`.`$register` ON `$navigation`.`pool_id` = `$register`.`id` ";
	$sql .= "WHERE `$navigation`.`ident` = $user_id";

	$array = create_2dArray_of_table($sql);
	echo json_encode($array);

}

if (isset($_GET['rename_dir'])) {
	$obj = $_GET['rename_dir'];
	$obj = json_decode(stripslashes($obj));
	$dbname = $obj->dbname;
	$description = $obj->description;
	$tablename_nav = $obj->tablename_nav;
	$dbname = $obj->dbname;
	$pool_id = $obj->id;

	echo $sql = "UPDATE `$dbname`.`$tablename_nav` SET `Description` = '$description' WHERE `$tablename_nav`.`Id` = $pool_id;";

	//echo "<br>$sql<br>";
	simplequery($sql);
}

// aktualisiert den Baum, nachdem eine verschiebeoperation durchgeführt wurde, es ist darauf ausgelegt, dass jedes Baumobjekt einne eigenen
// sql bekommt, dies kann klüger gelöst werden;
if (isset($_GET['update_tree'])) {
	$obj = $_GET['update_tree'];
	$obj = json_decode(stripslashes($obj));
	$dbname = $obj->dbname;
	$tablename_vocs = $obj->tablename_vocs;
	$tablename_nav = $obj->tablename_nav;
	$description = $obj->description;
	$lft = $obj->lft;
	$rgt = $obj->rgt;
	$lvl = $obj->lvl;
	$type = $obj->type;
	$dbname = $obj->dbname;
	$pool_id = $obj->id;

	$sql = "UPDATE `$dbname`.`$tablename_nav` SET ";

	$sql .= "`lft` = '$lft',";
	$sql .= "`rgt` = '$rgt',";
	$sql .= "`lvl` = '$lvl'";

	echo $sql .= "WHERE `$tablename_nav`.`Id` =$pool_id;";

	simplequery($sql);

}

//-------------------------------Ende Baumstruktur ----------------------------------------------------->

$db_info_voc = new DbInfo_voc_usr();

//$db_info = new DbInfo_nav_group();

if (isset($_GET['getVocs'])) {

	//sleep(3);
	$pool_id = $_GET['getVocs'];
	$db_info_voc->getVocs($_GET['getVocs']);

}

if (isset($_GET['newVoc'])) {

	//sleep(3);
	$pool_id = $_GET['newVoc'];
	$db_info_voc->newVoc($_GET['newVoc']);

}

if (isset($_GET['delVoc'])) {
	$db_info_voc->delVoc($_GET['delVoc']);
}

// Vokabel aus Current Vocs bearbeiten
if (isset($_GET['updQuestion'])) {

	$voc_info = $_GET['updQuestion'];
	$db_info_voc->updQuestion($voc_info);

}

// Vokabel aus Current Vocs bearbeiten
if (isset($_GET['updAnswer'])) {

	$voc_info = $_GET['updAnswer'];
	$db_info_voc->updAnswer($voc_info);

}

if (isset($_GET['chargeTrainer'])) {

	$db_info_voc->chargeTrainer($_GET['chargeTrainer']);

}

if (isset($_GET['updateTrainer'])) {

	$db_info_voc->updateTrainer($_GET['updateTrainer']);

}

if (isset($_GET['refreshTest_Unit_List'])) {

	$db_info_voc->refreshTest_Unit_List();

}

?>