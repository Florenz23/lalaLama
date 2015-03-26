<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
  <title>Trainer</title>
<link rel="stylesheet" type="text/css" href="../../../public/css/trainer/struktur.css">
<link rel="stylesheet" type="text/css" href="../../../public/css/trainer/layout.css">
<link rel="stylesheet" type="text/css" href="../../../public/css/trainer/formular.css">
<link rel="stylesheet" type="text/css" href="../../../public/css/trainer/tabellen.css">
<link rel="stylesheet" type="text/css" href="../../../public/css/trainer/trainerdesign.css">
    <title>Trainer</title>
    <script type="text/javascript" src="../../../public/javascripts/libs/jquery.js"></script>
    <script type="text/javascript" src="../../../public/javascripts/trainer/jquery_exist.js"></script>
    <script type="text/javascript" src="../../../public/javascripts/trainer/class_linkedlist.js"></script>
    <script type="text/javascript" src="../../../public/javascripts/trainer/class_voc.js"></script>
    <script type="text/javascript" src="../../../public/javascripts/trainer/getJsonException.js"></script>
    <script type="text/javascript" src="../../../public/javascripts/trainer/myExceptions.js"></script>



</head>

<body>

    <input type="hidden" value="5" id="pool_size">

    <div id="mother">

        <div id="header">
            <ul>
                <!--<li> <a href='/Xoon/Trainer/Main/login.php'>Home</a> </li>-->
                <li> <span id="high"><a href='../pools.php'>My&nbsp;Pools </a> </span> </li>
                </li>'
                <form action='/Xoon/Trainer/version2' method='post'>
                    <input type='button' name='logout' value='logout' class='logout' onClick='log_out();'>
                </form>
            </ul>

        </div>

        <div id="nav2">
            <ul>
                <!--<li> <a href='login.php'>Home</a></li>-->
                <li> <a href='/Xoon/Trainer/intro.php'>Introduction</a> </li>
                <!--<li> <a href='/Xoon/Trainer/vocablist.php'>Vocabulary lists </a> </li>-->
            </ul>

        </div>

        <div id="menu">
            <div id="update_status">moin</div>

            <h1> Trainer </h1>
            <br>

            <div id="question">

            </div>


            <div id="picture">

            </div>

            <br>
            <br>

            <div id="userinput">
                Pedda
            </div>


            <!--<form name="voctest">-->
            <!--<textarea name="question" readonly class="question" style ="border: 0px"></textarea> <br><br> -->
            <!--<textarea name="answer" class="answer" onKeydown="Javascript: if (event.keyCode==13) check();"></textarea><br><br><br>-->
            <br>
            <br>
            <input type="button" value="Check" class="check" onClick="javascript:check();"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div id="acceptdiv" style="float: right">

            </div>
            <br>
            <br>
            <br>
            <!--<textarea name="correct" id="correct" class="correct" readonly style="border: 0"></textarea> <br><br>-->
            <!--</form>-->

            <div id="communication" style="width: 400px;">

            </div>
<?php //<input type="text" size="50" name="correct" style="border: 0px"> // put your code here #onBlur="check()" style="visibility: hidden" // ?>
<div id="updatediv" style="display: none"><b>Hier erscheint der php Teil</b>
            </div>

        </div>

        <div id="main">


            <div id="pool_size_div">
                <table>
                    <tr>
                        <td>

                        </td>
                        <td>
                            Poolgröße:
                        </td>
                        <td>

                        </td>
                    </tr>
                    <tr>
                        <td onClick='set_poolsize("-")'>
                            <img src='../../../public/img/arrow_left.png'>
                        </td>
                        <td>
                            <div id="recent_pool_size">
                                5
                            </div>
                        </td>
                        <td onClick='set_poolsize("+")'>
                            <img src='../../../public/img/arrow_right.png'>
                        </td>
                    </tr>
                </table>
            </div>


            <div id="correct_answers">

            </div>
            <!--<textarea name="answers" id="answers" class="answers" cols="50" rows="10" readonly style="border: 0"></textarea> -->

        </div>

        <div id="hidden_to_user" style="display: none">

        </div>


        <!--<div id="footer">


            <h1>Impressum | Über uns | Meine Werung
            </h1>
              </div> -->
    </div>
    <script type="text/javascript" src="../../../public/javascripts/trainer/global_functions.js"></script>
    <script type="text/javascript" src="../../../public/javascripts/trainer/functions.inc.js"></script>
    <script type="text/javascript" src="../../../public/javascripts/trainer/trainer_f.js"></script>
    <script type="text/javascript" src="../../../public/javascripts/trainer/trainer.js"></script>
    <script type="text/javascript" src="../../../public/javascripts/trainer/load_update.js"></script>



    <script type="text/javascript">
    /**
     * Javascriptteil
     */

    check();
    </script>




</body>

</html>

