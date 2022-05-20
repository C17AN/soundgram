<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");
    

    // 일단 album_id = 700, tag = test220418을 test용으로 하고 불러오기
    
    $tag = $_GET['tag'];
    $album_id = $_GET['album_id'];

	
	$query 
	= "SELECT id, album_id, nfckey, tag, APIServer_nfckey.timestamp, active
	FROM `APIServer_nfckey`
	WHERE `album_id` = '$album_id'
	AND `tag` = '$tag'
	AND `write` = 0
	ORDER BY id";

	// 쿼리하나를 생성해서 mysql를 통해 해당 db에 호출해주는 부분이다.
 	// insert의 경우에는 넣는 것으로 끝나지만, select의 경우에는 가져온 값을 뿌려줘야 하므로
  	// 리턴값을 활용해야 한다.
  	$result = sql_query($query);
  	$rows = array();
  	while($row = $result->fetch_assoc()) {
  		$JSON = array(
            "id" => $row['id'],
			"album_id" => $row['album_id'],
            "nfckey" => $row['nfckey'],
            "tag" => $row['tag'],
            "timestamp" => $row['timestamp'],
            "active" => $row['active'],
  		);
  		array_push($rows, $JSON);
  	}

  	echo json_encode($rows);

  	//mysql_close($connect);
?>

