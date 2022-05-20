<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");
	$albumid = $_REQUEST["albumid"];
	
	//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//mysql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$query 
	= " select a.sns_type_id, a.sns_url, a.owner_name, a.owner_type, b.name, b.css_class, a.sn
		from
		(	SELECT sns_type_id, sns_url, owner_name, owner_type, `order` as sn
			FROM APIServer_sns
			WHERE album_id = $albumid ) a, APIServer_snstype b
		where a.sns_type_id = b.id
		order by a.sn asc
	";

	// 쿼리하나를 생성해서 mysql를 통해 해당 db에 호출해주는 부분이다.
 	// insert의 경우에는 넣는 것으로 끝나지만, select의 경우에는 가져온 값을 뿌려줘야 하므로
  	// 리턴값을 활용해야 한다.
  	$result = sql_query($query);
  	$rows = array();
  	while($row = $result->fetch_assoc()) {
  		$JSON = array(
  			"snsType" => $row['sns_type_id']
  			, "snsUrl" => $row['sns_url']
			, "ownerName" => $row['owner_name']
  			, "snsName" => $row['name']
  			, "classname" => $row['css_class']
  		);
  		array_push($rows, $JSON);
  	}

  	echo json_encode($rows);

  	//mysql_close($connect);
?>
