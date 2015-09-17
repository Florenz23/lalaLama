ddescribe("ClassTrainerGetNumberOfMasteredVocs***", function() {
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
        "voc_id": "23",
        "list_id": "33",
        "question": "a",
        "answer": ["aa"],
        "answer_id": ["11"],
        "right": ["0"],
        "wrong": ["0"],
        "rating": ["5"],
        "multi_choice": ["0"],
        "importance": [1]
    }, {
        "voc_id": "24",
        "list_id": "33",
        "question": "a",
        "answer": ["aa"],
        "answer_id": ["11"],
        "right": ["0"],
        "wrong": ["0"],
        "rating": ["-1"],
        "multi_choice": ["0"],
        "importance": [1]
    }, {
        "voc_id": "1",
        "list_id": "33",
        "question": "a",
        "answer": ["a"],
        "answer_id": ["11"],
        "right": ["0"],
        "wrong": ["0"],
        "rating": ["5"],
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
                    if (rating_array[i] < -1) {
                        rating_array[i] = -1;
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
        var vocs_to_learn;
        it('check total number', function() {
            trainer.check();
            expect(trainer.number_of_vocs_to_learn).toBe(6);
        });
        it('should be defined', function() {
            expect(trainer.getNumberOfMasteredVocs).toBeDefined();
        });
        it('aa correct', function() {
            $("#answer").val("aa");
            trainer.check();
            vocs_to_learn = trainer.getNumberOfMasteredVocs();
            expect(vocs_to_learn).toBe(1);
        });
        it('aa correct ', function() {
            $("#answer").val("aa");
            trainer.check();
            vocs_to_learn = trainer.getNumberOfMasteredVocs();
            expect(vocs_to_learn).toBe(2);
        });

        it('3 times a wrong b wrong', function() {
            for (var i = 0; i < 12; i++) {
                trainer.check();
            }
            vocs_to_learn = trainer.getNumberOfMasteredVocs();
            expect(vocs_to_learn).toBe(2);
        });
        it('a correct b wrong', function() {
            $("#answer").val("a");
            trainer.check();
            trainer.check();
            trainer.check();
            vocs_to_learn = trainer.getNumberOfMasteredVocs();
            expect(vocs_to_learn).toBe(2);
        });
        it('c correct b wrong', function() {
            $("#answer").val("c");
            trainer.check();
            trainer.check();
            trainer.check();
            vocs_to_learn = trainer.getNumberOfMasteredVocs();
            expect(vocs_to_learn).toBe(3);
        });
        it('d correct b wrong', function() {
            $("#answer").val("d");
            trainer.check();
            trainer.check();
            trainer.check();
            vocs_to_learn = trainer.getNumberOfMasteredVocs();
            expect(vocs_to_learn).toBe(4);
        });
        it('b wrong a correct', function() {
            $("#answer").val("a");
            trainer.check();
            trainer.check();
            trainer.check();
            expect(trainer.vocpool.length).toBe(1);
            vocs_to_learn = trainer.getNumberOfMasteredVocs();
            expect(vocs_to_learn).toBe(5);
            //trainer.vocllist.display();
        });
    });
});
