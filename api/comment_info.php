<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$type = $_REQUEST["type"];
	$id = $_REQUEST["id"];
	$userid = $_REQUEST["userid"];
	$device_id = $_REQUEST["device_id"];
	$albumid = $_REQUEST["albumid"];
	
	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//mysql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$tablename;
	$comment;
	$rv_id;
	$rv_title;
	$like_type;
	$wherequery;
	$selectquery;
	$update_result;
	if($type=="video") {
		$rv_id = "video_id";
		$rv_title = "video_name";
		$like_type = "4";
		$tablename = "APIServer_video";
		$wherequery = " where video_id=$id";
		$selectquery = " 	SELECT 	id, $rv_title as title, viewCount, ifnull(likeCount,0) as videoLikeCount
									, (SELECT count(1) FROM APIServer_user_comment where contents_id='$id' AND comment_status = 1) AS videoReplyCnt	
									, (	SELECT count(1) 
										FROM APIServer_user_like
										WHERE device_id='$device_id' and user_id = '$userid'
										AND album_id = '$albumid'
										AND contents_type = '3'
										AND contents_id = '$id') AS likeonoff
							FROM 	$tablename where id='$id'
		";

		$addviewQuery = "update $tablename set viewCount=viewCount+1 where id=$id";
		$update_result = sql_query($addviewQuery);
	}
	elseif($type=="review") {
		if(empty($id)) {
			$selreviewid = "	select id from APIServer_review where album_id='$albumid'	";
			$result = sql_query($selreviewid);
			$id = mysqli_result($result,0);
		}

		$rv_id = "review_id";
		$rv_title = "review_title";
		$like_type = "6";
		$tablename = "APIServer_review";
		$wherequery = " where review_id=$id";
		$selectquery = " 	SELECT 	id, '' as title, 0 as viewCount, ifnull(likeCount,0) as videoLikeCount
									, (SELECT count(1) FROM APIServer_user_comment where contents_id='$id') AS videoReplyCnt, '' AS likeonoff
							FROM $tablename where id='$id' 
		";
		$update_result = 1;
	}

	if($update_result>0) {
		$result = sql_query($selectquery);
		$rows = array();
		while($row = $result->fetch_assoc()) {
	  		$JSON = array(
	  			"id" => $row['id']
	  			, "title" => $row['title']
	  			, "viewCount" => $row['viewCount']
	  			, "videoLikeCount" => $row['videoLikeCount']
	  			, "videoReplyCnt" => $row['videoReplyCnt']
	  			, "likeonoff" => $row['likeonoff']
			);
	  		array_push($rows, $JSON);
	  	}

		$query 
		= " SELECT var.*, IFNULL( aul.contents_id, '0' ) AS likeonoff
			FROM (
				SELECT 	a.id, a.user_id, a.contents_id, a.comment, a.comment_img, a.comment_time, a.likeCount, a.org_comment_time
						, (SELECT COUNT(1) FROM APIServer_user_comment auc where auc.ref_comment_id = a.id and auc.comment_status=1) as refCount
						, b.nick, b.profile
				FROM 
					(
						SELECT 	id, comment, comment_img, user_id, contents_id, ifnull(like_count,0) as likeCount,
								CASE 	WHEN TIMESTAMPDIFF( MINUTE , timestamp, NOW( ) ) <=0 THEN '방금 전'
										WHEN TIMESTAMPDIFF( MINUTE , timestamp, NOW( ) ) <60	THEN CONCAT( TIMESTAMPDIFF( MINUTE , timestamp, NOW( ) ) , '분 전' ) 
										WHEN TIMESTAMPDIFF( HOUR , timestamp, NOW( ) ) <24 THEN CONCAT( TIMESTAMPDIFF( HOUR , timestamp, NOW( ) ) , '시간 전' ) 
										WHEN TIMESTAMPDIFF( DAY , timestamp, NOW( ) ) <8 THEN CONCAT( TIMESTAMPDIFF( DAY , timestamp, NOW( ) ) , '일 전' ) 
								ELSE timestamp END AS comment_time, timestamp as org_comment_time 
						FROM APIServer_user_comment
						where contents_id='$id' and comment_status=1 and ref_comment_id is null
					)a, 
					(
						SELECT CASE WHEN length( user_nick ) =0 THEN user_name ELSE user_nick END AS nick, id as user_id, user_img as profile	FROM APIServer_user
					)b			
				WHERE a.user_id = b.user_id
				) var
				LEFT OUTER JOIN (
					SELECT album_id, user_id, contents_type, contents_id
					FROM APIServer_user_like
					WHERE device_id='$device_id' and user_id = '$userid'
					AND album_id = '$albumid'
					AND contents_type = '$like_type'
				) aul
				ON  var.id = aul.contents_id
			ORDER BY var.likeCount DESC
		";
			
		// 쿼리하나를 생성해서 mysql를 통해 해당 db에 호출해주는 부분이다.
	 	// insert의 경우에는 넣는 것으로 끝나지만, select의 경우에는 가져온 값을 뿌려줘야 하므로
	  	// 리턴값을 활용해야 한다.
	  	$result = sql_query($query);
	  	while($row = $result->fetch_assoc()) {
	  		$JSON = array(
	  			"id" => $row['id']
	  			, "contents_id" => $row['contents_id']
	  			, "comment_user_id" => $row['user_id']
	  			, "comment_contents" => stripslashes($row['comment'])
	  			, "comment_img" => $row['comment_img']
	  			, "comment_time" => $row['comment_time']
	  			, "org_comment_time" => $row['org_comment_time']
	  			, "likeCount" => $row['likeCount']
	  			, "nick" => $row['nick']
	  			, "profile" => $row['profile']
	  			, "likeonoff" => $row['likeonoff']
				, "refCount" => $row['refCount']
	  		);
	  		array_push($rows, $JSON);
	  	}

  		echo json_encode($rows);
	}

  	//mysql_close($connect);
?>
