describe("test helper functions:", function() {
    var string_with_single_tag = '<html>moin<script type="text/javascript"jquery.js"></script></html>';
    var string_with_multi_tag = '<html>moin<script type="text/javascript"jquery.js"></script><script type="text/javascript"jquery.js"></script></html>';
    var string_after = '<html>moin</html>';
    describe("createFixtureString", function() {
        it("createFixtureString defined", function() {
            expect(createFixtureString).toBeDefined();
        });
        it("createFixtureString should handle a single javascrit tag", function() {
            expect(string_after).toBe(createFixtureString(string_with_single_tag));
        });
        it("createFixtureString should handle a multi javascrit tag", function() {
            expect(string_after).toBe(createFixtureString(string_with_multi_tag));
        });
    });
});