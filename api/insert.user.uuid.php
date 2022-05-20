<?php
require_once("db_connection.php");
//$host = '211.251.236.130';
$uuid=$_GET['user_uuid'];
$album_id=$_GET['album_id'];
$query="INSERT INTO auth_user (username,album_id,uuid) VALUES('test','$album_id','$uuid')";
echo($query);
sql_query($query);

?>
