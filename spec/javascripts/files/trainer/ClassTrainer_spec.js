ddescribe("ClassTrainer_new***", function() {
    var class_ajax = new ClassAjax();
    var class_trainer_info = new ClassTrainerInfo();
    var class_db_test_list = new ClassDbTestList();
    var trainer = new ClassTrainer();
    var answer_textarea_id = "answer";
    var question_div = "question";
    var test_voc_object = class_db_test_list.complete_array[0];
    var complete_test_array = class_db_test_list.complete_array;
    var json_string = [{
        "voc_id": "2023",
        "list_id": "9433",
        "question": "abc",
        "answer": ["a", "b", "c"],
        "answer_id": ["3238", "3239", "3240"],
        "right": ["3", "3", "3"],
        "wrong": ["3", "3", "3"],
        "rating": ["-0.09", "-0.09", "-0.09"],
        "last_access": [1438812075, 1438812075, 1438812075],
        "multi_choice": ["0", "0", "0"],
        "img_id": ["0", "0", "0"],
        "importance": [1, 1, 1]
    }, {
        "voc_id": "2294",
        "list_id": "9433",
        "question": "Zahlen 1",
        "answer": ["1", "2", "3"],
        "answer_id": ["3527", "3528", "3529"],
        "right": [0, 0, 0],
        "wrong": [0, 0, 0],
        "rating": [0, 0, 0],
        "last_access": [false, false, false],
        "multi_choice": ["0", "0", "0"],
        "img_id": ["0", "0", "0"],
        "importance": [0, 0, 0]
    }];

    beforeEach(function() {
        trainer.setUpHTMLFixture();
    });
    describe("refresh values", function() {
        it("values should be resetted", function() {
            class_db_test_list.createListObjects();
        });
    });


    describe('check the functionality of check_old', function() {
        var trainer = new ClassTrainer();
        beforeEach(function() {
            spyOn(trainer, "getEncodedArray").and.callFake(function() {
                var array = json_string;
                return array;
            });
        });
        it('answer every answer correct', function() {
            trainer.check();
            expect(trainer.poolnode.data.question).toBe(json_string[0].question);
            trainer.check();
            trainer.correct_answer();
            trainer.check();
            trainer.correct_answer();
            trainer.check();
            expect(trainer.poolnode.data.question).toBe(json_string[0].question);
            trainer.correct_answer();
            expect(trainer.poolnode.data.question).toBe(json_string[1].question);

        });
        it('answer every answer false', function() {
            trainer.check();
            trainer.check();
            trainer.check();
            trainer.check();
            trainer.check();
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