<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");
	$albumid = isset($_REQUEST["albumid"])?$_REQUEST["albumid"]:"";
	$userid = isset($_REQUEST["userid"])?$_REQUEST["userid"]:"";
	$device_id = isset($_REQUEST["device_id"])?$_REQUEST["device_id"]:"";
	
	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//mysql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$query 
	= " SELECT si.*, IFNULL( aul.contents_id, '0' ) AS likeonoff
		FROM (
			SELECT 	a.id, a.album_id, a.song_order, a.rnum, a.song_name, a.song_artist, a.song_file_mp3, a.lyric_file_lrc, a.song_lyric, a.lyric_writer, a.song_writer, a.song_arranger
					, a.likeCount, a.isTitle, IFNULL(b.photo_file_path, (select photo_file_path from APIServer_booklet where album_id=$albumid order by rand() limit 1)) as photo_file_path
			FROM (
				SELECT @srownum := @srownum +1 AS rnum, aps . * 
				FROM (
					SELECT id, album_id, song_order, song_name, song_artist, song_file_mp3, lyric_file_lrc, song_lyric, lyric_writer, song_writer, song_arranger, likeCount, isTitle
					FROM APIServer_song
					WHERE (
					@srownum :=0
					) =0
					AND album_id=$albumid
					)aps
				)a
				LEFT OUTER JOIN (
					SELECT @brownum := @brownum +1 AS rnum, ab . * 
					FROM (
						SELECT album_id, photo_file_path
						FROM APIServer_booklet
						WHERE (
						@brownum :=0
						) =0
						AND album_id=$albumid
						ORDER BY rand( ) 
						)ab
				)b ON a.rnum = b.rnum 
			) si
			LEFT OUTER JOIN (
				SELECT album_id, user_id, contents_type, contents_id
				FROM APIServer_user_like
				WHERE device_id = '$device_id' and user_id = '$userid'
				AND contents_type = '1'
			) aul
			ON si.album_id = aul.album_id
			AND si.id = aul.contents_id
		ORDER BY si.song_order ASC
	";

	// 쿼리하나를 생성해서 mysql를 통해 해당 db에 호출해주는 부분이다.
 	// insert의 경우에는 넣는 것으로 끝나지만, select의 경우에는 가져온 값을 뿌려줘야 하므로
  	// 리턴값을 활용해야 한다.
  	$result = sql_query($query);
  	$rows = array();
  	while($row = $result->fetch_assoc()) {
  		$JSON = array(
  			"order" => $row['song_order']
  			, "id" => $row['id']
  			, "title" => $row['song_name']
  			, "song_artist" => $row['song_artist']
			, "song_file_mp3" => $row['song_file_mp3']
			, "lyric_file_lrc" => $row['lyric_file_lrc']
  			, "lyric" => $row['song_lyric']
  			, "lyric_writer" => $row['lyric_writer']
  			, "song_writer" => $row['song_writer']
  			, "song_arranger" => $row['song_arranger']
  			, "likecnt" => $row['likeCount']
  			, "isTitle" => $row['isTitle']
  			, "photo_file_path" => $row['photo_file_path']
  			, "likeonoff" => $row['likeonoff']
  		);
  		array_push($rows, $JSON);
  	}

  	echo json_encode($rows);

  	//mysql_close($connect);
?>
