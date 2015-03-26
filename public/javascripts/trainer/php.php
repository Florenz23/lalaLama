<?php

include("../../IncGlobal/admin.inc.php");
include("$pfad/IncGlobal/include.inc.php");


?>

<?php

function update_current_vocs($database_name,$tablename,$object){

                    $sql = "UPDATE  `$database_name`.`vocs_usr` SET
                                            `Right` =  '".$object -> right."',
                                            `Wrong` =  '".$object -> wrong."',
                                            `Rating` =  '".$object -> rating."'
                                            WHERE  `usr_vocs`.`Id` = ".$object -> id[0].";";
                    echo "<br>$sql<br>";



                    simplequery($sql);
    }//---- Annaheme des JS Objektes

// dieser Teil wird refresht sobald 'sendtophp' gesetzt wurde




//--- Datenbank current Vocs auslesen

if (isset ($_GET['load_vocs'])){

    $pool_id = $_GET['load_vocs'];
    


    // liest Datenbank als 3D Array aus und schickt Kommagetrennten String an Javascript über die Textarea
    $array = calculate_importance($dbname,"$user_id $current_vocs","$user_id $users_pools",$pool_id);
    // sortiert den Array nach der Max importance absteigend
    
    array_sort_by_column($array, 'Importance', $dir = SORT_DESC);
    $i = 0;
    $send_array = array();
    $check = false;
    if ($load_voc_max > count($array)){
        $load_voc_max = count($array);
    }
    for ($i = 0; $i < $load_voc_max ; $i++){
        
       if (max($array[$i]['Importance']) >= 0 ){
            $send_array[] = json_encode($array[$i]);
            $check = true;

        }
        
    }


    #foreach ($array as $value){
    #    $i++;

        //echo "Importance: " . $value['Importance'][0];
        //echo "<br>";
    #    if (max($value['Importance']) >= 0 ){
    #        $send_array[] = json_encode($value);
    #        $check = true;
           
    #    }
                    // --- >
                    // wenn max importance negativ ist, dann sollen die Daten nicht übertragen werden,
    #}
    echo "<br><br><br>Importance:".$array[0]['Importance'][0];
    $send_array = implode(";", $send_array);
    //echo "Send Array: " . $send_array;
    if ($check == false){
        $send_array = "NULL";
    }

    echo "<br>
    <form id='hiddenform'>
    <textarea rows='10' cols='40' name='json_communication' id='json_communication'>$send_array</textarea>
    </form><br>";

    echo "
    <script language ='JacaScript' type='text/javascript'>
    check();
    </script>";


}

// Ende Datenbank Current-Vocs auslesen

function rating_algorithm($correct, $rating){


    $new_rating = $rating; //default: no change of rating

    if ($correct==1){
        $new_rating = $rating+1;
    }

    if ($correct==0){

        if ($rating > -1){
            $new_rating = -0.1*$rating - 1.1;
        }


    }

    return $new_rating;
}

//--- Rückgabe des JS Objekts nach dem ersten Lernvorgang

if (isset ($_GET['update_voc'])){

    //echo "get:".$_GET['update_voc'];
    // bringt den js array in das normale php format
    echo "<br><br>";
    $object= json_decode(stripslashes($_GET['update_voc']));
    echo "<br><br>";
    //print_r($object);


// dies muss entfernt werden

    #$sim = '{"Id":["2"],"Question":["sie"],"Answer":["she","ella","elle"],"Right":"3;2;4","Wrong":"5;2;1","Rating":["2.456","1","1"],"Last_access":["2012-04-11 18:45:18"],"Correct":[1,1,1]}';

    #$object= json_decode($sim);
    #print_r($object);


    


    // Anwendung des Ratings


    echo count ($object -> answer);
    print_r($object);
    echo "<br>".time()."<br>Ausgabe:";
            # Der Ratingalgorithmus wird für jede Antwortmöglichkeit angewendet
    for ($i = 0; $i < count ($object -> answer) ; $i ++){
            $rating = rating_algorithm($object -> ok[$i],$object -> rating[$i]);
            # macht aus den einzelnen Ratings einen Array
            $ratingarr[] = $rating;
    }

    // Speichern der Daten

    # fast die verschiedenen Ratings,rights und wrongs, die im Array stehen in einem Klasseneintrag zusammen, damit sie in der Datenbank gespeichert werden können
    //echo "Objekt:" . $object -> right;
    $object -> right = implode(";",$object -> right);
    $object -> wrong = implode(";",$object -> wrong);
    $object -> rating = implode(";",$ratingarr);



    




            update_current_vocs($dbname,"$user_id $current_vocs",$object);
            # gibt in Tabellenform aus, was man per sql Befehl abfragt,
            display_dbselection_as_table("select * from `$dbname`. `$user_id $current_vocs`");
            # display_dbselection_as_table($sqlcommand);





//--- neues Rating an JS senden


    echo "<form id='hiddenform1'>
              <input type ='text' value='".$object -> rating."' id='send_ratings_to_php'><br>
                    <input type ='text' value='".$object -> id[0]."' id='send_last_id_to_php'>";



	// Ende Update JS an PHP


} // Ende isset($_GET) Abfrage


?>