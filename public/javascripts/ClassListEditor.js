 function ClassListEditor() {

     HtmlIdsAndClasses.call(this);
     this.trainer_info = new ClassTrainerInfo();
     this.class_ajax = new ClassAjax();
     this.answer_edit = new ClassListEditorAnswerEdit();
     this.update_question = new ClassListEditorUpdateQuestion();
     this.update_answer = new ClassListEditorUpdateAnswer();
     this.delete_voc = new ClassListEditorDeleteVoc();
     this.save_new_voc = new ClassListEditorSaveNewVoc();
     this.class_elastic = new ClassElastic();
     this.voc_div_id_prefix = "voc_div_";
     this.voc_div_class = "voc_div";

     this.voc_form_class = "pure-form pure-g";

     this.voc_id = "not_set";
     this.answer_id = "not_set";

 }
 ClassListEditor.prototype.addListener = function() {

     this.addSetVocIdListener();
     this.answer_edit.addListener();
     this.update_question.addListener();
     this.update_answer.addListener();
     this.delete_voc.addListener();
     this.save_new_voc.addListener();
     this.dynamicInputListener();

 };

 ClassListEditor.prototype.dynamicInputListener = function() {

     this.class_elastic.iniElastic();

 };

 ClassListEditor.prototype.setUpHTMLFixture = function() {
     fixture = readFixtures("list_editor_fixture.html");
     fixture = createFixtureString(fixture);
     setFixtures(fixture);
 };

 ClassListEditor.prototype.addNewAnswerField = function() {

     this.answer_edit.addNewAnswerField();

 };


 ClassListEditor.prototype.addSetVocIdListener = function() {
     var class_list_editor = this;
     $("." + this.voc_div_class).mouseover(function() {
         class_list_editor.setVocId(this.id);
     });
 };
 ClassListEditor.prototype.setVocId = function(complete_voc_id_string) {

     var voc_id = this.getVocIdFromVocDivId(complete_voc_id_string);
     this.voc_id = voc_id;
     this.answer_edit.voc_id = voc_id;
     this.update_question.voc_id = voc_id;
     this.update_answer.voc_id = voc_id;
     this.delete_voc.voc_id = voc_id;
     this.save_new_voc.voc_id = voc_id;

 };

 ClassListEditor.prototype.getVocIdFromVocDivId = function(complete_voc_id_string) {
     HtmlIdsAndClasses.call(this);
     var voc_id_string = complete_voc_id_string.toString().replace(this.voc_div_id_prefix, "");
     return parseInt(voc_id_string, 10);
 };