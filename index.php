<?php
require_once ("public/php/test/classSessionHandler.php");
$newURL = "spec/javascripts/fixtures/tree_list_fixture.html";
$session = new classSessionHandler();
    if (isset($_SESSION['login.ok'])) {
    header('Location: '.$newURL);
}
?>
<!DOCTYPE html>
<html>

<head>
    <title>Willkommen bei lalaLama</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script type="text/javascript" src="public/javascripts/libs/jquery.js"></script>
    <script type="text/javascript" src="public/javascripts/ClassAjax.js"></script>
    <script type="text/javascript" src="public/javascripts/ClassTrainerInfo.js"></script>
    <script type="text/javascript" src="public/javascripts/ClassCookie.js"></script>
    <script type="text/javascript" src="public/javascripts/jsTree/TreeStartObject.js"></script>
    <script type="text/javascript" src="public/javascripts/Registration.js"></script>
    <script type="text/javascript" src="public/javascripts/ClassLogin.js"></script>
    <script type="text/javascript" src="public/javascripts/ClassLoginIndex.js"></script>
    <link rel="stylesheet" type="text/css" href="public/css/layout_start/header.css">
    <link rel="stylesheet" type="text/css" href="public/css/layout_start/navigation.css">
    <link rel="stylesheet" type="text/css" href="public/css/layout_start/index.css">
    <link rel='stylesheet' href='http://yui.yahooapis.com/pure/0.5.0/pure-min.css'>
</head>
<!--  addListeners() in Registration.js-->

<body onload="addListeners();">
    <div id="mother">
        <div id="header">
            <div class="header_logo">
                lalaLama
            </div>
            <div id='login_div' class="login_div">
                <br>
                <form name="einloggen" id="einloggen" action="/Xoon/Trainer/Main/pools.php" method="post">
                    <table cellspacing="0" role="presentation">
                        <tbody>
                            <tr>
                                <td class="html7magic">
                                    <label for="email">Benutzername</label>
                                </td>
                                <td class="html7magic">
                                    <label for="pass">Passwort</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input id="username_login" class="inputtext" type="text" tabindex="1" value="" name="email">
                                </td>
                                <td>
                                    <input id="password_login" class="inputtext" type="password" tabindex="2" name="pass">
                                </td>
                                <td>
                                    <input id="login_button" type="button" tabindex="4" value="Anmelden"> </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="login_info"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <!--                 <input id="username" type="text" value="Benutzername">
                <input id="password" type="text" value="Passwort">
 -->
                <!-- <button id="login_button" type="button">Anmelden</button> -->
            </div>
        </div>
        <!-- Ende header -->
        <div id="nav2">
            <ul>
                <li> <span id="high"><a href='index.php'>Home</a> </span></li>
                <li> <a href='spec/javascripts/fixtures/intro.html'>Einführung</a> </li>
                <!--<li> <a href='vocablist.php'>Vocabulary lists </a> </li>-->
            </ul>
        </div>
        <div id="registration" class="registration">
            <div class="registration_headline">
                <h1>Registrieren</h1>
            </div>
            <form class="pure-form pure-g">
                <div class="registration_input_div">
                    <input id="username_registration" name="username" type="text" class="registration_input" value="Benutzername">
                </div>
                <div class="registration_input_div">
                    <input id="email_registration" name="email" type="email" class="registration_input" value="Email (optional)">
                </div>
                <div class="registration_input_div">
                    <input id="password_registration" name="password" type="text" class="registration_input" value="Passwort">
                </div>
                <div class="registration_input_div">
                    <input id="password_registration_repeat" name="password_repeat" type="text" class="registration_input" value="Passwort erneut eingeben">
                </div>
                <div class="registration_button">
                    <input id="submit_registration" name="submit" type="button" value="Registrieren" class="registration_button">
            </form>
            </div>
            <div class="info" id="info_registration">&nbsp;</div>
        </div>
        <div id="description_div" class="description_div">
            <div class="registration_headline">
            </div>
            <div class='img_div'>
                <h2>Lebe Lama!</h2>
                <img src="public/img/cusco.gif" /></div>
            <ul style='list-style-image: url(public/img/lama4.jpg);'>
                <li>Lerne gemeinsam in Gruppen</li>
                <li>Öffentliche Wissensdatenbank</li>
                <li>Sprachführer/Wortschätze</li>
                <li>Automatisches Karteikastensystem</li>
                <li>Multiplechoice z.B. Führerschein</li>
            </ul>
        </div>
        <!-- Ende menu -->
        <!-- Ende main -->
        <!--
      <div id="footer">
        <h1>Impressum | Über uns | Meine Werbung
        </h1>
      </div>
       -->
    </div>
    <!-- Ende mother -->
    <!-- <script type="text/javascript" src="IncGlobal/jquery.js"></script>
<script src="IncGlobal/class_linkedlist.js" language="JavaScript" type="text/javascript"></script>
<script src="Main/functions.inc.js" language="JavaScript" type="text/javascript"></script>
<script src="IncGlobal/classes_inc.js" language="JavaScript" type="text/javascript"></script>
 -->
    <div id="echo_ajax"></div>
</body>

</html>