<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");
	$uuid = $_REQUEST["uuid"];
	$albumid = $_REQUEST["albumid"];
	$app_ver = $_REQUEST["app_ver"];
	
	//$connect = mysql_connect("211.251.236.130","root","1tkddydwkdql") or die(mysql_error());
	//mysql에서는 db를 반드시 선택해야한다.
	//mysql_select_db("soundgramR2") or die("can't find db");
	//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
	//mysql_query("set names utf8");
	// DB에서 가져올 때 하는 명령어는 select이다.
	// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

	$deviceUpdateQuery = "update APIServer_device set app_ver='$app_ver', device_last_time=NOW() where device_uuid='$uuid' and album_id='$albumid'";
	$update_result = sql_query($deviceUpdateQuery);

	$query 
	= " select 	a.artist_id, a.auth_type, a.album_name, a.album_type, a.album_genre, a.album_info_title, a.album_info, a.album_cover, a.album_artist_img
				, a.google_url, a.apple_url, a.share_title, a.share_img, b.artist_name, b.artist_img, b.artist_url, c.diskpath, c.diskid, c.category
				, (select company_name from APIServer_homecustomer where id=a.album_distributor) as album_distributor
				, (select company_name from APIServer_homecustomer where id=a.album_company) as album_company
				, a.album_artist_info, a.album_intro_info, a.album_credit_info, a.album_time
		from 
			(select id, ifnull(auth_type,0) as auth_type, album_name, album_type, album_genre, google_url, apple_url, album_time
					, share_title, share_img, album_distributor, album_company, album_artist_info, album_intro_info, album_credit_info
					, artist_id, album_info_title, album_info, album_cover, album_artist_img from APIServer_album where id=$albumid) a, 
	 		(select id, artist_name, artist_img, artist_url from APIServer_artist) b,
	 		(select id
	 				, album_id
	 				, diskpath
	 				, diskid
					, concat(
						ifnull(sp,'-'),','
						,ifnull(aa,'-'),','
						,ifnull(ho,'-'),','
						,ifnull(ab,'-'),','
						,ifnull(al,'-'),','
						,ifnull(pl,'-'),','
						,ifnull(ga,'-'),','
						,ifnull(bo,'-'),','
						,ifnull(vi,'-'),','
						,ifnull(th,'-'),','
						,ifnull(st,'-'),','
						,ifnull(ac,'-'),','
						,ifnull(`in`,'-'),','
						,ifnull(sc,'-'),','
						,ifnull(sn,'-'),','
						,ifnull(rv,'-'),','
						,ifnull(cu,'-'),','
						,ifnull(nc,'-'),','
						,ifnull(me,'-'),','
						,ifnull(tb,'-'),','
						,ifnull(ly,'-'),','
						,ifnull(pd,'-'),','
						,ifnull(vd,'-'),','
						,ifnull(mp,'-'),','
						,ifnull(am,'-'),','
						,ifnull(ap,'-')
					) as category
			from APIServer_apppage) c
	 	where a.artist_id = b.id and a.id = c.album_id 
	 	order by c.id desc ";
	// 쿼리하나를 생성해서 mysql를 통해 해당 db에 호출해주는 부분이다.
 	// insert의 경우에는 넣는 것으로 끝나지만, select의 경우에는 가져온 값을 뿌려줘야 하므로
  	// 리턴값을 활용해야 한다.
  	//$result = mysql_query($query, $connect);
  	$result = sql_query($query);
  	$rows = array();
  	while($row = $result-> fetch_assoc()) {
  		$JSON = array(
  			"diskpath" => $row['diskpath']
  			, "diskid" => $row['diskid']
  			, "auth_type" => $row['auth_type']
  			, "album_name" => $row['album_name']
  			, "album_type" => $row['album_type']
			, "album_genre" => $row['album_genre']
  			, "album_cover" => $row['album_cover']
  			, "album_artist_img" => $row['album_artist_img']
  			, "album_info_title" => $row['album_info_title']
  			, "album_info" => $row['album_info']
			, "album_artist_info" => $row['album_artist_info']
			, "album_intro_info" => $row['album_intro_info']
			, "album_credit_info" => $row['album_credit_info']
			, "album_distributor" => $row['album_distributor']
			, "album_company" => $row['album_company']
			, "album_time" => $row['album_time']
  			, "artist_id" => $row['artist_id']
  			, "artist_name" => $row['artist_name']
  			, "artist_url" => $row['artist_url']
  			, "category" => $row['category']
			, "google_url" => $row['google_url']
			, "apple_url" => $row['apple_url']
			, "share_title" => $row['share_title']
			, "share_img" => $row['share_img']
  		);
  		array_push($rows, $JSON);
  	}

  	echo json_encode($rows);

  	//mysql_close($connect);
?>
