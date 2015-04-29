<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=iso-8859-1">
  <title>Lamapacos</title>
<link rel="stylesheet" type="text/css" href="layout/struktur.css">
<link rel="stylesheet" type="text/css" href="layout/layout.css">
<link rel="stylesheet" type="text/css" href="layout/formular.css">
</head>
<body>

<div id="mother">
  <div id="header">
    <h1> WG09b (bisher für Firefox optimiert) </h1>
  </div>
 <div id="menu">
    
    
    
    <ul>
<?php
//holt sich die informationen aus dem Navigationsdokument
include ("Navigation/navigation.php");
//dieses Skript befindet sich auf jeder Seite, ort gibt die position an, an der die entsprechende Seite ist 
$iNav=0; $stelle=7;
foreach ($navigation as $key => $value) {
				if ($iNav == $stelle){
				    echo($navigation[$iNav]['seite']);
				    }	
				else {			
				echo($navigation[$iNav]['link']);
				}
				$iNav++;
}
?>       
</ul>


</div>

  
  
  
  <div id="main">
<h1>Download Center</h1>
<h3>Datei hochladen (nur bis 400kb m&ouml;glich)<br>Keine Sonderzeichen!<br> Muss noch ein Skript schreiben damit es funzt...</h3> 
<form action='<?php echo $_SERVER['PHP_SELF'] ?>' method="post" 
enctype="multipart/form-data">
<input type="file" name="datei"><br><br>
Passwort bei Dateien &uuml;ber 400 KB n&ouml;tig:
<input type="password" name="pw" value=""  size="5"> <br><br>
<input type="submit" name='submit' value="Datei hochladen">
</form>
<br>
<?php
$pfad = "dat/"; // Pfad angeben
$passwort= $_POST['pw'];

if (isset($_FILES['datei']) && $_FILES['datei']['size'] > 0) {
    $maxgroesse = 400*1000; // Größe in Byte angeben
    $tempname = $_FILES['datei']['tmp_name'];
    $dateiname = $_FILES['datei']['name'];
    $dateigroesse = $_FILES['datei']['size'];
    $dateityp = GetImageSize($tempname);
    $maxgroesseview = $maxgroesse/1000;
    $kbdat= round($_FILES['datei']['size']/1000);


  if ($passwort == "meister") {
      if (move_uploaded_file($tempname, $pfad . $dateiname)) {
                echo "<p>Datei wurde <b>erfolgreich</b> hochgeladen!<br>
                Dateigröße: <b>$kbdat</b> KB, 
                Dateiname: <b>$dateiname</b><br></p>";
                
            }
            }
      else {   
        if ($dateigroesse <= $maxgroesse) { // Datei zu groß?
             if (move_uploaded_file($tempname, $pfad . $dateiname)) {
                echo "<p>Datei wurde <b>erfolgreich</b> hochgeladen!
                Dateigröße: <b>$kbdat</b> KB 
                Dateiname: <b>$dateiname</b><br></p>";
            } else {
                echo "<p>Upload war leider nicht erfolgreich!</p>";
            } 
        } else {
            echo "<p><b>Datei ist zu gro&szlig!</b>($kbdat KB)<br> Das Limit liegt bei <b>$maxgroesseview KB</b>.<br> Mit dem richtigen Passwort wird das Limit aufgehoben. </p>";
        } 
 
    }
    
    echo "<form action='{$_SERVER['PHP_SELF']}' method='post'>
          <input type='submit' value='OK'></form>";
} 



$verzeichnis = opendir($pfad);
$i = 0;
while($datei = readdir($verzeichnis)) { //Die Datein werden zeile für zeile  in die variable $datei geschrieben
if ($datei != "." && $datei != ".."){
  if (!is_dir($datei)){                 //Verzeichnisse sollen ja nicht dargestellt werden
  $daten[$i] = "$datei";
  $i++;
  }

echo "<a href='$pfad$datei'><ul><li>$datei</li></ul>";
 } 
}
closedir($verzeichnis); // Dateien auslesen Ende
?>

	</div>
  <div id="footer">
<h1>Bisherige Besuche: 
<?php 
$zaehler = "txt/zaehler.txt";
readfile($zaehler); 
?></h1>
  </div>
</div>
</body>
</html>
