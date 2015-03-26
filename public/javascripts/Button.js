function Button() {


    this.msg = "hello world";

}

Button.prototype.hideMessage = function() {


    $("#pMsg").html("");
};


Button.prototype.showMessage = function() {
    $("#pMsg").html($('#txtMessage').val());
    $("#moin").html("moin");
};


Button.prototype.setUpHTMLFixture = function() {
    fixture = readFixtures("button.html");
    fixture = createFixtureString(fixture);
    setFixtures(fixture);

};

Button.prototype.setListener = function() {
    var button = this;
    $('#btnShowMessage').click(function() {
        button.showMessage();
    });
    $('#btnHideMessage').click(function() {
        button.hideMessage();
    });


};

var button = new Button();
button.setListener();