<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
		<title>Login</title>
	</head>
	<body>
<h1>Login</h1>

<?php
$bn = $_POST['benutzername'];
$pw = $_POST['passwort'];

$dp = mysql_connect("localhost", "root", "");
mysql_select_db("sql_profi", $dp);
$sql = "SELECT * FROM kunden";
$result = mysql_query($sql); 
while ($row = mysql_fetch_assoc($result)) { 
    if ($row[benutzername] == $bn) {                
          if ($row[passwort] == $pw) {      }
}
mysql_close($dp);
?>

<form action="{$_SERVER['PHP_SELF']}" method="post">
Benutzername: <input type="text" name="benutzername"><br>
Password:<input type="passwort" name="pw">
</form>
	</body>
</html>

