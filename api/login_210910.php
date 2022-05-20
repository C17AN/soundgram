<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$userid = $_REQUEST["id"];
	$passwd = $_REQUEST["passwd"];
	$uuid = $_REQUEST["uuid"];
	$type = $_REQUEST["type"];
	$albumid = $_REQUEST["albumid"];

	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//mysql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$rows = array();
	$selcust = "select id as user_id from APIServer_user where login_id='$userid' and login_pwd='$passwd'";	
	$result = sql_query($selcust);
	$user_id = mysqli_result($result,0);

	if(empty($user_id)) {
		$JSON = array(
			"returnCode" => "notuser"
			, "user_id" => $user_id
		);

		echo json_encode($JSON);
		return;
	}
	else {
		$plus_sql;
		if($albumid!="tot") {
			$plus_sql=" and album_id='$albumid'";
		}

		$diffloginUpdateQuery = "update APIServer_device set user_id=null, login_status=0, login_last_time=null where user_id='$user_id' and album_id='$albumid'";
		$update_result = sql_query($diffloginUpdateQuery);

		$lastloginUpdateQuery = "update APIServer_device set user_id='$user_id', login_status=1, login_last_time=NOW() where device_uuid='$uuid' and album_id='$albumid'";
		$update_result = sql_query($lastloginUpdateQuery);

		$lastloginUpdateQuery2 = "update APIServer_user set last_login_time=NOW() where id='$user_id'";
		$update_result = sql_query($lastloginUpdateQuery2);

		$query 
		= " select (select id from APIServer_device where user_id='$user_id' and album_id='$albumid') as device_id, id, user_name, user_phone, user_img, user_nick, date_format(reg_time,'%Y-%m-%d') as reg_time, login_type, login_id from APIServer_user where id='$user_id'
		";
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
	}
	
  	//mysql_close($connect);
?>
