<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$type = $_REQUEST["type"];
	$like = $_REQUEST["like"];
	$avr = $_REQUEST["avr"];
	$id = $_REQUEST["id"];
	$user_id = $_REQUEST["user_id"]==""?"0":$_REQUEST["user_id"];
	$device_id = $_REQUEST["device_id"];
	
	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//mysql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$tablename;
	$wherequery;
	$like_type;
	if($type=="song") {
		$tablename = "APIServer_song";
		$wherequery = " where album_id='$avr' and id='$id'";
		$like_type = "1";
	}
	elseif($type=="video") {
		$tablename = "APIServer_video";
		$wherequery = " where album_id='$avr' and id='$id'";
		$like_type = "3";
	}
	elseif($type=="videocomment") {
		$tablename = "APIServer_user_comment";
		$wherequery = " where album_id='$avr' and id='$id'";
		$like_type = "4";
	}
	elseif($type=="review") {
		$tablename = "APIServer_review";
		$wherequery = " where album_id='$avr' and id='$id'";
		$like_type = "5";
	}
	elseif($type=="reviewcomment") {
		$tablename = "APIServer_user_comment";
		$wherequery = " where album_id='$avr' and id='$id'";
		$like_type = "6";
	}

	$selectLikequery = " SELECT count(1) as cnt FROM APIServer_user_like where device_id='$device_id' and user_id='$user_id' and album_id='$avr' and contents_type='$like_type' and contents_id='$id'";
	$result = sql_query($selectLikequery);
	$count = mysqli_result($result,0);
	if($count>0) {
		$delLikequery = " DELETE FROM APIServer_user_like where user_id='$user_id' and album_id='$avr' and contents_type='$like_type' and contents_id='$id'";
		$result = sql_query($delLikequery);
	}
	else {
		$insertlikeQuery = "INSERT INTO APIServer_user_like(album_id, device_id, user_id, contents_type, contents_id, like_time) VALUES('$avr','$device_id','$user_id','$like_type','$id', NOW())";
		$insert_result = sql_query($insertlikeQuery);		
	}

	if(strpos($type,"comment")!==false) {
		$likeSongUpdateQuery = "update $tablename set like_count=like_count+$like $wherequery";
	}
	else {
		$likeSongUpdateQuery = "update $tablename set likeCount=likeCount+$like $wherequery";
	}

	$update_result = sql_query($likeSongUpdateQuery);
	if($update_result>0) {
		if(strpos($type,"comment")!==false) {
			$query = " SELECT ifnull(like_count,0) as likeCount FROM $tablename $wherequery";
		}
		else {
			$query = " SELECT ifnull(likeCount,0) as likeCount FROM $tablename $wherequery";
		}

		// 쿼리하나를 생성해서 mysql를 통해 해당 db에 호출해주는 부분이다.
	 	// insert의 경우에는 넣는 것으로 끝나지만, select의 경우에는 가져온 값을 뿌려줘야 하므로
	  	// 리턴값을 활용해야 한다.
	  	$result = sql_query($query);
	  	$rows = array();
	  	while($row = $result->fetch_assoc()) {
	  		$JSON = array(
	  			"likeCnt" => $row['likeCount']
	  		);
	  		array_push($rows, $JSON);
	  	}

	  	echo json_encode($rows);
	}

  	//mysql_close($connect);
?>
