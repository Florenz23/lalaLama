 ClassListEditorNewVocCreateField.prototype = $.extend({},
     ClassListEditorNewVocEdit.prototype
 );

 function ClassListEditorNewVocCreateField() {
     HtmlIdsAndClasses.call(this);
     this.question = new ClassListEditorNewVocCreateFieldQuestion();
     this.answer = new ClassListEditorNewVocCreateFieldAnswer();
     this.voc_menu = new ClassListEditorNewVocCreateFieldVocMenu();
     this.div_to_display_list_in_id = "new_voc_div";
 }

 ClassListEditorNewVocCreateField.prototype.createNewVocField = function(parameter) {
     this.createDivs();
     this.addListener_1();
 };

 ClassListEditorNewVocCreateField.prototype.createDivs = function() {
     this.createNewVocDiv();
     this.question.createQuestionField();
     this.answer.createAnswerField();
     this.voc_menu.createVocMenuField();
 };

 ClassListEditorNewVocCreateField.prototype.addListener_1 = function() {
     this.addRemoveNewVocDivListener();
 };



 ClassListEditorNewVocCreateField.prototype.createNewVocDiv = function() {
     var html = "";
     html += "<div id='" + this.voc_div_id_prefix + 0 + "'";
     html += "class='" + this.voc_div_class + "'>";
     html += "</div>";
     $("#" + this.div_to_display_list_in_id).html(html);
 };