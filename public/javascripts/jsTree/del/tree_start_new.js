var tree_image_path = "../../../public/img/";
var tree = new Tree();
tree.ajax_file = "../../../public/php/jsTree/tree_server.php";
var menu_buttons = new TreeMenuButtons();
//warten bis sich die Seite vollständig aufgebaut hat
$(function() {
    tree.start();
    menu_buttons.start();
});