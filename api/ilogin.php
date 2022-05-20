<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$device_id = $_REQUEST["device_id"];
	$albumid = $_REQUEST["albumid"];
	$tot_id = $_REQUEST["tot_id"]==""?"0":$_REQUEST["tot_id"];

	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//mysql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$rows = array();
	$query 
	= " select $device_id as device_id, id, user_name, user_phone, user_img, user_nick, date_format(reg_time,'%Y-%m-%d') as reg_time, login_type, login_id from APIServer_user where id=(select user_id from APIServer_device where id='$device_id' and album_id='$albumid')
	";
	if($tot_id>0) {
		$usercntquery 
		= " select count(*) from APIServer_user where id=(select user_id from APIServer_device_app where id='$device_id') ";

		$result = sql_query($usercntquery);
		$usercnt = mysqli_result($result,0);
		
		if($usercnt==0) {
			$JSON = array(
				"returnCode" => "notlogin"
			);

			echo json_encode($JSON);
			return;
		}

		$query 
		= " select (select id from APIServer_device where device_app_id='$device_id' and album_id='$albumid') as device_id, id, user_name, user_phone, user_img, user_nick, date_format(reg_time,'%Y-%m-%d') as reg_time, login_type, login_id from APIServer_user where id=(select user_id from APIServer_device_app where id='$device_id')
		";	
	}

	$result = sql_query($query);
	$row = $result->fetch_assoc();
	$JSON = array(
		"returnCode" => "login_complete"
		, "user_id" => $row['id']
		, "device_id" => $row['device_id']
		, "account" => $row['login_id']
		, "name" => $row['user_name']
		, "tel" => $row['user_phone']
		, "profile" => $row['user_img']
		, "nick" => $row['user_nick']
		, "regdate"  => $row['reg_time']
		, "snstype"  => $row['login_type']
		, "passwd" => $passwd
	);

	echo json_encode($JSON);
	
  	//mysql_close($connect);
?>
