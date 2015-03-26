describe("TestThisAndThat:", function() {
    it("test string", function() {
        string = "1";
        check = false;
        if (string == "1") {
            check = true;
        }
        expect(check).toBe(true);
    });
});