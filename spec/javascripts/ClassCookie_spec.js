describe("ClassCookie:", function() {
    class_cookie = new ClassCookie();
    it("to be defined", function() {
        expect(class_cookie).toBeDefined();
    });
    describe("checkIfCookieExists:", function() {
        it("should be defined", function() {
            expect(class_cookie.checkIfCookieExists).toBeDefined();
        });
        it("moin cookie should exist", function() {
            class_cookie.createCookie("moin", "test", 1);
            expect(class_cookie.checkIfCookieExists("moin")).toBe(true);
        });
        it("moin1 cookie should not exist", function() {
            expect(class_cookie.checkIfCookieExists("moin1")).toBe(false);
        });
    });
    describe("createCookie:", function() {
        it("should be defined", function() {
            expect(class_cookie.createCookie).toBeDefined();
        });
        it("cookie should be created", function() {
            class_cookie.createCookie("test_cookie", "test", 1);
            expect(class_cookie.checkIfCookieExists("test_cookie")).toBe(true);
        });
    });
    describe("readCookieValue:", function() {
        it("should be defined", function() {
            expect(class_cookie.readCookieValue).toBeDefined();
        });
        it("readCookie should have value", function() {
            var cookie = class_cookie.readCookieValue("test_cookie");
            expect(cookie).toBe("test");
        });
    });
    describe("eraseCookie", function() {
        it("should be defined", function() {
            expect(class_cookie.eraseCookie).toBeDefined();
        });
        it("should work", function() {
            class_cookie.eraseCookie("test_cookie");
            expect(class_cookie.checkIfCookieExists("test_cookie")).toBe(false);
        });
    });

});