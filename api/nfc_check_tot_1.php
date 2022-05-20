<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$nfckey = $_REQUEST["nfckey"];
	
	//error_log($nfckey);
	//error_log("nfc_check.php called!!!!!!!!!!");

	$rows = array();
	$returnCode = "nextLevel";
	$selcnt = "	select count(1) from APIServer_nfckey where nfckey='$nfckey'	";
	$result = sql_query($selcnt);
	$cnt = mysqli_result($result,0);
	if($cnt>1) {
		$returnCode = "multiple";
	}

	$JSON = array(
		"returnCode" => $returnCode
	);

	echo json_encode($JSON);
?>
