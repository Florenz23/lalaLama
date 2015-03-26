function ClassTrainerInfo() {

    this.db = "test";
    this.voc_table = {
        name: "vocs",
        id: "voc_id",
        list_row: "list_id",
        question_row: "question",
    };
    this.answer_table = {
        name: "answer_table",
        id: "answer_id",
        voc_id: "voc_id",
        answer_row: "answer",
        multi_choice_row: "multi_choice",
        img_id_row: "img_id"
    };
    this.voc_user_data_table = {
        name: "voc_user_data",
        id: "answer_id",
        right_row: "right",
        wrong_row: "wrong",
        rating_row: "rating",
        last_access_row: "last_access",
    };
    this.registration_table = {
        name: "registration",
        id: "user_id",
        user_name: "user_name",
        user_password: "user_password"
    };
    this.navigation_table_struct = {
        name: "tree_struct",
        id: "id",
        left: "lft",
        right: "rgt",
        level: "level",
        parten_id: "pid",
        position: "pos",
        user_id: "user_id"
    };
    this.navigation_table_data = {
        name: "tree_data",
        id: "id",
        description: "nm",
        type: "type"
    };

}