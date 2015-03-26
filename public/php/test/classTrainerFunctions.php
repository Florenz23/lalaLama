<?php
require_once "classDbFunctions.php";

class classTrainerFunctions extends classDbFunctions {

	function __construct() {
		parent::__construct();

	}

	function resetTestValues($data_object) {

		$data['db'] = $this->db;

		$data['table'] = $this->voc_table['name'];
		$data['key'] = $this->voc_table['id'];
		$data['value'] = $data_object['object_0']->whole_object->voc_id;
		$this->deleteRow($data);

		$data['values'] = $data_object['object_0']->voc_table;
		$this->insertValues($data);

		$data['table'] = $this->answer_table['name'];
		$data['key'] = $this->answer_table['id'];
		$data['value'] = $data_object['object_0']->whole_object->answer_id;
		$this->deleteRow($data);
		$data['values'] = $data_object['object_0']->answer_table;
		$this->insertValues($data);
		$data['value'] = $data_object['object_1']->whole_object->answer_id;
		$this->deleteRow($data);
		$data['values'] = $data_object['object_1']->answer_table;
		$this->insertValues($data);
		$data['value'] = $data_object['object_2']->whole_object->answer_id;
		$this->deleteRow($data);
		$data['values'] = $data_object['object_2']->answer_table;
		$this->insertValues($data);

		$data['table'] = $this->voc_user_data_table['name'];
		$data['key'] = $this->voc_user_data_table['id'];
		$data['value'] = $data_object['object_0']->whole_object->answer_id;
		$this->deleteRow($data);
		$data['values'] = $data_object['object_0']->voc_user_data_table;
		$this->insertValues($data);
		$data['value'] = $data_object['object_1']->whole_object->answer_id;
		$this->deleteRow($data);
		$data['values'] = $data_object['object_1']->voc_user_data_table;
		$this->insertValues($data);
		$data['value'] = $data_object['object_2']->whole_object->answer_id;
		$this->deleteRow($data);
		$data['values'] = $data_object['object_2']->voc_user_data_table;
		$this->insertValues($data);

		// $expected_value = $this->trainer_functions->insertValues($this->send_data);
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
		$query = "SELECT *\n"
		. " FROM\n"
		. "`" . $data['db'] . "` .`" . $data['table_1'] . "` v\n"
		. "LEFT JOIN\n"
		. " `" . $data['db'] . "`.`" . $data['table_2'] . "` a ON "
		. "(v.`" . $data['join_row_1'] . "` = a.`" . $data['join_row_2'] . "`)"
		. "LEFT JOIN `" . $data['db'] . "`.`voc_user_data` u ON (a.answer_id = u.answer_id)  "
		. " where v.`" . $data['key'] . "` = '" . $data['key_value']
		. "'ORDER BY v.`" . $data['join_row_1'] . "`ASC;";
		$query_answer = $this->query($query);
		if ($query_answer[0]) {
			$result = $query_answer[1];
			$three_d_array = array();
			while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
				$three_d_array[] = $row;
			}
			if (count($three_d_array) == 0) {
				return false;
			}
			return $three_d_array;
		}

		return $query_answer[1];
	}
	function create3dArray($db_array) {
		date_default_timezone_set('UTC');
		$i_db = 0;
		$i_3d = 0;
		$i_while = 0;
		$value_save = "";
		$multi_arr = [];
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
		$data['table'] = $this->voc_user_data_table['name'];
		$data['primary'] = $this->voc_user_data_table['id'];
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
			$data['key'] = $this->voc_user_data_table['right_row'];
			$data['key_value'] = $right[$i];
			$result = $this->updateValue($data);
			if ($result != true) {
				return $result;
			}
			$data['key'] = $this->voc_user_data_table['wrong_row'];
			$data['key_value'] = $wrong[$i];
			$result = $this->updateValue($data);
			if ($result != true) {
				return $result;
			}
			$data['key'] = $this->voc_user_data_table['rating_row'];
			$data['key_value'] = $ratingarr[$i];
			$result = $this->updateValue($data);
			if ($result != true) {
				return $result;
			}
			$i++;
		}

		return json_encode($ratingarr);
	}
	function trainerReSetVoc($obj) {
		$data['db'] = $this->db;
		$data['table'] = $this->voc_user_data_table['name'];
		$data['primary'] = $this->voc_user_data_table['id'];
		$result_arr = array();
		$right = $obj['right'];
		$wrong = $obj['wrong'];
		$rating = $obj['rating'];

		$i = 0;
		foreach ($rating as $value) {
			$data['primary_value'] = $obj['answer_id'][$i];
			$data['key'] = $this->voc_user_data_table['right_row'];
			$data['key_value'] = 0;
			$result = $this->updateValue($data);
			if ($result != true) {
				return $result;
			}
			$data['key'] = $this->voc_user_data_table['wrong_row'];
			$data['key_value'] = 0;
			$result = $this->updateValue($data);
			if ($result != true) {
				return $result;
			}
			$data['key'] = $this->voc_user_data_table['rating_row'];
			$data['key_value'] = 0;
			$result = $this->updateValue($data);
			if ($result != true) {
				return $result;
			}
			$i++;
		}

		return json_encode($ratingarr);
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
}

$trainer_functions = new classTrainerFunctions();
if ($_REQUEST["operation"] && strpos($_REQUEST["operation"], "_") !== 0 && method_exists($trainer_functions, $_REQUEST["operation"])) {

	echo $trainer_functions->{$_REQUEST["operation"]}($_REQUEST);
	die();
}
