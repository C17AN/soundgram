<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$album_id = $_REQUEST["albumid"];
	$device_id = $_REQUEST["device_id"];

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
	$selauth = "	select auth_type from APIServer_album where id='$album_id'	";
	$result = sql_query($selauth);
	$auth_type = mysqli_result($result,0);
	//error_log($auth_type . $album_id);
	
	if($auth_type=="nfc") {
		$selnfc = "	select IFNULL(nfckey_id,0) AS nfckey_id from APIServer_device where album_id='$album_id' and id='$device_id'	";
		$nfc_result = sql_query($selnfc);
		$nfckey_id = mysqli_result($nfc_result,0);
		
		// if(empty($nfckey_id)) $nfckey_id = "0";

		$JSON = array(
			"returnCode" => "nfc"
			, "nfckey_id" => $nfckey_id
		);

		echo json_encode($JSON);
	}
	else {
		$JSON = array(
			"returnCode" => "basic"
		);

		echo json_encode($JSON);
	}
	
  	//mysql_close($connect);
?>
