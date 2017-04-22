<?php
/**
 * Created by PhpStorm.
 * User: Draga
 * Date: 13/12/2016
 * Time: 9:17 AM
 */

// LOCAL WAMP HOST
$HOST = 'localhost';
$USER = 'root';
$PASS = '';
$DB = 'study';

// WEBHOST000 REMOTE DATABASE
//$HOST = 'localhost';
//$USER = 'id241545_inq_dashboard';
//$PASS = 'goforth';
//$DB = 'id241545_inq_dashboard';

$connection = new mysqli($HOST, $USER, $PASS, $DB);

$sql = "SELECT `username`, `email` FROM `user`";

$echoString = "";
$query_result = $connection -> query($sql);
while ($row = $query_result -> fetch_assoc()){
    $rowString = $row['username'] . ',' . $row['email'] . '|';
    $echoString = $echoString . $rowString;
}

echo $echoString;

?>