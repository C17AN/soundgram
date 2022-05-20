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
	$selcust;
	if($type=="A") {
		$selcust = "	select id from APIServer_soundgramuser where user_id in(select id from auth_user where uuid='$uuid' and album_id='$albumid')	";
	}
	else {
		$selcust = "	select id from APIServer_soundgramuser where user_id in(select id from auth_user where username='$userid' and password='$passwd' and album_id='$albumid')	";	
	}
	
	$result = sql_query($selcust);
	$user_id = mysqli_result($result,0);
	if(empty($user_id)) {
		$JSON = array(
			"returnCode" => "notuser"
		);

		echo json_encode($JSON);
		return;
	}
	else {
		$selcust_asda = "select user_id from APIServer_soundgramuser_device_album where device_uuid='$uuid'";
		$result = sql_query($selcust_asda);
		$asda_user_id = mysqli_result($result,0);

		if($asda_user_id != $user_id) {
			$useridUpdateQuery = "update APIServer_soundgramuser_device_album set user_id='$user_id' where device_uuid='$uuid'";
			$update_result = sql_query($useridUpdateQuery);
			echo $update_result;
		}
		
		// $uuidUpdateQuery = "update auth_user set uuid='$uuid', album_id='$albumid' where username='$userid'";
		// $update_result = mysql_query($uuidUpdateQuery, $connect);

		// $query 
		// = " select 	sduser_name, sduser_phone_number, profile, nick, date_format(dateAdd,'%Y-%m-%d') as regdate, snstype
		// 			, (select username from auth_user where id='$user_id') as account
		// 	from APIServer_soundgramuser
		// 	where user_id='$user_id'
		// ";
		// $result = mysql_query($query, $connect);
		// $row = mysql_fetch_assoc($result);
  // 		$JSON = array(
  // 			"returnCode" => "login_complete"
  // 			, "id" => $user_id
  // 			, "account" => $row['account']
  // 			, "name" => $row['sduser_name']
  // 			, "tel" => $row['sduser_phone_number']
  // 			, "profile" => $row['profile']
  // 			, "nick" => $row['nick']
  // 			, "regdate"  => $row['regdate']
  // 			, "snstype"  => $row['snstype']
  // 			, "passwd" => $passwd
  // 		);

		// echo json_encode($JSON);
	}
	
  	//mysql_close($connect);
?>
