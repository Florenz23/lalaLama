function createFixtureString(string_to_edit) {
    var script_occurence = (string_to_edit.match(new RegExp("<script", "g")) || []).length;
    for (var i = 0; i < script_occurence; i++) {
        string_to_edit = string_to_edit.replace(/<script[^>]*>([^<]*)<\/script>/, "");
    }
    return string_to_edit;

}