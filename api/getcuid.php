<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$tot_id = $_REQUEST["tot_id"];
	$album_id = $_REQUEST["albumid"];

	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//mysql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$rows = array();
	$selcu = "select cu from APIServer_apppage where tot_id='$tot_id'";
	if($tot_id=="0") {
		$selcu = "select cu from APIServer_apppage where album_id='$album_id'";
	}
	
	$result = sql_query($selcu);
	$cuid = mysqli_result($result,0);
	$JSON = array(
		"returnCode" => $cuid
	);

	echo json_encode($JSON);
	return;
?>
