<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$name = $_REQUEST["name"];
	$userid = $_REQUEST["userid"];
	$passwd = $_REQUEST["passwd"];
	$phone = $_REQUEST["phone"];
	$nick = $_REQUEST["nick"];
	$snstype = $_REQUEST["snstype"];
	$profile = $_REQUEST["profile"]==""?"default/profile_none.png":$_REQUEST["profile"];
	$uuid = $_REQUEST["uuid"];
	$albumid = $_REQUEST["albumid"];

	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//mysql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$rows = array();
	$selcust = "	select count(1) as cnt from auth_user where username='$userid'	";
	$result = sql_query($selcust);
	$count = mysqli_result($result,0);
	if($count==1) {
		if($snstype!="0") {
			$uuidClearQuery = "update auth_user set uuid='$uuid' where username='$userid'";
			$update_result = sql_query($uuidClearQuery);

			$JSON = array(
				"returnCode" => "join_complete"
			);

			echo json_encode($JSON);
			return;
		}
		else {
			$JSON = array(
				"returnCode" => "already_id"
			);

			echo json_encode($JSON);
			return;
		}
	}

	$selphone = "	select count(1) as cnt from APIServer_soundgramuser where sduser_phone_number='$phone'	";
	$result = sql_query($selphone);
	$count = mysqli_result($result,0);
	if($count==1) {
		$JSON = array(
			"returnCode" => "already_phone"
		);

		echo json_encode($JSON);
		return;
	}

	$selnick = "	select count(1) as cnt from APIServer_soundgramuser where nick='$nick'	";
	$result = sql_query($selnick);
	$count = mysqli_result($result,0);
	if($count==1) {
		$JSON = array(
			"returnCode" => "already_nick"
		);

		echo json_encode($JSON);
		return;
	}

	$seluuid = "	select count(1) as cnt from auth_user where uuid='$uuid'	";
	$result = sql_query($seluuid);
	$count = mysqli_result($result,0);
	if($count==1) {
		$uuidClearQuery = "update auth_user set uuid='' where uuid='$uuid'";
		$update_result = sql_query($uuidClearQuery);
	}

	$selmaxuserid = "	select max(user_id)+1 as user_id from APIServer_soundgramuser	";
	$result = sql_query($selmaxuserid);
	$user_id = mysqli_result($result,0);

	$insertQuery1 
	= " INSERT INTO auth_user(password, is_superuser, username, uuid, is_staff, is_active, date_joined) VALUES('$passwd', '0', '$userid', '$uuid', '0', '1', NOW())";
	$result = sql_query($insertQuery1);

	$insertQuery2
	= "INSERT INTO APIServer_soundgramuser (sduser_name, sduser_phone_number, sduser_appver, os_type, sduser_level, dateAdd, user_id, profile, snsType, nick, alarm_email, alarm_phone) VALUES('$name', '$phone', '1', '0', '0', NOW(), '$user_id', '$profile', '$snstype', '$nick', '1', '1')";
	$result = sql_query($insertQuery2);
	if($result>0) {
		$JSON = array(
			"returnCode" => "join_complete"
			, "id" => $user_id
			, "account" => $userid
			, "tel" => $phone
			, "nick" => $nick
			, "snstype" => $snstype
			, "profile" => $profile
		);

		echo json_encode($JSON);
	}
	
  	//mysql_close($connect);
?>
