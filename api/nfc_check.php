<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$nfckey = $_REQUEST["nfckey"];
	$albumid = $_REQUEST["albumid"];

	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//sql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명
	
	//error_log($nfckey);
	//error_log($albumid);
	//error_log("nfc_check.php called!!!!!!!!!!");

	$rows = array();
	
	$selcnt = "	select count(1) as cnt from APIServer_nfckey where nfckey='$nfckey' and album_id='$albumid'	";
	$result = sql_query($selcnt);
	$count = mysqli_result($result,0);
	if($count>0) {
		$selactive = "	select active from APIServer_nfckey where nfckey='$nfckey' and album_id='$albumid'	";
		$result = sql_query($selactive);
		$active = mysqli_result($result,0);

		if($active=="1") {
			$JSON = array(
	  			"returnCode" => "4"
	  		);

		  	echo json_encode($JSON);
		}
		else if($active=="0") {
			$selsecurity = "	select securitynum_id from APIServer_nfckey where nfckey='$nfckey' and album_id='$albumid'	";
			$result = sql_query($selsecurity);
			$securitynum_id = mysqli_result($result,0);

			if(empty($securitynum_id)) {
				$JSON = array(
		  			"returnCode" => "3"
		  		);

			  	echo json_encode($JSON);
			}
			else {
				$JSON = array(
		  			"returnCode" => "4"
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
	}
	else {
		$JSON = array(
  			"returnCode" => "5"
  		);

	  	echo json_encode($JSON);
	}
	
  	//mysql_close($connect);
?>
