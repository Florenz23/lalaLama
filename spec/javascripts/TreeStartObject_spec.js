describe('TreeStartObject', function() {
    var user_id_to_test = 5;
    var tree = new TreeStartObject(user_id_to_test);
    var trainer_info = new ClassTrainerInfo();
    var class_ajax = new ClassAjax();
    it('should be defined', function() {
        expect(tree).toBeDefined();
    });
    describe('StartTree', function() {
        var data = {
            table: trainer_info.navigation_table_struct.name,
            key: trainer_info.navigation_table_struct.user_id,
            value: user_id_to_test,
            primary: trainer_info.navigation_table_struct.id
        };
        var returned_navigation_values;
        it('should be created', function() {
            tree.createStartTree(user_id_to_test);
            returned_navigation_values = class_ajax.selectFrom(data);
            var expected_array = tree.createArray();

            for (var i = expected_array.length - 1; i >= 0; i--) {
                expect(returned_navigation_values[i].id).toBe(expected_array[i].id);
                expect(returned_navigation_values[i].pid).toBe(expected_array[i].pid);
                expect(returned_navigation_values[i].pos).toBe(expected_array[i].pos);
                expect(returned_navigation_values[i].lft).toBe(expected_array[i].lft);
                expect(returned_navigation_values[i].rgt).toBe(expected_array[i].rgt);
                expect(returned_navigation_values[i].lvl).toBe(expected_array[i].lvl);
                expect(returned_navigation_values[i].type).toBe(expected_array[i].type);
            }
        });
        it('should be deleted', function() {
            tree.deleteStartTreeEntriesByUserId(user_id_to_test);
            returned_navigation_values = class_ajax.selectFrom(data);
            expect(returned_navigation_values).toBe(false);
        });
    });
});