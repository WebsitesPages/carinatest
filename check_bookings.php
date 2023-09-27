<?php
require 'connect.php';

$date = $_GET['date'];

$sql = "SELECT Uhrzeit FROM terminetest WHERE Datum = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $date);
$stmt->execute();

$result = $stmt->get_result();
$booked_times = [];
while ($row = $result->fetch_assoc()) {
    $booked_times[] = $row['Uhrzeit'];
}

echo json_encode($booked_times);
