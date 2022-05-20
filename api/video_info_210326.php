<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");
	$albumid = $_REQUEST["albumid"];
	$userid = $_REQUEST["userid"];
	$device_id = $_REQUEST["device_id"];
	
	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//sql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$query 
	= " SELECT vi.*, IFNULL( aul.contents_id, '0' ) AS likeonoff
		FROM (
			SELECT 	a.album_id, a.id, a.video_file_name, a.video_name, a.photo_path, a.likeCount, a.`order`
					, ifnull(a.viewCount,0) as viewCount, ifnull( b.replyCnt, 0 ) AS replyCnt
			FROM (
				SELECT album_id, id, video_file_name, video_name, photo_path, likeCount, viewCount, `order`
				FROM APIServer_video
				WHERE album_id =$albumid
			)a
			LEFT OUTER JOIN (
				SELECT av.contents_id, count( av.contents_id ) AS replyCnt
				FROM (
					SELECT contents_id, user_id
					FROM APIServer_user_comment
				)av, APIServer_user au
				WHERE av.user_id = au.id
				GROUP BY av.contents_id
			)b 
			ON a.id = b.contents_id
		) vi
		LEFT OUTER JOIN (
			SELECT album_id, user_id, contents_type, contents_id
			FROM APIServer_user_like
			WHERE device_id='$device_id' and user_id = '$userid'
			AND contents_type = '3'
		) aul
		ON vi.album_id = aul.album_id
		AND vi.id = aul.contents_id
		ORDER BY vi.`order` ASC, vi.id DESC
		";

	// 쿼리하나를 생성해서 mysql를 통해 해당 db에 호출해주는 부분이다.
 	// insert의 경우에는 넣는 것으로 끝나지만, select의 경우에는 가져온 값을 뿌려줘야 하므로
  	// 리턴값을 활용해야 한다.
  	$result = sql_query($query);
  	$rows = array();
  	while($row = $result->fetch_assoc()) {
  		$JSON = array(
  			"id" => $row['id']
  			, "videoName" => $row['video_name']
  			, "video" => $row['video_file_name']
  			, "likecnt" => $row['likeCount']
  			, "viewcnt" => $row['viewCount']
  			, "replycnt" => $row['replyCnt']
  			, "likeonoff" => $row['likeonoff']
  		);
  		array_push($rows, $JSON);
  	}

  	echo json_encode($rows);

  	//mysql_close($connect);
?>
