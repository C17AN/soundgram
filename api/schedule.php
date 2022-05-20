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
	= " SELECT 	schedule_title, schedule_category, schedule_place, schedule_date
				, case WEEKDAY(schedule_date)
					when '0' then 'Mon'
					when '1' then 'Tue'
					when '2' then 'Wed'
					when '3' then 'Thu'
					when '4' then 'Fri'
					when '5' then 'Sat'
					when '6' then 'Sun' end as dayofweek_eng
				, case WEEKDAY(schedule_date)
					when '0' then '월'
					when '1' then '화'
					when '2' then '수'
					when '3' then '목'
					when '4' then '금'
					when '5' then '토'
					when '6' then '일' end as dayofweek_kor
		FROM APIServer_schedule
		WHERE artist_id = ( 
			SELECT artist_id
			FROM APIServer_album
			WHERE id =$albumid )";

	// 쿼리하나를 생성해서 mysql를 통해 해당 db에 호출해주는 부분이다.
 	// insert의 경우에는 넣는 것으로 끝나지만, select의 경우에는 가져온 값을 뿌려줘야 하므로
  	// 리턴값을 활용해야 한다.
  	$result = sql_query($query);
  	$rows = array();
  	while($row = $result->fetch_assoc()) {
  		$JSON = array(
  			"title" => $row['schedule_title']
  			, "category" => $row['schedule_category']
  			, "place" => $row['schedule_place']
			  , "date" => $row['schedule_date']
			  , "dayofweek_eng" => $row['dayofweek_eng']
			  , "dayofweek_kor" => $row['dayofweek_kor']
  		);
  		array_push($rows, $JSON);
  	}

  	echo json_encode($rows);

  	//mysql_close($connect);
?>
