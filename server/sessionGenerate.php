<?php
	session_start();
	if(array_key_exists('uname',$_POST)){
		$uname = $_POST['uname'];
		$first_name = $_POST['first_name'];
		$_SESSION['login'] = $first_name;
		$_SESSION['uname'] = $uname;
		echo "1";
	}
?>