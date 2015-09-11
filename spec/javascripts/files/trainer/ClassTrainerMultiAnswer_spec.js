describe("ClassTrainerMultiAnswer***", function() {
    var class_db_test_list = new ClassDbTestList();
    var trainer;
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
        trainer = new ClassTrainer();
        trainer.setUpHTMLFixture();
        spyOn(trainer, "getEncodedArray").and.callFake(function() {
            var array = json_string;
            return array;
        });
    });
    describe("refresh values", function() {
        it("values should be resetted", function() {
            class_db_test_list.createListObjects();
        });
    });
    describe('#communication', function() {
        beforeEach(function() {
            trainer.check();
        });
        describe('should display', function() {
            it('remaining answers after wrong input', function() {
                trainer.check();
                trainer.check();
                communication_div_value = $("#communication").text();
                expect(communication_div_value).toBe("Verbleibende Antworten: 2");
                trainer.check();
                trainer.check();
                communication_div_value = $("#communication").text();
                expect(communication_div_value).toBe("Verbleibende Antworten: 1");
            });
            it('the correct_answer after wrong input', function() {
                trainer.check();
                communication_div_value = $("#communication").text();
                expect(communication_div_value).toBe("Meintest du 'a'?");
            });
            it('should not display anything when next voc is displayed', function() {
                trainer.check();
                trainer.check();
                trainer.check();
                trainer.check();
                trainer.check();
                trainer.check();
                communication_div_value = $("#communication").text();
                expect(communication_div_value).toBe("");
            });
        });
    });
    describe('#question', function() {
        beforeEach(function() {
            trainer.check();
        });
        it('should behave...', function() {
            question_value = $("#question").text();
            expect(question_value).toBe("abc");
        });
    });
    describe('#correct_answers', function() {
        beforeEach(function() {
            trainer.check();
        });
        describe('display', function() {
            it('wrong answer', function() {
                trainer.check();
                trainer.check();
                answer_summary_value = $("#correct_answers").text();
                expect(answer_summary_value).toBe("a");
            });
            it('correct answer', function() {
                trainer.check();
                trainer.correct_answer();
                answer_summary_value = $("#correct_answers").text();
                expect(answer_summary_value).toBe("a");
            });
            it('correct and wrong answer', function() {
                trainer.check();
                trainer.check();
                trainer.check();
                trainer.correct_answer();
                answer_summary_value = $("#correct_answers").text();
                expect(answer_summary_value).toBe("ab");
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
            trainer.check();
            trainer.correct_answer();
            expect(trainer.poolnode.data.question).toBe(json_string[0].question);
            trainer.check();
            trainer.correct_answer();
            expect(trainer.poolnode.data.question).toBe(json_string[1].question);

        });
        it('answer every answer false', function() {
            expect(trainer.poolnode.data.question).toBe(json_string[0].question);
            trainer.check();
            trainer.check();
            trainer.check();
            trainer.check();
            trainer.check();
            expect(trainer.poolnode.data.question).toBe(json_string[0].question);
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