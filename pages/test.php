<?php

$conn = new mysqli("localhost", "root", "", "my_portfolio");

if ($conn->connect_error) {
    die($conn->connect_error);
}

echo "Database Connected Successfully";