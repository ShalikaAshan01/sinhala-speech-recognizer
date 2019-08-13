<?php 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    $search = $_GET['search'];

    $stmt = $conn->prepare('SELECT s.search as command,r.response as response FROM search s,responses r,search_respnses sr WHERE s.id = sr.sid AND r.id = sr.rid HAVING s.search=?');
    $stmt->bind_param("s",$search);
    $stmt->execute();
    $stmt->bind_result($command,$response);
    $stmt->store_result();
    $array = array();
    while ($stmt->fetch()){
        array_push($array,$response);
    }
    $conn->close();

    if(empty($array)){
        http_response_code(404);   
    }else{

    if(count($array)>0){
        $res = $array[rand(0,count($array)-1)];
        $myObj = new \stdClass();
        $myObj->response = trim($res);
        echo json_encode($myObj);
    }else if(count($array) == 0){
        $res = $array[0];
        $myObj = new \stdClass();
        $myObj->response = trim($res);
        echo json_encode($myObj);
    }
}
}