function stripSpaces(string) {

        var nstring = string.replace(/^\s+/g, "");
        nstring = nstring.replace(/\s+$/g, "");

        return nstring;

}
$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(!results){
        return false;
    }
    return results[1] || 0;
};

$('textarea').bind('keypress', function(e) {
    if ((e.keyCode || e.which) == 13) {
        //$(this).parents('form').submit();
        return false;
    }
});
jQuery.fn.elasticArea = function() {
    return this.each(function() {
        function resizeTextarea() {
            this.style.height = this.scrollHeight / 2 + 20 + 'px';
            this.style.height = this.scrollHeight + 20 + 'px';
        }
        $(this).keypress(resizeTextarea)
            .keydown(resizeTextarea)
            .keyup(resizeTextarea)
            .css('overflow', 'hidden');
        resizeTextarea.call(this);
    });
};
Array.prototype.max = function() {
    var max = this[0];
    var len = this.length;
    for (var i = 1; i < len; i++)
        if (this[i] > max) max = this[i];
    return max;
};
Array.prototype.min = function() {
    var min = this[0];
    var len = this.length;
    for (var i = 1; i < len; i++)
        if (this[i] < min) min = this[i];
    return min;
};
Array.prototype.maxat = function() {
    var max = this[0];
    var maxat = 0;
    var len = this.length;
    for (var i = 1; i < len; i++)
        if (this[i] > max) {
            max = this[i];
            maxat = i;
        }
    return maxat;
};
Array.prototype.minat = function() {
    var min = this[0];
    var minat = 0;
    var len = this.length;
    for (var i = 1; i < len; i++)
        if (this[i] < min) {
            min = this[i];
            minat = i;
        }
    return minat;
};
Array.prototype.in_array = function(needle) {
    for (var i = 0; i < this.length; i++) {
        if (needle === this[i])
            return true;
    }
    return false;
};