<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$userid = $_REQUEST["userid"];
	$device_app_id = $_REQUEST["device_app_id"];	
	$rows = array();

	$deletecommentQuery = "delete from APIServer_user_comment where user_id='$userid'";
	$delete_result_1 = sql_query($deletecommentQuery);
	if($delete_result_1>0) {
		$deletelikeQuery = "delete from APIServer_user_like where user_id='$userid'";
		$delete_result_2 = sql_query($deletelikeQuery);
		if($delete_result_2>0) {
			$updateSoundgramdeviceappQuery = "update APIServer_device_app set user_id=null, login_status=null, login_last_time=null  where id='$device_app_id'";
			$update_result = sql_query($updateSoundgramdeviceappQuery);
			if($update_result>0) {
				$deleteSoundgramuserQuery = "delete from APIServer_user where id='$userid'";
				$delete_result_4 = sql_query($deleteSoundgramuserQuery);
				
				if($delete_result_4>0) {
					$JSON = array(
						"returnCode" => "success"
					);

					echo json_encode($JSON);
				}
			}
		}
	}

  	//mysql_close($connect);
?>
