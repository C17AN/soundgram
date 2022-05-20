<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$device_app_id = $_REQUEST["device_app_id"];

	$rows = array();
	$selcust = "select id from APIServer_device_app where id='$device_app_id' and login_status=1 and user_id is not null";
	
	$result = sql_query($selcust);
	$seldai = mysqli_result($result,0);
	if(empty($seldai)) {
		$JSON = array(
			"returnCode" => "notlogin"
		);

		echo json_encode($JSON);
		return;
	}
	else {
		$lastloginUpdateQuery = "update APIServer_device_app set login_status=1, login_last_time=NOW() where id='$device_app_id'";
		$update_result = sql_query($lastloginUpdateQuery);

		$lastloginUpdateQuery2 = "update APIServer_user set last_login_time=NOW() where id in(select user_id from APIServer_device_app where id='$device_app_id')";
		$update_result = sql_query($lastloginUpdateQuery2);

		$query 
		= " 
			select a.device_app_id, b.device_id, c.user_id, c.user_name, c.user_phone, c.user_img, c.user_nick, c.reg_time, c.login_type, c.login_id
			from
				(select id as device_app_id, user_id from APIServer_device_app where id='$device_app_id') a,
				(select id as device_id, device_app_id from APIServer_device) b,
				(select id as user_id, user_name, user_phone, user_img, user_nick, date_format(reg_time,'%Y-%m-%d') as reg_time, login_type, login_id from APIServer_user) c
			where a.device_app_id = b.device_app_id and a.user_id = c.user_id
		";
		$result = sql_query($query);
		$row = $result->fetch_assoc();
  		$JSON = array(
  			"returnCode" => "login_complete"
  			, "user_id" => $row['user_id']
  			, "device_id" => $row['device_id']
			, "device_app_id" => $row['device_app_id']
  			, "account" => $row['login_id']
  			, "name" => $row['user_name']
  			, "tel" => $row['user_phone']
  			, "profile" => $row['user_img']
  			, "nick" => $row['user_nick']
  			, "regdate"  => $row['reg_time']
  			, "snstype"  => $row['login_type']
			, "access_token"  => $row['access_token']
  			, "passwd" => $passwd
  		);

		echo json_encode($JSON);
	}
	
  	//mysql_close($connect);
?>
