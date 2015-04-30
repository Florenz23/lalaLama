var tree_starter = new ClassTree();

$(function() {
    $(window).resize(function() {
        var h = Math.max($(window).height() - 0, 420);
        $('#container, #data, #tree, #data .content').height(h).filter('.default').css('lineHeight', h + 'px');
    }).resize();

    tree_starter.iniTree();

});