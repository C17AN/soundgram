<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$uuid = $_REQUEST["uuid"];
	$album_id = $_REQUEST["albumid"];

	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//mysql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$rows = array();
	$selcust = "select id from APIServer_device where device_uuid='$uuid' and album_id='$album_id' and login_status=1 and user_id is not null";
	
	$result = sql_query($selcust);
	$device_id = mysqli_result($result,0);
	if(empty($device_id)) {
		$JSON = array(
			"returnCode" => "notlogin"
		);

		echo json_encode($JSON);
		return;
	}
	else {
		$lastloginUpdateQuery = "update APIServer_device set login_status=1, login_last_time=NOW() where device_uuid='$uuid' and album_id='$album_id'";
		$update_result = sql_query($lastloginUpdateQuery);

		$lastloginUpdateQuery2 = "update APIServer_user set last_login_time=NOW() where id in(select user_id from APIServer_device where id='$device_id')";
		$update_result = sql_query($lastloginUpdateQuery2);

		$query 
		= " select 	id, user_name, user_phone, user_img, user_nick, date_format(reg_time,'%Y-%m-%d') as reg_time, login_type, login_id, access_token from APIServer_user
			where id in(select user_id from APIServer_device where id='$device_id')
		";
		$result = sql_query($query);
		$row = $result->fetch_assoc();
  		$JSON = array(
  			"returnCode" => "login_complete"
  			, "user_id" => $row['id']
  			, "device_id" => $device_id
  			, "account" => $row['login_id']
  			, "name" => $row['user_name']
  			, "tel" => $row['user_phone']
  			, "profile" => $row['user_img']
  			, "nick" => $row['user_nick']
  			, "regdate"  => $row['reg_time']
  			, "snstype"  => $row['login_type']
			, "access_token"  => $row['access_token']
  			, "passwd" => $passwd
  		);

		echo json_encode($JSON);
	}
	
  	//mysql_close($connect);
?>
