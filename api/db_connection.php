<?php
//201111 sh - db url edit 
$host = 'db.soundgram.co.kr';
#$host = '211.251.236.130';
#$host='localhost';
$user = 'root';
$pw = '1tkddydwkdql';
//$dbname = 'soundcs';
//$dbname = 'soundgram';
$dbname = 'soundgramR2';
$mysqli_ = new mysqli($host, $user, $pw, $dbname);
$mysqli_->set_charset("utf8");


function sql_query($sql){
	global $mysqli_;
	return $mysqli_->query($sql);
}
function sql_err(){
	global $mysqli_;
	echo("SQL error : " . $mysqli_->error ."\n");
}
function sql_get_id(){
	global $mysqli_;
	return $mysqli_->insert_id;
}
function mysqli_result($res,$row=0)
{ 
	$data=mysqli_fetch_row($res);
	return $data[$row];
}
?>
