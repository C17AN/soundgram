<?php
    require_once("db_connection.php");

    $id=$_REQUEST['nfc_id'];
    $serial=$_REQUEST['serial'];
    $class=$_REQUEST['class'];
    $memo=$_REQUEST['memo'];



    $Query = "UPDATE `APIServer_nfckey` SET `serial` = '$serial', `memo` = '$memo', `class` = '$class' WHERE `id` = '$id' 
    ";
    $update_result = sql_query($Query);

    $rows = array();
    $JSON = array(
        "nfc_id" => $id,
    );
    array_push($rows, $JSON);
    echo json_encode($rows);

    ?>