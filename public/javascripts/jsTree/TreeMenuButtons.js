function TreeMenuButtons() {


}

TreeMenuButtons.prototype.start = function() {
    $("#add_list").click(function() {
        $("#finder").jstree("create", null, "last", {
            "attr": {
                "rel": "list"
            }
        });
    });
    $("#add_folder").click(function() {
        $("#finder").jstree("create_node", null, "last", {
            "attr": {
                "rel": "folder"
            }
        });
    });
    $("#search_text").keydown(function() {
        $("#finder_public").jstree("search", this.value);
    });
    $("#search_text").click(function() {
        this.select();
    });

};