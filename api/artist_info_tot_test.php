<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$device_app_id = $_REQUEST["device_app_id"];
	$tot_id = $_REQUEST["tot_id"];
	
	$category_query
	= " select  diskpath
				, diskid
				, apple_ver
				, apple_url
				, google_ver
				, google_url
				, concat(
					ifnull(ct,'-'),','
					,ifnull(cl,'-'),','
					,ifnull(cr,'-'),','
					,ifnull(cs,'-'),','
					,ifnull(ci,'-'),','
					,ifnull(cb,'-'),','
					,ifnull(`in`,'-'),','
					,ifnull(cu,'-'),','
				) as category
		from APIServer_apppage where tot_id='$tot_id' ";
	
	$category_result = sql_query($category_query);
	$category_rows = array();
	while($row = $category_result-> fetch_assoc()) {
		$JSON = array(
			"diskpath" => $row['diskpath']
  			, "diskid" => $row['diskid']
			, "apple_ver" => $row['apple_ver']
			, "apple_url" => $row['apple_url']
			, "google_ver" => $row['google_ver']
			, "google_url" => $row['google_url']
			, "category" => $row['category']
		);
		array_push($category_rows, $JSON);
	}

	// $album_query 
	// = " select 	a.id, a.album_name, a.album_type, a.chip_img, a.chip_loading, a.album_time, a.shop_url, a.artist_id, b.artist_name
	// 	from 
	// 		(	select id, album_name, album_type, chip_img, chip_loading, album_time, artist_id, shop_url from APIServer_album 
	// 			where tot_type='$tot_id' and id not in(select album_id from APIServer_device where device_app_id='$device_app_id' and nfc_status='1'))
	// 			 a, 
	//  		(	select id, artist_name from APIServer_artist) b,
	// 		(	select album_id from APIServer_apppage) c
	//  	where a.artist_id = b.id and a.id = c.album_id
	//  	order by a.album_time desc ";

	$album_query 
	= " select 	a.id, a.album_name, a.album_type, a.chip_img, a.chip_loading, a.album_time, a.shop_url, a.artist_id, b.artist_name
		from 
			(	select id, album_name, album_type, chip_img, chip_loading, album_time, artist_id, shop_url from APIServer_album 
				where tot_type='$tot_id' and id not in(select album_id from APIServer_device where device_app_id='$device_app_id' and nfc_status='1'))
				 a, 
	 		(	select id, artist_name from APIServer_artist) b
	 	where a.artist_id = b.id
	 	order by a.album_time desc ";
	// 쿼리하나를 생성해서 mysql를 통해 해당 db에 호출해주는 부분이다.
 	// insert의 경우에는 넣는 것으로 끝나지만, select의 경우에는 가져온 값을 뿌려줘야 하므로
  	// 리턴값을 활용해야 한다.
  	//$result = mysql_query($query, $connect);
	
  	$album_result = sql_query($album_query);
	$album_rows = array();
  	while($row = $album_result-> fetch_assoc()) {
  		$JSON = array(
			"album_id" => $row['id']
  			, "album_name" => $row['album_name']
			, "album_type" => $row['album_type']
			, "chip_img" => $row['chip_img']
			, "chip_loading" => $row['chip_loading']
			, "album_time" => $row['album_time']
			, "shop_url" => $row['shop_url']
  			, "artist_id" => $row['artist_id']
  			, "artist_name" => $row['artist_name']
  		);
  		array_push($album_rows, $JSON);
  	}

	// $usealbum_query
	// = " select 	a.id, a.album_name, a.album_type, a.chip_img, a.chip_loading, a.album_time, a.shop_url, a.artist_id, b.artist_name
	// 	from 
	// 		(select id, album_name, album_type, chip_img, chip_loading, album_time, artist_id, shop_url from APIServer_album where tot_type='$tot_id') a, 
	// 		(select id, artist_name from APIServer_artist) b,
	// 		(select album_id from APIServer_apppage) c,
	// 		(select id, album_id from APIServer_device where device_app_id='$device_app_id' and nfc_status='1') d
	// 	where a.artist_id = b.id and a.id = c.album_id and a.id = d.album_id
	// 	order by a.id desc ";

	$usealbum_query
	= " select 	a.id, a.album_name, a.album_type, a.chip_img, a.chip_loading, a.album_time, a.shop_url, a.artist_id, b.artist_name
		from 
			(select id, album_name, album_type, chip_img, chip_loading, album_time, artist_id, shop_url from APIServer_album where tot_type='$tot_id') a, 
			(select id, artist_name from APIServer_artist) b,
			(select id, album_id from APIServer_device where device_app_id='$device_app_id' and nfc_status='1') c
		where a.artist_id = b.id and a.id = c.album_id
		order by a.id desc ";
	
	$usealbum_result = sql_query($usealbum_query);
	$usealbum_rows = array();
	while($row = $usealbum_result-> fetch_assoc()) {
		$JSON = array(
			"album_id" => $row['id']
			, "album_name" => $row['album_name']
			, "album_type" => $row['album_type']
			, "chip_img" => $row['chip_img']
			, "chip_loading" => $row['chip_loading']
			, "album_time" => $row['album_time']
			, "shop_url" => $row['shop_url']
			, "artist_id" => $row['artist_id']
			, "artist_name" => $row['artist_name']
		);
		array_push($usealbum_rows, $JSON);
	}

	$rows = array(
		"category"=>array($category_rows)
		, "album"=>array($album_rows)
		, "usealbum"=>array($usealbum_rows));

  	echo json_encode($rows);
	
  	//mysql_close($connect);
?>
