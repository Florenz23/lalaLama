// var tree_starter = new ClassTree();
var menu_buttons = new TreeMenuButtons();
var login = new ClassLogin();
$(function() {
    //     $(window).resize(function() {
    //         var h = Math.max($(window).height() - 0, 420);
    //         $('#container, #data, #finder, #data .content').height(h).filter('.default').css('lineHeight', h + 'px');
    //     }).resize();
    //     tree_starter.iniTree();
    menu_buttons.start();

});

login.start();