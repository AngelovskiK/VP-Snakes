<?php

header("Access-Control-Allow-Origin: *");

$conn = mysqli_connect("localhost", "id6193202_admin", "password", "id6193202_snakes");

// Check connection
if (!$conn) {
    die("Connection error: " . mysqli_connect_error());
}

?>