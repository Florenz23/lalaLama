    describe("ClassDbTestList***", function() {
        var class_db_test_list = new ClassDbTestList();
        var class_ajax = new ClassAjax();
        var class_trainer_info = new ClassTrainerInfo();
        it("should be defined", function() {
            expect(class_db_test_list).toBeDefined();
        });

        describe("check value array", function() {
            var value_array = class_db_test_list.value_array;
            var value_obj_0 = value_array[0];
            var value_obj_1 = value_array[1];
            var value_obj_2 = value_array[2];
            var value_obj_3 = value_array[3];
            it("value array should be defined", function() {
                expect(class_db_test_list.value_array).toBeDefined();
            });
            it("value object should be toBeDefined", function() {
                expect(value_obj_0).toBeDefined();
                expect(value_obj_1).toBeDefined();
                expect(value_obj_2).toBeDefined();
                expect(value_obj_3).toBeDefined();
            });
        });
        describe("getJsonData", function() {
            it("should be defined", function() {
                expect(class_db_test_list.getJsonData).toBeDefined();
            });
            it("check ajax requests", function() {
                var last_instert_id_array = class_db_test_list.refreshTestListValues();
                expect(last_instert_id_array[0]).toBe(class_db_test_list.value_obj_1.voc_id);
                expect(last_instert_id_array[1]).toBe(class_db_test_list.value_obj_2.voc_id);
                expect(last_instert_id_array[2]).toBe(class_db_test_list.value_obj_3.voc_id);
                expect(last_instert_id_array[3]).toBe(class_db_test_list.value_obj_4.voc_id);
            });
            it("getJsonData should return a proper result for id = 7", function() {
                var id = 7;
                json_array_0 = class_db_test_list.getJsonData(id);
                // absteigende reihenfolge beachten
                var db_voc_1 = json_array_0[5];
                var voc_1 = class_db_test_list.value_obj_1;
                var answer_1 = class_db_test_list.answer_obj_1;
                expect(db_voc_1.voc_id).toBe(voc_1.voc_id);
                expect(db_voc_1.question).toBe(voc_1.question);
                expect(db_voc_1.list_id).toBe(voc_1.list_id);
                expect(db_voc_1.answer_id).toBe(answer_1.answer_id);
                expect(db_voc_1.voc_id).toBe(answer_1.voc_id);
                expect(db_voc_1.answer).toBe(answer_1.answer);
            }); // it("getJsonData should return a proper result for id = 8", function() {
            //     var id = 8;
            //     json_array_1 = class_db_test_list.getJsonData(id);
            //     expect(json_array_1[0]).toEqual(class_db_test_list.value_array[2]);
            //     expect(json_array_1[1]).toEqual(class_db_test_list.value_array[3]);
            // });

        });

    });