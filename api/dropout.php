<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$userid = $_REQUEST["userid"];
	$albumid = $_REQUEST["albumid"];
	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//mysql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$rows = array();

	$selnfckeyid = "	select nfckey_id from APIServer_device where user_id='$userid' and album_id='$albumid' and nfc_status=1	";
	$result = sql_query($selnfckeyid);
	$nfckeyid = mysqli_result($result,0);

	if(empty($nfckeyid)) $nfckeyid ="0";

	$deletecommentQuery = "delete from APIServer_user_comment where user_id='$userid'";
	$delete_result_1 = sql_query($deletecommentQuery);
	if($delete_result_1>0) {
		$deletelikeQuery = "delete from APIServer_user_like where user_id='$userid'";
		$delete_result_2 = sql_query($deletelikeQuery);
		if($delete_result_2>0) {
			$deleteSoundgramdeviceQuery = "delete from APIServer_device where user_id='$userid'";
			$delete_result_3 = sql_query($deleteSoundgramdeviceQuery);
			if($delete_result_3>0) {
				$deleteSoundgramuserQuery = "delete from APIServer_user where id='$userid'";
				$delete_result_4 = sql_query($deleteSoundgramuserQuery);
				
				if($delete_result_4>0) {
					$JSON = array(
						"returnCode" => "success",
						"nfckeyid" => $nfckeyid
					);

					echo json_encode($JSON);
				}
			}
		}
	}

  	//mysql_close($connect);
?>
