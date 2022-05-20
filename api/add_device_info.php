<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$ostype = $_REQUEST["ostype"];
	$uuid = $_REQUEST["uuid"];
	$device_app_id = $_REQUEST["device_app_id"];
	$album_id = $_REQUEST["albumid"];
	$app_ver = $_REQUEST["app_ver"];
	$nfckeyid = $_REQUEST["nfckeyid"];
	$token = $_REQUEST["token"];

	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//mysql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	if($album_id=="0") {
		$JSON = array(
			"returnCode" => "loginerr"
		);

		echo json_encode($JSON);

		return;
	}

	$rows = array();
	$seluuid = "	select id from APIServer_device where device_uuid='$uuid' and album_id='$album_id'	";
	//error_log($seluuid);
	$result = sql_query($seluuid);
	$device_id = mysqli_result($result,0);
	if(!empty($device_id)) {
		$updateTokenQuery
		= "UPDATE APIServer_device set device_app_id='$device_app_id', device_token='$token' where id='$device_id'	";
		$result = sql_query($updateTokenQuery);

		$JSON = array(
			"returnCode" => "already_uuid"
			, "device_id" => $device_id
		);
		//error_log(json_encode($JSON));
		echo json_encode($JSON);
	}
	else {
		// $selmaxuserid = "	select max(user_id)+1 as user_id from APIServer_soundgramuser	";
		// $result = mysql_query($selmaxuserid, $connect);
		// $user_id = mysql_result($result,0,0);

		// $insertQuery1 
		// = " INSERT INTO auth_user(album_id, username, date_joined) VALUES($albumid, concat('$ps','_',DATE_FORMAT(NOW(),'%y%m%d'),'_',DATE_FORMAT(NOW(),'%H%i%s')), NOW())";
		// $result = mysql_query($insertQuery1, $connect);

		// $insertQuery2
		// = "INSERT INTO APIServer_soundgramuser (user_id, dateAdd) VALUES('$user_id', NOW())";
		// $result = mysql_query($insertQuery2, $connect);
		// if($result>0) {
		// 	$selsduserid = "	select max(id) as id from APIServer_soundgramuser	";
		// 	$result = mysql_query($selsduserid, $connect);
		// 	$sd_user_id = mysql_result($result,0,0);		
		// }

		if($nfckeyid=="0") {
			$insertQuery3
			= "INSERT INTO APIServer_device (device_app_id, device_uuid, device_ostype, app_ver, album_id, nfc_status, login_status, device_last_time, timestamp) VALUES('$device_app_id', '$uuid', '$ostype', '$app_ver', '$album_id', '0', '0', NOW(), NOW())";
		}
		else {
			$insertQuery3
			= "INSERT INTO APIServer_device (device_app_id, device_uuid, device_ostype, app_ver, album_id, nfc_status, nfckey_id, nfc_active_time, login_status, device_last_time, timestamp) VALUES('$device_app_id', '$uuid', '$ostype', '$app_ver', '$album_id', '1', '$nfckeyid', NOW(), '0', NOW(), NOW())";
		}
		
		//error_log($insertQuery3);
		$result = sql_query($insertQuery3);
		if($result>0) {
			$seluser = "	select id from APIServer_device where device_uuid='$uuid' and album_id='$album_id'	";
			$result = sql_query($seluser);
			$device_id = mysqli_result($result,0);

			$updateQuery
			= "UPDATE APIServer_nfckey SET device_id='$device_id' where id='$nfckeyid'	";
			$result = sql_query($updateQuery);

			$updateTokenQuery
			= "UPDATE APIServer_device set device_app_id='$device_app_id', device_token='$token' where id='$device_id'	";
			$result = sql_query($updateTokenQuery);

			$JSON = array(
				"returnCode" => "complete"
				, "device_id" => $device_id
			);

			echo json_encode($JSON);
		}
	}
	
  	//mysql_close($connect);
?>
