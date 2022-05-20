<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$uuid = $_REQUEST["uuid"];
	$albumid = $_REQUEST["albumid"]==null?"0":$_REQUEST["albumid"];
	// 통합앱의 경우에 로그인 및 칩디스크가 남아있는 현상때문에 tot_id 추가 
	// 값이 없을 경우 default로 0 셋팅 220411
	$totid = $_REQUEST["totid"]==""?"0":$_REQUEST["totid"];
	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//mysql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$rows = array();
	$initQuery = "";

	if($totid==0) {
		$initQuery = "	update APIServer_device set nfc_status=0, nfckey_id=NULL, nfc_active_time=NULL, nfc_deactive_time=NOW(), user_id=NULL, login_status=0, login_last_time=NULL where device_uuid='$uuid' and album_id='$albumid'	";
		$update_result = sql_query($initQuery);
	}
	else {
		$initQuery = "	update APIServer_device_app set nfc_status=0, nfckey_id=NULL, nfc_active_time=NULL, nfc_deactive_time=NOW(), user_id=NULL, login_status=0, login_last_time=NULL where device_uuid='$uuid' and tot_id='$totid'	";
		$update_result = sql_query($initQuery);

		// $initQuery2 = "	update APIServer_device set nfc_status=0, nfckey_id=NULL, nfc_active_time=NULL, nfc_deactive_time=NOW(), user_id=NULL, login_status=0, login_last_time=NULL where device_app_id in(select id from APIServer_device_app where device_uuid='$uuid' and tot_id='$totid')	";
		// $update_result2 = sql_query($initQuery2);

		$initQuery2 = "	delete from APIServer_device where device_app_id in(select id from APIServer_device_app where device_uuid='$uuid' and tot_id='$totid')	";
		$update_result2 = sql_query($initQuery2);
	}

	$seluuid = mysqli_result($result,0);
	if($update_result>0) {
		$JSON = array(
			"returnCode" => "true"
		);

		echo json_encode($JSON);
		return;
	}
	else {
		$JSON = array(
  			"returnCode" => "false"
  		);

		echo json_encode($JSON);
	}
	
  	//mysql_close($connect);
?>
