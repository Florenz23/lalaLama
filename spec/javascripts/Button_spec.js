describe("DOM TESTS:***************", function() {
    var button = new Button();
    beforeEach(function() {   
        button.setUpHTMLFixture();
        button.setListener();
    });
    describe("Button Click Event Tests", function() {
        var spyEvent;


        it("should invoke the btnShowMessage click event.", function() {
            spyEvent = spyOnEvent('#btnShowMessage', 'click');
            $('#btnShowMessage').trigger("click");

            expect('click').toHaveBeenTriggeredOn('#btnShowMessage');
            expect(spyEvent).toHaveBeenTriggered();
        });

        it("should invoke the btnHideMessage click event.", function() {
            spyEvent = spyOnEvent('#btnHideMessage', 'click');
            $('#btnHideMessage').trigger("click");

            expect('click').toHaveBeenTriggeredOn('#btnHideMessage');
            expect(spyEvent).toHaveBeenTriggered();
        });
        it("show message should beeen called...", function() {
            spyOn(button, "showMessage").and.callThrough();
            $('#btnShowMessage').trigger("click");
            expect(button.showMessage).toHaveBeenCalled();
        });
        it("hide message should been called", function() {
            spyOn(button, "hideMessage").and.callThrough();
            $('#btnHideMessage').trigger("click");
            expect(button.hideMessage).toHaveBeenCalled();
        });
    });

    describe("Show message tests", function() {
        beforeEach(function() {   
            $('#txtMessage').val(button.msg);
            $('#btnShowMessage').trigger("click");
        });

        it("should display the message when button is clicked.", function() {
            expect($('#pMsg')).toHaveText($('#txtMessage').val());
            expect($('#moin')).toHaveText("moin");
        });
    });

    describe("Hide message tests", function() {
        beforeEach(function() {   
            $('#pMsg').text(button.msg);
            $('#btnHideMessage').trigger("click");
        });

        it("should remove the message when button is clicked.", function() {
            expect($('#pMsg')).toHaveText("");
        });
    });


});