<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'connection.php';



if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if(isset($_POST['search']) && isset($_POST['response'])){

        $searchIDs = array();
        $responsesIDs = array();

        $searches = explode(",", $_POST['search']); 
        $responses = explode(",", $_POST['response']);

        foreach($searches as $search) {
            $stmt = $conn->prepare("INSERT INTO search(search) VALUES (?)");
            $stmt->bind_param("s",$search);
            $stmt->execute();
            array_push($searchIDs, $stmt->insert_id);
            $stmt->close();
        }
        
        foreach($responses as $response) {
            $stmt = $conn->prepare("INSERT INTO responses(response) VALUES (?)");
            $stmt->bind_param("s",$response);
            $stmt->execute();
            array_push($responsesIDs, $stmt->insert_id);
            $stmt->close();
        }

        foreach($searchIDs as $sid){
            foreach($responsesIDs as $rid){
                $stmt = $conn->prepare("INSERT INTO search_respnses(sid, rid) VALUES (?,?)");
                $stmt->bind_param("ii",$sid,$rid);
                $stmt->execute();
                $stmt->close();
            }
        }

        $conn->close();

        http_response_code(200); 
        echo "Successfully added";  

    }else{
        http_response_code(400);   
    }
    
}
else{
    http_response_code(405);
    echo json_encode("Method Not Allowed");
}