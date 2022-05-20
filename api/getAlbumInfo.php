<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");

    
    $nfckey = $_GET['nfc_key'];
	
	$query 
	= "SELECT `album_name`, a.`write_date`, a.`serial`, a.`artist_name` , a.`nfckey_id` , a.`album_id` , `nfckey` , a.`tag` , a.`timestamp` , a.`securitynum_id` , `device_id` , a.`active` , a.`active_date` , a.`update_date` , `class` , a.`memo`, b.securitynum
    FROM ((SELECT DISTINCT `album_name`, `write_date`,`serial` ,artist.`artist_name` , nfckey.`id` as nfckey_id , nfckey.`album_id` , `nfckey` , nfckey.`tag` , nfckey.`timestamp` , `securitynum_id` , `device_id` , nfckey.`active` , nfckey.`active_date` , nfckey.`update_date` , `class` , nfckey.`memo`
        FROM `APIServer_nfckey` AS nfckey, `APIServer_album` AS album, `APIServer_artist` AS artist, `APIServer_nfcsecuritynum` AS security
        WHERE nfckey.album_id = album.id
        AND album.artist_id = artist.id
        AND nfckey = '$nfckey') as a LEFT Join (SELECT id as securitynum_id, securitynum FROM `APIServer_nfcsecuritynum`) as b on a.securitynum_id = b.securitynum_id ) 
    ";


    // DB 수정되면 nfc쓰기[write_date], [serial] 컬럼 추가 필요!!
  	$result = sql_query($query);
  	$rows = array();
  	while($row = $result->fetch_assoc()) {
  		$JSON = array(
            "write_date" => $row['write_date'],
            "album_id" => $row['album_id'],
            "album_name" => $row['album_name'],
            "nfckey_id" => $row['nfckey_id'],
            "nfckey" => $row['nfckey'],
            "tag" => $row['tag'],
            "timestamp" => $row['timestamp'],
            "serial" => $row['serial'],
            "securitynum_id" => $row['securitynum_id'],
            "device_id" => $row['device_id'],
            "active" => $row['active'],
            "active_date" => $row['active_date'],
            "update_date" => $row['update_date'],
            "class" => $row['class'],
            "memo" => $row['memo'],
            "artist_name" => $row['artist_name'],
            "securitynum" => $row['securitynum']
  		);
  		array_push($rows, $JSON);
  	}

  	echo json_encode($rows);

  	//mysql_close($connect);
?>

