<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");

    $album_id = $_GET['album_id'];
	
	$query 
	= "select max(`serial`) as serial from APIServer_nfckey as nfckey where nfckey.album_id = '$album_id'";

	// 쿼리하나를 생성해서 mysql를 통해 해당 db에 호출해주는 부분이다.
 	// insert의 경우에는 넣는 것으로 끝나지만, select의 경우에는 가져온 값을 뿌려줘야 하므로
  	// 리턴값을 활용해야 한다.
  	$result = sql_query($query);
  	$rows = array();
  	while($row = $result->fetch_assoc()) {
  		$JSON = array(
  			"serial" => $row['serial']
  		);
  		array_push($rows, $JSON);
  	}

  	echo json_encode($rows);

  	//mysql_close($connect);
?>
