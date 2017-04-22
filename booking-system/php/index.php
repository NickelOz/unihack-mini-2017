<?php
session_start();


// LOCAL WAMP HOST
$HOST = "localhost";
$USER = "root";
$PASS = "";
$DB = "study";

// WEBHOST000 REMOTE DATABASE
//$HOST = 'localhost';
//$USER = 'id241545_inq_dashboard';
//$PASS = 'goforth';
//$DB = 'id241545_inq_dashboard';

$connection = new mysqli($HOST, $USER, $PASS);
$connection->select_db($DB);

//if (!isset($_REQUEST['name'])) {
//    include '../../website/register/register.html.php';
//}

if (isset($_POST["username"], $_POST["password"]) && !empty($_POST["username"]) && !empty($_POST["password"])) {
    $name = $_POST["username"];
    $password = $_POST["password"];

    $sql = "SELECT `id`, `username`, `name`, `password` FROM `user` WHERE `username` = '$name'";
    $result1 = $connection->query($sql);

    $db_username = "";
    $db_password = "";
    $db_user_id = "";
    $db_user_name = "";


    while ($row = $result1->fetch_assoc()) {
        $db_username = $row['username'];
        $db_password = $row['password'];
        $db_user_id = $row['id'];
        $db_user_name = $row['name'];

    }

    if ($name == $db_username && $password == $db_password) {
        $_SESSION['current_userid']= $db_user_id;
        $_SESSION['current_username'] = $db_username;
        $_SESSION['user_name'] = $db_user_name;

        $userHome = "../../dashboard.html";
        header('Location: '.$userHome);
    } else {
        header('Location: ../../login_reattempt.html');
    }
}
else {
    header('Location: ../../login_reattempt.html');
}
?>