ddescribe("ClassTrainerCheckPoolflowSingel***", function() {
    var class_ajax = new ClassAjax();
    var class_trainer_info = new ClassTrainerInfo();
    var class_db_test_list = new ClassDbTestList();
    var answer_textarea_id = "answer";
    var question_div = "question";
    var test_voc_object = class_db_test_list.complete_array[0];
    var complete_test_array = class_db_test_list.complete_array;
    var trainer = new ClassTrainer();
    trainer.poolsize = 2;
    var json_string = [{
        "voc_id": "1",
        "list_id": "33",
        "question": "a",
        "answer": ["a"],
        "answer_id": ["11"],
        "right": ["0"],
        "wrong": ["0"],
        "rating": ["-10"],
        "multi_choice": ["0"],
        "importance": [1]
    }, {
        "voc_id": "2",
        "list_id": "33",
        "question": "b",
        "answer": ["b"],
        "answer_id": ["22"],
        "right": ["0"],
        "wrong": ["0"],
        "rating": ["0"],
        "multi_choice": ["0"],
        "importance": [1]
    }, {
        "voc_id": "3",
        "list_id": "33",
        "question": "c",
        "answer": ["c"],
        "answer_id": ["33"],
        "right": ["0"],
        "wrong": ["0"],
        "rating": ["0"],
        "multi_choice": ["0"],
        "importance": [1]
    }, {
        "voc_id": "4",
        "list_id": "33",
        "question": "d",
        "answer": ["d"],
        "answer_id": ["44"],
        "right": ["0"],
        "wrong": ["0"],
        "rating": ["0"],
        "multi_choice": ["0"],
        "importance": [1]
    }];

    beforeEach(function() {
        trainer.setUpHTMLFixture();
        spyOn(trainer, "getEncodedArray").and.callFake(function() {
            var array = json_string;
            return array;
        });
        spyOn(trainer, "calculateRating").and.callFake(function() {
            var data = trainer.poolnode.data;
            var rating_array = data.rating;
            for (var i = 0; i < data.ok.length; i++) {
                rating_array[i] = parseFloat(rating_array[i], 10);
                if (data.ok[i] === 0) {
                    if (rating_array[i] > -1) {
                        rating_array[i] = rating_array[i] * -0.1 - 1.1;
                    }
                }
                if (data.ok[i] == 1) {
                    rating_array[i]++;
                }
            }
            trainer.vocllist.update_rating(data.id, rating_array);
        });

    });
    describe('pool algo', function() {
        it('3 times a wrong b wrong', function() {
            trainer.check();
            expect(trainer.vocpool.at(0).data.rating[0]).toBe(-10);
            for (var i = 0; i < 12; i++) {
                trainer.check();
            }
            var voc_0 = trainer.vocpool.at(0).data;
            var voc_1 = trainer.vocpool.at(1).data;
            expect(voc_0.wrong[0]).toBe(3);
            expect(voc_1.wrong[0]).toBe(3);
            expect(voc_0.question).toBe("a");
            expect(voc_1.question).toBe("b");
            expect(voc_0.rating[0]).toBe(-10);
            expect(trainer.vocllist.length).toBe(4);

        });
        it('a correct b wrong', function() {
            $("#answer").val("a");
            trainer.check();
            trainer.check();
            trainer.check();
            var voc_0 = trainer.vocpool.at(0).data;
            var voc_1 = trainer.vocpool.at(1).data;
            expect(voc_0.question).toBe("c");
            expect(voc_1.question).toBe("b");
        });
        it('c correct b wrong', function() {
            $("#answer").val("c");
            trainer.check();
            trainer.check();
            trainer.check();
            var voc_0 = trainer.vocpool.at(0).data;
            var voc_1 = trainer.vocpool.at(1).data;
            expect(voc_0.question).toBe("d");
            expect(voc_1.question).toBe("b");
        });
        it('d correct b wrong', function() {
            $("#answer").val("d");
            trainer.check();
            trainer.check();
            trainer.check();
            var voc_0 = trainer.vocpool.at(0).data;
            var voc_1 = trainer.vocpool.at(1).data;
            expect(voc_0.question).toBe("a");
            expect(voc_1.question).toBe("b");
            expect(trainer.vocpool.length).toBe(2);
        });
        it('b wrong a correct', function() {
            $("#answer").val("a");
            trainer.check();
            trainer.check();
            trainer.check();
            var voc_0 = trainer.vocpool.at(0).data;
            expect(voc_0.question).toBe("b");
            expect(trainer.vocpool.length).toBe(1);
        });
    });
});
