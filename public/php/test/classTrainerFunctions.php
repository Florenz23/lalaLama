<?php
require_once "classDbFunctions.php";
require_once "classSessionHandler.php";

class classTrainerFunctions extends classDbFunctions {

	function __construct() {
		parent::__construct();
		$this->trainer_info = new ClassTrainerInfo();
		$session_handler = new classSessionHandler();
		$this->user_id = $session_handler->getUserId();
	}

	function getVocsEncoded($data) {
		$multi_array = $this->getVocs($data);
		$multi_array = json_encode($multi_array);
		return $multi_array;
	}
	function getVocs($data) {
		$voc_array = $this->getVocArray($data);
		$multi_array = $this->create3dArray($voc_array);
		return $multi_array;

	}
	function getVocArray($data) {
		$query =""
		. " SELECT v.`voc_id`,v.`list_id`,v.`question`, a.`answer_id`, a.`answer`, u.`right`, u.`wrong`, u.`rating`,u.`last_access`,a.`img_id`,a.`multi_choice`"
		. " FROM `" . $this->db . "` .`" . $data['voc_table'] . "` v\n"
		. " LEFT JOIN `" . $this->db . "`.`" . $data['answer_table'] . "`"
		. " a ON (v.`" . $data['voc_id_row'] . "` = a.`" . $data['voc_id_row'] . "`)"
		. " LEFT JOIN `" . $this->db . "`.`".$data['voc_user_data_table']."` u "
		. " ON (a.`" . $data['answer_id_row'] . "` = u.`" . $data['answer_id_row'] . "`)  "
		. " where v.`" . $data['list_id_row'] . "` = '" . $data['list_id_value'] . "'"
		. " ORDER BY v.`" . $data['voc_id_row'] . "`ASC;";
		$query_answer = $this->checkQuery($query);
		if ($query_answer) {
			$result = $query_answer;
			$three_d_array = array();
			while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
				$three_d_array[] = $row;
			}
			if (count($three_d_array) == 0) {
				return false;
			}
			return $three_d_array;
		}
		return $query_answer;
	}
	function create3dArray($db_array) {
		date_default_timezone_set('UTC');
		$i_db = 0;
		$i_3d = 0;
		$i_while = 0;
		$value_save = "";
		$multi_arr = array();
		foreach ($db_array as $value) {
			$multi_arr[$i_3d]['voc_id'] = $db_array[$i_db]['voc_id'];
			$multi_arr[$i_3d]['list_id'] = $db_array[$i_db]['list_id'];
			$multi_arr[$i_3d]['question'] = $db_array[$i_db]['question'];
			$value_save = $db_array[$i_db]['voc_id'];
			$i_while = 0;
			while ($db_array[$i_while] && $db_array[$i_db]['voc_id'] == $value_save) {
				if (!$db_array[$i_db]['answer']) {
					return $this->calculateImportance($multi_arr);
				}
				$multi_arr[$i_3d]['answer'][$i_while] = $db_array[$i_db]['answer'];
				$multi_arr[$i_3d]['answer_id'][$i_while] = $db_array[$i_db]['answer_id'];
				$multi_arr[$i_3d]['right'][$i_while] = $this->checkDbValueForNull($db_array[$i_db]['right']);
				$multi_arr[$i_3d]['wrong'][$i_while] = $this->checkDbValueForNull($db_array[$i_db]['wrong']);
				$multi_arr[$i_3d]['rating'][$i_while] = $this->checkDbValueForNull($db_array[$i_db]['rating']);
				$multi_arr[$i_3d]['last_access'][$i_while] = strtotime($db_array[$i_db]['last_access']);
				$multi_arr[$i_3d]['multi_choice'][$i_while] = $this->checkDbValueForNull($db_array[$i_db]['multi_choice']);
				$multi_arr[$i_3d]['img_id'][$i_while] = $db_array[$i_db]['img_id'];
				$i_while++;
				$i_db++;
				if ($i_db == count($db_array)) {
					return $this->calculateImportance($multi_arr);
				}

			}
			$i_3d++;
		}
		$array_with_importance = $this->calculateImportance($multi_arr);
		$array_with_importance = $this->sortMultiArrayByIndex("importance", $array_with_importance);
		return $array_with_importance;
	}
	function sortMultiArrayByIndex($sortkey, $array) {
		foreach ($array as $key => $row) {
			$sort[$key] = max($row[$sortkey]);
		}

		array_multisort($sort, SORT_DESC, $array);
		return $array;
	}

	function checkDbValueForNull($db_value) {
		if ($db_value == null) {
			return 0;
		}
		return $db_value;
	}

	function calculateImportance($voc_3d_array) {
		$goal = 0;
		$tl = ($goal - time()) / 3600;
		$i = 0;
		$ii = 0;
		$rf = 5;
		foreach ($voc_3d_array as $value) {
			// Importance für Unendlichlernmodus
			if ($tl <= 0) {

				// Zeit die nach dem letzten Lernen vergangen ist
				if ($value['last_access'][0] == "" || $value['last_access'][0] == "undefined" || $value['last_access'][0] == "NULL" || $value['last_access'][0] == null) {
					for ($i = 0; $i < count($value['rating']); $i++) {

						$voc_3d_array[$ii]['importance'][$i] = 0;
					}
				} else {
					//echo "time: <br>" . time() . "<br><br> last access: <br>" . $value['last_access'];
					for ($i = 0; $i < count($value['rating']); $i++) {
						$passed_time = (time() - $value['last_access'][$i]) / 3600 / 24; //in Tagen (!)
						$voc_3d_array[$ii]['importance'][$i] = $passed_time - (0.17 * exp(1.4 * $value['rating'][$i]) - 0.17);
						$voc_3d_array[$ii]['importance'][$i] = round($voc_3d_array[$ii]['importance'][$i], 6);
					}
				}
			} else {

				for ($i = 0; $i < count($value['rating']); $i++) {
					if ($value['rating'][$i] > 0 && $value['rating'][$i] < $rf) {

						// Unix_tiemstamp wird benutzt, damit auf den Eintrag Last_access zugegriffen werden kann, er heißt nicht ganz normal Last_acess weil der Array automatisch per foreach erstellt wurde
						// unix_timestamp mach aus dem mysql date-time eintrag einen Timestamp
						$voc_3d_array[$ii]['importance'][$i] = (time() - $value['last_access'][$i]) / 3600 - ((pow($t1, 2) / $t2) * pow(($t2 / $t1), $value['rating'][$i]));
					}

					if ($value['rating'][$i] <= 0) {
						$voc_3d_array[$ii]['importance'][$i] = $delta_t - $value['rating'][$i];
					}
					if ($value['rating'][$i] >= $rf) {
						$voc_3d_array[$ii]['importance'][$i] = -1;
					}
				}
			}

			$ii++;
		}
		return $voc_3d_array;
	}
	function trainerUpdateVocRating($obj) {
		$data['db'] = $this->db;
		$data['table'] = $this->voc_user_data_table->name;
		$data['primary'] = $this->voc_user_data_table->id;
		$result_arr = array();
		$right = $obj['right'];
		$wrong = $obj['wrong'];
		$rating = $obj['rating'];
		$ok = $obj['ok'];
		for ($i = 0; $i < count($rating); $i++) {
			$rating_value = $this->rating_algorithm($ok[$i], $rating[$i]);
			$ratingarr[] = $rating_value;
		}

		$i = 0;
		foreach ($ratingarr as $value) {
			$data['primary_value'] = $obj['answer_id'][$i];
			$data['key'] = $this->voc_user_data_table->right_row;
			$data['key_value'] = $right[$i];
			$result = $this->updateValue($data);
			if ($result != true) {
				return $result;
			}
			$data['key'] = $this->voc_user_data_table->wrong_row;
			$data['key_value'] = $wrong[$i];
			$result = $this->updateValue($data);
			if ($result != true) {
				return $result;
			}
			$data['key'] = $this->voc_user_data_table->rating_row;
			$data['key_value'] = $ratingarr[$i];
			$result = $this->updateValue($data);
			if ($result != true) {
				return $result;
			}
			$i++;
		}

		return json_encode($ratingarr);
	}

	// todo split to calculateVocRating and updateVocRatingInDb

	public function updateVocRating($data,$counter)
	{
		$answer_id_array = $data['answer_id'];
		$rating_arr = array();
		for ($i = $counter; $i<count($answer_id_array);$i++) {
			if (!$this->checkIfAnswerExistsInVocUserDataTable($answer_id_array[$i])){
				$this->insertStandardValuesUserDataValues($answer_id_array[$i]);
				return $this->updateVocRating($data,$i);
			}
			if ($data['ok'][$i] == 1){
				$right_answer = $this->updateVocRatingCorrectAnswerRight($data,$i);
				$rating_answer = $this->updateVocRatingCorrectAnswerRating($data,$i);
				$rating_arr[] = $this->getUpdatedRatingValue($answer_id_array[$i]);
			}
			if ($data['ok'][$i] == 0){
				$right_answer = $this->updateVocRatingWrongAnswerWrong($data,$i);
				$rating_answer = $this->updateVocRatingWrongAnswerRating($data,$i);
				$rating_arr[] = $this->getUpdatedRatingValue($answer_id_array[$i]);
			}
			if ($data['ok'][$i] != -2){
				if(!$right_answer){
					return $right_answer;
				}
				if(!$rating_answer){
					return $wrong_answer;
				}
			}
		}
		$rating_arr = json_encode($rating_arr);
		$json_answer =  '{"status":"update.ok","rating_array":'.$rating_arr.'}';
		return $json_answer;
	}
	public function getUpdatedRatingValue($answer_id)
	{
		$data['table'] = $this->trainer_info->voc_user_data_table->name;
		$data['answer_id_row'] = $this->trainer_info->voc_user_data_table->id;
		$data['rating_row'] = $this->trainer_info->voc_user_data_table->rating_row;
		$data['answer_id'] = $answer_id;
		$query = ""
		."SELECT `".$data['rating_row']."`"
		." FROM `".$this->db."`.`".$data['table']."`"
		." WHERE `".$data['table']."`.`".$data['answer_id_row']."`"
		." = '".$data['answer_id']."'";
		$result = $this->selectFromWithQuery($query);
		$result_encoded = json_decode($result);
		$rating = $result_encoded[0]->rating;
		return $rating;
	}
	public function updateVocRatingCorrectAnswerRight($data,$i){
		$query = "UPDATE `".$this->db."`.`".$data['table']."`"
		." SET `".$data['table']."`.`".$data['right_row']."` = `".$data['table']."`.`".$data['right_row']."`+1 "
		."where `".$data['table']."`.`".$data['key']."` = '".$data['answer_id'][$i]."';";
		$query_answer = $this->checkQuery($query);
		return $query_answer;
	}
	public function updateVocRatingCorrectAnswerRating($data,$i){
		$query = "UPDATE `".$this->db."`.`".$data['table']."`"
		." SET `".$data['table']."`.`".$data['rating_row']."` = `".$data['table']."`.`".$data['rating_row']."`+1 "
		."where `".$data['table']."`.`".$data['key']."` = '".$data['answer_id'][$i]."';";
		$query_answer = $this->checkQuery($query);
		return $query_answer;
	}
	public function updateVocRatingWrongAnswerWrong($data,$i){
		$query = "UPDATE `".$this->db."`.`".$data['table']."`"
		." SET `".$data['table']."`.`".$data['wrong_row']."` = `".$data['table']."`.`".$data['wrong_row']."`+1 "
		."where `".$data['table']."`.`".$data['key']."` = '".$data['answer_id'][$i]."';";
		$query_answer = $this->checkQuery($query);
		return $query_answer;
	}
	public function updateVocRatingWrongAnswerRating($data,$i){
		$query = "UPDATE `".$this->db."`.`".$data['table']."`"
		." SET `".$data['table']."`.`".$data['rating_row']."`"
		." = (IF(`".$data['table']."`.`".$data['rating_row']."`>-1,"
		."`".$data['table']."`.`".$data['rating_row']."` *-0.1-1.1,"
		."`".$data['table']."`.`".$data['rating_row']."`))"
		." where `".$data['table']."`.`".$data['key']."`"
		." = '".$data['answer_id'][$i]."';";
		$query_answer = $this->checkQuery($query);
		return $query_answer;
	}

	public function checkIfAnswerExistsInVocUserDataTable($answer_id)
	{
		$data['table'] = $this->trainer_info->voc_user_data_table->name;
		$data['primary'] = $this->trainer_info->voc_user_data_table->id;
		$data['primary_value'] = $answer_id;
		return $this->checkIfValueExistsById($data);
	}

	public function insertStandardValuesUserDataValues($answer_id)
	{
		if ($this->user_id == -1){
			$this->user_id = 111;
		}
		$data['table'] = $this->trainer_info->voc_user_data_table->name;
		$data['values']['answer_id'] = $answer_id;
		$data['values']['user_id'] = $this->user_id;
		return $this->insertValues($data);
	}

	function rating_algorithm($correct, $rating) {
		$new_rating = $rating;

		if ($correct == 1) {
			$new_rating = $rating + 1;
		}

		if ($correct == 0) {
			if ($rating > -1) {
				$new_rating = -0.1 * $rating - 1.1;
			}
		}

		return $new_rating;
	}
	function trainerReSetVoc($obj) {
		$data['db'] = $this->db;
		$data['table'] = $this->voc_user_data_table->name;
		$data['primary'] = $this->voc_user_data_table->id;
		$result_arr = array();
		$right = $obj['right'];
		$wrong = $obj['wrong'];
		$rating = $obj['rating'];

		$i = 0;
		foreach ($rating as $value) {
			$data['primary_value'] = $obj['answer_id'][$i];
			$data['key'] = $this->voc_user_data_table->right_row;
			$data['key_value'] = 0;
			$result = $this->updateValue($data);
			if ($result != true) {
				return $result;
			}
			$data['key'] = $this->voc_user_data_table->wrong_row;
			$data['key_value'] = 0;
			$result = $this->updateValue($data);
			if ($result != true) {
				return $result;
			}
			$data['key'] = $this->voc_user_data_table->rating_row;
			$data['key_value'] = 0;
			$result = $this->updateValue($data);
			if ($result != true) {
				return $result;
			}
			$i++;
		}

		return json_encode($ratingarr);
	}

}

$trainer_functions = new classTrainerFunctions();
if ($_REQUEST["operation"] && strpos($_REQUEST["operation"], "_") !== 0 && method_exists($trainer_functions, $_REQUEST["operation"])) {

	echo $trainer_functions->{$_REQUEST["operation"]}($_REQUEST);
	die();
}
