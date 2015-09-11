describe("ClassTrainerUpdateVocRating***", function() {
    var class_db_test_list = new ClassDbTestList();
    var trainer = new ClassTrainer();
    // todo split to calculateVocRating and updateVocRatingInDb
    describe("db part", function() {
        it("should work", function() {
            var obj_array = class_db_test_list.user_data_array;
            var voc_object = {
                "voc_id": "2023",
                "list_id": "9433",
                "question": "a",
                "answer": ["a","b"],
                "answer_id": ["3238","2342"],
                "right": ["3","4"],
                "wrong": ["3","4"],
                "rating": [-0.09,1],
                "last_access": [1438812075,23423425],
                "multi_choice": ["0","0"],
                "img_id": ["0","0"],
                "importance": [1,1],
                "ok": [1,1]
            };
            trainer.poolnode = {
                data : null
            };
            trainer.poolnode.data = voc_object;
            var given_ratings = trainer.calculateRating();
            console.log(given_ratings);
            var expected_ratings = [];
            expected_ratings[0] = parseInt(voc_object.rating[0], 10) + 1;
            expected_ratings[1] = parseInt(voc_object.rating[1], 10) + 1;
            expect(voc_object.rating[0]).toBe(expected_ratings[0]);
            expect(voc_object.rating[1]).toBe(expected_ratings[1]);
        });
    });
});