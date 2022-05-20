<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$device_app_id = $_REQUEST["device_app_id"];

	$rows = array();
	$ClearQuery = "update APIServer_device_app set user_id=null, login_status=null, login_last_time=null  where id='$device_app_id'";
	$update_result = sql_query($ClearQuery);
	if($update_result>0) {
		$JSON = array(
  			"returnCode" => "success"
  		);

	  	echo json_encode($JSON);
	}
	
  	//mysql_close($connect);
?>
