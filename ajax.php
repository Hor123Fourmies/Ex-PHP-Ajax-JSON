<?php
/**
 * Created by PhpStorm.
 * User: sstienface
 * Date: 25/01/2019
 * Time: 11:17
 */


//Remplacer les valeurs si besoin

$servername = "localhost";
$username = "root";
$password = "";
// $dbname = "simon";
$dbname = "bdd";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
// Selectionner la base à utiliser $conn->select_db($dbname);
    $conn->select_db($dbname);



    switch($_GET['action'])
    {
        case"affProducts":
            $res = "select * from `products` where 1";
            break;
        case"affPurchased":
            $achats = "select * from `products` LEFT JOIN `products_purchased` ON (product_id = products_id)";
            //$achats = "select * from `products_purchased` where 1";
            break;
    }

    if(isset($res))
    {

        $arr = array();
        $result = $conn->query($res);


        while($data = $result->fetch_assoc())
        {

            $arr[] = $data;

        }

        echo json_encode($arr);


    }

    if(isset($achats))
    {

        $arr1 = array();
        $result1 = $conn->query($achats);


        while($data1 = $result1->fetch_assoc())
        {

            $arr1[] = $data1;

        }

        echo json_encode($arr1);


    }


}


