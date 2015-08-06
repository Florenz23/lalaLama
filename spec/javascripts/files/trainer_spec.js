describe("ClassTrainer***", function() {
    var class_ajax = new ClassAjax();
    var class_trainer_info = new ClassTrainerInfo();
    var class_db_test_list = new ClassDbTestList();
    var trainer = new ClassTrainer();
    var answer_textarea_id = "answer";
    var question_div = "question";
    var test_voc_object = class_db_test_list.complete_array[0];
    var complete_test_array = class_db_test_list.complete_array;

    beforeEach(function() {
        trainer.setUpHTMLFixture();
    });
    describe("refresh values", function() {
        it("values should be resetted", function() {
            class_db_test_list.createListObjects();
        });
    });

    describe("check start page", function() {
        var trainer = new ClassTrainer();
        var test_voc_object_1 = {
            voc_id: "11",
            list_id: "7",
            question: "eins",
            answer: ["one"],
            answer_id: ["10"],
            right: [0],
            wrong: [0],
            rating: [-1],
            last_access: ["1234567890"],
            multi_choice: ["0"],
            img_id: ["0"],
            importance: [0.5],
        };
        beforeEach(function() {
            spyOn(trainer, "getEncodedArray").and.callFake(function() {
                var array = [test_voc_object_1];
                return array;
            });
            trainer.step = 0;
            trainer.poolnode = 0;
            trainer.vocs_loaded = false;
            trainer.check();
        });
        it("answer textarea should exist", function() {
            expect("#" + answer_textarea_id).toExist();
        });
        it("question_div should exist", function() {
            expect("#" + question_div).toExist();
        });
        it("question_div should contain two", function() {
            var expected_value = test_voc_object_1.question[0];
            expect("#" + question_div).toContainText(expected_value);
        });
        it("check enter", function() {
            spyOn(trainer, "check");
            $("#" + answer_textarea_id).trigger({
                type: 'keypress',
                which: '13'
            });
            expect(trainer.check).toHaveBeenCalled();
        });
        it('check button should work', function() {
            spyOn(trainer, "check");
            $("#" + trainer.answer_check_button_id).trigger("click");
            expect(trainer.check).toHaveBeenCalled();
        });
        describe("check firstvocllist object", function() {
            it("check object", function() {
                var vocllist_first_object = trainer.vocllist.first.data;
                var expected_object = {
                    id: class_db_test_list.complete_array[3].voc_id,
                    question: class_db_test_list.complete_array[3].question,
                    answer_id: class_db_test_list.complete_array[3].answer_id,
                    answer: class_db_test_list.complete_array[3].answer,
                    right: class_db_test_list.complete_array[3].right,
                    wrong: class_db_test_list.complete_array[3].wrong,
                    rating: class_db_test_list.complete_array[3].rating,
                    multi_choice: class_db_test_list.complete_array[3].multi_choice
                };
                var given_object = {
                    id: vocllist_first_object.id,
                    question: vocllist_first_object.question,
                    answer_id: vocllist_first_object.answer_id[0],
                    answer: vocllist_first_object.answer[0],
                    right: String(vocllist_first_object.right[0]),
                    wrong: String(vocllist_first_object.wrong[0]),
                    rating: String(vocllist_first_object.rating[0]),
                    multi_choice: String(vocllist_first_object.multi_choice[0])
                };
                expect(expected_object).toEqual(given_object);
            });
        });
    });
    describe("check buttons", function() {
        var trainer = new ClassTrainer();
        var test_voc_object_1 = {
            voc_id: "11",
            list_id: "7",
            question: "eins",
            answer: ["one"],
            answer_id: ["10"],
            right: [0],
            wrong: [0],
            rating: [-1],
            last_access: ["1234567890"],
            multi_choice: ["0"],
            img_id: ["0"],
            importance: [0.5],
        };
        it("values should be resetted", function() {
            class_db_test_list.createListObjects();
        });
        beforeEach(function() {
            spyOn(trainer, "getEncodedArray").and.callFake(function() {
                var array = [test_voc_object_1];
                return array;
            });
            class_db_test_list.createListObjects();
            trainer.poolsize = 3;
            trainer.pool_size_max = 8;
            trainer.pool_size_min = 2;
            trainer.step = 0;
            trainer.poolnode = 0;
            trainer.vocpool = new LinkedList.Circular();
            trainer.ismulti = 0;
            trainer.skipn = 5;
            trainer.still = 0;
            trainer.correctanswers = [];
            trainer.vocllist = new LinkedList.Circular();
            trainer.node = 0;
            trainer.vocs_loaded = false;
            trainer.probable_answer = 0;
            trainer.check();
            trainer.check();
        });

        it('check button', function() {
            spyOn(trainer, "check");
            $("#" + trainer.answer_check_button_id).trigger("click");
            expect(trainer.check).toHaveBeenCalled();
        });
        it('accept button', function() {
            spyOn(trainer, "correct_answer");
            $("#" + trainer.answer_accept_button_id).trigger("click");
            expect(trainer.correct_answer).toHaveBeenCalled();
        });
    });
    describe("check correct answer", function() {
        var trainer = new ClassTrainer();
        var test_voc_object_1 = {
            voc_id: "11",
            list_id: "7",
            question: "eins",
            answer: ["one"],
            answer_id: ["10"],
            right: [0],
            wrong: [0],
            rating: [-1],
            last_access: ["1234567890"],
            multi_choice: ["0"],
            img_id: ["0"],
            importance: [0.5],
        };
        it("values should be resetted", function() {
            class_db_test_list.createListObjects();
        });
        beforeEach(function() {
            spyOn(trainer, "getEncodedArray").and.callFake(function() {
                var array = [test_voc_object_1];
                return array;
            });
            class_db_test_list.createListObjects();
            trainer.poolsize = 3;
            trainer.pool_size_max = 8;
            trainer.pool_size_min = 2;
            trainer.step = 0;
            trainer.poolnode = 0;
            trainer.vocpool = new LinkedList.Circular();
            trainer.ismulti = 0;
            trainer.skipn = 5;
            trainer.still = 0;
            trainer.correctanswers = [];
            trainer.vocllist = new LinkedList.Circular();
            trainer.node = 0;
            trainer.vocs_loaded = false;
            trainer.probable_answer = 0;
            trainer.check();
            trainer.vocllist.at(0).data.right = [0];
            trainer.vocllist.at(0).data.wrong = [0];
            trainer.vocllist.at(0).data.rating = [0];
            trainer.check();
            trainer.correct_answer();
        });
        describe("check ll_object", function() {
            var ll_object;
            it("right", function() {
                ll_object = trainer.vocllist.at(0).data;
                given_right = ll_object.right[0];
                expected_right = test_voc_object_1.right[0] + 1;
                expect(given_right).toBe(expected_right);
            });
            it("wrong", function() {
                ll_object = trainer.vocllist.at(0).data;
                given_wrong = ll_object.wrong[0];
                expected_wrong = test_voc_object_1.wrong[0];
                expect(given_wrong).toBe(expected_wrong);
            });
            it("rating", function() {
                ll_object = trainer.vocllist.at(0).data;
                given_rating = ll_object.rating[0];
                rating_before = test_voc_object_1.rating[0];
                expected_rating = Math.round((rating_before + 1) * 10) / 10;
                expect(given_rating).toBe(expected_rating);
            });
            it("ok", function() {
                given_ok = trainer.vocllist.at(0).data.ok[0];
                expected_ok = 1;
                expect(given_ok).toBe(expected_ok);
            });
            it('list should been finished', function() {
                expect(trainer.list_is_finished).toBe(true);
            });
        });
        describe("check db", function() {
            var answer_id = test_voc_object_1.answer_id[0];
            it("values should be resetted", function() {
                class_db_test_list.createListObjects();
            });
            it("right", function() {
                var obj = {
                    table: class_trainer_info.voc_user_data_table.name,
                    primary: class_trainer_info.voc_user_data_table.id,
                    primary_value: answer_id,
                    key: class_trainer_info.voc_user_data_table.right_row
                };
                given_right = class_ajax.masterAjaxFunction("getValue", obj);
                expected_right = test_voc_object_1.right[0] + 1;
                expect(given_right).toBe(expected_right);
            });
            it("wrong", function() {
                var obj = {
                    table: class_trainer_info.voc_user_data_table.name,
                    primary: class_trainer_info.voc_user_data_table.id,
                    primary_value: answer_id,
                    key: class_trainer_info.voc_user_data_table.wrong_row
                };
                given_wrong = class_ajax.masterAjaxFunction("getValue", obj);
                expected_wrong = test_voc_object_1.wrong[0];
                expect(given_wrong).toBe(expected_wrong);
            });
            it("rating", function() {
                var obj = {
                    table: class_trainer_info.voc_user_data_table.name,
                    primary: class_trainer_info.voc_user_data_table.id,
                    primary_value: answer_id,
                    key: class_trainer_info.voc_user_data_table.rating_row
                };
                given_rating = class_ajax.masterAjaxFunction("getValue", obj);
                expected_right = test_voc_object_1.rating[0] + 1;
                expected_right = Math.round(expected_right * 10) / 10;
                expect(given_rating).toBe(expected_right);
            });
        });
    });
    describe("check wrong answer", function() {
        var trainer = new ClassTrainer();
        var answer_id = class_db_test_list.complete_array[0].answer_id;
        var test_voc_object_1 = {
            voc_id: "11",
            list_id: "7",
            question: "eins",
            answer: ["one"],
            answer_id: ["10"],
            right: [0],
            wrong: [0],
            rating: [-1],
            last_access: ["1234567890"],
            multi_choice: ["0"],
            img_id: ["0"],
            importance: [0.5],
        };
        it("values should be resetted", function() {
            class_db_test_list.createListObjects();
        });
        beforeEach(function() {
            spyOn(trainer, "getEncodedArray").and.callFake(function() {
                var array = [test_voc_object_1];
                return array;
            });
            class_db_test_list.createListObjects();
            trainer.poolsize = 3;
            trainer.pool_size_max = 8;
            trainer.pool_size_min = 2;
            trainer.step = 0;
            trainer.poolnode = 0;
            trainer.vocpool = new LinkedList.Circular();
            trainer.ismulti = 0;
            trainer.skipn = 5;
            trainer.still = 0;
            trainer.correctanswers = [];
            trainer.vocllist = new LinkedList.Circular();
            trainer.node = 0;
            trainer.vocs_loaded = false;
            trainer.probable_answer = 0;
            trainer.check();
            trainer.vocllist.at(0).data.wrong = [0];
            trainer.check();
            trainer.check();
        });
        it("answer textarea should exist", function() {
            expect("#" + answer_textarea_id).toExist();
        });
        it("question_div should exist", function() {
            expect("#" + question_div).toExist();
        });
        it("question_div should contain correct_value", function() {
            expect("#" + question_div).toContainText(test_voc_object_1.question);
        });
        describe("check ll_object", function() {
            var ll_object;
            it("right", function() {
                ll_object = trainer.poolnode.prev.data;
                given_right = ll_object.right[0];
                expected_right = test_voc_object_1.right[0];
                expect(given_right).toBe(expected_right);
            });
            it("wrong", function() {
                ll_object = trainer.poolnode.prev.data;
                given_wrong = ll_object.wrong[0];
                expected_wrong = test_voc_object_1.wrong[0] + 1;
                expect(given_wrong).toBe(expected_wrong);
            });
            it("rating", function() {
                ll_object = trainer.poolnode.prev.data;
                given_rating = ll_object.rating[0];
                rating_before = test_voc_object_1.rating[0];
                expected_rating = rating_before * -0.1 - 1.1;
                expect(given_rating).toBe(expected_rating);
            });
            it("ok", function() {
                given_ok = ll_object.ok[0];
                expected_ok = 0;
                expect(given_ok).toBe(expected_ok);
            });
        });
        describe("check db", function() {
            var answer_id = test_voc_object_1.answer_id[0];
            it("values should be resetted", function() {
                class_db_test_list.createListObjects();
            });
            it("right", function() {
                var obj = {
                    table: class_trainer_info.voc_user_data_table.name,
                    primary: class_trainer_info.voc_user_data_table.id,
                    primary_value: answer_id,
                    key: class_trainer_info.voc_user_data_table.right_row
                };
                given_right = parseFloat(class_ajax.getValue(obj), 10);
                expected_right = test_voc_object_1.right[0];
                expect(given_right).toBe(expected_right);
            });
            it("wrong", function() {
                var obj = {
                    table: class_trainer_info.voc_user_data_table.name,
                    primary: class_trainer_info.voc_user_data_table.id,
                    primary_value: answer_id,
                    key: class_trainer_info.voc_user_data_table.wrong_row
                };
                given_wrong = parseFloat(class_ajax.getValue(obj), 10);
                expected_wrong = test_voc_object_1.wrong[0] + 1;
                expect(given_wrong).toBe(expected_wrong);
            });
            it("rating", function() {
                var obj = {
                    table: class_trainer_info.voc_user_data_table.name,
                    primary: class_trainer_info.voc_user_data_table.id,
                    primary_value: answer_id,
                    key: class_trainer_info.voc_user_data_table.rating_row
                };
                given_right = parseFloat(class_ajax.getValue(obj), 10);
                expected_right = test_voc_object_1.rating * -0.1 - 1.1;
                expect(given_right).toBe(expected_right);
            });
        });
    });

    describe('check custom ll', function() {
        it('refresh', function() {
            class_db_test_list.createListObjects();
        });
        beforeEach(function() {
            spyOn(trainer, "getEncodedArray").and.callFake(function() {
                var obj_1 = {
                    voc_id: "10",
                    list_id: "7",
                    question: "Zahlen",
                    answer: ["one", "two", "three"],
                    answer_id: ["7", "8", "9"],
                    right: ["0", "0", "0"],
                    wrong: ["0", "0", "0"],
                    rating: ["-0.5", "-0.5", "-0.5"],
                    last_access: ["1234567890", "1234567890", "1234567890"],
                    multi_choice: ["0", "0", "0"],
                    img_id: ["0", "0", "0"],
                    importance: ["-1", "-1", "-1"],
                };
                var obj_2 = {
                    voc_id: "11",
                    list_id: "7",
                    question: "eins",
                    answer: ["one"],
                    answer_id: ["10"],
                    right: ["0"],
                    wrong: ["0"],
                    rating: ["-1"],
                    last_access: ["1234567890"],
                    multi_choice: ["0"],
                    img_id: ["0"],
                    importance: ["0.5"],
                };
                var array = [obj_1, obj_2];
                return array;
            });
            trainer.poolsize = 3;
            trainer.pool_size_max = 8;
            trainer.pool_size_min = 2;
            trainer.step = 0;
            trainer.poolnode = 0;
            trainer.vocpool = new LinkedList.Circular();
            trainer.ismulti = 0;
            trainer.skipn = 5;
            trainer.still = 0;
            trainer.correctanswers = [];
            trainer.vocllist = new LinkedList.Circular();
            trainer.node = 0;
            trainer.vocs_loaded = false;
            trainer.probable_answer = 0;
            trainer.check();
            trainer.check();
            trainer.correct_answer();
            trainer.check();
            trainer.correct_answer();
            trainer.check();
            trainer.correct_answer();
            trainer.check();
            trainer.correct_answer();
            trainer.check();
            trainer.correct_answer();
            trainer.check();
            trainer.correct_answer();
            trainer.check();
            trainer.correct_answer();
            trainer.check();
            trainer.correct_answer();
        });
        it('list should been finished', function() {
            expect(trainer.list_is_finished).toBeTruthy();
        });

    });
    describe("check rating arr", function() {
        it("check ratings", function() {
            var data = {
                answer_id: [7, 8, 9],
                ok: [1, 0, 0],
                right: [0, 0, 0],
                wrong: [0, 0, 0],
                rating: [2, 0, 0]
            };
            var new_ratings = class_ajax.trainerUpdateVocRating(data);
            var expected_value = new_ratings[0];
            expect(expected_value).toBe(3);

        });
        it("check ratings", function() {
            var data = {
                answer_id: [10],
                ok: [1],
                right: [0],
                wrong: [0],
                rating: [2]
            };
            var new_ratings = class_ajax.trainerUpdateVocRating(data);
            var expected_value = new_ratings[0];
            expect(expected_value).toBe(3);

        });
        it("check ratings", function() {
            var data = {
                answer_id: [7, 8, 9],
                ok: [0, 0, 0],
                right: [0, 0, 0],
                wrong: [0, 0, 0],
                rating: [-0.5, 0, 0]
            };
            var new_ratings = class_ajax.trainerUpdateVocRating(data);
            var expected_value = new_ratings[0];
            expect(expected_value).toBe(-1.05);

        });
        it("check ratings", function() {
            var data = {
                answer_id: [10],
                ok: [0],
                right: [0],
                wrong: [0],
                rating: [-1.1]
            };
            var new_ratings = class_ajax.trainerUpdateVocRating(data);
            var expected_value = new_ratings[0];
            expect(expected_value).toBe("-1.1");

        });
    });
    describe('check the functionality of check_old', function() {
        var trainer = new ClassTrainer();
        trainer.poolsize = 3;
        trainer.pool_size_max = 8;
        trainer.pool_size_min = 2;
        trainer.step = 0;
        trainer.poolnode = 0;
        trainer.vocpool = new LinkedList.Circular();
        trainer.ismulti = 0;
        trainer.skipn = 5;
        trainer.still = 0;
        trainer.correctanswers = [];
        trainer.vocllist = new LinkedList.Circular();
        trainer.node = 0;
        trainer.vocs_loaded = false;
        trainer.probable_answer = 0;
        it('should behave...', function() {
            spyOn(trainer, "getEncodedArray").and.callFake(function() {
                var array = complete_test_array;
                return array;
            });
            console.log(complete_test_array);
            console.log(trainer.poolnode.data);
            trainer.check();
            trainer.check();
            // trainer.correct_answer();
            // trainer.check();
            // trainer.correct_answer();
            // trainer.check();
            // trainer.correct_answer();
            // trainer.check();
            // trainer.correct_answer();
            // trainer.check();
            // trainer.correct_answer();
            // trainer.check();
            // trainer.correct_answer();
            // trainer.check();
            // trainer.correct_answer();
        });

    });
    describe("refresh values", function() {
        it("values should be resetted", function() {
            class_db_test_list.createListObjects();
        });
    });
});