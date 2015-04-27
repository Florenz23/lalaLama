xdescribe('ClassTree', function() {
    var recent_user_id = 2;
    var user_id_to_test = 5;
    var tree_starter_1 = new TreeStartObject();
    var tree_starter_2 = new TreeStartObject();
    var trainer_info = new ClassTrainerInfo();
    var class_ajax = new ClassAjax();
    var start_tree_array;
    describe('create', function() {
        var returned_navigation_values;
        var recent_navigation_values;
        var data;
        it('create trees', function() {
            tree_starter_1.createStartTree(recent_user_id);
            tree_starter_2.createStartTree(user_id_to_test);
        });

        it('main tree should have changed', function() {
            data = {
                table: trainer_info.navigation_table.name,
                key: trainer_info.navigation_table.user_id,
                value: recent_user_id,
                primary: trainer_info.navigation_table.id
            };
            recent_navigation_values = class_ajax.selectFrom(data);
            var ajax = $.ajax({
                async: false,
                type: 'POST',
                url: "trainer/units/myUnit00/public/php/jsTree/tree_server.php",
                dataType: 'json',
                data: {
                    "list_id": recent_navigation_values[4].list_id,
                    "operation": "create_folder",
                    "position": 1,
                    "title": "moinmoin",
                    "type": "folder",
                    "user_id": recent_user_id
                }
            });
            expect(recent_navigation_values[0].right).toBe("12");
        });

        it('the user_id of the new folder should be correct', function() {
            recent_navigation_values = class_ajax.selectFrom(data);
            expect(recent_navigation_values[5].user_id).toBe(String(recent_user_id));
        });
        it('nothing should have changed in other tree', function() {
            var data = {
                table: trainer_info.navigation_table.name,
                key: trainer_info.navigation_table.user_id,
                value: user_id_to_test,
                primary: trainer_info.navigation_table.id
            };
            returned_navigation_values = class_ajax.selectFrom(data);
            expect(returned_navigation_values[0].right).toBe("10");
        });
        it('should be deleted', function() {
            tree_starter_1.deleteStartTreeEntriesByUserId(recent_user_id);
            tree_starter_2.deleteStartTreeEntriesByUserId(user_id_to_test);
        });
    });
});