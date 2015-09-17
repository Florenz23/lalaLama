/**
 * Created by Florenz on 17.09.15.
 */
ddescribe("ClassTrainerCheckPoolflowMulti***", function() {
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
        "question": "ab",
        "answer": ["a", "b"],
        "answer_id": ["11", "12"],
        "right": ["0", "0"],
        "wrong": ["0", "0"],
        "rating": ["0", "0"],
        "multi_choice": ["0", "0"],
        "importance": [1, 1]
    }, {
        "voc_id": "2",
        "list_id": "33",
        "question": "12",
        "answer": ["1", "2"],
        "answer_id": ["13", "14"],
        "right": ["0", "0"],
        "wrong": ["0", "0"],
        "rating": ["0", "0"],
        "multi_choice": ["0", "0"],
        "importance": [1, 1]
    }, {
        "voc_id": "3",
        "list_id": "33",
        "question": "x",
        "answer": ["x"],
        "answer_id": ["33"],
        "right": ["0"],
        "wrong": ["0"],
        "rating": ["0"],
        "multi_choice": ["0"],
        "importance": [1]
    }, {
        "voc_id": "4",
        "list_id": "33",
        "question": "y",
        "answer": ["y"],
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
    describe('reamining vocs to learn', function() {

        it('Schritt 3: 3 times (a,b) and (1,2) wrong', function() {
            trainer.check();
            //expect(trainer.vocpool.at(0).data.rating[0]).toBe(-10);
            for (var i = 0; i < 24; i++) {
                trainer.check();
            }
            var voc_0 = trainer.vocpool.at(0).data;
            var voc_1 = trainer.vocpool.at(1).data;
            expect(voc_0.wrong[0]).toBe(3);
            expect(voc_1.wrong[0]).toBe(3);
            expect(voc_0.question).toBe("ab");
            expect(voc_1.question).toBe("12");
            expect(voc_0.rating[0]).toBe(-1.1);
            expect(trainer.vocllist.length).toBe(4);

        });
        it('Schritt 4: a correct b wrong (1,2) correct', function() {
            moin = "peter";
            $("#answer").val("a");
            trainer.check();

            $("#answer").val("falsch");
            trainer.check();
            trainer.check();

            $("#answer").val("1");
            trainer.check();

            $("#answer").val("2");
            trainer.check();
            var voc_0 = trainer.vocpool.at(0).data;
            var voc_1 = trainer.vocpool.at(1).data;
            expect(voc_0.question).toBe("ab");
            expect(voc_1.question).toBe("x");
        });
        it('Schritt 5: x correct b correct', function() {
            $("#answer").val("b");
            trainer.check();
            $("#answer").val("x");
            trainer.check();
            var voc_0 = trainer.vocpool.at(0).data;
            var voc_1 = trainer.vocpool.at(1).data;
            expect(voc_0.question).toBe("y");
            expect(voc_1.question).toBe("12");
            expect(trainer.vocpool.length).toBe(2);
        });
        it('Schritt 6: y correct (1,2) correct', function() {
            $("#answer").val("y");
            trainer.check();
            $("#answer").val("1");
            trainer.check();
            $("#answer").val("2");
            trainer.check();
            var voc_0 = trainer.vocpool.at(0).data;
            expect(voc_0.question).toBe("ab");
            expect(trainer.vocpool.length).toBe(1);
        });
    });
});
