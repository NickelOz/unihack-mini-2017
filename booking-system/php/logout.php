<?php
/**
 * Created by PhpStorm.
 * User: Draga
 * Date: 9/12/2016
 * Time: 2:42 PM
 */
session_start();
$redirect = "/tablebookingsystem/index.html";

$_SESSION = array();

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

session_destroy();
header('Location: '.$redirect);
?>