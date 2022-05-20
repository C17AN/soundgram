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
	$device_id = $_REQUEST["device_id"];
	$access_token = $_REQUEST["access_token"];

	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//mysql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$rows = array(); 
	$selcust = "	select id from APIServer_user where login_id='$userid'	";
	$result = sql_query($selcust);
	$user_id = mysqli_result($result,0);
	if(!empty($user_id)) {
		if($device_id=="" || $device_id==null) {
			$seldevice = "	select id from APIServer_device where device_uuid='$uuid' ";
			$result = sql_query($seldevice);
			$device_id = mysqli_result($result,0);
		}

		$updateQuery1 
		= " update APIServer_device set user_id=NULL, login_status='0', login_last_time=NULL where user_id='$user_id' ";
		$result = sql_query($updateQuery1);

		$updateQuery2
		= " update APIServer_device set user_id='$user_id', login_status='1', login_last_time=NOW() where id='$device_id' ";
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
			, "device_id" => $device_id
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
