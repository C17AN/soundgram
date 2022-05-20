<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$name = $_REQUEST["name"];
	$userid = $_REQUEST["userid"];
	$passwd = $_REQUEST["passwd"];
	$phone = $_REQUEST["phone"];
	$nick = $_REQUEST["nick"];
	$snstype = $_REQUEST["snstype"];
	$profile = $_REQUEST["profile"]==""?"default/profile_none.png":$_REQUEST["profile"];
	$uuid = $_REQUEST["uuid"];
	$device_app_id = $_REQUEST["device_app_id"];
	$tot_id = $_REQUEST["tot_id"];
	$access_token = $_REQUEST["access_token"];

	$rows = array(); 
	$selcust = "	select id from APIServer_user where login_id='$userid'	";
	$result = sql_query($selcust);
	$user_id = mysqli_result($result,0);
	if(!empty($user_id)) {
		if($device_id=="" || $device_id==null) {
			$seldevice = "	select id from APIServer_device_app where device_uuid='$uuid' and tot_id='$tot_id'";
			$result = sql_query($seldevice);
			$device_app_id = mysqli_result($result,0);
		}

		$updateQuery1 
		= " update APIServer_device_app set user_id=NULL, login_status='0', login_last_time=NULL where user_id='$user_id' ";
		$result = sql_query($updateQuery1);

		$updateQuery2
		= " update APIServer_device_app set user_id='$user_id', login_status='1', login_last_time=NOW() where id='$device_app_id'";
		$result = sql_query($updateQuery2);
		//error_log($updateQuery2);
		//error_log($updateQuery2);
		//error_log($updateQuery2);
		//error_log($updateQuery2);
		//error_log($updateQuery2);
		//error_log($updateQuery2);
		//error_log($updateQuery2);

		$updateQuery3
		= "	update APIServer_user set access_token='$access_token', last_login_time=NOW() where login_id='$userid'	";
		$result = sql_query($updateQuery3);

		$custinfo 
		= " select user_nick, user_phone, user_img from APIServer_user where id='$user_id'
		";
		$result = sql_query($custinfo);
		$row = $result->fetch_assoc();
		$JSON = array(
			"returnCode" => "join_complete"
			, "user_id" => $user_id
			, "account" => $userid
			, "name" => $name
			, "tel" => $row['user_phone']
			, "nick" => $row['user_nick']
			, "snstype" => $snstype
			, "profile" => $row['user_img']
			, "regdate" => date("Y-m-d")
			, "access_token" => $access_token
		);

		echo json_encode($JSON);
		return;
	}
	else {
		$JSON = array(
			"returnCode" => "join"
		);

		echo json_encode($JSON);
		return;
	}
	
  	//mysql_close($connect);
?>
