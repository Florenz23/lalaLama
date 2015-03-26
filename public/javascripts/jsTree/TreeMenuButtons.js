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
        console.log("jo");
        $("#finder").jstree("create_node", null, "last", {
            "attr": {
                "rel": "folder"
            }
        });
    });
    $("#search_text").keypress(function() {
        $("#finder").jstree("search", this.value);
    });

};