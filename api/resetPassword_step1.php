<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$account = $_REQUEST["account"];
	$phone = $_REQUEST["phone"];
	$albumid = $_REQUEST["albumid"];

	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//sql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$rows = array();
	$selcust = "	select count(1) as cnt from APIServer_user where login_id='$account' and user_phone='$phone'	";
	$result = sql_query($selcust);
	$count = mysqli_result($result,0);
	if($count==0) {
		$JSON = array(
			"returnCode" => "notuser"
		);

		echo json_encode($JSON);
	}
	else {
		$JSON = array(
  			"returnCode" => "success"
  			, "password" => sprintf('%04d',rand(0000,9999))
  		);

	  	echo json_encode($JSON);
	}
	
  	//mysql_close($connect);
?>
