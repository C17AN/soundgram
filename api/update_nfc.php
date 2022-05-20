<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$nfckey = $_REQUEST["nfckey"];
	$device_id = $_REQUEST["device_id"];
	$albumid = $_REQUEST["albumid"];
	$securitynum = $_REQUEST["security_num"];

	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//sql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$rows = array();
	
	$selnfckeyactive = "	select active from APIServer_nfckey where nfckey='$nfckey' and album_id='$albumid'	";
	$result = sql_query($selnfckeyactive);
	$nfckeyactive = mysqli_result($result,0);
	if($nfckeyactive=="-1") {
		$JSON = array(
  			"returnCode" => "5",
			"returnMsg" => "4"
  		);

	  	echo json_encode($JSON);

		return false;
	}

	if(empty($securitynum)) {
		$selsecurityid = "	select securitynum_id from APIServer_nfckey where nfckey='$nfckey' and album_id='$albumid'	";
		$result = sql_query($selsecurityid);
		$securityid = mysqli_result($result,0);
	}
	else {
		$selnfckeyactive = "	select active from APIServer_nfcsecuritynum where securitynum='$securitynum' and album_id='$albumid'	";
		$result = sql_query($selnfckeyactive);
		$nfckeyactive = mysqli_result($result,0);
		if($nfckeyactive!="0") {
			$JSON = array(
	  			"returnCode" => "5",
				"returnMsg" => "5"
	  		);

		  	echo json_encode($JSON);

			return false;
		}
	
		$selsecurityid = "	select id from APIServer_nfcsecuritynum where securitynum='$securitynum' and album_id='$albumid'	";
		$result = sql_query($selsecurityid);
		$securityid = mysqli_result($result,0);
	}

	if(!empty($securityid)) {
		$selnfckeyid = "	select id from APIServer_nfckey where nfckey='$nfckey' and album_id='$albumid'	";
		$result = sql_query($selnfckeyid);
		$nfckeyid = mysqli_result($result,0);

		$securityUpdateQuery = "update APIServer_nfcsecuritynum set nfckey_id='$nfckeyid', active=1, active_date=NOW() where securitynum='$securitynum' and album_id='$albumid'	";
		$update_result = sql_query($securityUpdateQuery);
		if($update_result>0) {
			if(!empty($nfckeyid)) {
				$returnCode = "7";
				$selnfckeyidcnt = "	select count(1) as cnt from APIServer_device where nfckey_id='$nfckeyid' and album_id='$albumid'	";
				$result = sql_query($selnfckeyidcnt);
				$count = mysqli_result($result,0);
				if($count>0) {
					$returnCode = "8";
					$seldeviceid = "	select id from APIServer_device where nfckey_id='$nfckeyid' and album_id='$albumid'	";
					$result = sql_query($seldeviceid);
					$deviceid = mysqli_result($result,0);

					$deviceUpdateQuery_0 = "update APIServer_device set nfc_status=0, nfckey_id=null, nfc_active_time=null, nfc_deactive_time=NOW() where id='$deviceid' and album_id='$albumid'	";
					$updated_result = sql_query($deviceUpdateQuery_0);
				}

				$selnfckeyad = "	select ifnull(active_date,0) as active_date from APIServer_nfckey where nfckey='$nfckey' and album_id='$albumid'	";
				$result = sql_query($selnfckeyad);
				$nfckeyad = mysqli_result($result,0);
				if($nfckeyad=="0") {
					$nfckeyUpdateQuery = "update APIServer_nfckey set securitynum_id='$securityid', device_id='$device_id', active=1, active_date=NOW() where id='$nfckeyid' and album_id='$albumid'	";
					$update_result = sql_query($nfckeyUpdateQuery);

					// NFC키가 상용일 경우에만 동작
					$selnfcclass = "	select class from APIServer_nfckey where nfckey='$nfckey' and album_id='$albumid'	";
					$result = sql_query($selnfcclass);
					$nfcclass = mysqli_result($result,0);
					if($nfcclass=="0") {
						// nfcsonglog 테이블에 인서트
						$songidSelectquery = " SELECT id FROM APIServer_song WHERE album_id='$albumid'	";
						$result = sql_query($songidSelectquery);
						$rows = array();
						while($row = $result->fetch_assoc()) {
							$songid = $row['id'];
							$nfcsonglogInsertQuery = "insert into APIServer_nfcsonglog(album_id,nfckey_id,song_id,flag,active_date) values('$albumid','$nfckeyid','$songid','D',NOW())";
							$insert_result = sql_query($nfcsonglogInsertQuery);
						}
					}
				}
				else {
					$nfckeyUpdateQuery = "update APIServer_nfckey set securitynum_id='$securityid', device_id='$device_id', active=1, update_date=NOW() where id='$nfckeyid' and album_id='$albumid'	";
					$update_result = sql_query($nfckeyUpdateQuery);
				}

				$deviceUpdateQuery = "update APIServer_device set nfc_status=1, nfckey_id='$nfckeyid', nfc_active_time=NOW() where id='$device_id' and album_id='$albumid'	";
				$update_result = sql_query($deviceUpdateQuery);
				if($update_result>0) {
					$JSON = array(
			  			"returnCode" => $returnCode,
						"returnMsg" => "1"
			  		);

				  	echo json_encode($JSON);
				}
			}
			else {
				$JSON = array(
		  			"returnCode" => "5",
					"returnMsg" => "2"
		  		);

			  	echo json_encode($JSON);	
			}
		}
		else {
			$JSON = array(
	  			"returnCode" => "5",
				"returnMsg" => "3"
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
