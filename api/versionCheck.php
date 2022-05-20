<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$app_ver = $_REQUEST["app_ver"];
	$ostype = $_REQUEST["ostype"];
	$album_id = $_REQUEST["albumid"];

	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//sql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$rows = array();
	if($ostype == 1) {
		$selver = "	select google_ver from APIServer_album where id='$album_id'	";
	} else {
		$selver = " select apple_ver from APIServer_album where id='$album_id' ";
	}
	$result = sql_query($selver);
	$new_ver = mysqli_result($result,0);

	$vercheck = false;
	$origin_version = explode(".", $app_ver);
	$newest_version = explode(".", $new_ver);

	if((int)$origin_version[0]<(int)$newest_version[0]) {
		$vercheck = true;
	}
	else if((int)$origin_version[0]==(int)$newest_version[0]) {
		if((int)$origin_version[1]<(int)$newest_version[1]) {
			$vercheck = true;
		}
		else if((int)$origin_version[1]==(int)$newest_version[1]) {
			if((int)$origin_version[2]<(int)$newest_version[2]) {
				$vercheck = true;
			}
		}
	}

	if($vercheck) {
		if($ostype == 1) {
			$selurl = "	select google_url from APIServer_album where id='$album_id'	";
		} else {
			$selurl = " select apple_url from APIServer_album where id='$album_id' ";
		}
		$result = sql_query($selurl);
		$store_url = mysqli_result($result,0);

		$JSON = array(
			"returnCode" => "newver"
			, "store_url" => $store_url
			// , "app_ver" => (int)str_replace(".","",$app_ver)
			// , "new_ver" => (int)str_replace(".","",$new_ver)
		);

		echo json_encode($JSON);
	}
	else {
		$JSON = array(
			"returnCode" => "success"
		);

		echo json_encode($JSON);
	}
	
  	//mysql_close($connect);
?>
