<?php

class classFileHandler {

	function __construct() {
	}

	public function writeIntoFile($filepath, $content) {

		$myfile = fopen($filepath, "w") or die("Unable to open file!");
		fwrite($myfile, $content);
		fclose($myfile);

	}

	public function readFile($filepath) {
		$myfile = fopen($filepath, "r") or die("Unable to open file!");
		$content = fread($myfile, filesize($filepath));
		return $content;
		fclose($myfile);
	}
}