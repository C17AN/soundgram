<?php
    require_once("db_connection.php");

    $id=$_REQUEST['nfc_id'];
    $date=$_REQUEST['write_date'];
    $write=$_REQUEST['write'];



    $Query = "UPDATE APIServer_nfckey SET `write_date` = '$date', `write` ='$write' WHERE `id` = $id 
    ";
    $update_result = sql_query($Query);

    $rows = array();
    $JSON = array(
        "nfc_id" => $id,
        "write_date" => $date
    );
    array_push($rows, $JSON);
    echo json_encode($rows);

    ?>