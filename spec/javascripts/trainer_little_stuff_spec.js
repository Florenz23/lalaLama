describe("ClassTrainer little functions***", function() {
    var class_ajax = new ClassAjax();
    var class_trainer_info = new ClassTrainerInfo();
    var class_db_test_list = new ClassDbTestList();
    var trainer = new ClassTrainer();
    var answer_textarea_id = "answer";
    var question_div = "question";

    beforeEach(function() {
        trainer.setUpHTMLFixture();
    });
    describe("refresh values", function() {
        it("values should be resetted", function() {
            class_db_test_list.refreshTestListValues();
        });
    });

    describe("display vocs to learn", function() {
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
            class_db_test_list.refreshTestListValues();
        });
        beforeEach(function() {
            spyOn(trainer, "getEncodedArray").and.callFake(function() {
                var array = [test_voc_object_1, test_voc_object_1, test_voc_object_1, test_voc_object_1, test_voc_object_1, test_voc_object_1];
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
        });

        it('vocs_to_learn should been set', function() {
            expect(trainer.vocs_to_learn).toBe(6);
        });
        it('div should exist', function() {
            expect("#total_vocs").toExist();
        });
        it('div_should_contain_the_correct_number', function() {
            expect("#total_vocs").toContainText(6);
        });
    });
    describe("display recent vocs to learn", function() {
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

        it('should behave...', function() {
            spyOn(trainer, "getEncodedArray").and.callFake(function() {
                var array = [test_voc_object_1, test_voc_object_1, test_voc_object_1, test_voc_object_1, test_voc_object_1, test_voc_object_1];
                return array;
            });
            trainer.poolsize = 2;
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
            expect("#left_vocs").toContainText(1);
            expect("#total_vocs").toExist();
            expect("#total_vocs").toContainText(6);

        });

        it('vocs_to_learn should been set', function() {
            expect(trainer.mastered_vocs).toBe(1);
        });
        it("values should be resetted", function() {
            class_db_test_list.refreshTestListValues();
        });
    });
    describe('setPoolsize', function() {
        describe('decreasePoolsize', function() {
            beforeEach(function() {
                trainer.poolsize = 5;
                trainer.decreasePoolsize();
                trainer.addListener();
            });
            it('should be defined', function() {
                expect(trainer.decreasePoolsize).toBeDefined();
            });
            it('image should exist', function() {
                expect("#" + trainer.decrease_poolsize).toExist();
            });
            it('should behave...', function() {
                spyOn(trainer, "decreasePoolsize");
                $("#" + trainer.decrease_poolsize).trigger("click");
                expect(trainer.decreasePoolsize).toHaveBeenCalled();
            });
            it('should work', function() {
                expect(trainer.poolsize).toBe(4);
            });
            it('div should be refreshed', function() {
                expect("#" + trainer.recent_poolsize_div).toContainText(4);
            });
        });
        describe('increasePoolsize', function() {
            beforeEach(function() {
                trainer.poolsize = 5;
                trainer.increasePoolsize();
                trainer.addListener();
            });
            it('should be defined', function() {
                expect(trainer.increasePoolsize).toBeDefined();
            });
            it('image should exist', function() {
                expect("#" + trainer.increase_poolsize).toExist();
            });
            it('should behave...', function() {
                spyOn(trainer, "increasePoolsize");
                $("#" + trainer.increase_poolsize).trigger("click");
                expect(trainer.increasePoolsize).toHaveBeenCalled();
            });
            it('should work', function() {
                expect(trainer.poolsize).toBe(6);
            });
            it('div should be refreshed', function() {
                expect("#" + trainer.recent_poolsize_div).toContainText(6);
            });
        });
    });
});