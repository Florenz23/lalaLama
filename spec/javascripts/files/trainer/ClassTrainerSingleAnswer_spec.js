ddescribe("ClassTrainerSingleAnswer***", function() {
    var class_ajax = new ClassAjax();
    var class_trainer_info = new ClassTrainerInfo();
    var class_db_test_list = new ClassDbTestList();
    var answer_textarea_id = "answer";
    var question_div = "question";
    var test_voc_object = class_db_test_list.complete_array[0];
    var complete_test_array = class_db_test_list.complete_array;
    var trainer;
    var json_string = [{
        "voc_id": "2023",
        "list_id": "9433",
        "question": "a",
        "answer": ["a"],
        "answer_id": ["3238"],
        "right": ["3"],
        "wrong": ["3"],
        "rating": ["-0.09"],
        "last_access": [1438812075],
        "multi_choice": ["0"],
        "img_id": ["0"],
        "importance": [1]
    }, {
        "voc_id": "2294",
        "list_id": "9433",
        "question": "Zahlen 1",
        "answer": ["1"],
        "answer_id": ["3527"],
        "right": [0],
        "wrong": [0],
        "rating": [0],
        "last_access": [false],
        "multi_choice": ["0"],
        "img_id": ["0"],
        "importance": [0]
    }];

    beforeEach(function() {
        trainer = new ClassTrainer();
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
    describe("refresh values", function() {
        it("values should be resetted", function() {
            class_db_test_list.createListObjects();
        });
    });
    describe('Communication output', function() {
        beforeEach(function() {
            trainer.check();
        });
        describe('should display', function() {
            it('the correct_answer after wrong input', function() {
                trainer.check();
                communication_div_value = $("#communication").text();
                expect(communication_div_value).toBe("a");
            });
        });

    });


    describe('check the functionality of check_old', function() {
        beforeEach(function() {
            trainer.check();
        });
        it('answer every answer correct', function() {
            expect(trainer.poolnode.data.question).toBe(json_string[0].question);
            trainer.check();
            trainer.correct_answer();
            expect(trainer.poolnode.data.question).toBe(json_string[1].question);

        });
        it('answer every answer false', function() {
            expect(trainer.poolnode.data.question).toBe(json_string[0].question);
            trainer.check();
            trainer.check();
            expect(trainer.poolnode.data.question).toBe(json_string[1].question);
        });
    });
    describe("refresh values", function() {
        it("values should be resetted", function() {
            class_db_test_list.createListObjects();
        });
    });
});
