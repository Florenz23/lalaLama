function Tree() {

    this.div_id = "finder";
    this.used_plugins = [
        "themes", "json_data", "ui", "crrm", "cookies", "dnd", "search", "types", "hotkeys", "contextmenu", "state"
    ];
    this.valid_root_children = ["drive"];

    this.ajax_file = "";

}

var tree_image_path = "";

Tree.prototype.setDivId = function(div_id) {

    this.div_id = div_id;

};


function Types() {

    this.folder = new Folder();
    this.list = new List();
    this.drive = new Drive();

}

function Folder() {

    this.valid_children = ["list", "folder"];
    this.icon = {
        "image": tree_image_path + "folder.png"
    };

}

function List() {

    this.valid_children = "none";
    this.icon = {
        "image": tree_image_path + "list.png"
    };
}

function Drive() {

    this.valid_children = ["folder"];
    this.icon = {
        "image": tree_image_path + "root.png"
    };
    this.start_drag = false;
    this.move_node = false;
    this.delete_node = false;
    this.remove = false;

}

Tree.prototype.start = function() {

    this.iniTree();
    this.addListener();

};
Tree.prototype.addListener = function() {
    var class_display_list = new ClassDisplayList();
    $("#" + this.div_id)
        .bind("select_node.jstree", function(event, data) {
            var clicked_node_id = data.rslt.obj.attr("id").replace("node_", "");
            var type = data.rslt.obj.attr("rel");
            class_display_list.displayList(clicked_node_id, type);
        });
};




Tree.prototype.iniTree = function() {
    var ajax_file = this.ajax_file;

    $("#" + this.div_id)
        .jstree({
            "plugins": this.used_plugins,
            "json_data": {
                "ajax": {
                    "url": ajax_file,
                    "data": function(n) {
                        return {
                            "operation": "get_children",
                            "id": n.attr ? n.attr("id").replace("node_", "") : 1
                        };
                    }
                }
            },

            "search": {
                "ajax": {
                    "url": ajax_file,
                    "data": function(str) {
                        return {
                            "operation": "search",
                            "search_str": str
                        };
                    }
                }
            },
            "types": {
                "max_depth": -2,
                "max_children": -2,
                "valid_children": this.valid_children,
                "types": new Types()
            },
            "themes": {
                "name": "apple",
                "dots": false,
                "icons": true
            },
            "core": {
                "animation": 0,
                "themes": {
                    "stripes": true,
                    'name': 'apple',
                    'responsive': true,
                    'url': "../../../public/javascripts/jsTree/themes/apple/style.css"
                },
            },
            "contextmenu": {
                "items": function($node) {
                    return {
                        "Create": {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "Create",
                            "action": function(obj) {
                                this.create(obj);
                            }
                        },
                        "Rename": {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "Rename",
                            "action": function(obj) {
                                this.rename(obj);
                            }
                        },
                        "Remove": {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "Remove",
                            "action": function(obj) {
                                this.remove(obj);
                            }
                        }
                    };
                }
            }
        });



    $("#" + this.div_id).bind("create.jstree", function(e, data) {
            var operation = "create_folder";
            if (data.rslt.obj.attr("rel") == "list") {
                operation = "create_list";
            }
            $.post(
                ajax_file, {
                    "operation": operation,
                    "voc_id": data.rslt.parent.attr("id").replace("node_", ""),
                    "position": data.rslt.position,
                    "title": data.rslt.name,
                    "type": data.rslt.obj.attr("rel")
                },
                function(r) {
                    //falls das nav_objekt erfolgreich erstellt wurde, änliche wie sucess
                    if (r.status) {
                        $(data.rslt.obj).attr("id", "node_" + r.id);
                        var ajax = new ClassAjax();
                        var obj = {
                            "ident": 225,
                            "description": r.description
                        };
                        ajax.insertIntoTable("register_fold_pools", obj);
                    } else {
                        console.log("error with the returned json string");
                        $.jstree.rollback(data.rlbk);
                    }
                }
            );
        })
        .bind("remove.jstree", function(e, data) {
            data.rslt.obj.each(function() {
                $.ajax({
                    async: false,
                    type: 'POST',
                    url: ajax_file,
                    data: {
                        "operation": "remove_node",
                        "voc_id": this.id.replace("node_", "")
                    },
                    success: function(r) {
                        if (!r.status) {
                            data.inst.refresh();
                        }
                    }
                });
            });
        })
        .bind("rename.jstree", function(e, data) {
            $.post(
                ajax_file, {
                    "operation": "rename_node",
                    "voc_id": data.rslt.obj.attr("id").replace("node_", ""),
                    "title": data.rslt.new_name
                },
                function(r) {
                    if (!r.status) {
                        $.jstree.rollback(data.rlbk);
                    }
                }
            );
        })
        .bind("move_node.jstree", function(e, data) {
            data.rslt.o.each(function(i) {
                $.ajax({
                    async: false,
                    type: 'POST',
                    url: ajax_file,
                    data: {
                        "operation": "move_node",
                        "voc_id": $(this).attr("id").replace("node_", ""),
                        "ref": data.rslt.cr === -1 ? 1 : data.rslt.np.attr("id").replace("node_", ""),
                        "position": data.rslt.cp + i,
                        "title": data.rslt.name,
                        "copy": data.rslt.cy ? 1 : 0
                    },
                    success: function(r) {
                        if (!r.status) {
                            $.jstree.rollback(data.rlbk);
                        } else {
                            $(data.rslt.oc).attr("id", "node_" + r.id);
                            if (data.rslt.cy && $(data.rslt.oc).children("UL").length) {
                                data.inst.refresh(data.inst._get_parent(data.rslt.oc));
                            }
                        }
                        $("#analyze").click();
                    }
                });
            });
        });



};