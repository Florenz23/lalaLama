describe("ClassTrainerUpdateVocRating***", function() {
    var class_db_test_list = new ClassDbTestList();
    var trainer = new ClassTrainer();

    describe("db part", function() {
        it("should work", function() {
            var obj_array = class_db_test_list.user_data_array;
            trainer.poolnode = {
                data: null
            };
            trainer.poolnode.data = {
                answer_id: [obj_array[0].answer_id, obj_array[1].answer_id],
                ok: [1, 1]
            };
            var given_ratings = trainer.calculateRating();
            console.log(given_ratings);
            var expected_ratings = [];
            expected_ratings[0] = parseInt(obj_array[0].rating, 10) + 1;
            expected_ratings[1] = parseInt(obj_array[1].rating, 10) + 1;
            expect(given_ratings[0]).toBeGreaterThan(expected_ratings[0]);
            expect(given_ratings[1]).toBeGreaterThan(expected_ratings[1]);
        });
    });
});