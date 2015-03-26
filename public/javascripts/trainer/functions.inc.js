


//-----------------------------------------------------------------------------------globale Variablen



// setzt die Fade time für fade Animationen
var TimeToFade = 7000.0;
// functions.inc.js,Loader_voc,class_lib.php
var parentFolder = "version3";
var json_data;



//-----------------------------------------------------------------------------------aufgerufene Funktionen





//-----------------------------------------------------------------------------------Cookie


/**
 * zeigt das login-logout-registerfeld an, je nachdem ob man eingeloggt, gast, user etc. ist...
 */


/**
 * sorgt auf der Indexseite für die Registrierungf
 */
function main_register() {

    var username =  $("#r_username").val();
        var mail =  $("#r_mail").val();
        var pw =  $("#r_pw").val();
        var pw_r =  $("#r_pw1").val();
        if(pw != pw_r){
            return alert("Die Passwörter stimmen nicht überein");
        }
        var send_arr = {username:username,mail:mail,pw:pw};
        var obj_json = JSON.stringify(send_arr);
        if(!getJson("index.inc.php","check_pw","register",obj_json)){

            return $("#update_status").html("Die Registrierung ist fehlgeschlagen");

        }

        if(json_data.error == "1062"){
            alert("Deinen gewählten Benutzernamen gibt es leider schon...")
        }

        if(!json_data.successful){

            return $("#update_status").html("Die Registrierung ist fehlgeschlagen");

        }

        // Usercookie erstellen
        return $("#welcome").html("Herzlich Willommen! Du kannst dich jetzt einloggen");


}




$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(!results){return false};
    return results[1] || 0;
}

/**
 * überprüft ob in der url ein Parameter gesetzt ist
 */
function checkUrl(parameter_name) {

    if ($.urlParam(parameter_name)){
        return true;
    }

    return false;

}






/**
 * überprüft ob es sich bei dem User um einen bereits registrierten User handelt
 */
function isXoon_member() {

    if(readCookie("user") != "guest" && readCookie("user")){
        return true
    }

    return false;

}

/**
 * überprüft ob es sich um einen User oder Gast handelt
 */
function checkUser() {

    if (isGuest()){
        return "guest";
    }

    if (isXoon_member()){
        return "user";
    }

    return false;

}

 /**
 * überprüft, ob sich der user schon im inneren der Page befindet
 * also nicht mehr im index oder auf der loginseite
 */
function isMain() {
    
    var sPath = window.location.pathname;
        var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
        if (
            (sPage != "index.php") &&
            (sPage != "") &&
            (sPage != "login.php")
           ){

            return true;
        }
    return true;
    
    }

/**
 * leitet den Nutzer zu einer bstimmten Seite weiter
 */


/**
 * liest den value eines url parameters aus
 * bei Erfolg den Parameter, sonst false
 */
function getUrl_val(parameter) {

    return $.urlParam(parameter);

}

 // ermittelt den Namen der Seite auf der man sich befindet
        
function getPath(){

    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    return sPage;

}

// überprüft ob cookie gesetzt wurde und leitet einen zum login weiter wenn nicht
function check_cookie_group(){
    if (!(document.cookie.indexOf("user") >= 0)) {
        // ermittelt den Namen der Seite auf der man sich befindet
        var sPath = window.location.pathname;
        var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
        if (
            //(sPage != "index.php") &&
            //(sPage != "") &&
            //(sPage != "login.php")
            (sPage == "groups.php")
           ){

             $("#welcome").html("Sei Willkommen als Gast dieser Gruppe");

        }
    }
    if (readCookie("user") == "guest"){
        
        return $("#welcome").html("<b>Sei Willkommen als Gast dieser Gruppe<b><br>");

    }

    return true;

}

/**
 * überprüft ob es sich user oder gast Handelt und ober eingeloggt ist oder nicht
 */
function checkStatus() {

    // ist der Cookie gesetzt
    if(issetCookie("user")){
        // handelt es sich nicht um einen Gast
        if(!isGuest()){return true;}
        // es handelt sich um einen Gast
        return alert("Möchtest du deinen eigenen Pools lernen musst du dich anmelden/registrieren");
        //return goTo("../index.php");
    }
    // es ist kein Cookie gesetzt
    return goTo("../index.php");

}

/**
 * überprüft ob es sich bei dem besucher der gruppe um einen user oder gast handelt und ober eingeloggt ist oder nicht
 */
function checkStatus_group() {

    var group_id = getUrl_val('group');
    // ist der Cookie gesetzt
    // user oder gast mit cookie
    if(issetCookie("user")){
        // handelt es sich nicht um einen Gast
        // user
        if(!isGuest()) {
            
            // in der url ist keine gruppe definiert
            // user ohne url_param
            if(!group_id){
                loader_group.getGroups();
                return loader_group.dispTdata(2);

            }
            // user mit url_param
            var user_id = readCookie('user');
            var rights = loader_group.getRights(user_id, group_id)
            return LoadGroupByUrl(rights);
            
        }
        
    }

    // Gast aber Url Group-Parameter
    if (!group_id){
        return goTo("../index.php");
    }
    // es ist kein Cookie gesetzt


    // name, value, days to expire
    createCookie("user","guest",1)
    //loader_group.recent_group.setRights(0);
    // da es sich um Gast handelt werden die rechte auf null gesetzt
    return LoadGroupByUrl(0);

}

/**
 * Funktion die die Groups seite entweder für den user oder einen Gast lädt
 */
function LoadGroupByUrl(rights) {
        var group_id = $.urlParam('group');
        // falls in der url keine group_id steht
        // gast ohne url_param
        if(!group_id){
            return false;
        }

        return loader_group.enterGroup(group_id);

}

//-----------------------------------------------------------------------------------Login/logout

/**
 * loggt den user aus
 * die gleiche funktion gibt es in der Trainer js..
 */
function log_out() {

   createCookie("user","empty",-1);
   self.location="/Xoon/Trainer/"+parentFolder;
   set_login();

}

/**
 * loggt den user ein
 * ajax_php file wird benötigt, da im loginbereich noch kein loader gesetzt ist
 */
function log_in(ajax_php_file) {
    var user_name = document.getElementById("username").value;
    send(""+ajax_php_file+"","echo_ajax","login",user_name);
    //var password_correct = document.getElementById("hidden_pw").value;
}

/**
 * liest den namen der aktuellen seite aus, z.B pools.php
 */




/**
 * setzt einen Cookie
 */
function set_cookie(user_id) {
     $.cookie('user', user_id, {expires: 100, path: '/'});

}

//-----------------------------------------------------------------------------------Globale Funktionen

/**
*
* destination,divid,get_name,delivery_input
*/
function send(destination,divid,get_name,delivery_input,callback){

    var sendstr;
        // prüft ob es sich um einen Array handelt der decodiert werden muss...
	if (delivery_input instanceof Array) {
		//alert('value is Array!');
		// aus dem Array wird ein String gemacht, damit php damit etwas anfangen kann
		sendstr = JSON.stringify(delivery_input);


	} else {
		//alert('Not an array');
		sendstr = delivery_input;
	}

        ///alert(sendstr);

	// falls der array leer sein sollte...
	if (sendstr=="")
	  {
	  // gibt an, was im zu refreshenden div steht, wenn der string leer ist bzw. nichts ausgewählt ist
	  document.getElementById(divid).innerHTML="Es wurde kein Array zum verschicken an php definiert";
	  return;
	  }

	// macht ajax für alle Browser kompatibel
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.onreadystatechange=function()
	  {

	// überprüfen ob Rückmeldung von der angesprochenen Seite erhalten wird (4), bei 200 wird die Seite gefunden
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
            // die Antwort des Servers
	    // responseText gibt den Antworttext als String aus
		document.getElementById(divid).innerHTML=xmlhttp.responseText;
                var resultsuser = xmlhttp.responseText;

                // evaluate javascript
		scriptTag='(<script.*?>)((\n|\r|.)*?)(<\/script>)';
		if (scripts=resultsuser.match(scriptTag)) {
                        //alert(scripts);
			// remove slashes
		 	scripts[2]=scripts[2].replace(/\\/g,"");
		 	//run scripts
		 	eval(scripts[2]);
		}
                var check = true;
                callback(check);
                document.getElementById('update_status').innerHTML = 'Complete';

	    } else {
                // solange der Server noch arbeitet
                document.getElementById('update_status').innerHTML = 'Please wait...';

            }
	  }

	// xmlhttp.open("GET/POST","URL der Seite die Anfrage erhält"+str,true(asynchronous) synchrounous(false) wird kaum benutzt);
	// das Gesamte php-Dokument wird in den Div-Container gepackt....
	xmlhttp.open("GET",destination+"?"+get_name+"="+sendstr+"&ajax=true",true);
	// übermittelt den wert der variable q welcher im formular durch this.value festgelegt wird... dies passiert per get
	xmlhttp.send();

}


/**
*
* animation während javascript auf den Server wartet
*/
function useHttpResponse() {
   if (http.readyState == 4) {
    if(http.status == 200) {
       //var timeValue = http.responseXML.getElementsByTagName("timenow")[0];
       //document.getElementById('showtime').innerHTML = timeValue.childNodes[0].nodeValue;
       document.getElementById('showtime').innerHTML = "<b>Update Complete</b>";
    }
  } else {
  document.getElementById('showtime').innerHTML = 'Please wait...';
  }
}

/**
 * einfache get_json funktion mit der javascript von php json_encode annehmen kann
 */
function getJson_alt(ajax_php_file,div,get_name,get_value) {


        $.ajax({
          url: ajax_php_file+'?'+get_name+'='+get_value+'&ajax=true',
          async: false,
          dataType: 'json',
          success: function (data) {
            if (data != null) {
               //alert(data);
               json_data = data;
               return json_data;
            } else {return false;}
          }
        });


}



/**
 * manipuliert ein Objekt so, dass es von Php übernommen werden kann
 */
function jsObj2phpObj(object){

    var json = "{";
    for(property in object) {
        var value = object[property];
        //alert(typeof(value));
        if(typeof(value) != "function" && typeof(value) != "object"){
            if(typeof(value) == "string" || typeof(value) == "number" ){
            json += '"'+property+'":"'+value+'",'
            } else  {
                // if its an associative array
                if(!value[0]) {
                    json += '"'+property+'":'+jsObj2phpObj(value)+',';
                } else {
                   json += '"'+property+'":[';
                   for(prop in value) json += '"'+value[prop]+'",';
                   json = json.substr(0,json.length-1) + "],";
                }
            }
        }
        
    }
    return json.substr(0,json.length-1) + "}";

}

//---------------------------------------manipulation Vokabelliste-------------------------------------------->



/**
 * zeigt das Menü zum adden/bearbeiten eines img
 * type unterscheidet zwischen edit_voc und new_voc
 */
function display_img_form(i,row_id,img,type) {

    var img_id,img_check;
    if (type == "edit"){
        img = pool_vocs_ll.at(i).data.img;
    }
    if (type == "new"){
        img = added_vocs_ll.at(i).data.img;
    }
    //alert(JSON.stringify(img));
    if(img != "NULL" && img != "undefined"){
        img_id = img.id
        img_check = true;
    } else {
        img_id = "NULL";
    }
    var display = "";
    display += "                       <form onsubmit='upload_image(this,"+i+",\""+type+"\"); return false;check();'>";
    display += "                         <table>";
    display += "                          <tr>";
    display += "                               <td>";
                                                   // übermittelt die id der Vokabel, dessen img bearbeitet wird
    display += "                                    <input type='hidden' value='"+row_id+"'name ='hidden_img_id' >";
    // hiddenfields benötigt zum löschen der alten images bei einem update
                                                     // übermittelt die div_id damit remove_img in pools.inc.php richtig ausgeführt werden kann
    display += "                                    <input type='hidden' value='"+i+"'name ='hidden_div_id'>";
    display += "                                    <div id= 'div_img_id"+i+"'>";
                                                    // übermittelt den img_id des alten Bildes, damit dieses gelöscht werden kann
    display += "                                        <input type='text' value='"+img_id+"'name ='old_img_id' id='"+type+"old_img_id"+i+"'>";
                                                    // übermittelt das suffix des alten Bildes, damit dieses gelöscht werden kann
    display += "                                        <input type='text' value='"+img.suffix+"'name ='old_img_suffix'>";

    display += "                                    </div>";
    display += "                                    <input type ='file' name ='"+type+"_img'/>";
    display += "                               </td>";
    display += "                               <td>";
    display += "                                       <input type='submit' value='Hochladen'/>";
    display += "                               </td>";
    display += "                           </tr>"
    display += "                           <tr>"
    display += "                               <td>";
    display += "                                    <div id='div"+i+type+"_img'>";
    if (img_check == true ){
    
    display += "                                         <img src='../upl_img/"+img.thumb+"' height='50 width='50'>";
    display += "                                         <img src='../img/drop.png' onClick='remove_img("+i+","+row_id+",\""+img.id+"\",\""+type+"\",\""+img.suffix+"\")'>";
    // gibt ein hiddenfield mit dem imgnamen aus, damit sie der added_voc_ll algo auslesen kann
        if (type == "new" && img != "NULL"){
            display += "<input type = 'text' value='"+img.id+"' id = 'h_img_id"+i+"'>";
            display += "<input type = 'text' value='"+img.suffix+"' id = 'h_img_suffix"+i+"'>";
        }
    }
    display += "                                    </div>";
    display += "                               </td>";
    display += "                           </tr>";
    display += "                        </table>";
    display += "                       </form>";
    return display;

}

/**
 * Funktion zum hochladen eines Bildes das zu der Vokabel angezeigt wird
 */
function upload_image(theForm,div_nr,type){

           var display = "<label> Uploa-Fortschritt:</label><progress min='0' max='100' value='0'>0% complete</progress>";
           $('#display_progressbar').html(display);

           var formData = new FormData(theForm);
           var xhr2 = new XMLHttpRequest();
           xhr2.open('POST',''+ajax_php_file+'',true);
           xhr2.responseType = 'text';

           var progressBar = document.querySelector('progress');
           progressBar.value = 0;
           progressBar.textContent = progressBar.value // Fallback for unsupported browsers

           document.getElementById('div'+div_nr+type+'_img').innerHTML = "";

           xhr2.upload.onprogress = function(e) {
               if(e.lengthComputable) {
                   progressBar.value = (e.loaded / e.total) * 100;
                   progressBar.textContent = progressBar.value; // Fallback for unsupported browsers
               }
           


           };


           xhr2.onload = function(){
               if(this.status == 200) document.getElementById('div'+div_nr+type+'_img').innerHTML = this.response;
               progressBar.value = 100;
               progressBar.textContent = progressBar.value; // Fallback for unsupported browsers
               $('#display_progressbar').html("");
           };
           xhr2.send(formData);

           if(document.getElementById("new_img_name")){
               
           }
           //alert(moin);
           //var display = "<img src='../upl_img/"+img_name+"' $groesse[3] >";
           //$('#div'+div_nr+'edit_img').html(display);
           //check();
		
           
}

/**
 * Löscht ein hinzugefügtes Bild
 */
function remove_img(i,pool_id,img_id,type,img_suffix) {
    var send_arr = new Array(pool_id,img_id,img_suffix);
    send(""+ajax_php_file+"","echo_ajax",type+"_remove_img",send_arr);
    $('#div'+i+type+'_img').html("");
    document.getElementById(type+"old_img_id"+i).value = "NULL";
}


//--------------------------------------------------------------------> Funktionen die Objekte in Divs schreiben


/**
 *  Lässt das Feld zur eingabe des Lernziels erscheinen
 *  functions.inc.php/ manage_list_menu()
 *  id ist die Zuweisung zum div, dessen inhalt aktualisiert wird
 */
function add_goal_input(i,pool_id){

    var display = "";
    
    display +="        <input type='text' id='goal"+i+"' maxlength='20' size='14' readonly class='goal'";
    display +="        onblur='edit_goal(this,"+pool_id+",\""+user_id+" "+users_pools+"\","+i+")'";
    display +="        onChange='change_color(this,\"hgoal"+i+"\")'>";
    display +="        <img src='../img/cal.gif' onclick=\"javascript:NewCssCal ('goal"+i+"','yyyyMMdd','dropdown',true,'24','','future',"+i+","+pool_id+")\"";
    display +="        style='cursor:pointer'>";
    display +="        <img src='../img/drop.png' onClick='remove_goal_input("+i+","+pool_id+")' alt='[del]'>";

    // hiddenfield für die richtige Zuweisung von i bei der Wiederherstellugn des Add Pool-Buttons.
    

//    display +="        <img src='../img/drop.png' onClick='remove_goal_input($i,$row[Id])' alt='[del]'>";


    /*var display ="<input type='text' id='goal"+id+"' maxlength='26' size='14' class='goal'";
    display +="onBlur='add_goal("+id+","+pool_id+")'>";
    display +=" <img src='../img/cal.gif'";
    display +="onclick=\"javascript:NewCssCal ('goal"+id+"','yyyyMMdd','dropdown',true,'24','','future',"+id+","+pool_id+")\"style='cursor:pointer'/>";
    display +=" <img src='../img/drop.png' onClick='remove_goal_input("+id+","+pool_id+")'>";
    */
    $('#div_goal'+i).html(display);
    NewCssCal ('goal'+i,'yyyyMMdd','dropdown',true,'24','','future',i,pool_id);
   
}

function add_goal(id,pool_id){

    var new_goal = document.getElementById("goal"+id).value;
    var send_arr = new Array(new_goal,pool_id);
    send(""+ajax_php_file+"","ajax_menu_1a","add_goal",send_arr);
    fade('ajax_menu_1a');

}

/**
 * zeigt den Button wieder zum hinzufügen des Goals wenn man im Calendar auf Cancel klickt
 */
function display_div_goal(id,pool_id) {
    winCal.style.visibility = "hidden";
    if (document.getElementById("goal"+id).value ==""){
        var display ="<input type='button' value='Add Goal' class='addgoal' onClick='add_goal_input("+id+","+pool_id+")'>";
        $('#div_goal'+id).html(display);
    }


}




/**
 *  blendet das Lernzieleingabefeld wieder aus
 *  add_goal()
 *  id ist die zuweisung zum div, dessen inhalt aktualisiert wird
 */
function remove_goal_input(id,pool_id){

 var display = "<input type='button' value='Add Goal' class='addgoal' onClick='add_goal_input("+id+","+pool_id+")'>";
 $('#div_goal'+id).html(display);
 remove_goal(pool_id);

}


function remove_goal(pool_id){

    send(""+ajax_php_file+"","ajax_menu_1a","remove_goal",pool_id);
    fade('ajax_menu_1a');

}



// ----------------------------------------------------Anfang Fade Funktion--------->




function fade(eid)
{
  var element = document.getElementById(eid);
  if(element == null)
    return;

  if(element.FadeState == null)
  {
    if(element.style.opacity == null
        || element.style.opacity == ''
        || element.style.opacity == '1')
    {
      element.FadeState = 2;
    }
    else
    {
      element.FadeState = -2;
    }
  }

  if(element.FadeState == 1 || element.FadeState == -1)
  {
    element.FadeState = element.FadeState == 1 ? -1 : 1;
    element.FadeTimeLeft = TimeToFade - element.FadeTimeLeft;
  }
  else
  {
    element.FadeState = element.FadeState == 2 ? -1 : 1;
    element.FadeTimeLeft = TimeToFade;
    setTimeout("animateFade(" + new Date().getTime() + ",'" + eid + "')", 33);
  }
}

function animateFade(lastTick, eid)
{
  var curTick = new Date().getTime();
  var elapsedTicks = curTick - lastTick;

  var element = document.getElementById(eid);

  if(element.FadeTimeLeft <= elapsedTicks)
  {
    element.style.opacity = element.FadeState == 1 ? '1' : '0';
    element.style.filter = 'alpha(opacity = '
        + (element.FadeState == 1 ? '100' : '0') + ')';
    element.FadeState = element.FadeState == 1 ? 2 : -2;
    return;
  }

  element.FadeTimeLeft -= elapsedTicks;
  var newOpVal = element.FadeTimeLeft/TimeToFade;
  if(element.FadeState == 1)
    newOpVal = 1 - newOpVal;

  element.style.opacity = newOpVal;
  element.style.filter = 'alpha(opacity = ' + (newOpVal*100) + ')';

  setTimeout("animateFade(" + curTick + ",'" + eid + "')", 33);
}


// ----------------------------------------------------Ende Fade Funktion--------->

// ----------------------------------------------------Trainer funktionen--------->



/**
 * fügt einen new List Button hinzu
 */
function butPasteDir() {

    var display ="<br><input type = 'button' value = ' paste' onClick = 'paste_dir()' style='width:100; height:50; background-color:green'>";
    return display;

}

/**
 * fügt einen new List Button hinzu
 */
function butCancelMoveDir() {

    var display ="<br><input type = 'button' value = ' cancel' onClick = 'cancel_move_dir()' style='width:100; height:25; background-color:red'>";
    return display;

}

/**
 * zeigt die Navigationshistory
 */
function dispNavHistory() {

    var display_nav = "<table ><tr><td>Navigation:</td>";
        display_nav += "<td>";
        display_nav += "<input type ='button' value='Main'";
        display_nav += " onClick='dispTdata()'>";
        display_nav += "</td></tr></table>";
    $("#folder_history").html(display_nav);

}

/**
 * erstellt die Tabelle mit den divs wo die Navigation drin erscheint
 */
function createNavTable(columns,class_name,row_arr) {

    var table_width = 0;
    var table = "<table border='1'>";
    for (var i = 0; i < row_arr.length; i++){
        table +="<tr>";
        for (var ii = 0; ii <= columns ; ii++){
                  
            table +="   <td width = '"+table_width+"'>";
            table +="       <div id='nav_elem_"+row_arr[i]+"_"+ii+"' class='"+class_name+"_wrap'></div>";
            table +="   </td>";
     
        }
        table +="</tr>";

    }
    table +="</table>";
    return table;


    
}

/**
 * erstellt eine Tabelle um Datenbankhinhalt anzuzeigen
 */
function createDispTable(rows) {

    var table_width = 0;
    var table = "<table border='1'>";
    for (var i = 0; i < tData_ll.length; i++){
        table +="<tr>";
        for (var ii = 0; ii < rows ; ii++){
                  
            table +="   <td width = '"+table_width+"'>";
            table +="       <div id='nav_elem_"+i+"_"+ii+"'></div>";
            table +="   </td>";
     
        }
        table +="</tr>";

    }
    table +="</table>";
    return table;
    
}




/**
 * erstellt die Tabelle in der die Einzelnen Vokabeln angezeigt werden
 */
function createVocTable(rows) {

    var table_width = 300;
    var table = "<table border='1'>";

    // Voceingabe am Anfang der angezeigten Vokabeln
    table +="<tr>";
    table +="   <td width = '"+table_width+"'>";
    table +="       <div id='new_voc_0'></div>";
    table +="   </td>";
    table +="   <td width = '"+table_width+"'>";
    table +="       <div id='new_voc_1'></div>";
    table +="   </td>";
    table +="</tr>";


        

    for (var i = voc_ll.length-1; i >= 0; i--){
        // erstellen der jquery textareas

        table +="<tr>";
        for (var ii = 0; ii <= rows ; ii++){
            table +="   <td width = '"+table_width+"'>";
            table +="       <div id='voc_"+voc_ll.at(i).data.id+"_"+ii+"'></div>";
            table +="   </td>";

        }
        table +="</tr>";

    }

    // Voceinhabe am Ende der Angezeigten Vokabeln
    // wird gebraucht um das neue Div mit den leeren feldern anzulegen
    var last_id = parseInt(voc_ll.at(voc_ll.length-1).data.id);
    // erstellen der extra Zeile für die neuen Vocs
    /*table +="<tr>";
        for (ii = 0; ii <= rows ; ii++){

            table +="   <td width = '"+table_width+"'>";
            table +="       <div id='new_voc_"+ii+"'></div>";
            table +="   </td>";

        }
        table +="</tr>";*/
    menu_voc.setLastId(last_id);
    return table;



}




/**
 * refresht die Ansicht, buttons und check Ansicht
 */
function refresh_nav() {
    if (glob_lft == 0){

        disp_fn();


        } else {

        set_nf_button();
        disp_node(glob_nav_obj);

        }
        // refresht die Ordnernavigation
        //disp_fn();
        // refresht die angezeigten Ordner
        //alert(glob_lft);
        disp_check();

}


/**
 * setzt die globalen navigationswerte
 */
function set_glob_nav(lft,rgt,lvl) {

    glob_lft = lft;
    glob_rgt = rgt;
    glob_lvl = lvl;

}


/**
 * fügt ein Glied zur Foldernavigation hinzu
 */
function add_fold_nav(c_lft) {

    // sucht sich das richtige Objekt aus der Linked List
    for (var i = 0; i < tData_ll.length; i++) {

        if (tData_ll.at(i).data.lft == c_lft){
            var description = tData_ll.at(i).data.description;
            var lft         = tData_ll.at(i).data.lft;
            var rgt         = tData_ll.at(i).data.rgt;
            var lvl         = tData_ll.at(i).data.lvl;

        }
    }
    var new_hist = new Fold_history(description,lft,rgt,lvl);
    history_ll.append(new LinkedList.Node(new_hist));

}


/**
 * stellt die history dar
 */
function disp_history() {
    var json_obj;
    var display = "<table><tr><td>Navigation:</td>";
        display += "<td>";
        display += "<input type ='button' value='Main'";
        display += " onClick='dispTdata()'>";
        display += "</td>";

    for (var i = 0; history_ll.length > i ; i++){
        json_obj = JSON.stringify(history_ll.at(i).data);
        display += "<td>";
        display += "<input type ='button' value='"+history_ll.at(i).data.description+"'";
        display += " onClick='dispNode(";
        //display += history_ll.at(i).data.lft+",";
        //display += history_ll.at(i).data.rgt+",";
        display += json_obj;
        display += ")'>";
        display += "</td>";



   }
   display += "</tr></table>";
   $("#folder_history").html(display);

}


/**
 * aktualisisiert den angezeigten Pfad der History
 */
function refresh_history(o_lft) {

    // leert die history_ll
    history_ll = new LinkedList.Circular();
    var check = false;
    for (var i = 0; i < tData_ll.length; i++){

        // überprüft, ob der lft wert, des nodes, zu dem der Pfad angezeigt werden soll zwischen den
        // lft und rgt werten der einzelnen nodes des baumes liegen
        check = tData_ll.at(i).data.get_path(o_lft);
        if (check == true){

            // schreibt die Werte lft,rgt etc der übersichbarkeit halber in variablen
            var description = tData_ll.at(i).data.description;
            var lft         = tData_ll.at(i).data.lft;
            var rgt         = tData_ll.at(i).data.rgt;
            var lvl         = tData_ll.at(i).data.lvl;

            // ist das Objekt teil des Pfades, wird es zu der history_ll hinzugefügt
            var new_hist = new Fold_history(description,lft,rgt,lvl);
            history_ll.append(new LinkedList.Node(new_hist));

        }

    }

     disp_history();

}


/**
 * liest die Ordnerstruktur für die Vokabelstruktur des users aus und speichert sie in den Objekten
 */
// könnte gelösch werden, bietet abber ein Beispiel, wie man automatisch objektparameter etc ausliest und in eine variable speichert

function get_nav(objectname) {
    //var user_id = 1123;
    var value, param,data;
    tData_ll = new LinkedList.Circular();
    //send("tree.inc.php","ofn_rgt_2","get_nav",user_id);
    get_json_simple("get_nav","empty",ajax_php_file);
    // json data ist global gesetzt, deswegen kann man darauf zugreifen
    //alert(json_data[0].name);
    //var data = json_data[0];
    //alert(data.Id);
    // var param bekommt den ausgelesenen parameterkey
    //var param = Object.keys(json_data[0])[0];
    //alert(Object.keys(json_data[0]).length);
    // varaiabler Objektparameter wird aufgefufen,
    //alert(data[param]);
    //alert(param);
    // eine Variable mit variablem Namen wird erstellt
    //window[param] = data[param];
    //alert(Id);
    
    for (var i = 0; i<json_data.length; i++){


        // konvergiert die Objektparameter zu variablen
        for (var ii = 0; ii < Object.keys(json_data[0]).length ; ii++){

          // die Parameterbezeichnung auslesen auslesen
          param = Object.keys(json_data[i])[ii];
          // die Stelle in der ll Abfragen
          data = json_data[i];
          // den wert Auslesen
          value = data[param];
          // die Variable erstellen
          window[param] = value;


        }

       
        //alert(description);
        var new_directory = new this[objectname](objectname,Id,Description,Nvocs,lft,rgt,lvl,type,Start,Goal);
        tData_ll.append(new LinkedList.Node(new_directory));
        
    }

    // setzt json_data wieder auf Null damit es erneut verwendet werden kann

    json_data = null;


}


/**
 * Bewegt einen Baum an einen anderen Ort
 * lft,rgt,lvl sind die ursprünglichen lft,rgt, lvl werte des partrent dirs des zu verschiebenen astes
 * prnt_id ist die id des neuen parent dirs
 */
function move_directory(lft,rgt,lvl){
    
    // wird benötigt um die höherliegenden rgt werte zu korrigieren.
    var diff_lft_rgt = rgt-lft;
    // Objekt des Parent dir, in das kopiert wird
    var object_refresh;
   // er mitteln der differenz der lvl von alter und neuer ebende

    //var object_parent = get_dir_obj_by_id(prnt_id);
    var diff = calc_div_val(lft,glob_nav_obj.lft);
    // parent_lvl muss + 1 sein, da das objekt ja eine ebene höher liegt als das neue parent dir
    var diff_lvl = lvl - (glob_nav_obj.lvl+1);



    for ( i = 0; i < tData_ll.length; i++){

    object_refresh = tData_ll.at(i).data;
    // gibt dem kopierten Teilbaum die neuen passenden lft und rgt Werte
    object_refresh.refresh_move(diff,diff_lvl,glob_nav_obj.lft,diff_lft_rgt);

    }

}

/**
 * wird ein objekt verschoben kalkuliert die Funktion um wieviel sich die lft,rgt werte verschieben
 */
function calc_div_val(lft,prnt_lft) {
       
        for (var i = 0; i < tData_ll.length; i++){
            if(tData_ll.at(i).data.move == 1){
                    var diff = lft - (prnt_lft+1);
                    return diff;
            }
        }
        return false;
}

/**
 * setzt die globalen move variablen, damit ein fold_obj ausgeschnitten und dann wieder eingefügt werden kann
 */
function cut_dir(obj) {

    // alten Werte des prtn_dirs des zu verschiebenen Astes, diese werden für eine Richtige Anzeige benötig
    mov_lft = obj.lft;
    mov_rgt = obj.rgt;
    mov_lvl = obj.lvl;
    var object;

    for (var i = 0; i < tData_ll.length; i++){

        // Markiert(.move = 1) alle Objekte die kopiert werden sollen, damit sie beim virtuellen entfernen der elemente erhalten bleiben
        // setzt den move parameter auf 1, damit können die lft und rgt werte erhalten bleiben und
        // später dann manipuliert werden, während alle anderen lft und rgt-werte entprechend verändert werden
        object = tData_ll.at(i).data;
        if (object.lft >= obj.lft && object.rgt<= obj.rgt){
            object.move = 1;
        } else {

            // verändert die anderen Objekte so, als ob der Ordner gelöscht werden würde
            object.del_tree(obj.lft,obj.rgt);

        }
    }

    // es wird ermittelt wie viele Elemente ausgeschnitten und somit weniger angezeigt werden
    var diff = get_lft_rgt_diff(obj.lft,obj.rgt);
    diff = mov_rgt - mov_lft +1;
    // der rgt wert wird für eine korrekte Anzeige korrigiert
    glob_nav_obj.add_rgt(-diff);
    // die Differenz wird im globalen objekt gepeichert damit sie global zur verfügung steht
    glob_nav_obj.set_last_diff(diff);
    refresh_nav();
    // speichert die Werte des prnt_dirs als origin_dir
    glob_nav_obj.save_origin();

}

/**
 * errechnet wie viele lft,rgt Elemente ein Baum besitz
 */
function get_lft_rgt_diff(lft,rgt) {

    var diff = rgt-lft+1;
    return diff;

}

/**
 * setzt die mov Werte wieder zurück
 */
function reset_mov() {

    mov_lft = 0;
    mov_rgt = 0;
    mov_lvl = 0;

}

/**
 * fügt das ausgeschnittene Ordnerobjekt an einem anderen Ort wieder ein
 */
function paste_dir() {


    move_directory(mov_lft,mov_rgt,mov_lvl);
    // global mov werte wieder zurücksetzen
    reset_mov();
    //display_check();
    glob_nav_obj.add_rgt(glob_nav_obj.last_diff);
    refresh_fold_obj_db();
    refresh_nav();

}

/**
 * bricht einen Verschiebevorgang ab
 */
function cancel_move_dir() {

    // kopiert den ausgeschnittenen Ordern an seinen ursprünglichen Ort zurück

    var lft = mov_lft;
    var rgt = mov_rgt;
    var lvl = mov_lvl;

    // wird benötigt um die höherliegenden rgt werte zu korrigieren.
    var diff_lft_rgt = rgt-lft;
    // Objekt des Parent dir, in das kopiert wird
    var object_refresh;
   // er mitteln der differenz der lvl von alter und neuer ebende

    //var object_parent = get_dir_obj_by_id(prnt_id);
    var diff = calc_div_val(lft,glob_nav_obj.lft_origin);
    // parent_lvl muss + 1 sein, da das objekt ja eine ebene höher liegt als das neue parent dir
    var diff_lvl = lvl - (glob_nav_obj.lvl_origin+1);



    for ( i = 0; i < tData_ll.length; i++){

        object_refresh = tData_ll.at(i).data;
        // gibt dem kopierten Teilbaum die neuen passenden lft und rgt Werte
        object_refresh.refresh_move(diff,diff_lvl,glob_nav_obj.lft_origin,diff_lft_rgt);

    }

    // setzt die globalen mov_werte, also die ursprünglichen werte des zu verschiebenen baums wieder auf 0 zurück
    reset_mov();
    //korrigiert das Spektrum der anzeige
    glob_nav_obj.add_rgt(glob_nav_obj.last_diff);
    refresh_nav();
    //zurücksetzten der origin werte nachdem der Kopiervorgang abgeschlossen wurde
    glob_nav_obj.save_reset();


}





function updAnswer_obj(obj){

    // falls alle Antwortfelder leer sind, gibt es false als rückgabewert
    var check = false;
    var array = new Array();
    for (var i = 0; i < obj.answer_ll.length; i++ ){

        var a_ll = obj.answer_ll.at(i).data;
        // leere answerfelder werden nicht gespeichert
        if (a_ll.answer != ""){
            check = true;
            array.push(a_ll.answer);
        }

    }
    if (!check){
        return false;
    }

    var answer_obj = {v:array};
    return answer_obj;

}

/**
 * aktualisiert das multi_choice_obj, falls antworten gelöscht/ hinzugefüt wurden, wird es aktualisiert
 */
function updMulti_choice_obj(obj){

    var array = new Array();
    for (var i = 0; i < obj.answer_ll.length; i++ ){

        var a_ll = obj.answer_ll.at(i).data;
        // leere answerfelder werden nicht gespeichert
        if (a_ll.answer != ""){
            array.push(a_ll.multi_choice);
        }

    }

    var multi_choice_obj = {v:array};
    return multi_choice_obj;

}

/**
 * aktualisiert das rating_obj, falls antworten gelöscht/ hinzugefüt wurden, wird es aktualisiert
 */
function updRight_obj(obj){

    var array = new Array();
    for (var i = 0; i < obj.answer_ll.length; i++ ){

        var a_ll = obj.answer_ll.at(i).data;
        // leere answerfelder werden nicht gespeichert
        if (a_ll.answer != ""){
            array.push(a_ll.right);
        }

    }

    var right = {v:array};
    return right;

}

/**
 * aktualisiert das wrong_obj, falls antworten gelöscht/ hinzugefüt wurden, wird es aktualisiert
 */
function updWrong_obj(obj){

    var array = new Array();
    for (var i = 0; i < obj.answer_ll.length; i++ ){

        var a_ll = obj.answer_ll.at(i).data;
        // leere answerfelder werden nicht gespeichert
        if (a_ll.answer != ""){
            array.push(a_ll.wrong);
        }

    }

    var wrong = {v:array};
    return wrong;


}

/**
 * aktualisiert das rating_obj, falls antworten gelöscht/ hinzugefüt wurden, wird es aktualisiert
 */
function updRating_obj(obj){

    var array = new Array();
    for (var i = 0; i < obj.answer_ll.length; i++ ){

        var a_ll = obj.answer_ll.at(i).data;
        // leere answerfelder werden nicht gespeichert
        if (a_ll.answer != ""){
            array.push(a_ll.rating);
        }

    }

    var rating = {v:array};
    return rating;

}







/**
 * gibt den ll node zurück an dem die id mit dem Eingabewert übereinstimmt
 */
function getNode(ll,index) {

    for (var i = 0; i < ll.length ; i++){
        var obj = ll.at(i).data;
        if (obj.getLlNodebyId(index) == true){
            return i;
        }
    }

    return false;

}

function getObjById(ll,index){

    var node = getNode(ll,index);
    var obj = ll.at(node).data;
    return obj;


}

function createAnswer_ll(json_data){

            var answer_obj;
            var answer = json_data.answer.v;
            var multi_choice = json_data.multi_choice.v;
            // abfangen falscher Werte
            if (answer == null || answer == undefined || answer == "" ){answer = "0";}
            if (multi_choice == null || multi_choice == undefined || multi_choice == "" ){multi_choice = "0";}

            // ll erstellen

            var answer_ll = new LinkedList.Circular();

            for (var i = 0; i < answer.length; i++){


                if(multi_choice[i] == undefined){multi_choice[i] = "0"}

                answer_obj = new MultiAnswer(answer[i],multi_choice[i]);
                answer_ll.append(new LinkedList.Node(answer_obj));


            }

            return answer_ll;


}

function createAnswer_ll_usr(json_data){

            var answer_obj;
            var answer = json_data.answer.v;
            var right = json_data.right.v;
            var wrong = json_data.wrong.v;
            var rating = json_data.rating.v;
            var multi_choice = json_data.multi_choice.v;

            // abfangen falscher Werte
            if (answer == null || answer == undefined || answer == "" ){answer = "0";}
            if (right == null || right == undefined || right == "" ){right = "0";}
            if (wrong == null || wrong == undefined || wrong == "" ){wrong = "0";}
            if (rating == null || rating == undefined || rating == "" ){rating = "0";}
            if (multi_choice == null || multi_choice == undefined || multi_choice == "" ){multi_choice = "0";}

            // ll erstellen

            var answer_ll = new LinkedList.Circular();

            for (var i = 0; i < answer.length; i++){

                if(right[i] == undefined){right[i] = 0}
                if(wrong[i] == undefined){wrong[i] = 0}
                if(rating[i] == undefined){rating[i] = 0}
                if(multi_choice[i] == undefined){multi_choice[i] = 0}

                answer_obj = new MultiAnswer_usr(answer[i],multi_choice[i],right[i],wrong[i],rating[i]);
                answer_ll.append(new LinkedList.Node(answer_obj));


            }

            return answer_ll;


}


function showDialog(){

    $( "#echo_ajax" ).dialog({


        width: 600,
        height: 400,
        open: function(event, ui){
            var textarea = $('<textarea style="height: 276px;">');
            $(this).html(textarea);
            $(textarea).redactor({autoresize: false});
            $(textarea).setCode('<p>Moin</p>');
        }
    });
}

function reloadPage(){

    return window.location.href=window.location.href;

}

/**
 * ist ein Ordner ausgewählt, werden alle ids aus dem Navregister der Listen und Ordner,
 * die sich in dem Ordner befinden, einschließlich des ausgewählt Ordners als Array ausgegeben
 */
function getFold_ids(lft,rgt) {

    var obj;
    var id_arr = new Array();
    for (var i = 0; i < tData_ll.length;i++){
        obj = tData_ll.at(i).data;
        if(obj.lft >= lft && obj.rgt <= rgt){
            id_arr.push(obj.id);
        }
    }

    return id_arr;

}

/**
 * aus dem ausgewählten Ordern werden alle Ids der Listen
 * in einen Array geschrieben, damit die Vokabeln kopiert bzw. gelernt werden können
 */
function getFold_lists(lft,rgt) {

    var obj;
    var list_arr = new Array();
    for (var i = 0; i < tData_ll.length;i++){
        obj = tData_ll.at(i).data;
        if(obj.lft >= lft && obj.rgt <= rgt && obj.type == 1){
            list_arr.push(obj.register_id);
        }
    }

    return list_arr;

}

/**
 * ausgeführt in trainer.js load_data
 */
function chargeTrainer(list_arr) {
    // list_arr, ist arr mit den Pool-ids der zu lernenden Listen
    // liest current_vocs aus
    window.location.href = "Trainer/index.php?list_arr="+list_arr;

}

// Position im Textfeld
function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}


/**
 * Entfernt Leerzeichen am Anfang und am Ende eines Strings
 */
function stripSpaces(string) {

        var nstring = string.replace(/^\s+/g, "");
        nstring = nstring.replace(/\s+$/g, "");

        return nstring;

}

/**
 * setzt den value der angeglickten Antwortmöglichkeit im textfeld answer_nr in DispAnswer_admin
 */
function setAnswer_nr(answer_nr) {
    
    $("#answer_nr").val(answer_nr);
    
}

function getAnswer_nr(){
    
    return $("#answer_nr").val();
    
}

/**
 * fokossiert ein html objekt
 */
function focusObj(obj_id) {
    
    $("#"+obj_id).focus();
    
}




