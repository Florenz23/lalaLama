function ClassTree() {

    // this.ajax_file_path = "php/tree_server.php";
    this.ajax_file_path = "public/php/test/tree_server.php";
    this.finder_div = "finder_user";
    this.class_login = new ClassLogin();
    this.class_display_list = new ClassDisplayList();
    this.user_id = "not_set";

}

ClassTree.prototype.iniTree = function() {
    this.displaySearchField();
    this.setTreeOptions();
    this.finder_div = "finder_group";
    this.setTreeOptions();
};

ClassTree.prototype.displaySearchField = function() {

    var display = "";
    display += "<form class='pure-form pure-g'>";
    display += "    <input class='pure-form' type='text' id='search_text' value='Suchen' />";
    display += "        </form>";
    $("#finder_menu_div").html(display);

};


ClassTree.prototype.setTreeOptions = function() {
    var class_tree = this;
    var ajax_file_path = this.ajax_file_path;
    var user_id = this.user_id;
    var class_display_list = this.class_display_list;
    this.jstree = $('#' + this.finder_div)
        .jstree({

            'core': {
                'animation': 0,
                'data': this.getData(),
                'check_callback': true,
                'themes': {
                    'responsive': false
                },

            },
            'search': {
                ajax: "jojojo"
            },
            "types": {
                "root": {
                    "icon": "../../../public/img/root.png",
                    "valid_children": []
                },
                "public": {
                    "icon": "../../../public/img/lama1.jpg",
                    "valid_children": []
                },
                "groups": {
                    "icon": "../../../public/img/lama1.jpg",
                    "valid_children": []
                },
                "mylama": {
                    "icon": "../../../public/img/haus.png",
                    "valid_children": ["folder"]
                },
                "folder": {
                    "icon": "../../../public/img/folder.png",
                    "valid_children": ["folder", "list", "default"]
                },
                "list": {
                    "icon": "../../../public/img/list.png",
                    "valid_children": []
                },
                "default": {
                    "icon": "../../../public/img/plus.jpg"
                }
            },
            'plugins': ['state', 'dnd', 'contextmenu', 'wholerow', 'types', 'search'],
            contextmenu: {
                items: this.createCustomContextMenu
            }
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
                    'type': data.node.type,
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
        .on("select_node.jstree", function(e, data) {
            return data.instance.toggle_node(data.node);
        })
        .on('changed.jstree', function(e, data) {
            if (data && data.selected && data.selected.length) {
                class_tree.typeAction(data);
            } else {
                $('#data .content').hide();
            }
        });
};
ClassTree.prototype.getData = function() {
    var ajax_file_path = this.ajax_file_path;
    var data = {
        'url': ajax_file_path + '?operation=get_node',
        'data': function(node) {
            return {
                'id': node.id,
            };
        },
        'success': function(node) {}
    };
    return data;

};
ClassTree.prototype.typeAction = function(data) {
    this.clearDiv();
    switch (data.node.original.type) {
        case "mylama":
            this.publicOnClickAction(data);
            break;
        case "public":
            //this.publicOnClickAction(data);
            break;
        case "groups":
            break;
        case "folder":
            break;
        case "list":
            this.listOnClickAction(data);
            break;
        default:
            console.log("nö");
    }

};

ClassTree.prototype.listOnClickAction = function(data) {
    var id = data.node.id;
    this.class_display_list.displayList(id);
};
ClassTree.prototype.publicOnClickAction = function(data) {
    console.log(data.node);
    var json_data;
    //data.node.children = ['5201'];
    //$('#' + this.finder_div).jstree(true).refresh_node(5093);
    var ajax_file_path = this.ajax_file_path;
    var ajax = $.get(ajax_file_path + '?operation=get_node', {
            'id': 5200,
        })
        .done(function(d) {
            //d ist js_object
            console.log(d);
            json_data = d;
        })
        .fail(function() {
            data.instance.refresh();
        });
    console.log(ajax);
    var v = $('#' + this.finder_div).jstree(true).get_json(5093, {
        flat: true,
        not_state: true
    });
    console.log(v);
    var mytext = JSON.stringify(v);
};
ClassTree.prototype.clearDiv = function() {
    var list_div_id = this.class_display_list.div_to_display_list_in_id;
    var new_voc_div_id = this.class_display_list.class_new_voc.div_to_display_list_in_id;
    $("#" + list_div_id).html("");
    $("#" + new_voc_div_id).html("");
    $("#learn_button_div").html("");

};
ClassTree.prototype.createCustomContextMenu = function(data) {
    var items = {

        "create": {
            "separator_before": true,
            "icon": false,
            "separator_after": false,
            "label": "Neu",
            "action": false,
            "submenu": {
                "folder": {
                    "separator_before": false,
                    "separator_after": true,
                    "_disabled": false, //(this.check("create_node", data.reference, {}, "last")),
                    "label": "Ordner",
                    "action": function(data) {
                        var inst = $.jstree.reference(data.reference),
                            obj = inst.get_node(data.reference);
                        inst.create_node(obj, {
                                "type": "folder"
                            },
                            "last",
                            function(new_node) {
                                setTimeout(function() {
                                    inst.edit(new_node);
                                }, 0);
                            });
                    }
                },
                "list": {
                    "separator_before": false,
                    "separator_after": true,
                    "_disabled": false, //(this.check("create_node", data.reference, {}, "last")),
                    "label": "Liste",
                    "action": function(data) {
                        var inst = $.jstree.reference(data.reference),
                            obj = inst.get_node(data.reference);
                        inst.create_node(obj, {
                            "type": "list"
                        }, "last", function(new_node) {
                            setTimeout(function() {
                                inst.edit(new_node);
                            }, 0);
                        });
                    }
                }
            }
        },
        "rename": {
            "separator_before": false,
            "separator_after": false,
            "_disabled": false, //(this.check("rename_node", data.reference, this.get_parent(data.reference), "")),
            "label": "Umbenennen",
            /*
            "shortcut"          : 113,
            "shortcut_label"    : 'F2',
            "icon"              : "glyphicon glyphicon-leaf",
            */
            "action": function(data) {
                var inst = $.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                inst.edit(obj);
            }
        },
        "remove": {
            "separator_before": false,
            "icon": false,
            "separator_after": false,
            "_disabled": false, //(this.check("delete_node", data.reference, this.get_parent(data.reference), "")),
            "label": "Löschen",
            "action": function(data) {
                var inst = $.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                if (inst.is_selected(obj)) {
                    inst.delete_node(inst.get_selected());
                } else {
                    inst.delete_node(obj);
                }
            }
        }
    };

    return items;

};