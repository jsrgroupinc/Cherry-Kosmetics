<?php
	session_start();
	$isLog = 0;
	if(array_key_exists("login",$_SESSION)){
		$isLog = 1;
	}
	echo $isLog;
?>