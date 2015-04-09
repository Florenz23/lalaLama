ddescribe("ClassTrainerGetVocs***", function() {
    var class_ajax = new ClassAjax();
    var class_db_test_list = new ClassDbTestList();
    var trainer = new ClassTrainer();

    describe("db part", function() {
        it("getEncodedArray should been defined", function() {
            expect(trainer.getEncodedArray).toBeDefined();
        });
        it('check first voc', function() {
            var voc_array = class_db_test_list.complete_array;
            var expected = {
                voc_id: voc_array[0].voc_id,
                answer_id: [voc_array[0].answer_id, voc_array[1].answer_id, voc_array[2].answer_id],
                rating: [voc_array[0].rating, voc_array[1].rating, voc_array[2].rating],
            };
            //var list_id = voc_array[0].list_id;
            var list_id = 4941;
            var given = trainer.getEncodedArray(list_id);
            console.log(given[0]);
            expect(given[0].voc_id).toBe(expected.voc_id);
            expect(given[0].answer_id).toEqual(expected.answer_id);
            expect(given[0].rating).toEqual(expected.rating);
        });
    });
});