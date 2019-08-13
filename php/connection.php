<?php

const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASS = '';
const DB_NAME = 'speech_recognizer';
$conn = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
$conn->set_charset("utf8");
// Check connection
if ($conn->connect_errno)
{
    echo "Failed to connect to MySQL: " . $conn->connect_error;
}