<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");
	$albumid = $_REQUEST["albumid"];
	$user_id = $_REQUEST["user_id"];
	$device_id = $_REQUEST["device_id"];
	
	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//sql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$query 
	= " SELECT ri.*, IFNULL( aul.contents_id, '0' ) AS likeonoff
		FROM (
			SELECT a.album_id, a.id, a.review_title, a.review_contents, a.sign_img, a.likeCount, IFNULL(b.replyCount,0) as replyCount
			FROM (
				SELECT album_id, id, review_title, review_contents, sign_img, likeCount
				FROM APIServer_review
				WHERE album_id =$albumid
			)a 
			LEFT OUTER JOIN (
				SELECT contents_id, count( 1 ) AS replyCount
				FROM APIServer_user_comment
				GROUP BY contents_id
			)b
			ON a.id = b.contents_id
		) ri
		LEFT OUTER JOIN (
			SELECT album_id, user_id, contents_type, contents_id
			FROM APIServer_user_like
			WHERE device_id='$device_id' and user_id = '$user_id'
			AND contents_type = '5'
		) aul
		ON ri.album_id = aul.album_id
		AND ri.id = aul.contents_id
	";

	// 쿼리하나를 생성해서 mysql를 통해 해당 db에 호출해주는 부분이다.
 	// insert의 경우에는 넣는 것으로 끝나지만, select의 경우에는 가져온 값을 뿌려줘야 하므로
  	// 리턴값을 활용해야 한다.
  	$result = sql_query($query);
  	$rows = array();
  	while($row = $result->fetch_assoc()) {
  		$JSON = array(
  			"id" => $row['id']
  			, "reviewTitle" => $row['review_title']
  			, "reviewContents" => $row['review_contents']
  			, "signImg" => $row['sign_img']
  			, "likeCount" => $row['likeCount']
  			, "replyCount" => $row['replyCount']
  			, "reviewlikeonoff" => $row['likeonoff']
  		);
  		array_push($rows, $JSON);
  	}

  	echo json_encode($rows);

  	//mysql_close($connect);
?>
