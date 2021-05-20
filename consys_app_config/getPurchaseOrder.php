<?php 
include 'config.php';

// $user_id = $_REQUEST['user_id'];
$response_array['array_data'] = array();
$result = $mysqli_connect->query("SELECT * FROM tbl_po_header ORDER BY po_number ASC");
while($row = $result->fetch_array()){
    $response['po_id'] = $row['po_header_id'];
    $response['project_name'] = $row['project_name'];
    $response['purchaser'] = $row['purchaser'];
    $response['po_number'] = $row['po_number'];
    $response['po_reference'] = $row['po_reference'];
    $response['date'] = date('F j, Y', strtotime($row['date'])); 
    $response['po_status'] = $row['status'];
    array_push($response_array['array_data'], $response);
}


echo json_encode($response_array);
?>