describe("ClassAjaxSpec:", function() {

    beforeEach(function() {
        class_ajax = new ClassAjax();
        class_ajax.setDatabase('test');
    });

    describe("ClassDbChecker", function() {


        describe("createTestTable: ", function() {
            it("createTestTable should be defined", function() {
                expect(class_ajax.createTestTable).toBeDefined();
            });
            it("testTable should exist", function() {
                expect(class_ajax.deleteTable("test_table")).toBe('1');
                expect(class_ajax.createTestTable()).toBe('1');
            });
        });

        describe("checkIfTableExists:", function() {
            it("Function check checkIfTableExists should be defined", function() {
                expect(class_ajax.checkIfTableExists).toBeDefined();
            });
            it("checkIfTableExists should work", function() {
                expect(class_ajax.checkIfTableExists('test_table')).toBe('1');
                expect(class_ajax.checkIfTableExists('hjh67')).not.toBe('1');
            });
        });

        describe("insertValuesIntoTestTable:", function() {
            it("class_ajax.insertValuesIntoTestTable should be defined", function() {
                expect(class_ajax.insertValuesIntoTestTable).toBeDefined();
            });
            it("table should be emptied", function() {
                expect(class_ajax.emptyTable("test_table")).toBe('1');
            });
            it("check last_insert_id", function() {
                expect(class_ajax.insertValuesIntoTestTable()).toBe('3');
            });
        });

        describe("checkIfValueExists:", function() {
            it("checkIfValueExists should be defined", function() {
                expect(class_ajax.checkIfValueExists).toBeDefined();
            });
            it("check functionality", function() {
                var data = {
                    table: "test_table",
                    primary: "id",
                    primary_value: "1",
                    key: "answer",
                    key_value: "one"
                };
                expect(class_ajax.checkIfValueExists(data)).toBe('1');
                data = {
                    table: "test_table",
                    primary: "id",
                    primary_value: "1",
                    key: "answer",
                    key_value: "peter"
                };
                expect(class_ajax.checkIfValueExists(data)).toBeFalsy();
            });
        });
        describe("checkIfValueExistsById:", function() {
            it("checkIfValueExists should be defined", function() {
                expect(class_ajax.checkIfValueExistsById).toBeDefined();
            });
            it("check functionality", function() {
                var data = {
                    table: "test_table",
                    primary: "id",
                    primary_value: "1",
                };
                expect(class_ajax.checkIfValueExistsById(data)).toBe('1');
                data = {
                    table: "test_table",
                    primary: "id",
                    primary_value: "10",
                };
                expect(class_ajax.checkIfValueExistsById(data)).toBeFalsy();
            });
        });

    });

    describe("classDbFunctions:", function() {

        beforeEach(function() {
            class_ajax.setAjaxPhpFile("trainer/units/myUnit00/public/php/test/classDbFunctions.php");
        });

        describe("deleteTable:", function() {
            it("createTestTable, deleteTable should be defined", function() {
                expect(class_ajax.deleteTable).toBeDefined();
            });
            it("test table should be deleted", function() {
                expect(class_ajax.deleteTable("test_table")).toBe('1');
                expect(class_ajax.checkIfTableExists("test_table")).toBeFalsy();
            });
            it("table should be created again", function() {
                expect(class_ajax.createTestTable()).toBe('1');
            });
        });
        describe("countRows:", function() {
            it("function should be defined", function() {
                expect(class_ajax.countRows).toBeDefined();
            });
            it("test_table should be created and filled with the standard values", function() {
                expect(class_ajax.insertValuesIntoTestTable()).toBe('3');
                var data = {
                    table: "test_table",
                    primary: "id",
                    primary_value: "1",
                    key: "answer",
                    key_value: "one"
                };
                expect(class_ajax.checkIfValueExists(data)).toBe('1');
            });
            it("count rows should work", function() {
                expect(class_ajax.countRows("test_table")).toBe("3");
            });
            it("empty table again", function() {
                expect(class_ajax.emptyTable("test_table")).toBe('1');
            });
        });
        describe("empty Table:", function() {
            it("should be defined", function() {
                expect(class_ajax.emptyTable).toBeDefined();
            });
            it("emptyTable should", function() {
                expect(class_ajax.emptyTable("test_table")).toBe('1');
            });
            it("check if table is empty", function() {
                expect(class_ajax.countRows("test_table")).toBe("0");
            });
        });
        describe("insertValues:", function() {
            it("function should be defined", function() {
                expect(class_ajax.insertValues).toBeDefined();
            });
            it("insertion of test values should suceed", function() {
                var value_obj = {
                    "question": "zwei",
                    "answer": "four"
                };
                expect(class_ajax.createTestTable()).toBe('1');
                expect(class_ajax.insertValues("test_table", value_obj)).toBe('1');
                data = {
                    table: "test_table",
                    primary: "id",
                    primary_value: "1",
                    key: "answer",
                    key_value: "four"
                };
                expect(class_ajax.checkIfValueExists(data)).toBe('1');
            });
            it("empty table again", function() {
                expect(class_ajax.emptyTable("test_table")).toBe('1');
            });
        });

        describe("selectFrom:", function() {
            describe("both parts:", function() {
                var responeText = [{
                    id: '2',
                    question: 'eins',
                    answer: 'one'
                }, {
                    id: '3',
                    question: 'eins',
                    answer: 'two'
                }, {
                    id: '4',
                    question: 'eins',
                    answer: 'three'
                }];
                it("check if values exist", function() {
                    expect(class_ajax.deleteTable("test_table")).toBe('1');
                    expect(class_ajax.createTestTable()).toBe('1');
                    expect(class_ajax.insertValuesIntoTestTable()).toBe('3');
                    var data = {
                        table: "test_table",
                        primary: "id",
                        primary_value: "1",
                        key: "answer",
                        key_value: "one"
                    };
                    expect(class_ajax.checkIfValueExists(data)).toBe('1');
                    data.primary_value = "2";
                    data.key_value = "two";
                    expect(class_ajax.checkIfValueExists(data)).toBe('1');
                    data.primary_value = "3";
                    data.key_value = "three";
                    expect(class_ajax.checkIfValueExists(data)).toBe('1');
                });
                it("check ajax responseText", function() {
                    expect(responeText).toEqual([{
                        id: '2',
                        question: 'eins',
                        answer: 'one'
                    }, {
                        id: '3',
                        question: 'eins',
                        answer: 'two'
                    }, {
                        id: '4',
                        question: 'eins',
                        answer: 'three'
                    }]);
                });
                it("check ids", function() {
                    expect(responeText[0].id).toBe("2");
                    expect(responeText[1].id).toBe("3");
                    expect(responeText[2].id).toBe("4");
                });
                it("check question", function() {
                    expect(responeText[0].question).toBe("eins");
                    expect(responeText[1].question).toBe("eins");
                    expect(responeText[2].question).toBe("eins");
                });
                it("check question", function() {
                    expect(responeText[0].answer).toBe("one");
                    expect(responeText[1].answer).toBe("two");
                    expect(responeText[2].answer).toBe("three");
                });

                it("empty table again", function() {
                    expect(class_ajax.emptyTable("test_table")).toBe('1');
                });
            });

        });
        describe("deleteRow:", function() {
            it("createTestTable and insert Values", function() {
                expect(class_ajax.insertValuesIntoTestTable()).toBe('3');
            });
            it("function should not trigger mysql error", function() {
                data = {
                    table: "test_table",
                    primary: "id",
                    primary_value: "3",
                    key: "answer",
                    key_value: "three"
                };
                expect(class_ajax.checkIfValueExists(data)).toBe('1');
                expect(class_ajax.deleteRow("test_table", "id", "3")).toBe("1");
            });
            it("row should be deleted", function() {
                data = {
                    table: "test_table",
                    primary: "id",
                    primary_value: "3",
                    key: "answer",
                    key_value: "three"
                };
                expect(class_ajax.checkIfValueExists(data)).toBeFalsy();
            });
            it("empty table again", function() {
                expect(class_ajax.emptyTable("test_table")).toBe('1');
            });
        });
        describe("updateValue:", function() {
            it("function should be defined", function() {
                expect(class_ajax.updateValue).toBeDefined();
            });
            it("insert Test values into the table", function() {
                expect(class_ajax.insertValuesIntoTestTable()).toBe('3');
            });
            it("updateValue shouldd work", function() {
                var data = {
                    table: "test_table",
                    primary: "id",
                    primary_value: "2",
                    key: "answer",
                    key_value: "moin"
                };
                expect(class_ajax.checkIfValueExists(data)).toBeFalsy();
                expect(class_ajax.updateValue(data)).toBe('1');
                expect(class_ajax.checkIfValueExists(data)).toBe('1');
            });
        });
        describe("getValue", function() {
            it("should be defined", function() {
                expect(class_ajax.getValue).toBeDefined();
            });
            it("should return correct value", function() {
                var obj = {
                    table: "test_table",
                    primary: "id",
                    primary_value: "3",
                    key: "answer"
                };
                var expected_value = "three";
                var returned_value = class_ajax.getValue(obj);
                expect(returned_value).toBe(expected_value);
            });
        });
    });
});