 ClassListEditorNewVocEdit.prototype = $.extend({},
     ClassDivHeightSetter.prototype
 );

 function ClassListEditorNewVocEdit() {

 }


 ClassListEditorNewVocEdit.prototype.addRemoveNewVocDivListener = function() {
     var new_answer_button_id = this.voc_delete_button_id_prefix + 0;
     var class_new_voc = this;
     $("#" + new_answer_button_id).click(function() {
         class_new_voc.removeNewVocField();
     });
 };

 ClassListEditorNewVocEdit.prototype.removeNewVocField = function() {

     var new_voc_div = this.voc_div_id_prefix + 0;
     $("#" + new_voc_div).remove();

 };

 ClassListEditorNewVocEdit.prototype.addSaveVocListener = function() {
     var class_new_voc = this;
     $("#" + this.answer_input_id_prefix + 0).keypress(function(e) {
         if (e.keyCode == 9) {
             class_new_voc.saveNewVoc();
         }
     });
 };