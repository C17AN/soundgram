<?php
	header('Content-type: application/json'); 
	require_once("db_connection.php");	
	$user_id = $_REQUEST["user_id"];
	$albumid = $_REQUEST["albumid"];
	$contents_id = $_REQUEST["contents_id"];
    $ref_comment_id = $_REQUEST["ref_comment_id"];
	$contents_type = $_REQUEST["contents_type"];
	$contents = addslashes($_REQUEST["contents"]);

    $insertQuery1 
    = " INSERT INTO APIServer_user_comment(timestamp, ref_comment_id, comment, user_id, album_id, contents_type, contents_id, like_count) VALUES(NOW(), '$ref_comment_id', '$contents', '$user_id', '$albumid', '$contents_type', '$contents_id', '0')";

    $result = sql_query($insertQuery1);
    if($result>0) {
        $query 
        = " SELECT var.*, IFNULL( aul.contents_id, '0' ) AS likeonoff
            FROM (
                SELECT 	a.id, a.user_id, a.contents_id, a.comment, a.comment_img, a.comment_time, a.likeCount, a.org_comment_time
                        , b.nick, b.profile
                FROM 
                    (
                        SELECT 	id, comment, comment_img, user_id, contents_id, ifnull(like_count,0) as likeCount,
                                CASE 	WHEN TIMESTAMPDIFF( MINUTE , timestamp, NOW( ) ) <=0 THEN '방금 전'
                                        WHEN TIMESTAMPDIFF( MINUTE , timestamp, NOW( ) ) <60	THEN CONCAT( TIMESTAMPDIFF( MINUTE , timestamp, NOW( ) ) , '분 전' ) 
                                        WHEN TIMESTAMPDIFF( HOUR , timestamp, NOW( ) ) <24 THEN CONCAT( TIMESTAMPDIFF( HOUR , timestamp, NOW( ) ) , '시간 전' ) 
                                        WHEN TIMESTAMPDIFF( DAY , timestamp, NOW( ) ) <8 THEN CONCAT( TIMESTAMPDIFF( DAY , timestamp, NOW( ) ) , '일 전' ) 
                                ELSE timestamp END AS comment_time, timestamp as org_comment_time 
                        FROM APIServer_user_comment
                        where ref_comment_id='$ref_comment_id' and comment_status=1
                    )a, 
                    (
                        SELECT CASE WHEN length( user_nick ) =0 THEN user_name ELSE user_nick END AS nick, id as user_id, user_img as profile	FROM APIServer_user
                    )b			
                WHERE a.user_id = b.user_id
                ) var
                LEFT OUTER JOIN (
                    SELECT album_id, user_id, contents_type, contents_id
                    FROM APIServer_user_like
                    WHERE device_id='$device_id' and user_id = '$userid'
                    AND album_id = '$albumid'
                    AND contents_type = '$like_type'
                ) aul
                ON  var.id = aul.contents_id
            ORDER BY var.org_comment_time DESC
        ";
                
        // 쿼리하나를 생성해서 mysql를 통해 해당 db에 호출해주는 부분이다.
        // insert의 경우에는 넣는 것으로 끝나지만, select의 경우에는 가져온 값을 뿌려줘야 하므로
        // 리턴값을 활용해야 한다.
        $rows = array();
        $sel_result = sql_query($query);
        while($row = $sel_result->fetch_assoc()) {
            $JSON = array(
                "id" => $row['id']
                , "contents_id" => $row['contents_id']
                , "comment_user_id" => $row['user_id']
                , "comment_contents" => stripslashes($row['comment'])
                , "comment_img" => $row['comment_img']
                , "comment_time" => $row['comment_time']
                , "org_comment_time" => $row['org_comment_time']
                , "likeCount" => $row['likeCount']
                , "nick" => $row['nick']
                , "profile" => $row['profile']
                , "likeonoff" => $row['likeonoff']
                , "refCount" => $row['refCount']
            );
            array_push($rows, $JSON);
        }
    
        echo json_encode($rows);
    }

?>