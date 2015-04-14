describe("ClassDisplayListGetVocs***", function() {
    var class_ajax = new ClassAjax();
    var class_db_test_list = new ClassDbTestList();
    var class_display_list = new ClassDisplayList();

    describe("db part", function() {
        it("getEncodedArray should been defined", function() {
            expect(class_display_list.getJsonData).toBeDefined();
        });
        it('check first voc', function() {
            var voc_array = class_db_test_list.complete_array;
            var expected = {
                voc_id: voc_array[0].voc_id,
                answer_id: voc_array[0].answer_id,
                question: voc_array[0].question,
                answer: voc_array[0].answer,
            };
            var list_id = voc_array[0].list_id;
            var given = class_display_list.getJsonData(list_id);
            expect(given[0].voc_id).toBe(expected.voc_id);
            expect(given[0].answer_id).toEqual(expected.answer_id);
            expect(given[0].question).toEqual(expected.question);
            expect(given[0].answer).toEqual(expected.answer);
        });
    });
});