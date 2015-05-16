 function ClassDivHeightSetter() {
     HtmlIdsAndClasses.call(this);
 }

 ClassDivHeightSetter.prototype.setDivHeight = function() {
     var class_list_editor = this;
     $('.voc_div').each(function(e) {
         div_id = $(this).attr("id");
         div_id = new ClassListEditor().getVocIdFromVocDivId.call(this, div_id);
         if (typeof(div_id) != "undefined") {
             class_list_editor.setMainDivHeightByVocId(div_id);
         }
     });
 };

 ClassDivHeightSetter.prototype.setMainDivHeightByVocId = function(voc_nr) {
     this.refreshMainDivHeight(voc_nr);
     var question = this.getQuestionDivHeight(voc_nr);
     var height = this.getHighestDivValue(voc_nr);
     var voc_div_height = height + 10;
     this.setVocDivHeight(voc_nr, voc_div_height);
     this.setQuestionMainDivHeight(voc_nr, height);
     this.setAnswerMainDivHeight(voc_nr, height);
     this.setVocMenuDivHeight(voc_nr, height);

 };

 ClassDivHeightSetter.prototype.refreshMainDivHeight = function(voc_nr) {

     this.getQuestionDiv(voc_nr).css("height", "");
     this.getAnswerDiv(voc_nr).css("height", "");
     this.getVocMenuDiv(voc_nr).css("height", "");

 };

 ClassDivHeightSetter.prototype.getHighestDivValue = function(voc_nr) {
     var max_height = 0;
     var question_div_height = this.getQuestionDivHeight(voc_nr);
     var answer_div_height = this.getAnswerDivHeight(voc_nr);
     var voc_menu_div_height = this.getVocMenuDivHeight(voc_nr);
     max_height = question_div_height;
     if (answer_div_height > max_height) {
         max_height = answer_div_height;
     }
     if (voc_menu_div_height > max_height) {
         max_height = voc_menu_div_height;
     }
     max_height = max_height + 10;

     return max_height;
 };

 ClassDivHeightSetter.prototype.getQuestionDivHeight = function(voc_nr) {

     var height = this.getQuestionDiv(voc_nr).height();
     return height;

 };

 ClassDivHeightSetter.prototype.getAnswerDivHeight = function(voc_nr) {

     return this.getAnswerDiv(voc_nr).height();

 };

 ClassDivHeightSetter.prototype.getVocMenuDivHeight = function(voc_nr) {

     return this.getVocMenuDiv(voc_nr).height();

 };

 ClassDivHeightSetter.prototype.getVocDiv = function(voc_nr) {

     var div_id = this.voc_div_id_prefix + voc_nr;
     var voc_div = $("#" + div_id);
     return voc_div;

 };
 ClassDivHeightSetter.prototype.getQuestionDiv = function(voc_nr) {

     var div_id = this.voc_div_id_prefix + voc_nr;
     var question_class = " ." + this.question_main_div_class;
     var question_div = $("#" + div_id + question_class);
     return question_div;

 };

 ClassDivHeightSetter.prototype.getAnswerDiv = function(voc_nr) {
     var div_id = this.voc_div_id_prefix + voc_nr;
     var answer_class = " ." + this.answer_main_div_class;
     var answer_div = $("#" + div_id + answer_class);
     return answer_div;

 };

 ClassDivHeightSetter.prototype.getVocMenuDiv = function(voc_nr) {

     var div_id = this.voc_div_id_prefix + voc_nr;
     var voc_menu_class = " ." + this.voc_menu_div_class;
     var voc_menu_div = $("#" + div_id + voc_menu_class);
     return voc_menu_div;

 };


 ClassDivHeightSetter.prototype.setVocDivHeight = function(voc_nr, height) {

     var voc_div = this.getVocDiv(voc_nr);
     voc_div.height(height);

 };


 ClassDivHeightSetter.prototype.setAnswerMainDivHeight = function(voc_nr, height) {

     var answer_div = this.getAnswerDiv(voc_nr);
     answer_div.height(height);

 };

 ClassDivHeightSetter.prototype.setQuestionMainDivHeight = function(voc_nr, height) {

     var question_div = this.getQuestionDiv(voc_nr);
     question_div.height(height);

 };
 ClassDivHeightSetter.prototype.setVocMenuDivHeight = function(voc_nr, height) {

     var voc_menu_div = this.getVocMenuDiv(voc_nr);
     voc_menu_div.height(height);

 };