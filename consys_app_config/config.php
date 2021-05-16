<?php
ini_set('date.timezone', 'UTC');
date_default_timezone_set('UTC');
$today = date('H:i:s');
$date = date('Y-m-d H:i:s', strtotime($today) + 28800);

//local
// $host 	  = "localhost";
// $username = "root";
// $password = "";
// $database = "tup_dbs_db";


//online
$host 	  = "localhost";
$username = "root";
$password = "";
$database = "consys";
//@mysql_connect($host, $username, $password) or die("Cannot connect to MySQL Server");
//@mysql_select_db($database) or die ("Cannot connect to Database");

$mysqli_connect = new mysqli($host, $username, $password, $database);
$mysqli_connect->query("SET SESSION sql_mode=''");

function getCurrentDate()
{
	ini_set('date.timezone', 'UTC');
	date_default_timezone_set('UTC');
	$today = date('H:i:s');
	$date = date('Y-m-d H:i:s', strtotime($today) + 28800);

	return $date;
}
function safe($POST)
{
	global $mysqli_connect;
	//$result = mysql_real_escape_string($POST);
	$result = $mysqli_connect->real_escape_string($POST);

	return $result;
}

