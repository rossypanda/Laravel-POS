<?php
include 'config.php';

$id_number = safe($_REQUEST['id_number']);
$password = safe($_REQUEST['password']);
$pass = md5($password);

$response_array['array_data'] = array();
$result = $mysqli_connect->query("SELECT * FROM tbl_users WHERE `id_no`='$id_number' AND `password`='$pass'");
$row = $result->fetch_array();

$count = $result->num_rows;
if ($count == 1 && $row['user_disallowed'] == 0) {

    $response['res'] = 1;
    $response['id'] = $row['user_id'];
    $response['name'] = $row['user_fullname'];
    $response['contact_number'] = $row['contact_no'];
    $response['email'] = $row['email'];
    $response['course_sec'] = $row['course_sec'];
    $response['id_number'] = $row['id_no'];
} else if ($count == 1 && $row['user_disallowed'] == 1) {
    $getB = $mysqli_connect->query("SELECT count(b_id) FROM tbl_borrowing WHERE `user_id`='$row[user_id]' AND `status`='R'");
    $data = $getB->fetch_array();
    if($data[0] == 0){
        $result = $mysqli_connect->query("UPDATE tbl_users SET user_disallowed='0' WHERE `user_id`='$row[user_id]'");
        if($result){
            $response['res'] = 1;
        }else{
            $response['res'] = 2;
        }
        
    }else{
        $response['res'] = 2;
    }
    
} else {
    $response['res'] = 0;
}
array_push($response_array['array_data'], $response);
echo json_encode($response_array);
