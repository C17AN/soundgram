<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$albumid = $_REQUEST["albumid"];
	$artist_id = $_REQUEST["artist_id"];
	
	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//mysql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$rows = array();
	$selcount = "	select count(1) from APIServer_apppopup where artist_id='$artist_id' and album_id='$albumid' and popup_status='1' and NOW() between popup_start and popup_end	";
	$result = sql_query($selcount);
	$count = mysqli_result($result,0);
	//sql_result($result,0,0);
	if($count==1) {
		$selnotice = "	select id, popup_title, popup_img, popup_url from APIServer_apppopup where artist_id='$artist_id' and album_id='$albumid' and popup_status='1' and NOW() between popup_start and popup_end	";
		$result = sql_query($selnotice);
		$rows = array();
		while($row = $result->fetch_assoc()) {
	  		$JSON = array(
	  			"returnCode" => "complete"
	  			, "id" => $row['id']
	  			, "popup_title" => $row['popup_title']
	  			, "popup_img" => $row['popup_img']
	  			, "popup_url" => $row['popup_url']
			);
	  		array_push($rows, $JSON);
	  	}

	  	echo json_encode($rows);
	}
	else {
		$JSON = array(
			"returnCode" => "notnotice"
		);

		echo json_encode($JSON);
	}
	
  	//mysql_close($connect);
?>
