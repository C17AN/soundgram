<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$ostype = $_REQUEST["ostype"];
	$uuid = $_REQUEST["uuid"];
	$tot_id = $_REQUEST["tot_id"]==""?"0":$_REQUEST["tot_id"];
	$app_ver = $_REQUEST["app_ver"];
	$token = $_REQUEST["token"];
	$album_id = $_REQUEST["albumid"];

	$rows = array();
	$seldeviceappid = "	select id from APIServer_device_app where device_uuid='$uuid' and tot_id='$tot_id' and id>0	";
	if($tot_id=="0") {
		$seldeviceappid = "	select id from APIServer_device_app where device_uuid='$uuid' and tot_id='$tot_id' and apppage_id=(select id from APIServer_apppage where album_id='$album_id') and id>0	";
	}

	//error_log($seldeviceappid);
	$result = sql_query($seldeviceappid);
	$device_app_id = mysqli_result($result,0);
	if(!empty($device_app_id)) {
		$updateTokenQuery
		= "UPDATE APIServer_device_app set app_ver='$app_ver', device_ostype='$ostype', device_token='$token', device_last_time=NOW() where id='$device_app_id'	";
		
		$result = sql_query($updateTokenQuery);

		$JSON = array(
			"returnCode" => "already_uuid"
			, "device_app_id" => $device_app_id
		);
		//error_log(json_encode($JSON));
		echo json_encode($JSON);
	}
	else {
		$selapppage_id = "	select id from APIServer_apppage where tot_id='$tot_id'	";
		if($tot_id=="0") {
			$selapppage_id = "	select id from APIServer_apppage where album_id='$album_id'	";
		}
		
		//error_log($selapppage_id);
		$result = sql_query($selapppage_id);
		$apppage_id = mysqli_result($result,0);

		$insertAPIServer_device_app
		= "INSERT INTO APIServer_device_app (apppage_id, tot_id, device_uuid, device_ostype, app_ver, device_token, device_last_time, timestamp) VALUES('$apppage_id','$tot_id','$uuid', '$ostype', '$app_ver', '$token', NOW(), NOW())";

		//error_log($insertAPIServer_device_app);
		$ada_result = sql_query($insertAPIServer_device_app);
		if($ada_result>0) {
			$result = sql_query($seldeviceappid);
			$device_app_id = mysqli_result($result,0);

			$JSON = array(
				"returnCode" => "complete"
				, "device_app_id" => $device_app_id
			);

			echo json_encode($JSON);
		}
	}
	
  	//mysql_close($connect);
?>
