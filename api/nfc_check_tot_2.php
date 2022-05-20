<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$nfckey = $_REQUEST["nfckey"];
	$device_app_id = $_REQUEST["device_app_id"];
	$album_id = $_REQUEST["album_id"];
	$uuid = $_REQUEST["uuid"];
	$ostype = $_REQUEST["ostype"];
	$app_ver = $_REQUEST["app_ver"];

	//error_log($nfckey);
	//error_log($device_app_id);
	//error_log("nfc_check.php called!!!!!!!!!!");

	$rows = array();
	
	// 넘어온 앨범아이디가 없을 경우
	if(strlen($album_id)==0) {
		$selalbumid = "	SELECT album_id FROM APIServer_nfckey where nfckey='$nfckey'";
		$result = sql_query($selalbumid);
		$album_id = mysqli_result($result,0);
	}

	$result_device_id;
	if(strlen($album_id)>0) {
		$seldevice = "	select id from APIServer_device where device_app_id='$device_app_id' and album_id='$album_id'	";
		$result = sql_query($seldevice);
		$device_id = mysqli_result($result,0);
		if(strlen($device_id)==0) {
			$insertAPIServer_device = "INSERT INTO APIServer_device (device_app_id, device_uuid, device_ostype, app_ver, album_id, nfc_status, login_status, device_last_time, timestamp) VALUES('$device_app_id', '$uuid', '$ostype', '$app_ver', '$album_id', '0', '0', NOW(), NOW())";
			
			//error_log($insertAPIServer_device);
			$insertdevice_result = sql_query($insertAPIServer_device);

			$seldevice = "	select id from APIServer_device where device_app_id='$device_app_id' and album_id='$album_id'	";
			$result = sql_query($seldevice);
			$result_device_id = mysqli_result($result,0);
		}
		else {
			$result_device_id = $device_id;
		}

		$selduplicate = "	select count(1) from APIServer_nfckey where device_id='$result_device_id' and album_id='$album_id'	";
		$result = sql_query($selduplicate);
		$duplicate = mysqli_result($result,0);

		if($duplicate==0) {
			$selactive = "	select active from APIServer_nfckey where nfckey='$nfckey' and album_id='$album_id'	";
			$result = sql_query($selactive);
			$active = mysqli_result($result,0);

			if($active=="1") {
				$JSON = array(
					"returnCode" => "4"
					, "returnMsg" => $album_id
				);

				echo json_encode($JSON);
			}
			else if($active=="0") {
				$selsecurity = "	select securitynum_id from APIServer_nfckey where nfckey='$nfckey' and album_id='$album_id'	";
				$result = sql_query($selsecurity);
				$securitynum_id = mysqli_result($result,0);

				if(empty($securitynum_id)) {
					$JSON = array(
						"returnCode" => "3"
						, "returnMsg" => $album_id
					);

					echo json_encode($JSON);
				}
				else {
					$JSON = array(
						"returnCode" => "4"
						, "returnMsg" => $album_id
					);

					echo json_encode($JSON);
				}
			}
			else {
				$JSON = array(
					"returnCode" => "5"
					, "returnMsg" => $album_id
				);

				echo json_encode($JSON);
			}
		}
		else {
			$JSON = array(
				"returnCode" => "10"
				, "returnMsg" => "duplicate"
			);

			echo json_encode($JSON);
		}
	}
	else {
		$JSON = array(
  			"returnCode" => "5"
  		);

	  	echo json_encode($JSON);
	}
	
  	//mysql_close($connect);
?>
