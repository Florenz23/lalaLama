function ClassTree() {

    this.ajax_file_path = "php/tree_server.php";
    this.tree_div = "tree";

}

ClassTree.prototype.iniTree = function() {
    var ajax_file_path = this.ajax_file_path;

    $('#' + this.tree_div)
        .jstree({
            'core': {
                'data': {
                    'url': ajax_file_path + '?operation=get_node',
                    'data': function(node) {
                        return {
                            'id': node.id
                        };
                    }
                },
                'check_callback': true,
                'themes': {
                    'responsive': false
                }
            },
            'plugins': ['state', 'dnd', 'contextmenu', 'wholerow']
        })
        .on('delete_node.jstree', function(e, data) {
            $.get(ajax_file_path + '?operation=delete_node', {
                    'id': data.node.id
                })
                .fail(function() {
                    data.instance.refresh();
                });
        })
        .on('create_node.jstree', function(e, data) {
            $.get(ajax_file_path + '?operation=create_node', {
                    'id': data.node.parent,
                    'position': data.position,
                    'text': data.node.text,
                })
                .done(function(d) {
                    data.instance.set_id(data.node, d.id);
                })
                .fail(function() {
                    data.instance.refresh();
                });
        })
        .on('rename_node.jstree', function(e, data) {
            $.get(ajax_file_path + '?operation=rename_node', {
                    'id': data.node.id,
                    'text': data.text,
                })
                .fail(function() {
                    data.instance.refresh();
                });
        })
        .on('move_node.jstree', function(e, data) {
            $.get(ajax_file_path + '?operation=move_node', {
                    'id': data.node.id,
                    'parent': data.parent,
                    'position': data.position
                })
                .fail(function() {
                    data.instance.refresh();
                });
        })
        .on('copy_node.jstree', function(e, data) {
            $.get(ajax_file_path + '?operation=copy_node', {
                    'id': data.original.id,
                    'parent': data.parent,
                    'position': data.position
                })
                .always(function() {
                    data.instance.refresh();
                });
        })
        .on('changed.jstree', function(e, data) {
            if (data && data.selected && data.selected.length) {
                console.log(data.node.id);
                $.get(ajax_file_path + '?operation=get_content&id=' + data.selected.join(':'), function(d) {
                    $('#data .default').html(d.content).show();
                });
            } else {
                $('#data .content').hide();
                $('#data .default').html('Select a file from the tree.').show();
            }
        });


};