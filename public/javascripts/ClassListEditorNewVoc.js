 function ClassListEditorNewVoc() {
     HtmlIdsAndClasses.call(this);

     this.create_field = new ClassListEditorNewVocCreateField();
     this.div_to_display_list_in_id = "new_voc_div";
     this.list_div_id = "list_div";
     this.test_list_id = "7";
     this.div_id = "new_voc_button";

     this.button_id = "new_voc";
     this.voc_div_id_prefix = "voc_div_";
     this.voc_div_class = "voc_div";

     this.new_question_value = "question";
     this.new_answer_value = "answer";

     this.answer_counter = 0;

     this.img_path = "../../../public/img/";
 }


 ClassListEditorNewVoc.prototype.addNewVocField = function() {
     this.create_field.createNewVocField();
 };

 ClassListEditorNewVoc.prototype.addListenerNewVoc = function() {
     var class_new_voc = this;
     $("#" + this.button_id).click(function() {
         class_new_voc.addNewVocField();
     });
 };


 ClassListEditorNewVoc.prototype.checkIfNewVocDivExists = function() {
     if ($("#" + this.div_id).length) {
         return true;
     }
     return false;
 };


 ClassListEditorNewVoc.prototype.focusNewQuestion = function() {

     $("#" + this.question_field_id_prefix + 0).focus();

 };
 ClassListEditorNewVoc.prototype.selectNewQuestion = function(parameter) {

     $("#" + this.new_question_field_id).select();

 };


 ClassListEditorNewVoc.prototype.removeNewVocField = function() {

     var new_voc_div = this.voc_div_id_prefix + 0;
     $("#" + new_voc_div).remove();

 };

 ClassListEditorNewVoc.prototype.saveNewVoc = function() {
     var id = this.test_list_id;
     this.writeNewVocIntoDb();
     new ClassDisplayList().displayList(id);
     this.addNewVocField();
 };

 ClassListEditorNewVoc.prototype.getNewQuestionValue = function() {

     return $("#" + this.question_field_id_prefix + 0).val();

 };
 ClassListEditorNewVoc.prototype.getNewAnswerValue = function(i) {

     return $("#" + this.answer_field_id_prefix + i).val();

 };

 ClassListEditorNewVoc.prototype.writeNewVocIntoDb = function() {
     var table = this.trainer_info.voc_table.name;
     var value_obj = this.createNewVocValueObj();
     var insert_id = this.class_ajax.insertValues(table, value_obj);
     return this.checkIfVocIsCreatedCorrectly(insert_id);
 };

 ClassListEditorNewVoc.prototype.createNewVocValueObj = function() {

     var question = this.getNewQuestionValue();
     var answer = this.getNewAnswerValue();
     var list_id = this.test_list_id;
     var value_obj = {
         question: question,
         answer: answer,
         list_id: list_id
     };
     return value_obj;

 };

 ClassListEditorNewVoc.prototype.checkIfVocIsCreatedCorrectly = function(insert_id) {

     if (insert_id < 1) {
         return false;
     }
     return insert_id;

 };


 ClassListEditorNewVoc.prototype.setUpHTMLFixture = function() {
     fixture = readFixtures("tree_list_fixture.html");
     fixture = createFixtureString(fixture);
     setFixtures(fixture);
 };